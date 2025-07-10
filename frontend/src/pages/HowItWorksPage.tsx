// pages/HowItWorksPage.tsx
import React from 'react';
import { FaSearch, FaCreditCard, FaCar, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface StepCardProps {
  icon: React.ReactNode;
  step: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon, step, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <div className="text-blue-500 text-4xl mb-4">{icon}</div>
      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mb-3">
        {step}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      icon: <FaSearch />,
      step: 1,
      title: "Search for a Car",
      description: "Browse our extensive collection of vehicles and find the perfect car that suits your needs and budget."
    },
    {
      icon: <FaCreditCard />,
      step: 2,
      title: "Make a Reservation",
      description: "Select your pickup and return dates, choose your preferred location, and complete the booking with secure payment."
    },
    {
      icon: <FaCar />,
      step: 3,
      title: "Get Your Car",
      description: "Collect your car from the designated location or opt for our convenient 24-hour delivery service right to your doorstep."
    },
    {
      icon: <FaCheckCircle />,
      step: 4,
      title: "Enjoy Your Journey",
      description: "Hit the road with confidence, knowing you have 24/7 technical support and comprehensive insurance coverage."
    }
  ];

  const faqs = [
    {
      question: "What documents do I need to rent a car?",
      answer: "You'll need a valid driver's license, a credit card in your name, and a valid ID or passport. For international rentals, an International Driving Permit may be required."
    },
    {
      question: "Is there a security deposit required?",
      answer: "Yes, a security deposit is required when renting a car. The amount varies depending on the vehicle category and will be refunded after the car is returned without damages."
    },
    {
      question: "Can I modify or cancel my reservation?",
      answer: "Yes, you can modify or cancel your reservation up to 24 hours before the scheduled pickup time without any cancellation fees."
    },
    {
      question: "Is insurance included in the rental price?",
      answer: "Basic insurance is included in the rental price. Additional coverage options are available for purchase during the booking process."
    },
    {
      question: "What happens if I return the car late?",
      answer: "Late returns will incur additional charges. The hourly rate applies for the first few hours, after which a full day rate may be charged."
    },
    {
      question: "Do you offer one-way rentals?",
      answer: "Yes, we offer one-way rentals between many of our locations. Additional fees may apply depending on the distance between pickup and drop-off locations."
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">How It Works</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Renting a car with Rentcars is simple and hassle-free. Follow these easy steps to get on the road quickly and safely.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {steps.map((step, index) => (
          <StepCard
            key={index}
            icon={step.icon}
            step={step.step}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
      
 

<div className="bg-blue-50 rounded-lg p-8 mb-16">
  <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {faqs.map((faq, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
        <p className="text-gray-600">{faq.answer}</p>
      </div>
    ))}
  </div>
</div>

<div className="text-center mb-12">
  <h2 className="text-2xl font-bold mb-4">Ready to Hit the Road?</h2>
  <p className="text-gray-600 max-w-2xl mx-auto mb-6">
    Experience the freedom of the open road with our premium rental fleet. Book your perfect car today.
  </p>
<Link to='/rental-deals'>
<button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition">
    Find Your Car Now
  </button></Link>
</div>
</div>
  )};
export default HowItWorksPage;