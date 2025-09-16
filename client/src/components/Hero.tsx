import { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, TrendingUp } from 'lucide-react';

export default function Hero() {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [impressions, setImpressions] = useState(0);
  const [roi, setRoi] = useState(0);
  const [clients, setClients] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, delay: number }>>([]);

  const fullText = 'Digital Marketing That ';
  const targetImpressions = 50;
  const targetRoi = 300;
  const targetClients = 500;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64;
      const targetPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Typewriter effect
  useEffect(() => {
    setIsVisible(true);
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Animated counters
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 fps
    const stepTime = duration / steps;

    const timers = [
      // Impressions counter
      setInterval(() => {
        setImpressions(prev => {
          const increment = targetImpressions / steps;
          return prev + increment >= targetImpressions ? targetImpressions : prev + increment;
        });
      }, stepTime),

      // ROI counter
      setInterval(() => {
        setRoi(prev => {
          const increment = targetRoi / steps;
          return prev + increment >= targetRoi ? targetRoi : prev + increment;
        });
      }, stepTime),

      // Clients counter
      setInterval(() => {
        setClients(prev => {
          const increment = targetClients / steps;
          return prev + increment >= targetClients ? targetClients : prev + increment;
        });
      }, stepTime),
    ];

    const cleanup = setTimeout(() => {
      timers.forEach(clearInterval);
    }, duration);

    return () => {
      timers.forEach(clearInterval);
      clearTimeout(cleanup);
    };
  }, []);

  // Generate floating particles (reduced for mobile performance)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 8 : 20; // Fewer particles on mobile for better performance
    
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-8 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 hero-glow"></div>
      
      {/* Floating Particles - hidden on reduced motion */}
      <div className="motion-safe:block motion-reduce:hidden">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animation: `float 6s ease-in-out infinite ${particle.delay}s, pulse 2s ease-in-out infinite ${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      
      <div className="mx-auto max-w-7xl text-center relative z-10 w-full">
        <div className="max-w-4xl mx-auto">
          {/* Hero Logo - Mobile optimized */}
          <div className={`mb-6 md:mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <img 
              src="/metrix-logo.png" 
              alt="Metrix Media Logo" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 object-contain mx-auto motion-safe:animate-pulse"
              loading="eager"
              data-testid="hero-logo"
            />
          </div>
          
          {/* Animated Title - Mobile-first responsive */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight" data-testid="hero-title">
              <span className="inline-block">
                {displayedText}
                <span className="motion-safe:animate-pulse">|</span>
              </span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              <span className="gradient-text inline-flex items-center gap-1 sm:gap-2">
                Drives Results
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 motion-safe:animate-spin text-primary" />
              </span>
            </h1>
          </div>

          {/* Animated Subtitle - Mobile optimized */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed" data-testid="hero-description">
              We create viral content, run data-driven campaigns, and build authentic connections that convert followers into customers.
            </p>
          </div>
          
          {/* Animated Stats - Mobile-first compact grid */}
          <div className={`mb-8 md:mb-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Mobile: Compact 3-column grid that fits on screen */}
            <div className="grid grid-cols-3 gap-2 px-2 md:hidden">
              <div className="text-center group active:scale-95 transition-transform duration-200" data-testid="stat-impressions">
                <div className="text-xl sm:text-2xl font-bold text-primary flex flex-col items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>{Math.floor(impressions)}M+</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1 leading-tight">Monthly<br />Impressions</div>
              </div>
              <div className="text-center group active:scale-95 transition-transform duration-200" data-testid="stat-roi">
                <div className="text-xl sm:text-2xl font-bold text-primary flex flex-col items-center gap-1">
                  <span className="text-base">📈</span>
                  <span>{Math.floor(roi)}%</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1 leading-tight">Average ROI<br />Increase</div>
              </div>
              <div className="text-center group active:scale-95 transition-transform duration-200" data-testid="stat-clients">
                <div className="text-xl sm:text-2xl font-bold text-primary flex flex-col items-center gap-1">
                  <span className="text-base">🎯</span>
                  <span>{Math.floor(clients)}+</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1 leading-tight">Happy<br />Clients</div>
              </div>
            </div>
            
            {/* Desktop: Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              <div className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer" data-testid="stat-impressions-desktop">
                <div className="text-4xl lg:text-5xl font-bold text-primary flex items-center justify-center gap-2">
                  <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8 motion-safe:group-hover:animate-bounce" />
                  {Math.floor(impressions)}M+
                </div>
                <div className="text-muted-foreground group-hover:text-foreground transition-colors">Monthly Impressions</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer" data-testid="stat-roi-desktop">
                <div className="text-4xl lg:text-5xl font-bold text-primary flex items-center justify-center gap-2">
                  <span className="text-2xl lg:text-3xl motion-safe:group-hover:animate-spin">📈</span>
                  {Math.floor(roi)}%
                </div>
                <div className="text-muted-foreground group-hover:text-foreground transition-colors">Average ROI Increase</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer" data-testid="stat-clients-desktop">
                <div className="text-4xl lg:text-5xl font-bold text-primary flex items-center justify-center gap-2">
                  <span className="text-2xl lg:text-3xl motion-safe:group-hover:animate-pulse">🎯</span>
                  {Math.floor(clients)}+
                </div>
                <div className="text-muted-foreground group-hover:text-foreground transition-colors">Happy Clients</div>
              </div>
            </div>
          </div>
          
          {/* Enhanced CTA Buttons - Mobile-first */}
          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="group relative bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-primary/90 transition-all duration-300 motion-safe:hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-primary/25 overflow-hidden min-h-[48px]"
              data-testid="button-start-campaign"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full motion-safe:group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative flex items-center justify-center gap-2">
                Start Your Campaign
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 motion-safe:group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('case-studies')} 
              className="group relative border border-border px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-accent transition-all duration-300 motion-safe:hover:scale-105 active:scale-95 hover:shadow-xl hover:border-primary/50 overflow-hidden min-h-[48px]"
              data-testid="button-view-work"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full motion-safe:group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative flex items-center justify-center gap-2">
                View Our Work
                <span className="text-sm motion-safe:group-hover:animate-bounce">🚀</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
