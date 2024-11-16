'use client';

export const Copyright = ({ siteName }: { siteName: string }) => {
  const year = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <div className="text-sm text-gray-600 dark:text-gray-400">
      © {year} {siteName || 'Amplify Voice'}. All rights reserved.
    </div>
  );
};
