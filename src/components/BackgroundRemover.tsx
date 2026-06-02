'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileImage, ShieldAlert, Sparkles, Download, ArrowLeft, Loader2, CheckCircle2, X } from 'lucide-react';
import JSZip from 'jszip';

interface FileItem {
  id: string;
  file: File;
  name: string;
  status: 'pending' | 'processing' | 'success' | 'error';
  progress: string;
  originalUrl: string;
  processedUrl?: string;
  processedBlob?: Blob;
}

export default function BackgroundRemover() {
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentFileIndex, setCurrentFileIndex] = useState<number | null>(null);
  const [activePreview, setActivePreview] = useState<FileItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (files: File[]) => {
    const validFiles = files.filter(f => f.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    const newItems: FileItem[] = validFiles.map(file => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      name: file.name,
      status: 'pending',
      progress: 'Ready',
      originalUrl: URL.createObjectURL(file),
    }));

    setFileList(prev => [...prev, ...newItems]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const clearQueue = () => {
    fileList.forEach(item => {
      URL.revokeObjectURL(item.originalUrl);
      if (item.processedUrl) URL.revokeObjectURL(item.processedUrl);
    });
    setFileList([]);
    setActivePreview(null);
  };

  const processQueue = async () => {
    if (fileList.length === 0 || isProcessing) return;
    setIsProcessing(true);

    const { removeBackground } = await import('@imgly/background-removal');

    for (let idx = 0; idx < fileList.length; idx++) {
      const item = fileList[idx];
      if (item.status === 'success') continue;

      setCurrentFileIndex(idx);
      setFileList(prev => prev.map((f, i) => i === idx ? { ...f, status: 'processing', progress: 'Loading AI model...' } : f));

      try {
        const config = {
          debug: true,
          output: {
            format: 'image/png' as const,
            quality: 0.95
          },
          progress: (step: string) => {
            const progressMsg = step.replace('fetch:', 'Downloading ').replace('onnx:', 'AI Processing: ');
            setFileList(prev => prev.map((f, i) => i === idx ? { ...f, progress: progressMsg } : f));
          }
        };

        const resultBlob = await removeBackground(item.file, config);
        const processedUrl = URL.createObjectURL(resultBlob);

        setFileList(prev => prev.map((f, i) => i === idx ? { 
          ...f, 
          status: 'success', 
          progress: 'Completed', 
          processedUrl, 
          processedBlob: resultBlob 
        } : f));
      } catch (err) {
        console.error('IMG.LY processing error:', err);
        setFileList(prev => prev.map((f, i) => i === idx ? { ...f, status: 'error', progress: 'Failed to process' } : f));
      }
    }

    setIsProcessing(false);
    setCurrentFileIndex(null);
  };

  const downloadAll = async () => {
    const successItems = fileList.filter(item => item.status === 'success' && item.processedBlob);
    if (successItems.length === 0) return;

    if (successItems.length === 1) {
      // Direct download for single file
      const item = successItems[0];
      const link = document.createElement('a');
      link.href = item.processedUrl!;
      link.download = `transparent_${item.name.replace(/\.[^/.]+$/, '')}.png`;
      link.click();
      return;
    }

    const zip = new JSZip();
    successItems.forEach(item => {
      const fileName = `transparent_${item.name.replace(/\.[^/.]+$/, '')}.png`;
      zip.file(fileName, item.processedBlob!);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const zipUrl = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = zipUrl;
    link.download = 'transparent_images.zip';
    link.click();
    URL.revokeObjectURL(zipUrl);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 text-zinc-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <a href="/" className="inline-flex items-center space-x-2 text-xs uppercase font-black tracking-widest text-[#ff2a14] hover:underline mb-2 select-none">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </a>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight font-display text-zinc-950 leading-none">
            AI Background Remover
          </h1>
          <p className="text-zinc-600 text-sm mt-2 select-none max-w-xl font-medium">
            Powered locally in your browser by <strong className="text-zinc-900">IMG.LY</strong>. 
            No cloud APIs, no privacy leaks. Drag in multiple images or a ZIP archive to get started!
          </p>
        </div>

        {fileList.length > 0 && (
          <div className="flex gap-3">
            <button
              onClick={clearQueue}
              disabled={isProcessing}
              className="px-5 py-3 rounded-2xl border-2 border-zinc-950 font-black text-xs uppercase tracking-wider bg-white hover:bg-zinc-50 disabled:opacity-50 transition-all select-none"
            >
              Clear Queue
            </button>
            <button
              onClick={processQueue}
              disabled={isProcessing || fileList.every(f => f.status === 'success')}
              className="px-6 py-3 rounded-2xl border-2 border-zinc-950 font-black text-xs uppercase tracking-wider bg-[#ff2a14] text-white shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] disabled:opacity-50 transition-all select-none"
            >
              {isProcessing ? 'Processing AI...' : 'Start BG Removal'}
            </button>
          </div>
        )}
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Upload & Queue */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Drag & Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-3 border-dashed border-zinc-950 rounded-[2rem] p-10 bg-white hover:bg-zinc-50/50 cursor-pointer transition-all flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_#000] select-none group"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*"
              className="hidden"
            />
            <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-zinc-950 flex items-center justify-center mb-4 transform group-hover:scale-105 transition-transform shadow-sm">
              <Upload className="w-7 h-7 text-[#ff2a14]" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900">
              Drag & Drop Images Here
            </h3>
            <p className="text-xs text-zinc-500 mt-1.5 max-w-sm">
              Or click to browse your computer. Supports PNG, JPG, and JPEG.
            </p>
          </div>

          {/* Queue List */}
          {fileList.length > 0 && (
            <div className="bg-white border-3 border-zinc-950 rounded-[2rem] p-6 shadow-[6px_6px_0px_#000] max-h-[500px] overflow-y-auto custom-scrollbar-wrapper">
              <h3 className="text-lg font-black uppercase tracking-tight mb-4 select-none">
                Upload Queue ({fileList.length} items)
              </h3>
              <div className="space-y-3">
                {fileList.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 border-2 border-zinc-950 rounded-2xl transition-all ${
                      activePreview?.id === item.id ? 'bg-zinc-50' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div className="w-12 h-12 rounded-xl border border-zinc-950/10 overflow-hidden bg-zinc-50 flex-shrink-0 flex items-center justify-center relative select-none">
                        <img
                          src={item.processedUrl || item.originalUrl}
                          alt="thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black uppercase tracking-tight truncate text-zinc-900 max-w-[200px] sm:max-w-[320px]">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-zinc-500 mt-0.5 truncate flex items-center">
                          {item.status === 'processing' && <Loader2 className="w-3 h-3 mr-1 animate-spin text-[#ff2a14]" />}
                          {item.status === 'success' && <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-500" />}
                          {item.status === 'error' && <ShieldAlert className="w-3 h-3 mr-1 text-[#ff2a14]" />}
                          <span>{item.progress}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {item.status === 'success' && (
                        <button
                          onClick={() => setActivePreview(item)}
                          className="px-3 py-2 rounded-xl border border-zinc-950 font-bold text-[10px] uppercase tracking-wider bg-white hover:bg-zinc-50 transition-all select-none"
                        >
                          Preview
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setFileList(prev => {
                            const clone = [...prev];
                            URL.revokeObjectURL(item.originalUrl);
                            if (item.processedUrl) URL.revokeObjectURL(item.processedUrl);
                            clone.splice(index, 1);
                            return clone;
                          });
                          if (activePreview?.id === item.id) setActivePreview(null);
                        }}
                        disabled={isProcessing && currentFileIndex === index}
                        className="p-2 rounded-xl text-zinc-400 hover:text-[#ff2a14] hover:bg-red-50/50 disabled:opacity-50 transition-all"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Processed Outputs & Downloader */}
        <div className="space-y-6">
          {/* Download Box */}
          <div className="bg-white border-3 border-zinc-950 rounded-[2rem] p-6 shadow-[6px_6px_0px_#000] text-center flex flex-col justify-center items-center h-48 select-none">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border-2 border-zinc-950 flex items-center justify-center mb-3">
              <Download className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-md font-black uppercase tracking-tight text-zinc-900">
              Download Processed PNGs
            </h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-[220px]">
              Ready to download: {fileList.filter(f => f.status === 'success').length} of {fileList.length} items
            </p>
            <button
              onClick={downloadAll}
              disabled={fileList.filter(f => f.status === 'success').length === 0}
              className="mt-4 w-full h-11 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 border-2 border-zinc-950 shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] disabled:opacity-50 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{fileList.filter(f => f.status === 'success').length > 1 ? 'Download ZIP Archive' : 'Download File'}</span>
            </button>
          </div>

          {/* Interactive Comparison Preview */}
          {activePreview && activePreview.processedUrl && (
            <div className="bg-white border-3 border-zinc-950 rounded-[2rem] p-6 shadow-[6px_6px_0px_#000] space-y-4">
              <div className="flex justify-between items-center select-none">
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900 flex items-center">
                  <Sparkles className="w-4 h-4 text-[#ff2a14] mr-1.5 animate-pulse" />
                  <span>Interactive Preview</span>
                </h4>
                <span className="text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-200/50 px-2 py-0.5 rounded font-black tracking-widest uppercase">
                  Transparent
                </span>
              </div>

              {/* Side-by-Side Visual */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col space-y-1.5">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest text-center select-none">Original</span>
                  <div className="aspect-square rounded-2xl border border-zinc-950/10 bg-zinc-50 overflow-hidden relative">
                    <img src={activePreview.originalUrl} alt="original" className="w-full h-full object-contain p-2" />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest text-center select-none">Processed</span>
                  <div className="aspect-square rounded-2xl border border-zinc-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:8px_8px] overflow-hidden relative">
                    <img src={activePreview.processedUrl} alt="processed" className="w-full h-full object-contain p-2 z-10 relative" />
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-zinc-500 leading-relaxed font-medium">
                👉 **Tips**: The background is completely transparent. Copy-paste these PNGs into the `/public` folder of your project to overwrite original images!
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
