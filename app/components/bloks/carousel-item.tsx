import { storyblokEditable, renderRichText } from '@storyblok/react/rsc';
import { Card } from '@/components/ui/apple-cards-carousel';
import { CarouselItemStoryblok } from '@/types/component-types-sb';

const CarouselItem = ({ blok }: { blok: CarouselItemStoryblok }) => {
  // Parse the rich text content for the card description
  const formattedDescription = blok.description
    ? renderRichText(blok.description)
    : '';

  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      <Card
        card={{
          src: `${blok.image?.filename}/m/384x640` || '',
          title: blok.title || '',
          category: blok.category || '',
          description: (
            <div
              className="text-white"
              dangerouslySetInnerHTML={{ __html: formattedDescription }}
            />
          ),
          content: (
            <div
              className="text-white [&_p]:text-white [&_strong]:text-white [&_ul]:text-white [&_li]:text-white [&_span]:text-white [&_li]:relative [&_li]:pl-4 before:[&_li]:content-['•'] before:[&_li]:absolute before:[&_li]:left-0 before:[&_li]:text-white"
              dangerouslySetInnerHTML={{
                __html: formattedDescription,
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
