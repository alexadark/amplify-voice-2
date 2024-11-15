import { StoryblokServerComponent, StoryblokStory } from '@storyblok/react/rsc';
import { fetchData } from '@/lib/actions';

const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === 'true';
export const dynamic = 'force-dynamic';

const Home = async ({ params }: { params: { slug?: string[] } }) => {
  const storyPath = !params.slug?.length ? 'home' : params.slug.join('/');

  const { data } = await fetchData(storyPath);
  const story = data?.story;

  if (!story) {
    return <div>404</div>;
  }

  if (isPreview) {
    return <StoryblokStory story={story} />;
  }

  return <StoryblokServerComponent blok={story.content} />;
};

export default Home;
