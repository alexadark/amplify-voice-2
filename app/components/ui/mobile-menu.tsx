'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavItemStoryblok } from '@/types/component-types-sb';
import Link from 'next/link';
import { BorderButton } from './tailwindcss-buttons';

interface MobileMenuProps {
  nav: NavItemStoryblok[];
  cta: {
    label: string;
    link: {
      cached_url: string;
      target?: string;
    };
  };
}

export const MobileMenu = ({ nav, cta }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 top-[73px] bg-white dark:bg-black z-50 p-4">
          <nav className="flex flex-col gap-6">
            {nav?.map((item) => (
              <Link
                key={item._uid}
                href={item.link?.cached_url || '#'}
                className="text-lg font-medium hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {cta.label && (
              <div className="mt-4">
                <BorderButton
                  label={cta.label}
                  href={cta.link.cached_url}
                  external={cta.link.target === '_blank'}
                />
              </div>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};
