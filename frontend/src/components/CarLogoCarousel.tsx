import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiToyota,
  SiHonda,
  SiFord,
  SiChevrolet,
  SiNissan,
  SiHyundai,
  SiKia,
  SiSubaru,
  SiMazda,
  SiMitsubishi,
  SiVolkswagen,
  SiBmw,
  SiMercedes,
  SiAudi,
  SiPorsche,
  SiFerrari,
  SiLamborghini,
  SiMaserati,
  SiJaguar,
  SiLandrover
} from 'react-icons/si';

interface CarLogo {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const carLogos: CarLogo[] = [
  { id: '1', name: 'Toyota', icon: SiToyota, color: 'text-red-600' },
  { id: '2', name: 'Honda', icon: SiHonda, color: 'text-red-700' },
  { id: '3', name: 'Ford', icon: SiFord, color: 'text-blue-600' },
  { id: '4', name: 'Chevrolet', icon: SiChevrolet, color: 'text-yellow-500' },
  { id: '5', name: 'Nissan', icon: SiNissan, color: 'text-gray-800' },
  { id: '6', name: 'Hyundai', icon: SiHyundai, color: 'text-blue-700' },
  { id: '7', name: 'Kia', icon: SiKia, color: 'text-red-600' },
  { id: '8', name: 'Subaru', icon: SiSubaru, color: 'text-blue-800' },
  { id: '9', name: 'Mazda', icon: SiMazda, color: 'text-red-600' },
  { id: '10', name: 'Mitsubishi', icon: SiMitsubishi, color: 'text-red-700' },
  { id: '11', name: 'Volkswagen', icon: SiVolkswagen, color: 'text-blue-600' },
  { id: '12', name: 'BMW', icon: SiBmw, color: 'text-blue-600' },
  { id: '13', name: 'Mercedes', icon: SiMercedes, color: 'text-gray-700' },
  { id: '14', name: 'Audi', icon: SiAudi, color: 'text-red-600' },
  { id: '15', name: 'Porsche', icon: SiPorsche, color: 'text-black' },
  { id: '16', name: 'Ferrari', icon: SiFerrari, color: 'text-red-600' },
  { id: '17', name: 'Lamborghini', icon: SiLamborghini, color: 'text-yellow-500' },
  { id: '18', name: 'Maserati', icon: SiMaserati, color: 'text-blue-800' },
  { id: '19', name: 'Jaguar', icon: SiJaguar, color: 'text-green-700' },
  { id: '20', name: 'Land Rover', icon: SiLandrover, color: 'text-green-600' }
];

const CarLogoCarousel: React.FC = () => {
  // Duplicate the array to create seamless infinite scroll
  const duplicatedLogos = [...carLogos, ...carLogos];

  return (
    <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100 py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        
        
        <div className="relative">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-100 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-100 to-transparent z-10"></div>
          
          <motion.div
            className="flex space-x-12"
            animate={{
              x: [0, -50 * carLogos.length]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            style={{ width: `${100 * carLogos.length}px` }}
          >
            {duplicatedLogos.map((logo, index) => {
              const IconComponent = logo.icon;
              return (
                <motion.div
                  key={`${logo.id}-${index}`}
                  className="flex-shrink-0 flex flex-col items-center justify-center group cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow duration-300">
                    <IconComponent 
                      className={`text-6xl ${logo.color} group-hover:scale-110 transition-transform duration-300`} 
                    />
                  </div>
                  <span className="mt-3 text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                    {logo.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        
       
      </div>
    </div>
  );
};

export default CarLogoCarousel;