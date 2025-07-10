import { FaCar, FaClock, FaDollarSign, FaHeadset, FaKey, FaLocationDot, FaUserTie } from "react-icons/fa6";
import BMW1 from './BMW1.png';
import BMW2 from './BMW2.png';
import BMW3 from './BMW3.png';
import jag1 from './jag1.png';
import jag2 from './jag2.png';
import jag3 from './jag3.png';
export interface Testimonial {
    name: string;
    image: string;
    text: string;
    rating: number;
}

export const AllCars = [
    // Original cars
    {
      id: 'jaguar-xe',
      name: 'Jaguar XE i-P250',
      images: [
        jag1,
        jag2,
        jag3
      ],
      rating: 4.8,
      type: 'Electric',
      location: 'San Francisco, CA',
      reviewCount: 2436,
      passengers: 4,
      transmission: 'Auto',
      airConditioning: true,
      doors: 4,
      price: 18,
      category: 'Sports',
      description:
        'Experience the future of driving with this Jaguar XE. Smooth performance, refined interior, and sporty handling.',
      features: [
        'Autopilot',
        'Panoramic Glass Roof',
        'Heated Seats',
        'Premium Sound System',
        'Supercharging',
        'White Interior',
      ],
      specs: {
        passengers: 5,
        luggage: 2,
        range: '315 miles',
        fuelType: 'Electric',
      },
      owner: {
        name: 'Michael Chen',
        joined: 'March 2023',
        responseRate: '98%',
        responseTime: '< 1 hour',
        image: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
      },
      availableDates: [
        { start: '2025-04-15', end: '2025-04-20' },
        { start: '2025-04-23', end: '2025-05-10' },
        { start: '2025-05-15', end: '2025-05-31' },
      ],
    },
    {
      id: 'audi-r8',
      name: 'Audi R8',
      images: [

      
       
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShqvK6BaXdWICC2YULbRdSJ8xxSki8tCnj0Q&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrMbpV5Ty1OWjv-MAwQ-FvEruvBhSDB3WbAg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScZJ9tSZCbY8c1UwYDrFpfie5f5rcyFPWzGQ&s',
       ],
      rating: 4.6,
      type: 'Sport',
      location: 'Los Angeles, CA',
      reviewCount: 1938,
      passengers: 2,
      category: 'Sports',
      transmission: 'Auto',
      airConditioning: true,
      doors: 2,
      price: 21,
      description:
        'The Audi R8 offers thrilling performance with a luxurious edge. V10 power meets everyday usability.',
      features: [
        'V10 Engine',
        'Leather Seats',
        'Bang & Olufsen Sound',
        'Virtual Cockpit',
        'LED Headlights',
        'Quattro AWD',
      ],
      specs: {
        passengers: 2,
        luggage: 1,
        range: '270 miles',
        fuelType: 'Gasoline',
      },
      owner: {
        name: 'Sophia Walker',
        joined: 'January 2024',
        responseRate: '95%',
        responseTime: '< 2 hours',
        image: 'https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg',
      },
      availableDates: [
        { start: '2025-05-01', end: '2025-05-07' },
        { start: '2025-06-10', end: '2025-06-20' },
      ],
    },
    {
      id: 'bmw-m3',
      name: 'BMW M3',
      images: [
        BMW1,
        BMW2,
        BMW3
        // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUpqSs5B83INtu2CgxtCcDYPpAiI1Orow1zA&s',
        // 'https://www.bmw.sr/content/dam/bmw/common/all-models/x-series/series-overview/bmw-x-series-overview-page-model-carousel-14.jpg',
      ],
      rating: 4.5,
      category: 'Sports',
      type: 'Sport',
      location: 'New York, NY',
      reviewCount: 2036,
      passengers: 4,
      transmission: 'Auto',
      airConditioning: true,
      doors: 4,
      price: 16,
      description:
        'A perfect balance of performance and practicality, the BMW M3 brings racetrack DNA to the street.',
      features: [
        'Twin-turbo Engine',
        'Harman Kardon Sound',
        'Carbon Roof',
        'Heads-Up Display',
        'Adaptive Suspension',
        'Red Leather Interior',
      ],
      specs: {
        passengers: 4,
        luggage: 2,
        range: '300 miles',
        fuelType: 'Gasoline',
      },
      owner: {
        name: 'Liam Smith',
        joined: 'August 2022',
        responseRate: '97%',
        responseTime: '< 1 hour',
        image: 'https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg',
      },
      availableDates: [
        { start: '2025-04-20', end: '2025-04-28' },
        { start: '2025-05-10', end: '2025-05-15' },
      ],
    },
    {
      id: 'lamborghini-huracan',
      name: 'Lamborghini Huracan',
      images: [
        'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/homepage/families-gallery/2023/revuelto/revuelto_m.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXGw9klyY-hQ4shFgg2k7Rf6jNhqfrQtgCfFjSyorxk3ln-8XzQHTLOcayWf6rdSFCKg&usqp=CAU',
        'https://www.largus.fr/images/styles/max_1300x1300/public/2023-03/lamborghini-revuelto-2023-orange-avd-mk_24.jpg?itok=m6XvQSTh',
      ],
      rating: 4.3,
      category: 'Sports',
      type: 'Supercar',
      location: 'Miami, FL',
      reviewCount: 2236,
      passengers: 2,
      transmission: 'Auto',
      airConditioning: true,
      doors: 2,
      price: 23,
      description:
        'An exotic masterpiece. Feel the roar of the V10 engine and live the supercar dream with this Huracan.',
      features: [
        'V10 Naturally Aspirated',
        'Carbon Ceramic Brakes',
        'Lamborghini Infotainment',
        'RWD Performance',
        'Sport Bucket Seats',
        'Aggressive Aero Kit',
      ],
      specs: {
        passengers: 2,
        luggage: 1,
        range: '240 miles',
        fuelType: 'Gasoline',
      },
      owner: {
        name: 'Carlos Diaz',
        joined: 'July 2023',
        responseRate: '92%',
        responseTime: 'within a day',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmCicxernIb5W2jIRbjKwiMOVIit_7XJtczA&s',
      },
      availableDates: [
        { start: '2025-04-10', end: '2025-04-17' },
        { start: '2025-05-05', end: '2025-05-12' },
      ],
    },
    
    // New cars
    {
      id: 'tesla-model-s',
      name: 'Tesla Model S Plaid',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBMGcHo19KgZ9Jxn7SH8p8W42ybwdH0v7Q5A&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmyxQbHklWBjvxeUi-02t3AbB00B1GpWeLpg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCCVKUTjDsBVwQFE7TQZQgBFXV_4CNhLfTLg&s',
      ],
      rating: 4.9,
      type: 'Electric',
      location: 'Austin, TX',
      reviewCount: 3256,
      passengers: 5,
      category: 'Luxury',
      transmission: 'Auto',
      airConditioning: true,
      doors: 4,
      price: 25,
      description:
        'The ultimate electric sedan. Model S Plaid offers mind-blowing acceleration and long-range capability.',
      features: [
        'Full Self-Driving Capability',
        'Yoke Steering',
        'Premium Audio',
        'Plaid Mode',
        'Gaming Computer',
        'Ultra White Interior',
      ],
      specs: {
        passengers: 5,
        luggage: 3,
        range: '390 miles',
        fuelType: 'Electric',
      },
      owner: {
        name: 'Jessica Thompson',
        joined: 'April 2023',
        responseRate: '99%',
        responseTime: '< 30 minutes',
        image: 'https://t4.ftcdn.net/jpg/02/85/40/45/360_F_285404577_nkV67dTzKLpHldYV0KIVsTj7lrbl0UYD.jpg',
      },
      availableDates: [
        { start: '2025-04-05', end: '2025-04-15' },
        { start: '2025-05-20', end: '2025-06-01' },
      ],
    },
    {
      id: 'mercedes-s-class',
      name: 'Mercedes-Benz S-Class',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK8ug3C0mdtRnEjKUNrRgrVGxkORNgxzQdmQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAWqI44UF7k6tCFKMfEwX0T4pTlXCJGC3Rhw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnuiDjg68sLYb76b-QsTN2cUkSRrGjJNSMEw&s',
      ],
      rating: 4.7,
      type: 'Sedan',
      location: 'Chicago, IL',
      reviewCount: 1876,
      passengers: 5,
      category: 'Luxury',
      transmission: 'Auto',
      airConditioning: true,
      doors: 4,
      price: 22,
      description:
        'The pinnacle of luxury. Experience first-class comfort and cutting-edge technology in the flagship Mercedes.',
      features: [
        'Augmented Reality Navigation',
        'Burmester 4D Surround Sound',
        'Rear Seat Entertainment',
        'Air Suspension',
        'Massage Seats',
        'Executive Rear Package',
      ],
      specs: {
        passengers: 5,
        luggage: 3,
        range: '380 miles',
        fuelType: 'Gasoline',
      },
      owner: {
        name: 'Robert Williams',
        joined: 'November 2022',
        responseRate: '96%',
        responseTime: '< 3 hours',
        image: 'https://t3.ftcdn.net/jpg/01/30/45/86/360_F_130458622_hW5XJOO0r2XRXTsz0iKVl1tTY2jOWp0Z.jpg',
      },
      availableDates: [
        { start: '2025-04-12', end: '2025-04-22' },
        { start: '2025-05-15', end: '2025-05-25' },
      ],
    },
    {
      id: 'porsche-911',
      name: 'Porsche 911 Carrera',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCm10NVyFnljm_JL73XXw54vxARGk86pnVTQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGODKCJZPL5J_UWhYnpGSGjJgxCkuHbLgh9w&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCfGGcg-2zZdpnaBQJeRxbDZ7aOCt_cJKRdw&s',
      ],
      rating: 4.8,
      type: 'Sport',
      location: 'Seattle, WA',
      reviewCount: 2154,
      passengers: 2,
      category: 'Sports',
      transmission: 'Auto',
      airConditioning: true,
      doors: 2,
      price: 24,
      description:
        'The iconic sports car with unmatched driving dynamics. Experience the legend that is the Porsche 911.',
      features: [
        'Flat-Six Engine',
        'Sport Chronograph',
        'PASM Sport Suspension',
        'Sport Exhaust System',
        'Porsche Communication Management',
        'Sport Design Package',
      ],
      specs: {
        passengers: 2,
        luggage: 2,
        range: '320 miles',
        fuelType: 'Gasoline',
      },
      owner: {
        name: 'David Harper',
        joined: 'May 2023',
        responseRate: '98%',
        responseTime: '< 1 hour',
        image: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
      },
      availableDates: [
        { start: '2025-04-18', end: '2025-04-25' },
        { start: '2025-05-10', end: '2025-05-20' },
      ],
    },
    {
      id: 'range-rover-sport',
      name: 'Range Rover Sport',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4vDHZ1r8zIRZXwWG9JoNFdc-mFiKaHrDvdA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKi0nPUC_7w03vsmQHlhpqVsNptFRfJzs-wQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ21Sk_u2-7k5zYxcTQEgyqHoKX9xJTM-2oSg&s',
      ],
      rating: 4.5,
      type: 'SUV',
      location: 'Denver, CO',
      reviewCount: 1834,
      passengers: 5,
      category: 'Luxury',
      transmission: 'Auto',
      airConditioning: true,
      doors: 5,
      price: 20,
      description:
        'Luxury meets capability. The Range Rover Sport combines premium comfort with genuine off-road prowess.',
      features: [
        'Adaptive Off-Road System',
        'Meridian Sound System',
        'Dynamic Response',
        'Terrain Response 2',
        'Head-Up Display',
        'Configurable Ambient Lighting',
      ],
      specs: {
        passengers: 5,
        luggage: 4,
        range: '350 miles',
        fuelType: 'Gasoline',
      },
      owner: {
        name: 'Emma Rodriguez',
        joined: 'February 2023',
        responseRate: '95%',
        responseTime: '< 2 hours',
        image: 'https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg',
      },
      availableDates: [
        { start: '2025-04-10', end: '2025-04-20' },
        { start: '2025-05-05', end: '2025-05-15' },
      ],
    },
    {
      id: 'chevrolet-corvette',
      name: 'Chevrolet Corvette C8',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNkC9HXJpFLRo5NLDjjd-1mFm3pEGc4a-MrA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2VLKyDpNbUZeNZNLXKCpBQiAt8ywzKTDPxw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQklTbCpCyG1bAU60JfQkG1cF0BdQ7VoQxlJw&s',
      ],
      rating: 4.7,
      type: 'Sport',
      location: 'Las Vegas, NV',
      reviewCount: 2056,
      passengers: 2,
      category: 'Sports',
      transmission: 'Auto',
      airConditioning: true,
      doors: 2,
      price: 19,
      description:
        'American performance redefined. The mid-engine Corvette delivers supercar performance at an accessible price.',
      features: [
        'V8 Engine',
        'Magnetic Ride Control',
        'Performance Data Recorder',
        'Bose Premium Audio',
        'Removable Roof Panel',
        'Z51 Performance Package',
      ],
      specs: {
        passengers: 2,
        luggage: 2,
        range: '290 miles',
        fuelType: 'Gasoline',
      },
      owner: {
        name: 'Tyler Johnson',
        joined: 'September 2023',
        responseRate: '94%',
        responseTime: '< 4 hours',
        image: 'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
      },
      availableDates: [
        { start: '2025-04-15', end: '2025-04-22' },
        { start: '2025-05-18', end: '2025-05-25' },
      ],
    },
    {
      id: 'toyota-rav4',
      name: 'Toyota RAV4 Hybrid',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3BpHJqoLp4GzQBt_wbXcz6fJFjDsmRvW0jQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxHnBQbGzV6CQeRxhLzgVaox86S3wECRoRaw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlqXGY5_HA6cTjfUPnkEZUqwGiGD-6xvfR3w&s',
      ],
      rating: 4.6,
      type: 'SUV',
      location: 'Portland, OR',
      reviewCount: 2876,
      passengers: 5,
      category: 'Everyday',
      transmission: 'Auto',
      airConditioning: true,
      doors: 5,
      price: 12,
      description:
        'The perfect all-rounder. Efficient hybrid technology in a versatile SUV package that goes anywhere.',
      features: [
        'Hybrid Powertrain',
        'Toyota Safety Sense',
        'All-Wheel Drive',
        'Apple CarPlay/Android Auto',
        'Panoramic Moonroof',
        'JBL Premium Audio',
      ],
      specs: {
        passengers: 5,
        luggage: 4,
        range: '580 miles',
        fuelType: 'Hybrid',
      },
      owner: {
        name: 'Sarah Miller',
        joined: 'October 2022',
        responseRate: '99%',
        responseTime: '< 1 hour',
        image: 'https://t3.ftcdn.net/jpg/02/43/85/26/360_F_243852621_5NAzQaUVkZXHUOOcH927JUzKCwuV8YlI.jpg',
      },
      availableDates: [
        { start: '2025-04-05', end: '2025-04-15' },
        { start: '2025-05-01', end: '2025-05-15' },
      ],
    },
    {
      id: 'ford-mustang',
      name: 'Ford Mustang GT',
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvqZAGzYdNq0_z6iR9khJtTiDHGQHwPmPaQw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI6fIj1HGMIi5VPVB1p7gE-SahU_J4uXYTkA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd4hQYdwNpPEwGCm_w3EB-2LkLzSBWEpxZlQ&s',
      ],
      rating: 4.4,
      type: 'Sport',
      location: 'Dallas, TX',
      reviewCount: 1658,
      passengers: 4,
      category: 'Sports',
      transmission: 'Manual',
      airConditioning: true,
      doors: 2,
      price: 15,
      description:
        'An American icon. Raw power and timeless styling make the Mustang GT a thrilling driving experience.',
      features: [
        'V8 Engine',
        'Performance Exhaust',
        'Track Apps',
        'Launch Control',
        'Recaro Sport Seats',
        'Digital Instrument Cluster',
      ],
      specs: {
        passengers: 4,
        luggage: 2,
        range: '300 miles',
        fuelType: 'Gasoline',
      },
      owner: {
        name: 'Jason Parker',
        joined: 'June 2023',
        responseRate: '92%',
        responseTime: '< 5 hours',
        image: 'https://t3.ftcdn.net/jpg/02/99/21/98/360_F_299219888_2E7GbJyosu5s9wFnrKoH7YJJ7zOPLVTs.jpg',
      },
      availableDates: [
        { start: '2025-04-12', end: '2025-04-19' },
        { start: '2025-05-22', end: '2025-05-29' },
      ],
    },
  
];

