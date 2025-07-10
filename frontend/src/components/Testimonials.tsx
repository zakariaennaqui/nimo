import React, { useEffect, useState } from 'react'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { peopleOpinions, Testimonial } from '../assets/constants';

// Define the interface for testimonial data

// Define props interface for the TestimonialCard component
interface TestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    return (
        <motion.div
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 min-w-[300px] max-w-[350px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center gap-4">
                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-500" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="relative">
                <FaQuoteLeft className="text-blue-100 text-4xl absolute -top-2 -left-2" />
                <p className="text-gray-700 relative z-10 pl-4">{testimonial.text}</p>
            </div>
        </motion.div>
    )
}

const Testimonials: React.FC = () => {
    const [duplicatedTestimonials, setDuplicatedTestimonials] = useState<Testimonial[]>([])

    useEffect(() => {
        // Duplicate the testimonials to create an infinite effect
        setDuplicatedTestimonials([...peopleOpinions, ...peopleOpinions, ...peopleOpinions])
    }, [])

    return (
        <div className='flex flex-col items-center justify-center gap-12 py-10 bg-gray-50'>
            <div className="flex flex-col items-center gap-2 text-center px-4">
                <h2 className="bg-blue-100 rounded-lg w-fit text-2xl py-2 px-4 uppercase text-blue-600 font-medium">
                    What People Are Saying
                </h2>
                <p className="text-gray-600 text-lg">
                    Hear from our happy customers and their experience with our service.
                </p>
            </div>


            {/* Infinite carousel */}
            <div className="w-full overflow-hidden relative">
                <motion.div
                    className="flex gap-6 px-10"
                    animate={{
                        x: [0, -1500],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {duplicatedTestimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </motion.div>
            </div>


        </div>
    )
}

export default Testimonials