// Product-specific reviews and Q&A data
export interface ProductReview {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
  value: string;
  verified: boolean;
  images: string[];
  videos: string[];
}

export interface ProductQA {
  question: string;
  answer: string;
  user: string;
  date: string;
}

export interface ProductReviewsQA {
  [productId: string]: {
    reviews: ProductReview[];
    qa: ProductQA[];
  };
}

export const productReviewsQA: ProductReviewsQA = {
  '1': { // iPhone 15 Pro Max
    reviews: [
      {
        id: '1-1',
        user: 'Verified Buyer from California',
        rating: 5,
        comment: 'Absolutely love this phone! The titanium design is stunning and the camera quality is incredible. Battery life easily lasts all day.',
        date: 'Dec, 2024',
        location: 'California',
        value: 'Best in class',
        verified: true,
        images: ['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200'],
        videos: [],
      },
      {
        id: '1-2',
        user: 'Verified Buyer from New York',
        rating: 4,
        comment: 'Great phone overall. The A17 Pro chip is blazing fast. Only minor issue is the price, but you get what you pay for.',
        date: 'Nov, 2024',
        location: 'New York',
        value: 'Value-for-money',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '1-3',
        user: 'Verified Buyer from Texas',
        rating: 5,
        comment: 'The camera system is phenomenal! Action mode and portrait mode work perfectly. Titanium feels premium.',
        date: 'Oct, 2024',
        location: 'Texas',
        value: 'Highly recommended',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '1-4',
        user: 'Anonymous',
        rating: 3,
        comment: 'Good phone but too expensive. Camera is great but battery could be better.',
        date: 'Sep, 2024',
        location: 'Unknown',
        value: 'Average',
        verified: false,
        images: [],
        videos: [],
      },
      {
        id: '1-5',
        user: 'Verified Buyer from Florida',
        rating: 4,
        comment: 'Excellent performance and build quality. iOS 17 runs smoothly. Wish it had USB-C charging.',
        date: 'Aug, 2024',
        location: 'Florida',
        value: 'Good buy',
        verified: true,
        images: [],
        videos: [],
      },
    ],
    qa: [
      {
        question: 'Does it come with a charger?',
        answer: 'No, the iPhone 15 Pro Max comes with a USB-C cable but no charger. You\'ll need to purchase a 20W or higher USB-C charger separately.',
        user: 'Verified Buyer from California',
        date: 'Dec, 2024',
      },
      {
        question: 'How is the battery life?',
        answer: 'Excellent! I get about 10-12 hours of screen time with normal usage. Heavy gaming might reduce it to 6-8 hours.',
        user: 'Verified Buyer from Texas',
        date: 'Nov, 2024',
      },
      {
        question: 'Is the titanium finish durable?',
        answer: 'Yes, the titanium finish is very durable and scratch-resistant. Much better than previous aluminum models.',
        user: 'Verified Buyer from New York',
        date: 'Oct, 2024',
      },
    ],
  },
  '2': { // Samsung 65" 4K Smart TV
    reviews: [
      {
        id: '2-1',
        user: 'Verified Buyer from California',
        rating: 5,
        comment: 'Amazing picture quality! The 4K resolution is crystal clear and the smart features work perfectly. Great for streaming.',
        date: 'Dec, 2024',
        location: 'California',
        value: 'Best in class',
        verified: true,
        images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200'],
        videos: [],
      },
      {
        id: '2-2',
        user: 'Verified Buyer from Ohio',
        rating: 4,
        comment: 'Great TV for the price. Picture quality is excellent and the remote is intuitive. Setup was easy.',
        date: 'Nov, 2024',
        location: 'Ohio',
        value: 'Value-for-money',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '2-3',
        user: 'Verified Buyer from Michigan',
        rating: 5,
        comment: 'Perfect for our living room. The 65-inch size is ideal and the sound quality is surprisingly good.',
        date: 'Oct, 2024',
        location: 'Michigan',
        value: 'Highly recommended',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '2-4',
        user: 'Anonymous',
        rating: 3,
        comment: 'Good picture but the smart features are slow sometimes. Remote could be better designed.',
        date: 'Sep, 2024',
        location: 'Unknown',
        value: 'Average',
        verified: false,
        images: [],
        videos: [],
      },
      {
        id: '2-5',
        user: 'Verified Buyer from Illinois',
        rating: 4,
        comment: 'Excellent 4K picture and great smart TV features. Netflix and Prime work flawlessly.',
        date: 'Aug, 2024',
        location: 'Illinois',
        value: 'Good buy',
        verified: true,
        images: [],
        videos: [],
      },
    ],
    qa: [
      {
        question: 'Does it have built-in WiFi?',
        answer: 'Yes, it has built-in WiFi and Ethernet port. Connects easily to your home network.',
        user: 'Verified Buyer from California',
        date: 'Dec, 2024',
      },
      {
        question: 'Can I mount it on the wall?',
        answer: 'Yes, it\'s VESA compatible. You\'ll need to purchase a wall mount separately.',
        user: 'Verified Buyer from Ohio',
        date: 'Nov, 2024',
      },
      {
        question: 'How many HDMI ports does it have?',
        answer: 'It has 4 HDMI ports, which is plenty for most home setups.',
        user: 'Verified Buyer from Michigan',
        date: 'Oct, 2024',
      },
    ],
  },
  '3': { // Nike Air Max 270
    reviews: [
      {
        id: '3-1',
        user: 'Verified Buyer from California',
        rating: 5,
        comment: 'Most comfortable running shoes I\'ve ever owned! The Air Max cushioning is amazing for long runs.',
        date: 'Dec, 2024',
        location: 'California',
        value: 'Best in class',
        verified: true,
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200'],
        videos: [],
      },
      {
        id: '3-2',
        user: 'Verified Buyer from Florida',
        rating: 4,
        comment: 'Great for both running and casual wear. Stylish design and good arch support.',
        date: 'Nov, 2024',
        location: 'Florida',
        value: 'Value-for-money',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '3-3',
        user: 'Verified Buyer from Texas',
        rating: 5,
        comment: 'Perfect fit and very breathable. The mesh upper keeps my feet cool during workouts.',
        date: 'Oct, 2024',
        location: 'Texas',
        value: 'Highly recommended',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '3-4',
        user: 'Anonymous',
        rating: 3,
        comment: 'Good shoes but run a bit small. Had to size up half a size.',
        date: 'Sep, 2024',
        location: 'Unknown',
        value: 'Average',
        verified: false,
        images: [],
        videos: [],
      },
      {
        id: '3-5',
        user: 'Verified Buyer from New York',
        rating: 4,
        comment: 'Excellent cushioning and stylish design. Great for everyday use and light running.',
        date: 'Aug, 2024',
        location: 'New York',
        value: 'Good buy',
        verified: true,
        images: [],
        videos: [],
      },
    ],
    qa: [
      {
        question: 'Are they true to size?',
        answer: 'I found them to run slightly small. I recommend going up half a size for the best fit.',
        user: 'Verified Buyer from California',
        date: 'Dec, 2024',
      },
      {
        question: 'Good for running on pavement?',
        answer: 'Yes, excellent for road running. The Air Max cushioning provides great shock absorption.',
        user: 'Verified Buyer from Florida',
        date: 'Nov, 2024',
      },
      {
        question: 'How long do they last?',
        answer: 'With regular use, they typically last 6-8 months before the cushioning starts to wear down.',
        user: 'Verified Buyer from Texas',
        date: 'Oct, 2024',
      },
    ],
  },
  '4': { // KitchenAid Stand Mixer
    reviews: [
      {
        id: '4-1',
        user: 'Verified Buyer from California',
        rating: 5,
        comment: 'This mixer is a game-changer for baking! The 10 speeds give perfect control and it handles heavy dough like a dream.',
        date: 'Dec, 2024',
        location: 'California',
        value: 'Best in class',
        verified: true,
        images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200'],
        videos: [],
      },
      {
        id: '4-2',
        user: 'Verified Buyer from Texas',
        rating: 4,
        comment: 'Excellent quality and very durable. Makes perfect bread dough and cookie batter. Worth every penny.',
        date: 'Nov, 2024',
        location: 'Texas',
        value: 'Value-for-money',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '4-3',
        user: 'Verified Buyer from New York',
        rating: 5,
        comment: 'Professional-grade mixer for home use. The attachments are high quality and it\'s surprisingly quiet.',
        date: 'Oct, 2024',
        location: 'New York',
        value: 'Highly recommended',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '4-4',
        user: 'Anonymous',
        rating: 3,
        comment: 'Good mixer but quite heavy and takes up a lot of counter space.',
        date: 'Sep, 2024',
        location: 'Unknown',
        value: 'Average',
        verified: false,
        images: [],
        videos: [],
      },
      {
        id: '4-5',
        user: 'Verified Buyer from Florida',
        rating: 4,
        comment: 'Perfect for serious bakers. The metal construction feels solid and it handles everything I throw at it.',
        date: 'Aug, 2024',
        location: 'Florida',
        value: 'Good buy',
        verified: true,
        images: [],
        videos: [],
      },
    ],
    qa: [
      {
        question: 'Does it come with attachments?',
        answer: 'Yes, it comes with the flat beater, wire whip, and dough hook. Additional attachments can be purchased separately.',
        user: 'Verified Buyer from California',
        date: 'Dec, 2024',
      },
      {
        question: 'Can it handle bread dough?',
        answer: 'Absolutely! The dough hook attachment is perfect for kneading bread dough. It handles heavy dough very well.',
        user: 'Verified Buyer from Texas',
        date: 'Nov, 2024',
      },
      {
        question: 'How loud is it?',
        answer: 'It\'s relatively quiet for a stand mixer. Much quieter than hand mixers and doesn\'t vibrate much.',
        user: 'Verified Buyer from New York',
        date: 'Oct, 2024',
      },
    ],
  },
  '5': { // MacBook Air M2
    reviews: [
      {
        id: '5-1',
        user: 'Verified Buyer from California',
        rating: 5,
        comment: 'Incredible performance! The M2 chip is blazing fast and battery life is amazing. Perfect for work and creative tasks.',
        date: 'Dec, 2024',
        location: 'California',
        value: 'Best in class',
        verified: true,
        images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200'],
        videos: [],
      },
      {
        id: '5-2',
        user: 'Verified Buyer from New York',
        rating: 4,
        comment: 'Great laptop for productivity. The Retina display is beautiful and it handles multiple apps smoothly.',
        date: 'Nov, 2024',
        location: 'New York',
        value: 'Value-for-money',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '5-3',
        user: 'Verified Buyer from Texas',
        rating: 5,
        comment: 'Lightweight and powerful. Perfect for students and professionals. The build quality is excellent.',
        date: 'Oct, 2024',
        location: 'Texas',
        value: 'Highly recommended',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '5-4',
        user: 'Anonymous',
        rating: 3,
        comment: 'Good laptop but expensive. Wish it had more ports and better gaming performance.',
        date: 'Sep, 2024',
        location: 'Unknown',
        value: 'Average',
        verified: false,
        images: [],
        videos: [],
      },
      {
        id: '5-5',
        user: 'Verified Buyer from Florida',
        rating: 4,
        comment: 'Excellent for creative work. Final Cut Pro and Photoshop run smoothly. Great investment.',
        date: 'Aug, 2024',
        location: 'Florida',
        value: 'Good buy',
        verified: true,
        images: [],
        videos: [],
      },
    ],
    qa: [
      {
        question: 'How long does the battery last?',
        answer: 'I get about 15-18 hours of normal use. Video editing reduces it to 8-10 hours, which is still excellent.',
        user: 'Verified Buyer from California',
        date: 'Dec, 2024',
      },
      {
        question: 'Can it handle video editing?',
        answer: 'Yes! The M2 chip handles 4K video editing smoothly in Final Cut Pro and Premiere Pro.',
        user: 'Verified Buyer from New York',
        date: 'Nov, 2024',
      },
      {
        question: 'Is 8GB RAM enough?',
        answer: 'For most users, yes. If you do heavy video editing or run multiple VMs, consider the 16GB model.',
        user: 'Verified Buyer from Texas',
        date: 'Oct, 2024',
      },
    ],
  },
  '6': { // Adidas Ultraboost 22
    reviews: [
      {
        id: '6-1',
        user: 'Verified Buyer from California',
        rating: 5,
        comment: 'Best running shoes I\'ve ever worn! The Boost cushioning is incredibly responsive and comfortable.',
        date: 'Dec, 2024',
        location: 'California',
        value: 'Best in class',
        verified: true,
        images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200'],
        videos: [],
      },
      {
        id: '6-2',
        user: 'Verified Buyer from Florida',
        rating: 4,
        comment: 'Great for long-distance running. The Primeknit upper is breathable and the fit is perfect.',
        date: 'Nov, 2024',
        location: 'Florida',
        value: 'Value-for-money',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '6-3',
        user: 'Verified Buyer from Texas',
        rating: 5,
        comment: 'Excellent energy return and cushioning. Perfect for both training and race day.',
        date: 'Oct, 2024',
        location: 'Texas',
        value: 'Highly recommended',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '6-4',
        user: 'Anonymous',
        rating: 3,
        comment: 'Good shoes but expensive. The Boost midsole is comfortable but wears out quickly.',
        date: 'Sep, 2024',
        location: 'Unknown',
        value: 'Average',
        verified: false,
        images: [],
        videos: [],
      },
      {
        id: '6-5',
        user: 'Verified Buyer from New York',
        rating: 4,
        comment: 'Stylish and functional. Great for both running and casual wear. Good arch support.',
        date: 'Aug, 2024',
        location: 'New York',
        value: 'Good buy',
        verified: true,
        images: [],
        videos: [],
      },
    ],
    qa: [
      {
        question: 'Are they good for marathon training?',
        answer: 'Absolutely! Many runners use Ultraboost for marathon training. Great cushioning for long distances.',
        user: 'Verified Buyer from California',
        date: 'Dec, 2024',
      },
      {
        question: 'How do they fit compared to other Adidas?',
        answer: 'They fit true to size for most people. The Primeknit upper is very flexible and adapts well.',
        user: 'Verified Buyer from Florida',
        date: 'Nov, 2024',
      },
      {
        question: 'Good for trail running?',
        answer: 'These are designed for road running. For trails, I\'d recommend Adidas Terrex or similar trail shoes.',
        user: 'Verified Buyer from Texas',
        date: 'Oct, 2024',
      },
    ],
  },
  '7': { // Sony WH-1000XM5
    reviews: [
      {
        id: '7-1',
        user: 'Verified Buyer from California',
        rating: 5,
        comment: 'Incredible noise cancellation! The sound quality is amazing and battery life is excellent. Perfect for travel.',
        date: 'Dec, 2024',
        location: 'California',
        value: 'Best in class',
        verified: true,
        images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200'],
        videos: [],
      },
      {
        id: '7-2',
        user: 'Verified Buyer from New York',
        rating: 4,
        comment: 'Great headphones for commuting. The noise cancellation blocks out subway noise perfectly.',
        date: 'Nov, 2024',
        location: 'New York',
        value: 'Value-for-money',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '7-3',
        user: 'Verified Buyer from Texas',
        rating: 5,
        comment: 'Best wireless headphones I\'ve owned. Crystal clear sound and comfortable for long listening sessions.',
        date: 'Oct, 2024',
        location: 'Texas',
        value: 'Highly recommended',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '7-4',
        user: 'Anonymous',
        rating: 3,
        comment: 'Good sound but expensive. The touch controls can be finicky sometimes.',
        date: 'Sep, 2024',
        location: 'Unknown',
        value: 'Average',
        verified: false,
        images: [],
        videos: [],
      },
      {
        id: '7-5',
        user: 'Verified Buyer from Florida',
        rating: 4,
        comment: 'Excellent for work calls and music. The microphone quality is surprisingly good.',
        date: 'Aug, 2024',
        location: 'Florida',
        value: 'Good buy',
        verified: true,
        images: [],
        videos: [],
      },
    ],
    qa: [
      {
        question: 'How long is the battery life?',
        answer: 'I get about 30 hours with noise cancellation on, and up to 40 hours with it off. Quick charge gives 3 hours in 3 minutes.',
        user: 'Verified Buyer from California',
        date: 'Dec, 2024',
      },
      {
        question: 'Are they comfortable for long flights?',
        answer: 'Yes, very comfortable! The ear cushions are soft and the headband doesn\'t create pressure points.',
        user: 'Verified Buyer from New York',
        date: 'Nov, 2024',
      },
      {
        question: 'Can you use them while charging?',
        answer: 'Yes, you can use them while charging via USB-C. The cable is included in the box.',
        user: 'Verified Buyer from Texas',
        date: 'Oct, 2024',
      },
    ],
  },
  '8': { // Dyson V15 Detect
    reviews: [
      {
        id: '8-1',
        user: 'Verified Buyer from California',
        rating: 5,
        comment: 'This vacuum is incredible! The laser dust detection is amazing and the suction power is unmatched.',
        date: 'Dec, 2024',
        location: 'California',
        value: 'Best in class',
        verified: true,
        images: ['https://images.unsplash.com/photo-1558618666-fbd14c5cd2cb?w=200'],
        videos: [],
      },
      {
        id: '8-2',
        user: 'Verified Buyer from Texas',
        rating: 4,
        comment: 'Great for pet hair and allergies. The HEPA filter works perfectly and the battery lasts long enough.',
        date: 'Nov, 2024',
        location: 'Texas',
        value: 'Value-for-money',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '8-3',
        user: 'Verified Buyer from New York',
        rating: 5,
        comment: 'Best cordless vacuum I\'ve used. The attachments are versatile and it\'s surprisingly lightweight.',
        date: 'Oct, 2024',
        location: 'New York',
        value: 'Highly recommended',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '8-4',
        user: 'Anonymous',
        rating: 3,
        comment: 'Good vacuum but expensive. The battery life could be longer for larger homes.',
        date: 'Sep, 2024',
        location: 'Unknown',
        value: 'Average',
        verified: false,
        images: [],
        videos: [],
      },
      {
        id: '8-5',
        user: 'Verified Buyer from Florida',
        rating: 4,
        comment: 'Excellent for hardwood floors and carpets. The laser feature really helps spot dust you\'d miss.',
        date: 'Aug, 2024',
        location: 'Florida',
        value: 'Good buy',
        verified: true,
        images: [],
        videos: [],
      },
    ],
    qa: [
      {
        question: 'How long does the battery last?',
        answer: 'I get about 60 minutes on eco mode, 30 minutes on auto mode, and 8 minutes on boost mode.',
        user: 'Verified Buyer from California',
        date: 'Dec, 2024',
      },
      {
        question: 'Is it good for pet hair?',
        answer: 'Excellent for pet hair! The motorized brush attachment and strong suction handle it perfectly.',
        user: 'Verified Buyer from Texas',
        date: 'Nov, 2024',
      },
      {
        question: 'Can it handle stairs?',
        answer: 'Yes, it\'s lightweight and the attachments make it easy to clean stairs and hard-to-reach areas.',
        user: 'Verified Buyer from New York',
        date: 'Oct, 2024',
      },
    ],
  },
  '9': { // The Seven Husbands of Evelyn Hugo
    reviews: [
      {
        id: '9-1',
        user: 'Verified Buyer from California',
        rating: 5,
        comment: 'Absolutely captivating! Taylor Jenkins Reid\'s writing is beautiful and the story is impossible to put down.',
        date: 'Dec, 2024',
        location: 'California',
        value: 'Best in class',
        verified: true,
        images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200'],
        videos: [],
      },
      {
        id: '9-2',
        user: 'Verified Buyer from New York',
        rating: 4,
        comment: 'Great historical fiction with complex characters. The Hollywood setting is fascinating and well-researched.',
        date: 'Nov, 2024',
        location: 'New York',
        value: 'Value-for-money',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '9-3',
        user: 'Verified Buyer from Texas',
        rating: 5,
        comment: 'One of the best books I\'ve read this year. The storytelling is masterful and the ending is perfect.',
        date: 'Oct, 2024',
        location: 'Texas',
        value: 'Highly recommended',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '9-4',
        user: 'Anonymous',
        rating: 3,
        comment: 'Good book but overhyped. The characters are interesting but the plot is predictable.',
        date: 'Sep, 2024',
        location: 'Unknown',
        value: 'Average',
        verified: false,
        images: [],
        videos: [],
      },
      {
        id: '9-5',
        user: 'Verified Buyer from Florida',
        rating: 4,
        comment: 'Beautifully written with compelling characters. Perfect for book clubs and discussion.',
        date: 'Aug, 2024',
        location: 'Florida',
        value: 'Good buy',
        verified: true,
        images: [],
        videos: [],
      },
    ],
    qa: [
      {
        question: 'Is this book appropriate for teens?',
        answer: 'It contains mature themes and some sexual content. I\'d recommend for 16+ readers.',
        user: 'Verified Buyer from California',
        date: 'Dec, 2024',
      },
      {
        question: 'How long is the book?',
        answer: 'It\'s about 400 pages and reads very quickly. The chapters are well-paced and engaging.',
        user: 'Verified Buyer from New York',
        date: 'Nov, 2024',
      },
      {
        question: 'Is it based on a true story?',
        answer: 'No, it\'s fiction but inspired by Old Hollywood. The author did extensive research on the era.',
        user: 'Verified Buyer from Texas',
        date: 'Oct, 2024',
      },
    ],
  },
  '10': { // Neutrogena Cleanser
    reviews: [
      {
        id: '10-1',
        user: 'Verified Buyer from California',
        rating: 5,
        comment: 'Perfect for my sensitive skin! Doesn\'t cause breakouts and leaves my face feeling clean and hydrated.',
        date: 'Dec, 2024',
        location: 'California',
        value: 'Best in class',
        verified: true,
        images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200'],
        videos: [],
      },
      {
        id: '10-2',
        user: 'Verified Buyer from Florida',
        rating: 4,
        comment: 'Great daily cleanser. Gentle but effective at removing makeup and dirt. Good value for money.',
        date: 'Nov, 2024',
        location: 'Florida',
        value: 'Value-for-money',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '10-3',
        user: 'Verified Buyer from Texas',
        rating: 5,
        comment: 'Excellent for combination skin. Doesn\'t strip my skin and the foaming action feels luxurious.',
        date: 'Oct, 2024',
        location: 'Texas',
        value: 'Highly recommended',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '10-4',
        user: 'Anonymous',
        rating: 3,
        comment: 'Good cleanser but the fragrance is too strong for my sensitive skin.',
        date: 'Sep, 2024',
        location: 'Unknown',
        value: 'Average',
        verified: false,
        images: [],
        videos: [],
      },
      {
        id: '10-5',
        user: 'Verified Buyer from New York',
        rating: 4,
        comment: 'Perfect for my morning routine. Removes overnight products and preps skin for makeup.',
        date: 'Aug, 2024',
        location: 'New York',
        value: 'Good buy',
        verified: true,
        images: [],
        videos: [],
      },
    ],
    qa: [
      {
        question: 'Is it good for acne-prone skin?',
        answer: 'Yes, it\'s gentle enough for acne-prone skin and doesn\'t contain harsh ingredients that could irritate.',
        user: 'Verified Buyer from California',
        date: 'Dec, 2024',
      },
      {
        question: 'Can it remove waterproof makeup?',
        answer: 'It removes most makeup well, but for waterproof mascara, you might need a separate makeup remover first.',
        user: 'Verified Buyer from Florida',
        date: 'Nov, 2024',
      },
      {
        question: 'Is it cruelty-free?',
        answer: 'Neutrogena is not certified cruelty-free. If that\'s important to you, consider alternatives like CeraVe or Cetaphil.',
        user: 'Verified Buyer from Texas',
        date: 'Oct, 2024',
      },
    ],
  },
  '11': { // Yoga Mat
    reviews: [
      {
        id: '11-1',
        user: 'Verified Buyer from California',
        rating: 5,
        comment: 'Perfect thickness for yoga! Provides excellent cushioning for joints and the non-slip surface is amazing.',
        date: 'Dec, 2024',
        location: 'California',
        value: 'Best in class',
        verified: true,
        images: ['https://images.unsplash.com/photo-1592432678016-e910f7a5d84d?w=200'],
        videos: [],
      },
      {
        id: '11-2',
        user: 'Verified Buyer from Florida',
        rating: 4,
        comment: 'Great quality mat for the price. The 6mm thickness is perfect for home practice and studio classes.',
        date: 'Nov, 2024',
        location: 'Florida',
        value: 'Value-for-money',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '11-3',
        user: 'Verified Buyer from Texas',
        rating: 5,
        comment: 'Excellent grip and durability. Perfect for both yoga and pilates. Easy to clean and maintain.',
        date: 'Oct, 2024',
        location: 'Texas',
        value: 'Highly recommended',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '11-4',
        user: 'Anonymous',
        rating: 3,
        comment: 'Good mat but takes a while to unroll and flatten. The thickness is nice though.',
        date: 'Sep, 2024',
        location: 'Unknown',
        value: 'Average',
        verified: false,
        images: [],
        videos: [],
      },
      {
        id: '11-5',
        user: 'Verified Buyer from New York',
        rating: 4,
        comment: 'Perfect for my home yoga practice. The extra thickness makes floor poses much more comfortable.',
        date: 'Aug, 2024',
        location: 'New York',
        value: 'Good buy',
        verified: true,
        images: [],
        videos: [],
      },
    ],
    qa: [
      {
        question: 'What\'s the best way to clean it?',
        answer: 'I use a mild soap and water solution, then let it air dry. Avoid harsh chemicals that could damage the material.',
        user: 'Verified Buyer from California',
        date: 'Dec, 2024',
      },
      {
        question: 'Is it good for hot yoga?',
        answer: 'Yes, it handles sweat well and the non-slip surface works great even when wet.',
        user: 'Verified Buyer from Florida',
        date: 'Nov, 2024',
      },
      {
        question: 'How long does it take to unroll?',
        answer: 'It takes about 24-48 hours to fully flatten after unrolling. You can speed it up by rolling it in the opposite direction.',
        user: 'Verified Buyer from Texas',
        date: 'Oct, 2024',
      },
    ],
  },
  '12': { // Instant Pot
    reviews: [
      {
        id: '12-1',
        user: 'Verified Buyer from California',
        rating: 5,
        comment: 'This Instant Pot is a game-changer! I can make tender meats, perfect rice, and delicious soups in minutes.',
        date: 'Dec, 2024',
        location: 'California',
        value: 'Best in class',
        verified: true,
        images: ['https://images.unsplash.com/photo-1556909114-8a4ec04e8e59?w=200'],
        videos: [],
      },
      {
        id: '12-2',
        user: 'Verified Buyer from Texas',
        rating: 4,
        comment: 'Great for meal prep! The 7-in-1 functions are versatile and the recipes are easy to follow.',
        date: 'Nov, 2024',
        location: 'Texas',
        value: 'Value-for-money',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '12-3',
        user: 'Verified Buyer from New York',
        rating: 5,
        comment: 'Perfect for busy families. I can cook frozen chicken in 20 minutes and it comes out perfectly tender.',
        date: 'Oct, 2024',
        location: 'New York',
        value: 'Highly recommended',
        verified: true,
        images: [],
        videos: [],
      },
      {
        id: '12-4',
        user: 'Anonymous',
        rating: 3,
        comment: 'Good appliance but the learning curve is steep. The manual could be more detailed.',
        date: 'Sep, 2024',
        location: 'Unknown',
        value: 'Average',
        verified: false,
        images: [],
        videos: [],
      },
      {
        id: '12-5',
        user: 'Verified Buyer from Florida',
        rating: 4,
        comment: 'Excellent for healthy cooking. I love making beans from scratch and the yogurt function is great.',
        date: 'Aug, 2024',
        location: 'Florida',
        value: 'Good buy',
        verified: true,
        images: [],
        videos: [],
      },
    ],
    qa: [
      {
        question: 'Is it safe to use?',
        answer: 'Yes, it has multiple safety features including pressure release valves and locking mechanisms. Much safer than old pressure cookers.',
        user: 'Verified Buyer from California',
        date: 'Dec, 2024',
      },
      {
        question: 'How long does it take to come to pressure?',
        answer: 'Usually 5-10 minutes depending on the amount of liquid and food. The display shows when it reaches pressure.',
        user: 'Verified Buyer from Texas',
        date: 'Nov, 2024',
      },
      {
        question: 'Can you cook frozen meat?',
        answer: 'Yes! One of the best features is cooking frozen meat. Just add 50% more cooking time.',
        user: 'Verified Buyer from New York',
        date: 'Oct, 2024',
      },
    ],
  },
};

// Helper function to get reviews and Q&A for a specific product
export const getProductReviewsQA = (productId: string) => {
  return productReviewsQA[productId] || {
    reviews: [],
    qa: [],
  };
}; 