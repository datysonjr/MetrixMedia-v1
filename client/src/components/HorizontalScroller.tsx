import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalScrollerProps {
  children: React.ReactNode;
  itemWidth?: string;
  className?: string;
  showControls?: boolean;
  showDots?: boolean;
  ariaLabel?: string;
  testId?: string;
}

export default function HorizontalScroller({ 
  children, 
  itemWidth = '18rem',
  className = '',
  showControls = true,
  showDots = true,
  ariaLabel = 'Horizontal scrollable content',
  testId = 'horizontal-scroller'
}: HorizontalScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const updateScrollState = useCallback(() => {
    if (!containerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const maxScrollLeft = scrollWidth - clientWidth;
    
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < maxScrollLeft - 5);
    
    // Calculate current index based on scroll position
    const itemWidthNum = parseFloat(itemWidth) * 16; // Convert rem to pixels
    const newIndex = Math.round(scrollLeft / itemWidthNum);
    setCurrentIndex(newIndex);
  }, [itemWidth]);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    
    const itemWidthNum = parseFloat(itemWidth) * 16; // Convert rem to pixels
    const scrollLeft = index * itemWidthNum;
    
    containerRef.current.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  };

  const scrollLeft = () => {
    if (!containerRef.current) return;
    
    const scrollAmount = containerRef.current.clientWidth * 0.8;
    containerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    if (!containerRef.current) return;
    
    const scrollAmount = containerRef.current.clientWidth * 0.8;
    containerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Count total items
    const itemCount = container.children.length;
    setTotalItems(itemCount);

    updateScrollState();
    
    const handleScroll = () => {
      requestAnimationFrame(updateScrollState);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target !== container && !container.contains(e.target as Node)) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollLeft();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollRight();
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [updateScrollState]);

  return (
    <div className={`relative ${className}`}>
      {/* Screen reader instructions */}
      <div className="sr-only">
        Swipe horizontally or use arrow keys to navigate through items
      </div>
      
      <div
        ref={containerRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 px-4 
                   [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                   overscroll-x-contain focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                   md:grid md:gap-8 md:overflow-x-visible md:px-0 md:snap-none md:scroll-px-0"
        data-testid={testId}
      >
        {Array.isArray(children) ? 
          children.map((child, index) => (
            <div 
              key={index}
              className={`flex-shrink-0 snap-start md:flex-shrink`}
              style={{ width: `min(${itemWidth}, calc(100vw - 2rem))` }}
              data-testid={`${testId}-item-${index}`}
            >
              {child}
            </div>
          )) : 
          <div 
            className={`flex-shrink-0 snap-start md:flex-shrink`}
            style={{ width: `min(${itemWidth}, calc(100vw - 2rem))` }}
            data-testid={`${testId}-item-0`}
          >
            {children}
          </div>
        }
      </div>

      {/* Navigation controls - only on mobile */}
      {showControls && (
        <div className="md:hidden">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 
                       bg-background/90 backdrop-blur-sm border border-border 
                       rounded-full p-2 shadow-md transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            data-testid={`${testId}-button-left`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 
                       bg-background/90 backdrop-blur-sm border border-border 
                       rounded-full p-2 shadow-md transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            data-testid={`${testId}-button-right`}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Dot indicators - only on mobile */}
      {showDots && totalItems > 1 && (
        <div className="flex justify-center mt-6 space-x-2 md:hidden">
          {Array.from({ length: totalItems }, (_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-primary w-6' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              data-testid={`${testId}-dot-${index}`}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}