// app/lib/getProfessionals.js

export async function getProfessionals({ category, subCategory }) {
  // 🧠 For now, we'll use mock data — later you can replace this with a real API call.
  // Example categories: Vehicle repair, Healthcare, Carpenter, Electrician, etc.

  const allProfessionals = [
    {
      id: 1,
      name: 'Rahul Sharma',
      category: 'Vehicle repair',
      subCategory: 'Fixed Service Charge',
      image: '/professionals/mechanic1.jpg',
      skill: 'Bike & Car Mechanic',
      rating: 4.7,
      reviews: 142,
      price: 250,
      description: 'Expert in two-wheeler and car maintenance with 5+ years of experience.'
    },
    {
      id: 2,
      name: 'Priya Verma',
      category: 'Healthcare',
      subCategory: 'Book a Consultant',
      image: '/professionals/health1.jpg',
      skill: 'Physiotherapist',
      rating: 4.9,
      reviews: 98,
      price: 500,
      description: 'Certified physiotherapist specializing in sports recovery and pain management.'
    },
    {
      id: 3,
      name: 'Amit Patel',
      category: 'Electrician',
      subCategory: 'Book by Hour',
      image: '/professionals/electrician1.jpg',
      skill: 'Home & Office Electrician',
      rating: 4.6,
      reviews: 85,
      price: 300,
      description: 'Handles electrical repairs, installations, and wiring safely and quickly.'
    },
    {
      id: 4,
      name: 'Suresh Gupta',
      category: 'Carpenter',
      subCategory: 'Book by Hour',
      image: '/professionals/carpenter1.jpg',
      skill: 'Furniture & Wood Work',
      rating: 4.8,
      reviews: 66,
      price: 350,
      description: 'Experienced carpenter for repairs, custom furniture, and installations.'
    },
    {
      id: 5,
      name: 'Nisha Mehta',
      category: 'Appliance repair',
      subCategory: 'Fixed Service Charge',
      image: '/professionals/appliance1.jpg',
      skill: 'AC & Refrigerator Expert',
      rating: 4.5,
      reviews: 110,
      price: 400,
      description: 'Specialized in home appliance repair and maintenance services.'
    },
    {
      id: 6,
      name: 'Ravi Singh',
      category: 'Home Cleaning',
      subCategory: 'Book by Hour',
      image: '/professionals/cleaning1.jpg',
      skill: 'Home & Office Cleaning',
      rating: 4.9,
      reviews: 200,
      price: 150,
      description: 'Professional cleaning service for homes, offices, and events.'
    },
  ]

  // 🎯 Filter based on category and subcategory
  const filtered = allProfessionals.filter(
    (pro) =>
      pro.category === category &&
      (subCategory === 'All' || !subCategory || pro.subCategory === subCategory)
  )

  // Simulate API delay
  await new Promise((res) => setTimeout(res, 500))

  return { items: filtered }
}
