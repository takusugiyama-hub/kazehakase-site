export type StreamingLinks = {
  spotify?: string;
  appleMusic?: string;
  lineMusic?: string;
  amazonMusic?: string;
  youtubeMusic?: string;
};

export type Lyric = {
  id: string;
  text: string[];
  songTitle: string;
  streamingLinks: StreamingLinks;
  published: boolean;
};

export type NewsItem = {
  id: string;
  date: string;
  title: string;
  body?: string;
  url?: string;
  published: boolean;
};

export type LiveEvent = {
  id: string;
  date: string;
  title: string;
  venue: string;
  area: string;
  address?: string;

  open: string;
  start: string;

  advancePrice: string;
  doorPrice: string;

  notes?: string[];

  artists: string[];
  description?: string[];

  image?: string;
  detailUrl: string;

  reservation?: boolean;
  reservationUrl?: string;

  soldOut: boolean;
  cancelled: boolean;
  published: boolean;
};

export type MusicCategory =
  | "album"
  | "compilation"
  | "other";

export type MusicRelease = {
  id: string;

  category: MusicCategory;

  title: string;
  subtitle?: string;

  releaseDate?: string;
  coverImage?: string;

  tracks?: string[];

  links?: StreamingLinks;

  participation?: string;
  note?: string;

  published: boolean;
};