import { ArrowLeft, ExternalLink, Instagram, Youtube, Globe, TrendingUp, Users, Eye, Award } from "lucide-react";
import { useLocation } from "wouter";

export default function PFCCaseStudy() {
  const [, setLocation] = useLocation();

  const scrollToSection = (sectionId: string) => {
    setLocation('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 64;
        const targetPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <div className="bg-background text-foreground antialiased min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => setLocation('/')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="back-button"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
            <div className="flex items-center space-x-2">
              <img 
                src="/metrix-logo.png" 
                alt="Metrix Media Logo" 
                className="w-8 h-8 object-contain"
                loading="eager"
              />
              <span className="text-lg font-bold text-foreground">Metrix Media</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                Sports & Entertainment
              </span>
              <span className="ml-4 text-muted-foreground">2022-2025</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="case-study-title">
              Pillow Fight Championship
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              From Zero to ESPN: How Metrix Media Built the World's First Professional Pillow Fighting League
            </p>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center" data-testid="metric-followers">
                <div className="text-3xl font-bold text-primary">651K+</div>
                <div className="text-muted-foreground">Total Followers</div>
              </div>
              <div className="text-center" data-testid="metric-views">
                <div className="text-3xl font-bold text-primary">50M+</div>
                <div className="text-muted-foreground">Video Views</div>
              </div>
              <div className="text-center" data-testid="metric-sponsors">
                <div className="text-3xl font-bold text-primary">10+</div>
                <div className="text-muted-foreground">Major Sponsors</div>
              </div>
              <div className="text-center" data-testid="metric-media">
                <div className="text-3xl font-bold text-primary">ESPN</div>
                <div className="text-muted-foreground">TV Coverage</div>
              </div>
            </div>

            {/* External Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a 
                href="https://fightpfc.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                data-testid="pfc-website"
              >
                <Globe className="w-4 h-4" />
                Visit PFC Website
              </a>
              <a 
                href="https://instagram.com/fightpfc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                data-testid="pfc-instagram"
              >
                <Instagram className="w-4 h-4" />
                @fightpfc
              </a>
              <a 
                href="https://youtube.com/fightpfc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                data-testid="pfc-youtube"
              >
                <Youtube className="w-4 h-4" />
                YouTube Channel
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="mb-12 rounded-2xl overflow-hidden">
            <img 
              src="@assets/image_1758146789699.png" 
              alt="Professional PFC pillow fighting action shot showing two competitors in the ring" 
              className="w-full h-64 md:h-96 object-cover"
              loading="lazy"
              data-testid="case-study-hero-image"
            />
          </div>

          {/* Story Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              In early 2022, Pillow Fight Championship approached Metrix Media with an ambitious but seemingly impossible goal: take a quirky concept of professional pillow fighting and transform it into a legitimate, mainstream entertainment brand that could attract sponsors, media coverage, and millions of viewers worldwide.
            </p>

            <h2 className="text-2xl font-bold mb-4">The Strategy</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Our team developed a comprehensive digital marketing strategy focused on viral content creation, strategic social media growth, and brand legitimization:
            </p>
            
            <div className="bg-muted/30 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Phase 1: Content & Community Building
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Created viral-ready content showcasing the athleticism and entertainment value</li>
                <li>• Developed consistent brand messaging around "professional pillow fighting"</li>
                <li>• Built engaged communities across TikTok, Instagram, and YouTube</li>
                <li>• Leveraged trending hashtags and platform-specific content strategies</li>
              </ul>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Phase 2: Audience Expansion & Engagement
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Grew Instagram following from 0 to 246K+ engaged followers</li>
                <li>• Built TikTok presence to 405.4K followers with viral video content</li>
                <li>• Established YouTube channel with 14K subscribers and millions of views</li>
                <li>• Created cross-platform content strategy for maximum reach</li>
              </ul>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Phase 3: Legitimization & Monetization
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Secured major brand partnerships with Manscaped, Harris Pillow, and others</li>
                <li>• Achieved ESPN coverage and mainstream media recognition</li>
                <li>• Generated features in Forbes, international media outlets</li>
                <li>• Established PFC as "The World's ONLY Professional Pillow Fighting League"</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold mb-4">The Results</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The campaign exceeded all expectations, transforming PFC from a startup concept into a globally recognized entertainment brand with legitimate sports credibility.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-primary/5 rounded-xl p-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Social Media Growth
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Instagram</span>
                    <span className="font-bold">246K followers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">TikTok</span>
                    <span className="font-bold">405.4K followers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">YouTube</span>
                    <span className="font-bold">14K subscribers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Views</span>
                    <span className="font-bold">50M+</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Media & Partnerships
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ESPN Coverage</span>
                    <span className="font-bold">✓ Achieved</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Forbes Feature</span>
                    <span className="font-bold">✓ Achieved</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Major Sponsors</span>
                    <span className="font-bold">10+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">International Coverage</span>
                    <span className="font-bold">✓ Achieved</span>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The Pillow Fight Championship case study demonstrates how creative content strategy, consistent execution, and strategic brand positioning can transform even the most unconventional concepts into mainstream entertainment properties. By focusing on the athletic and entertaining aspects while maintaining professional presentation, we successfully bridged the gap between novelty and legitimacy.
            </p>

            <div className="bg-primary/10 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold mb-3">What Made This Campaign Successful:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Authentic storytelling</strong> that emphasized real athleticism and competition</li>
                <li>• <strong>Platform-specific content</strong> optimized for each social media channel</li>
                <li>• <strong>Consistent brand messaging</strong> positioning PFC as a legitimate sport</li>
                <li>• <strong>Strategic partnerships</strong> with relevant brands and media outlets</li>
                <li>• <strong>Community building</strong> that engaged fans and created viral moments</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center pt-12 border-t border-border">
            <h2 className="text-2xl font-bold mb-4">Ready to Build Your Brand?</h2>
            <p className="text-muted-foreground mb-6">
              See how Metrix Media can take your brand from zero to mainstream success.
            </p>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              data-testid="cta-contact"
            >
              Start Your Success Story
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Metrix Media. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}