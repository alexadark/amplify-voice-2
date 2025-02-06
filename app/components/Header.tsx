import Image from 'next/image';
import Link from 'next/link';
import { StoryblokServerComponent } from '@storyblok/react/rsc';
import { NavItemStoryblok } from '@/types/component-types-sb';
import { fetchData } from '@/lib/actions';
import { BorderButton } from '@/components/ui/tailwindcss-buttons';
import dynamic from 'next/dynamic';

const Header = async () => {
  const { data } = (await fetchData('config')) || {};
  const { logo, header_nav, cta_label, cta_link, site_name } =
    data?.story?.content || {};

  if (!data) return null;
  const MobileMenu = dynamic(() =>
    import('@/app/components/ui/mobile-menu').then((mod) => mod.MobileMenu)
  );

  return (
    <header className="flex items-center justify-between px-4 py-5 max-w-7xl mx-auto relative z-50">
      <Link href="/" className="flex items-center">
        {logo && (
          <Image
            src={logo.filename}
            alt={site_name || 'Logo'}
            width={200}
            height={50}
            className="h-14 w-auto animate-pulse-slower"
            priority
          />
        )}
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        <nav className="flex items-center gap-8">
          {header_nav?.map((blok: NavItemStoryblok) => (
            <StoryblokServerComponent key={blok._uid} blok={blok} />
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {cta_label && cta_link?.cached_url && (
            <BorderButton
              label={cta_label}
              href={cta_link.cached_url}
              external={true}
            />
          )}
          <BorderButton
            label="Book a Demo"
            href="https://calendly.com/amplifyvoiceai/demo-call"
            variant="primary"
            external={true}
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center gap-4">
        {/* <ThemeToggle /> */}
        {header_nav && cta_label && cta_link && (
          <MobileMenu
            nav={header_nav}
            cta={{
              label: cta_label,
              link: cta_link,
            }}
            secondaryCta={{
              label: "Book a Demo",
              link: {
                cached_url: "https://calendly.com/amplifyvoiceai/demo-call"
              }
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
