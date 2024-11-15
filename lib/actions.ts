'use server';

import { ISbStoriesParams, getStoryblokApi } from '@storyblok/react/rsc';

export async function fetchData(url: string) {
  const isPreview = process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true';

  const sbParams: ISbStoriesParams = {
    version: isPreview ? 'draft' : 'published',
    cv: new Date().getTime() / 1000,
  };

  const sbApi = getStoryblokApi();

  const response = await sbApi?.get(`cdn/stories/${url}`, sbParams, {
    next: {
      revalidate: isPreview ? 0 : 31536000,
    },
  });

  return response;
}
