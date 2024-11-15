import { LogoCarouselStoryblok } from '@/types/component-types-sb';
import {
  StoryblokServerComponent,
  storyblokEditable,
} from '@storyblok/react/rsc';

interface LogoCarouselProps {
  blok: LogoCarouselStoryblok;
}

const LogoCarousel = ({ blok }: LogoCarouselProps) => {
  const logos = [...(blok.logos || []), ...(blok.logos || [])];

  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className="py-20 bg-black/10 backdrop-blur-sm"
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

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {logos.map((logo, index) => (
              <StoryblokServerComponent
                blok={logo}
                key={`${logo._uid}-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
