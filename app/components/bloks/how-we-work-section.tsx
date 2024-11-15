import {
  storyblokEditable,
  StoryblokServerComponent,
} from '@storyblok/react/rsc';
import { HowWeWorkSectionStoryblok } from '@/types/component-types-sb';

export default function HowWeWorkSection({
  blok,
}: {
  blok: HowWeWorkSectionStoryblok;
}) {
  return (
    <section
      {...storyblokEditable(blok)}
      className="container mx-auto px-4 py-20"
    >
      <div className="text-center mb-16">
        {blok.title && (
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{blok.title}</h2>
        )}
        {blok.description && (
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {blok.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blok.items?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </section>
  );
}
