import { fetchData } from '@/lib/actions';
import { SocialItemStoryblok } from '@/types/component-types-sb';
import Image from 'next/image';
import Link from 'next/link';
import { Copyright } from './copyright';

export const Footer = async () => {
  try {
    const { data } = (await fetchData('config')) || {};
    const { logo, site_name, social_items } = data?.story?.content || {};

    if (!data?.story?.content) {
      return null;
    }

    return (
      <footer className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 md:py-12">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                {logo?.filename && (
                  <Link href="/">
                    <Image
                      src={logo.filename}
                      alt={site_name || 'Logo'}
                      width={200}
                      height={50}
                      className="h-14 w-auto animate-pulse-slower"
                    />
                  </Link>
                )}
              </div>
              <Copyright siteName={site_name} />

              <div className="flex items-center space-x-6">
                {social_items?.map((social: SocialItemStoryblok) => {
                  if (!social?._uid || !social?.icon?.filename) return null;

                  return (
                    <a
                      key={social._uid}
                      href={social.url?.cached_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                      aria-label={social.name}
                    >
                      <Image
                        src={social.icon.filename}
                        alt={social.name || ''}
                        width={20}
                        height={20}
                        className="h-5 w-5"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Error in Footer:', error);
    return null;
  }
};

export default Footer;
