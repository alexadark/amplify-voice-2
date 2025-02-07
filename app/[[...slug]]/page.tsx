import { StoryblokServerComponent, StoryblokStory } from '@storyblok/react/rsc';
import { fetchData } from '@/lib/actions';

const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === 'true';
export const dynamic = 'force-dynamic';

const Home = async ({ params }: { params: { slug?: string[] } }) => {
  const storyPath = !params.slug?.length ? 'home' : params.slug.join('/');

  try {
    const { data } = await fetchData(storyPath);
    const story = data?.story;

    if (!story) {
      throw new Error('Story not found');
    }

    if (isPreview) {
      return <StoryblokStory story={story} />;
    }

    return <StoryblokServerComponent blok={story.content} />;
  } catch (error) {
    console.error('Error loading page:', error);
    
    // Return a user-friendly error page
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            We're having trouble loading this page. Please try again in a few moments.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }
};

export default Home;
