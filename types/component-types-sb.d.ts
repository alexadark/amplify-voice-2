import {StoryblokStory} from 'storyblok-generate-ts'

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface AllPostsStoryblok {
  headline?: string;
  intro?: RichtextStoryblok;
  _uid: string;
  component: "all-posts";
  [k: string]: any;
}

export interface AllProjectsStoryblok {
  headline?: string;
  intro?: RichtextStoryblok;
  _uid: string;
  component: "all-projects";
  [k: string]: any;
}

export interface AssetStoryblok {
  _uid?: string;
  id: number;
  alt?: string;
  name: string;
  focus?: string;
  source?: string;
  title?: string;
  filename: string;
  copyright?: string;
  fieldtype?: string;
  meta_data?: null | {
    [k: string]: any;
  };
  is_external_url?: boolean;
  [k: string]: any;
}

export interface AuthorStoryblok {
  avatar?: AssetStoryblok;
  bio?: RichtextStoryblok;
  twitter?: string;
  seo?: SeoStoryblok[];
  _uid: string;
  component: "author";
  [k: string]: any;
}

export interface CarouselStoryblok {
  title?: string;
  description?: string;
  items?: CarouselItemStoryblok[];
  _uid: string;
  component: "carousel";
  [k: string]: any;
}

export interface CarouselItemStoryblok {
  title?: string;
  description?: RichtextStoryblok;
  image?: AssetStoryblok;
  _uid: string;
  component: "carousel-item";
  [k: string]: any;
}

export interface CategoryStoryblok {
  seo?: SeoStoryblok[];
  headline?: string;
  image?: AssetStoryblok;
  description?: string;
  _uid: string;
  component: "category";
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      target?: "_self" | "_blank";
      [k: string]: any;
    };

export interface ConfigStoryblok {
  robots_txt_content?: string;
  site_url?: string;
  google_analytics_code?: string;
  google_tag_manager?: string;
  default_post_image?: AssetStoryblok;
  posts_per_page?: string;
  header_nav?: NavItemStoryblok[];
  social_items?: SocialItemStoryblok[];
  footer_text?: RichtextStoryblok;
  logo?: AssetStoryblok;
  title?: string;
  cta_label?: string;
  cta_link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "config";
  [k: string]: any;
}

export interface ContentStoryblok {
  text?: RichtextStoryblok;
  _uid: string;
  component: "content";
  [k: string]: any;
}

export interface HeroStoryblok {
  title?: string;
  description?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  image?: AssetStoryblok;
  vapi_block?: "" | "glob" | "orb" | "visualizer";
  _uid: string;
  component: "hero";
  [k: string]: any;
}

export interface HowWeWorkCardStoryblok {
  title?: string;
  icon?: AssetStoryblok;
  description?: RichtextStoryblok;
  _uid: string;
  component: "how-we-work-card";
  [k: string]: any;
}

export interface HowWeWorkSectionStoryblok {
  title?: string;
  description?: string;
  items?: HowWeWorkCardStoryblok[];
  _uid: string;
  component: "how-we-work-section";
  [k: string]: any;
}

export interface LastPostsStoryblok {
  headline?: string;
  number_of_posts?: string;
  _uid: string;
  component: "last-posts";
  [k: string]: any;
}

export interface LogoCarouselStoryblok {
  title?: string;
  description?: string;
  logos?: LogoItemStoryblok[];
  _uid: string;
  component: "logo-carousel";
  [k: string]: any;
}

export interface LogoItemStoryblok {
  logo?: AssetStoryblok;
  _uid: string;
  component: "logo-item";
  [k: string]: any;
}

export interface NavItemStoryblok {
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  label?: string;
  is_submenu?: boolean;
  sub_menu?: NavItemStoryblok[];
  _uid: string;
  component: "nav-item";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (
    | AllPostsStoryblok
    | AllProjectsStoryblok
    | AuthorStoryblok
    | CarouselStoryblok
    | CarouselItemStoryblok
    | CategoryStoryblok
    | ConfigStoryblok
    | ContentStoryblok
    | HeroStoryblok
    | HowWeWorkCardStoryblok
    | HowWeWorkSectionStoryblok
    | LastPostsStoryblok
    | LogoCarouselStoryblok
    | LogoItemStoryblok
    | NavItemStoryblok
    | PageStoryblok
    | PostStoryblok
    | ProjectStoryblok
    | SeoStoryblok
    | ServiceItemStoryblok
    | ServicesSectionStoryblok
    | SocialItemStoryblok
    | SubmitFormStoryblok
    | TagStoryblok
    | VapiBlockStoryblok
  )[];
  seo?: SeoStoryblok[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface PostStoryblok {
  headline?: string;
  image?: AssetStoryblok;
  teaser?: string;
  content?: RichtextStoryblok;
  author?: StoryblokStory<AuthorStoryblok> | string;
  categories?: (StoryblokStory<CategoryStoryblok> | string)[];
  tags?: (StoryblokStory<TagStoryblok> | string)[];
  seo?: SeoStoryblok[];
  _uid: string;
  component: "post";
  [k: string]: any;
}

export type MultiassetStoryblok = {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  [k: string]: any;
}[];

export interface ProjectStoryblok {
  headline?: string;
  images?: MultiassetStoryblok;
  teaser?: string;
  content?: RichtextStoryblok;
  cover?: AssetStoryblok;
  _uid: string;
  component: "project";
  [k: string]: any;
}

export interface SeoStoryblok {
  title?: string;
  description?: string;
  og_title?: string;
  og_description?: string;
  twitter_title?: string;
  twitter_description?: string;
  canonical_url?: string;
  twitter_image?: AssetStoryblok;
  no_follow?: boolean;
  _uid: string;
  component: "seo";
  [k: string]: any;
}

export interface ServiceItemStoryblok {
  title?: string;
  description?: string;
  label?: string;
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "service-item";
  [k: string]: any;
}

export interface ServicesSectionStoryblok {
  title?: string;
  description?: string;
  services?: ServiceItemStoryblok[];
  _uid: string;
  component: "services-section";
  [k: string]: any;
}

export interface SocialItemStoryblok {
  name?: string;
  icon?: AssetStoryblok;
  url?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  _uid: string;
  component: "social-item";
  [k: string]: any;
}

export interface SubmitFormStoryblok {
  title?: string;
  description?: string;
  image?: AssetStoryblok;
  _uid: string;
  component: "submit-form";
  [k: string]: any;
}

export interface TagStoryblok {
  seo?: SeoStoryblok[];
  headline?: string;
  description?: RichtextStoryblok;
  _uid: string;
  component: "tag";
  [k: string]: any;
}

export interface VapiBlockStoryblok {
  title?: string;
  description?: string;
  block?: "" | "glob" | "orb" | "simple";
  _uid: string;
  component: "vapi-block";
  [k: string]: any;
}
