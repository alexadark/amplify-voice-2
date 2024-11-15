import { LogoItemStoryblok } from '@/types/component-types-sb';
import { storyblokEditable } from '@storyblok/react/rsc';
import Image from 'next/image';

interface LogoItemProps {
  blok: LogoItemStoryblok;
}

const LogoItem = ({ blok }: LogoItemProps) => {
  if (!blok.logo?.filename) return null;

  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className="flex-shrink-0 mx-8 w-32 h-20  flex items-center justify-center"
    >
      <Image
        src={blok.logo.filename}
        alt={blok.logo.alt || 'Logo'}
        width={200}
        height={100}
        className="w-auto h-full object-contain transition-all duration-300"
      />
    </div>
  );
};

export default LogoItem;
