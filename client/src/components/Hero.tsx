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

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 hero-glow"></div>
      
      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animation: `float 6s ease-in-out infinite ${particle.delay}s, pulse 2s ease-in-out infinite ${particle.delay}s`
          }}
        />
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Animated Title */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-8" data-testid="hero-title">
              <span className="inline-block">
                {displayedText}
                <span className="animate-pulse">|</span>
              </span>
              <br />
              <span className="gradient-text inline-flex items-center gap-2">
                Drives Results
                <Sparkles className="w-8 h-8 md:w-12 md:h-12 animate-spin text-primary" />
              </span>
            </h1>
          </div>

          {/* Animated Subtitle */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed" data-testid="hero-description">
              We create viral content, run data-driven campaigns, and build authentic connections that convert followers into customers.
            </p>
          </div>
          
          {/* Animated Stats */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer" data-testid="stat-impressions">
              <div className="text-4xl md:text-5xl font-bold text-primary flex items-center justify-center gap-2">
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 group-hover:animate-bounce" />
                {Math.floor(impressions)}M+
              </div>
              <div className="text-muted-foreground group-hover:text-foreground transition-colors">Monthly Impressions</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer" data-testid="stat-roi">
              <div className="text-4xl md:text-5xl font-bold text-primary flex items-center justify-center gap-2">
                <span className="text-2xl md:text-3xl group-hover:animate-spin">📈</span>
                {Math.floor(roi)}%
              </div>
              <div className="text-muted-foreground group-hover:text-foreground transition-colors">Average ROI Increase</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer" data-testid="stat-clients">
              <div className="text-4xl md:text-5xl font-bold text-primary flex items-center justify-center gap-2">
                <span className="text-2xl md:text-3xl group-hover:animate-pulse">🎯</span>
                {Math.floor(clients)}+
              </div>
              <div className="text-muted-foreground group-hover:text-foreground transition-colors">Happy Clients</div>
            </div>
          </div>
          
          {/* Enhanced CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="group relative bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25 overflow-hidden"
              data-testid="button-start-campaign"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative flex items-center gap-2">
                Start Your Campaign
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('case-studies')} 
              className="group relative border border-border px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-primary/50 overflow-hidden"
              data-testid="button-view-work"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative flex items-center gap-2">
                View Our Work
                <span className="text-sm group-hover:animate-bounce">🚀</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
