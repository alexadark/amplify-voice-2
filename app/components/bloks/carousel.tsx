import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';
import { Carousel as AppleCarousel } from '@/components/ui/apple-cards-carousel';
import { CarouselStoryblok } from '@/types/component-types-sb';

const Carousel = ({ blok }: { blok: CarouselStoryblok }) => {
  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      {(blok.title || blok.description) && (
        <div className="text-center mb-10 max-w-3xl mx-auto px-4">
          {blok.title && (
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {blok.title}
            </h2>
          )}
          {blok.description && (
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {blok.description}
            </p>
          )}
        </div>
      )}
      <AppleCarousel
        items={
          blok.items?.map((nestedBlok, index) => (
            <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
          )) || []
        }
      />
    </div>
  );
};

export default Carousel;
