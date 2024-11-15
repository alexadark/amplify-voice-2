import { storyblokEditable } from '@storyblok/react/rsc';

const Page = ({ blok }) => (
  <main {...storyblokEditable(blok)}>
    <h1>{blok.title}</h1>
  </main>
);

export default Page;
