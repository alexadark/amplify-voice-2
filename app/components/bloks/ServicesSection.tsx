import { ServicesSectionStoryblok } from '@/types/component-types-sb';
import { storyblokEditable } from '@storyblok/react/rsc';
import { HoverEffect } from '../ui/card-hover-effect';

interface ServicesSectionProps {
  blok: ServicesSectionStoryblok;
}

const ServicesSection = ({ blok }: ServicesSectionProps) => {
  // Transform services into the format expected by HoverEffect
  const services =
    blok.services?.map((service) => ({
      title: service.title || '',
      description: service.description || '',
      link: service.link?.cached_url || `#${service._uid}`,
      label: service.label || 'Learn More',
    })) || [];

  return (
    <section
      {...storyblokEditable(blok)}
      key={blok._uid}
      className="py-20 bg-zinc-950"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Title and Description */}
        {(blok.title || blok.description) && (
          <div className="text-center mb-12">
            {blok.title && (
              <h2 className="text-5xl font-bold mb-4">{blok.title}</h2>
            )}
            {blok.description && (
              <p className="text-lg text-gray-400">{blok.description}</p>
            )}
          </div>
        )}

        {/* Services Grid using HoverEffect */}
        <HoverEffect items={services} />
      </div>
    </section>
  );
};

export default ServicesSection;
