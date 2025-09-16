import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Mobile optimized */}
          <div className="flex items-center space-x-2 sm:space-x-4" data-testid="logo-metrix-media">
            <img 
              src="/metrix-logo.png" 
              alt="Metrix Media Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
              loading="eager"
            />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">Metrix Media</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-services"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('case-studies')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-case-studies"
            >
              Case Studies
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </button>
          </nav>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              data-testid="button-get-started"
            >
              Get Started
            </button>
          </div>
          
          {/* Mobile Menu Button - Enhanced for touch */}
          <button 
            className="md:hidden p-3 -mr-3 text-muted-foreground hover:text-foreground focus:text-foreground transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center active:scale-95 rounded-md" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu - Enhanced UX with backdrop */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" 
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <div className="fixed top-16 right-0 w-72 h-[calc(100vh-4rem)] bg-background/95 backdrop-blur-md border-l border-border md:hidden transition-transform duration-300 z-50 shadow-xl">
            <nav className="p-6 space-y-1 overflow-y-auto h-full" role="navigation" aria-label="Mobile navigation">
              <button 
                onClick={() => scrollToSection('home')} 
                className="block w-full text-left text-lg text-muted-foreground hover:text-foreground focus:text-foreground transition-colors py-3 px-3 rounded-md hover:bg-accent/50 active:scale-[0.98] min-h-[48px]"
                data-testid="mobile-nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="block w-full text-left text-lg text-muted-foreground hover:text-foreground focus:text-foreground transition-colors py-3 px-3 rounded-md hover:bg-accent/50 active:scale-[0.98] min-h-[48px]"
                data-testid="mobile-nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="block w-full text-left text-lg text-muted-foreground hover:text-foreground focus:text-foreground transition-colors py-3 px-3 rounded-md hover:bg-accent/50 active:scale-[0.98] min-h-[48px]"
                data-testid="mobile-nav-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('case-studies')} 
                className="block w-full text-left text-lg text-muted-foreground hover:text-foreground focus:text-foreground transition-colors py-3 px-3 rounded-md hover:bg-accent/50 active:scale-[0.98] min-h-[48px]"
                data-testid="mobile-nav-case-studies"
              >
                Case Studies
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="block w-full text-left text-lg text-muted-foreground hover:text-foreground focus:text-foreground transition-colors py-3 px-3 rounded-md hover:bg-accent/50 active:scale-[0.98] min-h-[48px]"
                data-testid="mobile-nav-contact"
              >
                Contact
              </button>
              <div className="pt-6">
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="block w-full bg-primary text-primary-foreground px-6 py-4 rounded-lg font-semibold text-lg text-center hover:bg-primary/90 focus:bg-primary/90 transition-colors active:scale-[0.98] min-h-[52px]"
                  data-testid="mobile-button-get-started"
                >
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
