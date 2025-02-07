'use server';

import { ISbStoriesParams, getStoryblokApi } from '@storyblok/react/rsc';

export async function fetchData(url: string) {
  const isPreview = process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true';

  const sbParams: ISbStoriesParams = {
    version: isPreview ? 'draft' : 'published',
    cv: new Date().getTime() / 1000,
  };

  const sbApi = getStoryblokApi();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await sbApi?.get(`cdn/stories/${url}`, sbParams, {
      next: {
        revalidate: isPreview ? 0 : 3600, // Reduced to 1 hour instead of 1 year
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout: The Storyblok API request took too long to respond');
    }
    console.error('Error fetching from Storyblok:', error);
    throw error;
  }
}