export 
const defaultSteps = [
  {
    icon: <FaLocationDot />,
    title: 'Choose Location',
    description: 'Select from our various pickup locations',
  },
  {
    icon: <FaKey />,
    title: 'Pick Your Car',
    description: 'Choose from our premium selection of vehicles',
  },
  {
    icon: <FaCar />,
    title: 'Enjoy Your Ride',
    description: 'Hit the road with our easy rental process',
  },
];

export const newSteps = [
  {
    icon: <FaDollarSign />,
    title: "Best price guaranteed",
    description: "Find a lower price? We’ll refund you 100% of the difference."
  },
  {
    icon: <FaUserTie />,
    title: "Experience driver",
    description: "Don’t have driver? Don’t worry, we have many experienced driver for you."
  },
  {
    icon: <FaClock />,
    title: "24 hour car delivery",
    description: "Book your car anytime and we will deliver it directly to you."
  },
  {
    icon: <FaHeadset />,
    title: "24/7 technical support",
    description: "Have a question? Contact Rentcars support any time when you have problem."
  }
];
export const peopleOpinions: Testimonial[] = [
    
    {
        name: "Yasmine El Mansouri",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmHMsP8hTelFnU7Ljvf9Bz3zCsIxcsZNG0DQ&s",
        text: "Service professionnel et rapide. La voiture était en parfait état. Je referai appel à eux sans hésitation.",
        rating: 5
    },
    {
        name: "Hamza Bennis",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        text: "Franchement top ! Le personnel est accueillant et les prix sont très compétitifs.",
        rating: 4
    },
    {
        name: "Fatima Zahra Idrissi",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShwIjMMGGKfEHrawR7b3xPPj1mCVe0UFwyjQ&s",
        text: "Très bonne expérience. Le site est facile à utiliser et le service client est réactif.",
        rating: 5
    },
    {
        name: "Ismail Ouahbi",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrAA9KmCtxPgYhzS7xx2i_YhcGrcHQT9OOYA&s",
        text: "J’ai loué une voiture pour le week-end à Marrakech et tout s’est passé à merveille.",
        rating: 4
    },
    {
        name: "Sara Bouziane",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB4B0zk_PsWp-_jBHRKp5SWFIQAauHcbbjOQ&s",
        text: "Rapport qualité/prix excellent. Je recommande à tous mes amis.",
        rating: 5
    },
    {
        name: "Omar Laaroussi",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaEdCojUkd4xAgtEtsBkfZEiujV8YVFb074dj3RCo2nHUftDs0QvW05aXzv6N2FMhjuuA&usqp=CAU",
        text: "Le processus était simple et rapide. Merci pour votre professionnalisme.",
        rating: 5
    },
    {
        name: "Lina El Fassi",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCzp59hdids48_k_sVXM0XXuRxuhKx14252nYflfLTvb62L5zNIBLWzKvCWCb0DfMifQc&usqp=CAU",
        text: "Très contente du service. La voiture était propre et bien entretenue.",
        rating: 4
    },
    {
        name: "Rachid Talbi",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-SvLyjveQcgS-KlrtxcyG4D6AuOxL-K1QPihBmenyz_9BMacV0UPRpu5b7bYYyAe5fl8&usqp=CAU",
        text: "Bon accueil, véhicule impeccable. Je recommande vivement cette agence.",
        rating: 5
    },
    {
        name: "Nadia Chaoui",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5aJP2lRxxMbP3BGlxpykwCm85kNLus9hUQ1_WdR9tUORsDKzDAMiEsZGw2DQvviSSXGQ&usqp=CAU",
        text: "Service rapide et efficace. Aucune mauvaise surprise. Bravo à l'équipe.",
        rating: 5
    }
];
