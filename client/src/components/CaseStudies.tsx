import HorizontalScroller from "./HorizontalScroller";

export default function CaseStudies() {
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

  const caseStudies = [
    {
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      alt: "E-commerce brand campaign results",
      category: "E-commerce",
      date: "Q4 2023",
      title: "Fashion Brand Revival",
      description: "Transformed a struggling fashion brand with viral TikTok content and targeted Instagram ads.",
      metrics: [
        { value: "400%", label: "Revenue Increase" },
        { value: "2.5M", label: "Video Views" }
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      alt: "SaaS platform growth campaign",
      category: "SaaS",
      date: "Q3 2023",
      title: "SaaS User Acquisition",
      description: "Scaled a B2B SaaS platform from 1K to 50K users through LinkedIn advertising and content marketing.",
      metrics: [
        { value: "4900%", label: "User Growth" },
        { value: "$120K", label: "MRR Added" }
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      alt: "Restaurant chain marketing campaign",
      category: "Restaurant",
      date: "Q2 2023",
      title: "Restaurant Chain Expansion",
      description: "Helped a regional restaurant chain go viral on social media and expand to 5 new locations.",
      metrics: [
        { value: "250%", label: "Foot Traffic" },
        { value: "1.8M", label: "Social Reach" }
      ]
    }
  ];

  return (
    <section id="case-studies" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="case-studies-title">Case Studies</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="case-studies-description">
            Real results from real campaigns. See how we've helped brands grow their audience and increase conversions.
          </p>
        </div>
        
        {/* Mobile horizontal scroll, Desktop grid */}
        <HorizontalScroller
          itemWidth="19rem"
          className="md:hidden"
          ariaLabel="Case studies showcase"
          testId="case-studies-scroller"
        >
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-card rounded-2xl overflow-hidden border border-border card-hover h-full flex flex-col" data-testid={`case-study-card-${index}`}>
              <img 
                src={study.image} 
                alt={study.alt} 
                className="w-full h-40 object-cover"
                loading="lazy"
                decoding="async"
                data-testid={`case-study-image-${index}`}
              />
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium" data-testid={`case-study-category-${index}`}>
                    {study.category}
                  </span>
                  <span className="text-xs text-muted-foreground" data-testid={`case-study-date-${index}`}>
                    {study.date}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 leading-tight" data-testid={`case-study-title-${index}`}>{study.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed flex-1" data-testid={`case-study-description-${index}`}>
                  {study.description}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {study.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center" data-testid={`case-study-metric-${index}-${metricIndex}`}>
                      <div className="text-xl font-bold text-primary">{metric.value}</div>
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>
                <button className="text-primary font-medium hover:underline text-sm" data-testid={`case-study-link-${index}`}>
                  Read Full Story →
                </button>
              </div>
            </div>
          ))}
        </HorizontalScroller>
        
        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-card rounded-2xl overflow-hidden border border-border card-hover" data-testid={`case-study-card-desktop-${index}`}>
              <img 
                src={study.image} 
                alt={study.alt} 
                className="w-full h-48 object-cover"
                loading="lazy"
                decoding="async"
                data-testid={`case-study-image-desktop-${index}`}
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium" data-testid={`case-study-category-desktop-${index}`}>
                    {study.category}
                  </span>
                  <span className="text-sm text-muted-foreground" data-testid={`case-study-date-desktop-${index}`}>
                    {study.date}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3" data-testid={`case-study-title-desktop-${index}`}>{study.title}</h3>
                <p className="text-muted-foreground mb-4" data-testid={`case-study-description-desktop-${index}`}>
                  {study.description}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {study.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center" data-testid={`case-study-metric-desktop-${index}-${metricIndex}`}>
                      <div className="text-2xl font-bold text-primary">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>
                <button className="text-primary font-medium hover:underline" data-testid={`case-study-link-desktop-${index}`}>
                  Read Full Story →
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Coming Soon Cases */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6" data-testid="coming-soon-text">More case studies coming soon!</p>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            data-testid="button-next-success-story"
          >
            Become Our Next Success Story
          </button>
        </div>
      </div>
    </section>
  );
}
