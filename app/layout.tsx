import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc';
import { COMPONENTS } from '@/components/bloks';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoryblokProvider from '@/components/bloks/StoryblokProvider';

const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === 'true';

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components: COMPONENTS,
  apiOptions: {
    region: 'eu',
  },
});

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Amplify Voice',
  description:
    'Enhance customer relationships with AI Voice Agents that deliver natural, tailored conversations. Ideal for businesses and non-profits aiming to scale outreach and improve customer satisfaction effortlessly',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark antialiased font-sans dark:bg-black dark:text-white`}
      >
        <Header />
        {isPreview ? (
          <StoryblokProvider>{children}</StoryblokProvider>
        ) : (
          children
        )}
        <Footer />
      </body>
    </html>
  );
}
