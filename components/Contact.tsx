import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { ArrowUpRight, Mail, Linkedin, Phone } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Contact: React.FC = () => {
  const getIcon = (platform: string) => {
      if (platform.includes('LinkedIn')) return <Linkedin size={24} />;
      if (platform.includes('WhatsApp')) return <Phone size={24} />;
      return <Mail size={24} />;
  };

  return (
    <section id="contact" className="py-24 bg-dark rounded-t-[4rem] relative overflow-hidden mt-12">
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
                <ScrollReveal animation="animate-fade-up">
                  <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                    Let's <br/><span className="text-sage-300">Connect.</span>
                  </h2>
                </ScrollReveal>
                
                <ScrollReveal delay={200} animation="animate-fade-up">
                  <p className="text-gray-400 mb-12 text-lg max-w-md">
                    I'm currently available for freelance work and full-time contracts. If you have a project that needs serious engineering, let's talk.
                  </p>
                </ScrollReveal>
                
                <ScrollReveal delay={300} animation="animate-slide-in-right">
                  <a 
                      href="mailto:nasirdaud2015@gmail.com" 
                      className="inline-flex items-center gap-3 text-white border-b border-white/20 pb-2 hover:border-white transition-all text-xl font-bold"
                  >
                      nasirdaud2015@gmail.com <ArrowUpRight size={20}/>
                  </a>
                </ScrollReveal>
            </div>

            <div className="flex flex-col justify-center space-y-6">
                {SOCIAL_LINKS.map((link, index) => (
                    <ScrollReveal key={link.platform} delay={400 + (index * 100)} animation="animate-slide-in-left">
                      <a 
                          href={link.url}
                          className="group flex items-center justify-between p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white hover:border-white transition-all duration-300 hover:scale-[1.02]"
                      >
                          <div className="flex items-center gap-4 text-white group-hover:text-dark">
                              {getIcon(link.platform)}
                              <span className="text-xl font-bold">{link.platform}</span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-dark group-hover:text-white transition-colors">
                              <ArrowUpRight size={18} />
                          </div>
                      </a>
                    </ScrollReveal>
                ))}
            </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Dauda Nasir. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">San Francisco, CA</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;