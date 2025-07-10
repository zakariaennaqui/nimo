import React, { useEffect, useRef } from 'react';

// Import brands logos
// Note: In your actual project, replace these with your real imports or image paths
const carBrands = [
  { name: 'Mercedes-Benz', logo: '/logos/mercedes.svg', alt: 'Mercedes-Benz logo' },
  { name: 'BMW', logo: '/logos/bmw.svg', alt: 'BMW logo' },
  { name: 'Audi', logo: '/logos/audi.svg', alt: 'Audi logo' },
  { name: 'Toyota', logo: '/logos/toyota.svg', alt: 'Toyota logo' },
  { name: 'Ford', logo: '/logos/ford.svg', alt: 'Ford logo' },
  { name: 'Volkswagen', logo: '/logos/volkswagen.svg', alt: 'Volkswagen logo' },
  { name: 'Porsche', logo: '/logos/porsche.svg', alt: 'Porsche logo' },
  { name: 'Nissan', logo: '/logos/nissan.svg', alt: 'Nissan logo' },
  { name: 'Honda', logo: '/logos/honda.svg', alt: 'Honda logo' },
  { name: 'Hyundai', logo: '/logos/hyundai.svg', alt: 'Hyundai logo' }
];

interface BrandCarouselProps {
  title?: string;
  subtitle?: string;
  scrollSpeed?: number; // seconds per complete scroll
  className?: string;
}

const BrandCarousel: React.FC<BrandCarouselProps> = ({
  title = "Our Partners",
  subtitle = "We work with the world's leading car manufacturers",
  scrollSpeed = 20,
  className = ""
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect - continuous without pause on hover
  useEffect(() => {
    if (!carouselRef.current) return;
    
    const carousel = carouselRef.current;
    let animationId: number;
    let previousTimestamp: number;
    
    const scroll = (timestamp: number) => {
      if (!previousTimestamp) previousTimestamp = timestamp;
      
      const elapsed = timestamp - previousTimestamp;
      const scrollAmount = (elapsed / (scrollSpeed * 1000)) * carousel.scrollWidth;
      
      // Update scroll position
      carousel.scrollLeft = (carousel.scrollLeft + scrollAmount) % (carousel.scrollWidth / 2);
      
      // If we've scrolled to half (since we duplicated the items), loop back to start
      if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
        carousel.scrollLeft = 0;
      }
      
      previousTimestamp = timestamp;
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    
    return () => cancelAnimationFrame(animationId);
  }, [scrollSpeed]);

  // Clone the brands array to create a seamless loop effect
  const displayBrands = [...carBrands, ...carBrands];

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && (
            <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
        
        {/* Brand Carousel */}
        <div className="relative overflow-hidden mx-auto max-w-6xl">
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          
          <div 
            ref={carouselRef}
            className="flex space-x-12 py-8 overflow-x-auto whitespace-nowrap scroll-smooth"
            style={{ 
              scrollBehavior: 'smooth',
              msOverflowStyle: 'none',  /* IE and Edge */
              scrollbarWidth: 'none',   /* Firefox */
            }}
          >
            {/* CSS to hide scrollbar for Webkit browsers (Chrome, Safari) */}
         
            
            {displayBrands.map((brand, index) => (
              <div 
                key={`${brand.name}-${index}`}
                className="flex flex-col items-center justify-center min-w-[140px] transition-all duration-300 hover:scale-110"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center p-4 shadow-sm hover:shadow-md transition-shadow">
                  {/* In real implementation, use actual logos */}
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">{brand.name.substring(0, 1)}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm font-medium text-gray-700">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;