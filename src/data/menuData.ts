export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'beef' | 'chicken' | 'smasher' | 'fried-chicken' | 'sides' | 'drinks' | 'fish' | 'rice-bowls';
  description: string;
  image: string;
  tags?: string[];
  calories?: number;
}

export const menuItems: MenuItem[] = [
  // Beef Burgers
  {
    id: 'beef-classic',
    name: 'Classic Beef Burger',
    price: 235,
    category: 'beef',
    description: 'Juicy beef patty grilled to perfection with onions, pickles, and our signature sauce.',
    image: '/assets/menu/classic_beef.png',
    tags: ['Signature'],
    calories: 450
  },
  {
    id: 'beef-cheese',
    name: 'Beef Cheese Burger',
    price: 275,
    category: 'beef',
    description: 'Our classic beef burger upgraded with a slice of melted cheddar cheese.',
    image: '/assets/menu/classic_beef.png',
    tags: ['Premium Choice'],
    calories: 562
  },
  {
    id: 'beef-bbq',
    name: 'Smokey BBQ Cheese Beef',
    price: 295,
    category: 'beef',
    description: 'Beef patty topped with melted cheddar, crispy onion rings, and a smokey BBQ glaze.',
    image: '/assets/menu/bbq_beef.png',
    tags: ['Smoked Oak'],
    calories: 610
  },
  {
    id: 'beef-giganto',
    name: 'Giganto Beef Burger',
    price: 450,
    category: 'beef',
    description: 'Massive double-patty beef burger with double cheese, lettuce, and secret house sauce.',
    image: '/assets/menu/hero_burger.png',
    tags: ['Grand Giganto', 'Hearty Selection'],
    calories: 890
  },
  {
    id: 'beef-double-decker',
    name: 'Double Decker Beef',
    price: 595,
    category: 'beef',
    description: 'Triple beef patties layered with three slices of cheese, bacon, and special dressings.',
    image: '/assets/menu/hero_burger.png',
    tags: ['Chef\'s Masterpiece', 'Gourmet Feast'],
    calories: 1120
  },

  // Chicken Burgers
  {
    id: 'chicken-classic',
    name: 'Classic Chicken Burger',
    price: 235,
    category: 'chicken',
    description: 'Crispy or grilled chicken breast patty with fresh lettuce and mayo.',
    image: '/assets/menu/hero_burger.png',
    calories: 420
  },
  {
    id: 'chicken-cheese',
    name: 'Chicken Cheese Burger',
    price: 275,
    category: 'chicken',
    description: 'Crispy chicken patty with melted cheddar cheese, pickles, and signature house sauce.',
    image: '/assets/menu/hero_burger.png',
    tags: ['Premium Choice'],
    calories: 530
  },
  {
    id: 'chicken-bbq',
    name: 'Smokey BBQ Cheese Chicken',
    price: 295,
    category: 'chicken',
    description: 'Crispy chicken patty glazed in BBQ sauce with melted cheese and fresh greens.',
    image: '/assets/menu/hero_burger.png',
    calories: 580
  },
  {
    id: 'chicken-cheese-blast',
    name: 'Cheese Blast Chicken',
    price: 350,
    category: 'chicken',
    description: 'A chicken burger filled with a liquid-cheese center that explodes with flavor in every bite.',
    image: '/assets/menu/hero_burger.png',
    tags: ['Cheese Lava', 'Spicy Naga'],
    calories: 720
  },
  {
    id: 'chicken-giganto',
    name: 'Giganto Chicken Burger',
    price: 450,
    category: 'chicken',
    description: 'Double crispy chicken patties with double cheese, salad, and dynamic house sauce.',
    image: '/assets/menu/hero_burger.png',
    tags: ['Grand Giganto'],
    calories: 840
  },

  // Fish Burgers
  {
    id: 'fish-burger',
    name: 'Fish Burger',
    price: 295,
    category: 'fish',
    description: 'Crispy Dory Fish fillet layered with fresh lettuce and tartar sauce, all tucked in a soft bun.',
    image: '/assets/menu/fish_burger.png',
    tags: ['Crispy Fish', 'Tartar Delight'],
    calories: 480
  },

  // Smashers
  {
    id: 'smasher-amul',
    name: 'Amul',
    price: 395,
    category: 'smasher',
    description: 'Vibrant double smashed beef patties loaded with double melted cheddar, pickles, and our signature secret smash sauce.',
    image: '/assets/menu/burger_all.png',
    tags: ['Secret Recipe', 'Double Melt'],
    calories: 780
  },
  {
    id: 'smasher-truffle',
    name: 'Truffle Smasher',
    price: 425,
    category: 'smasher',
    description: 'Double smashed beef patties with caramelized onions, swiss cheese, and a rich truffle aioli.',
    image: '/assets/menu/hero_burger.png',
    tags: ['Gourmet Select', 'Artisan Edition'],
    calories: 680
  },
  {
    id: 'smasher-shiitake',
    name: 'Shiitake Mushroom Smasher',
    price: 450,
    category: 'smasher',
    description: 'Smashed beef patties topped with sautéed shiitake mushrooms, melted cheese, and creamy sauce.',
    image: '/assets/menu/shiitake_smasher.jpg',
    tags: ['Shiitake Infused'],
    calories: 710
  },
  {
    id: 'smasher-bacon',
    name: 'Canadian Bacon Smasher',
    price: 495,
    category: 'smasher',
    description: 'Smashed beef patties, premium Canadian maple bacon, cheddar cheese, and a smoky sauce.',
    image: '/assets/menu/bacon_smasher.jpg',
    tags: ['Maple Smoked Bacon'],
    calories: 790
  },

  // Rice Bowls
  {
    id: 'rice-continental',
    name: 'Continental Fusion Rice Bowl',
    price: 325,
    category: 'rice-bowls',
    description: 'Special rice served with a delicious lemon cream chicken and a fried egg on top.',
    image: '/assets/menu/continental_fusion.png',
    tags: ['Lemon Cream', 'Fusion Delight'],
    calories: 520
  },
  {
    id: 'rice-pan-asian',
    name: 'Pan Asian Mashup Rice Bowl',
    price: 325,
    category: 'rice-bowls',
    description: 'Tom Yum rice paired with Kung Pao chicken and topped with a fried egg and black sesame seeds.',
    image: '/assets/menu/pan_asian_mashup.png',
    tags: ['Tom Yum', 'Spicy Kung Pao'],
    calories: 580
  },

  // Fried Chicken
  {
    id: 'chicken-1pc',
    name: '1 Pc Crispy Fried Chicken',
    price: 135,
    category: 'fried-chicken',
    description: 'Crispy, crunchy, and juicy single piece of fried chicken prepared with secret herbs.',
    image: '/assets/menu/burger_exploded.png',
    calories: 220
  },
  {
    id: 'chicken-2pc',
    name: '2 Pcs Crispy Fried Chicken',
    price: 260,
    category: 'fried-chicken',
    description: 'Two pieces of our signature hot and crispy golden fried chicken.',
    image: '/assets/menu/burger_exploded.png',
    tags: ['Sharing Selection'],
    calories: 440
  },
  {
    id: 'chicken-4pc',
    name: '4 Pcs Crispy Fried Chicken',
    price: 515,
    category: 'fried-chicken',
    description: 'Four pieces of hot, crunchy fried chicken, perfect for sharing.',
    image: '/assets/menu/burger_exploded.png',
    calories: 880
  },
  {
    id: 'chicken-bucket',
    name: 'Family Bucket (9 Pcs)',
    price: 1150,
    category: 'fried-chicken',
    description: 'A massive bucket of 9 golden crispy chicken pieces, for the ultimate gathering.',
    image: '/assets/menu/burger_exploded.png',
    tags: ['Grand Banquet'],
    calories: 1980
  },

  // Sides & Starters
  {
    id: 'side-fries',
    name: 'Classic French Fries',
    price: 90,
    category: 'sides',
    description: 'Crispy salted golden french fries. Simple and delicious.',
    image: '/assets/menu/burger_exploded.png',
    calories: 310
  },
  {
    id: 'side-wedges',
    name: 'Garlic Mayo Potato Wedges',
    price: 175,
    category: 'sides',
    description: 'Crispy, seasoned potato wedges served with a side of garlic mayo sauce.',
    image: '/assets/menu/potato_wedges.png',
    calories: 380
  },
  {
    id: 'side-fish-tots',
    name: 'Fish Tots (6 Pcs)',
    price: 235,
    category: 'sides',
    description: 'Crispy, bite-sized pieces of seasoned dory fish deep-fried to golden perfection.',
    image: '/assets/menu/fish_tots.png',
    tags: ['Crispy Fish', 'Bite-Sized'],
    calories: 320
  },
  {
    id: 'side-fingers',
    name: 'Crispy Chicken Fingers',
    price: 195,
    category: 'sides',
    description: 'Tender chicken strips breaded and fried till golden brown. Served with dipping sauce.',
    image: '/assets/menu/burger_exploded.png',
    tags: ['Tender Select'],
    calories: 410
  },
  {
    id: 'side-wings',
    name: 'Pankha Wings (6 Pcs)',
    price: 270,
    category: 'sides',
    description: 'Spicy chicken wings tossed in our signature hot glaze.',
    image: '/assets/menu/burger_exploded.png',
    tags: ['Fiery Crisp'],
    calories: 450
  },
  {
    id: 'side-drums',
    name: 'Naga Drums (4 Pcs)',
    price: 220,
    category: 'sides',
    description: 'Extremely hot and spicy drumettes flavored with authentic Bangladeshi naga chili.',
    image: '/assets/menu/burger_exploded.png',
    tags: ['Explosive Naga'],
    calories: 490
  },

  // Drinks & Shakes
  {
    id: 'drink-chocolate-shake',
    name: 'Chocolate Milkshake',
    price: 180,
    category: 'drinks',
    description: 'Rich, thick chocolate shake made with premium ice cream and cocoa powder, topped with whipped cream.',
    image: '/assets/menu/burger_exploded.png',
    tags: ['Signature Shake'],
    calories: 520
  },
  {
    id: 'drink-oreo-shake',
    name: 'Oreo Milkshake',
    price: 190,
    category: 'drinks',
    description: 'Creamy vanilla milkshake blended with Oreo cookie chunks and chocolate syrup.',
    image: '/assets/menu/burger_exploded.png',
    tags: ['Connoisseur Choice'],
    calories: 540
  },
  {
    id: 'drink-strawberry-shake',
    name: 'Strawberry Milkshake',
    price: 185,
    category: 'drinks',
    description: 'Sweet and refreshing milkshake flavored with real strawberry syrup and ice cream.',
    image: '/assets/menu/burger_exploded.png',
    calories: 480
  },
  {
    id: 'dessert-velvet-jar',
    name: 'Red Velvet Jar Dessert',
    price: 150,
    category: 'drinks',
    description: 'Delicious layers of red velvet sponge and cream cheese frosting in a reusable glass jar.',
    image: '/assets/menu/burger_exploded.png',
    tags: ['Velvet Sugar'],
    calories: 380
  },
  {
    id: 'drink-lemon-tea',
    name: 'Iced Lemon Tea',
    price: 99,
    category: 'drinks',
    description: 'Sweet and refreshing lemon-flavored iced tea served with a slice of fresh lemon.',
    image: '/assets/menu/iced_lemon_tea.png',
    tags: ['Refreshing', 'Citrus Blast'],
    calories: 120
  }
];
