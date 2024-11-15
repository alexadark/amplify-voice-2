import { HeroStoryblok } from '@/types/component-types-sb';
import { WavyBackground } from '../ui/wavy-background';
import Image from 'next/image';
import { BorderButton } from '../ui/tailwindcss-buttons';
import { Glob, Orb, Visualizer } from '@/components/vapi';
import { storyblokEditable } from '@storyblok/react/rsc';

interface HeroProps {
  blok: HeroStoryblok;
}

const Hero = ({ blok }: HeroProps) => {
  const hasVisual = blok.image || blok.vapi_block;

  const renderVapiComponent = () => {
    // if (typeof window !== 'undefined' && window.innerWidth < 768) {
    //   return (
    //     <div className="w-[200px] h-[200px] flex items-center justify-center">
    //       <Orb />
    //     </div>
    //   );
    // }

    switch (blok.vapi_block) {
      case 'glob':
        return (
          <div className="w-[600px] h-[600px] flex items-center justify-center">
            <Glob />
          </div>
        );
      case 'orb':
        return (
          <div className=" flex items-center justify-center">
            <Orb />
          </div>
        );
      case 'visualizer':
        return <Visualizer />;
      default:
        return null;
    }
  };

  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      className="relative w-full"
    >
      {/* Background waves */}
      <div className="absolute inset-0 z-0">
        <WavyBackground className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div
            className={`flex ${
              hasVisual
                ? 'flex-col md:flex-row items-center justify-between gap-12'
                : 'flex-col items-center text-center'
            }`}
          >
            {/* Text Content */}
            <div
              className={`flex flex-col gap-6 ${
                hasVisual ? 'md:w-1/2' : 'max-w-3xl'
              }`}
            >
              {blok.title && (
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  {blok.title}
                </h1>
              )}
              {blok.description && (
                <div className="backdrop-blur-sm bg-black/10 dark:bg-white/10 rounded-lg p-6">
                  <p className="text-lg md:text-xl text-black dark:text-white">
                    {blok.description}
                  </p>
                </div>
              )}
              {blok.link?.cached_url && (
                <div className="mt-4">
                  <BorderButton
                    label="Get Started"
                    href={blok.link.cached_url}
                    external={blok.link.target === '_blank'}
                  />
                </div>
              )}
            </div>

            {/* Visual Element */}
            {hasVisual && (
              <div className="md:w-1/2 flex justify-center items-center">
                {blok.image?.filename ? (
                  <Image
                    src={blok.image.filename}
                    alt={blok.image.alt || 'Hero image'}
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover rounded-lg"
                    priority
                  />
                ) : blok.vapi_block ? (
                  renderVapiComponent()
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
