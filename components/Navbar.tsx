import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Theme Toggle State
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 20 && !isScrolled) setIsScrolled(true);
        if (window.scrollY <= 20 && isScrolled) setIsScrolled(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#work' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
    <nav 
      className={`fixed z-50 transition-all duration-500 ease-out-expo ${
        isScrolled 
          ? 'top-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[90%] lg:w-[1200px] bg-white/80 dark:bg-dark/80 backdrop-blur-xl shadow-soft dark:shadow-none border border-white/60 dark:border-white/10 rounded-full py-3 px-2' 
          : 'top-0 left-0 right-0 py-6 bg-transparent'
      }`}
    >
      <div className={`w-full flex justify-between items-center ${isScrolled ? 'px-4' : 'container mx-auto px-6 md:px-12'}`}>
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group relative z-50">
           <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-lg transition-all duration-300 ${
               isScrolled ? 'bg-dark text-white dark:bg-white dark:text-dark' : 'bg-dark text-white dark:bg-white dark:text-dark'
           }`}>
             D
           </div>
           <span className={`text-lg font-bold tracking-tight transition-colors ${
               isScrolled ? 'text-dark dark:text-white' : 'text-dark dark:text-white'
           }`}>
               DAUDA NASIR
           </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          <div className={`flex items-center gap-1 px-1.5 py-1.5 rounded-full transition-all duration-500 ${
            isScrolled ? 'bg-gray-100/0 border border-transparent' : 'bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/40 dark:border-white/10'
          }`}>
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 ${
                    isScrolled 
                      ? 'text-gray-600 dark:text-gray-300 hover:text-dark dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10' 
                      : 'text-gray-800 dark:text-gray-200 hover:text-dark dark:hover:text-white hover:bg-white dark:hover:bg-black/20'
                  }`}
                >
                  {link.name}
                </a>
              ))}
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-3 pl-4">
             {/* Theme Toggle */}
             <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-white/10 text-dark dark:text-white transition-colors"
                aria-label="Toggle Dark Mode"
             >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
             </button>

             <a href="#contact" className="px-6 py-2.5 bg-dark dark:bg-white text-white dark:text-dark rounded-full text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 duration-300 flex items-center gap-2">
                <span>Let's Talk</span>
                <MessageSquare size={14} className="opacity-70" />
             </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3 relative z-50">
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-dark dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className="text-dark dark:text-white p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>
    </nav>

    {/* Mobile Menu Overlay */}
    <div className={`fixed inset-0 z-40 bg-white/95 dark:bg-dark/95 backdrop-blur-xl transition-all duration-500 ease-out-expo flex flex-col justify-center items-center space-y-8 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
    }`}>
        {navLinks.map((link, idx) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-3xl font-black text-dark dark:text-white hover:text-sage-500 transition-all duration-300 transform ${
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${100 + idx * 50}ms` }}
            >
              {link.name}
            </a>
        ))}
         <a 
            href="#contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`mt-8 px-8 py-4 bg-dark dark:bg-white text-white dark:text-dark rounded-full text-lg font-bold transition-all duration-300 transform ${
                 isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
         >
            Let's Talk
         </a>
    </div>
    </>
  );
};

export default Navbar;