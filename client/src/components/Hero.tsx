export default function Hero() {
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

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 hero-glow"></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8" data-testid="hero-title">
            Digital Marketing That{" "}
            <span className="gradient-text">Drives Results</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed" data-testid="hero-description">
            We create viral content, run data-driven campaigns, and build authentic connections that convert followers into customers.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center" data-testid="stat-impressions">
              <div className="text-4xl md:text-5xl font-bold text-primary">50M+</div>
              <div className="text-muted-foreground">Monthly Impressions</div>
            </div>
            <div className="text-center" data-testid="stat-roi">
              <div className="text-4xl md:text-5xl font-bold text-primary">300%</div>
              <div className="text-muted-foreground">Average ROI Increase</div>
            </div>
            <div className="text-center" data-testid="stat-clients">
              <div className="text-4xl md:text-5xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
              data-testid="button-start-campaign"
            >
              Start Your Campaign
            </button>
            <button 
              onClick={() => scrollToSection('case-studies')} 
              className="border border-border px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent transition-colors"
              data-testid="button-view-work"
            >
              View Our Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
