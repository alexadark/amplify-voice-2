import { storyblokEditable, renderRichText } from '@storyblok/react/rsc';
import { Card } from '@/components/ui/apple-cards-carousel';
import { CarouselItemStoryblok } from '@/types/component-types-sb';

const CarouselItem = ({ blok }: { blok: CarouselItemStoryblok }) => {
  // Parse the rich text content to plain text for the card description
  const plainTextDescription = blok.description
    ? renderRichText(blok.description).replace(/<[^>]*>/g, '')
    : '';

  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      <Card
        card={{
          src: blok.image?.filename || '',
          title: blok.title || '',
          category: blok.category || '',
          description: plainTextDescription,
          content: (
            <div
              className="prose dark:prose-invert"
              dangerouslySetInnerHTML={{
                __html: blok.description
                  ? renderRichText(blok.description)
                  : '',
              }}
            />
          ),
        }}
        index={0}
      />
    </div>
  );
};

export default CarouselItem;
