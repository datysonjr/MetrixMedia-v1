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
          {/* Logo */}
          <div className="flex items-center space-x-4" data-testid="logo-metrix-media">
            <img 
              src="/metrix-logo.png" 
              alt="Metrix Media Logo" 
              className="w-14 h-14 object-contain"
            />
            <span className="text-2xl font-bold text-foreground">Metrix Media</span>
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
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`fixed top-16 right-0 w-64 h-screen bg-card border-l border-border md:hidden transition-transform duration-300 ${
        isMobileMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'
      }`}>
        <nav className="p-6 space-y-4">
          <button 
            onClick={() => scrollToSection('home')} 
            className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
            data-testid="mobile-nav-home"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
            data-testid="mobile-nav-about"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
            data-testid="mobile-nav-services"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('case-studies')} 
            className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
            data-testid="mobile-nav-case-studies"
          >
            Case Studies
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
            data-testid="mobile-nav-contact"
          >
            Contact
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="block w-full bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium text-center mt-6 hover:bg-primary/90 transition-colors"
            data-testid="mobile-button-get-started"
          >
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
}
