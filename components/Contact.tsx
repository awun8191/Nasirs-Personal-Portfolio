import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { ArrowUpRight, Mail, Linkedin } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Contact: React.FC = () => {
  const getIcon = (platform: string) => {
    if (platform.includes('LinkedIn')) return <Linkedin size={24} />;
    if (platform.includes('WhatsApp')) return <WhatsAppIcon />;
    return <Mail size={24} />;
  };

  return (
    <section id="contact" className="py-24 bg-dark rounded-t-2xl relative overflow-hidden mt-12">

      <div className="container mx-auto px-6 max-w-5xl relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <ScrollReveal animation="animate-fade-up">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                Let's <br /><span className="text-sage-300">Connect.</span>
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
                className="inline-flex items-center gap-3 text-white border-b border-white/20 pb-2 hover:border-white transition-colors text-xl font-bold"
              >
                nasirdaud2015@gmail.com <ArrowUpRight size={20} />
              </a>
            </ScrollReveal>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            {SOCIAL_LINKS.map((link, index) => (
              <ScrollReveal key={link.platform} delay={400 + (index * 100)} animation="animate-slide-in-left">
                <a
                  href={link.url}
                  className="group flex items-center justify-between p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white hover:border-white transition-colors duration-300 hover:scale-[1.02] active:scale-[0.98]"
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

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 font-medium">
          <p>&copy; {new Date().getFullYear()} Dauda Nasir. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">Lagos, Nigeria</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;