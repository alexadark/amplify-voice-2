import { storyblokEditable, renderRichText } from '@storyblok/react/rsc';
import { HowWeWorkCardStoryblok } from '@/types/component-types-sb';
import { Meteors } from '../ui/meteors';
import Image from 'next/image';

const HowWeWorkCard = ({ blok }: { blok: HowWeWorkCardStoryblok }) => {
  return (
    <div {...storyblokEditable(blok)} className="w-full relative">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-full blur-3xl" />
      <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-6 py-8 h-full overflow-hidden rounded-2xl flex flex-col items-start min-h-[320px]">
        {blok.icon?.filename && (
          <div className="h-12 w-12 rounded-full border flex items-center justify-center mb-6 border-gray-500 bg-gray-900/50 backdrop-blur-sm">
            <Image
              src={blok.icon.filename}
              alt={blok.icon.alt || ''}
              width={160}
              height={160}
              className="text-gray-300"
            />
          </div>
        )}

        <h3 className="font-bold text-2xl  mb-4 relative z-50 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
          {blok.title}
        </h3>

        <div className="font-normal text-base text-slate-500 mb-4 relative z-50 prose prose-invert [&_b]:text-indigo-200">
          {blok.description && (
            <div
              dangerouslySetInnerHTML={{
                __html: renderRichText(blok.description),
              }}
            />
          )}
        </div>

        <Meteors number={20} />
      </div>
    </div>
  );
};

export default HowWeWorkCard;
