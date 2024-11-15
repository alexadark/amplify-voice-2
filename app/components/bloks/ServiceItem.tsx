import { ServiceItemStoryblok } from '@/types/component-types-sb';
import { storyblokEditable } from '@storyblok/react/rsc';
import Link from 'next/link';

interface ServiceItemProps {
  blok: ServiceItemStoryblok;
}

const ServiceItem = ({ blok }: ServiceItemProps) => {
  return (
    <div {...storyblokEditable(blok)} key={blok._uid}>
      <Link
        href={blok.link?.cached_url || '#'}
        className="relative group block p-2 h-full w-full"
      >
        <div className="relative z-50">
          <div className="p-4 text-center">
            <h3 className="text-pink-500 font-bold tracking-wide mt-4">
              {blok.title}
            </h3>
            <p className="mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm">
              {blok.description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ServiceItem;
