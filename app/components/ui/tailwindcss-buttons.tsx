import React from 'react';
import Link from 'next/link';

interface BorderButtonProps {
  label: string;
  href?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit';
  variant?: 'default' | 'primary';
}

export const BorderButton = ({
  label,
  href,
  external = false,
  onClick,
  type = 'button',
  variant = 'default',
}: BorderButtonProps) => {
  const ButtonContent = () => (
    <div className="p-[3px] relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"></div>
      <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent flex items-center justify-center text-lg font-bold">
        {label}
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button type={type} onClick={onClick}>
        <ButtonContent />
      </button>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <ButtonContent />
      </a>
    );
  }

  return href ? (
    <Link href={href}>
      <ButtonContent />
    </Link>
  ) : (
    <button type={type}>
      <ButtonContent />
    </button>
  );
};
