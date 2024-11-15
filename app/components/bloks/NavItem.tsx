import { storyblokEditable } from '@storyblok/react/rsc';
import Link from 'next/link';
import type { NavItemStoryblok } from '@/types/component-types-sb';

const NavItem = ({ blok }: { blok: NavItemStoryblok }) => {
  return (
    <Link
      {...storyblokEditable(blok)}
      key={blok._uid}
      href={blok?.link?.cached_url || ''}
      className="text-gray-600 hover:text-gray-900 transition-colors"
    >
      {blok?.label}
    </Link>
  );
};

export default NavItem;
