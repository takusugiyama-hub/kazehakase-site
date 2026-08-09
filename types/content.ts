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
  open: string;
  start: string;

  advancePrice: string;
  doorPrice: string;

  artists: string[];
  description: string;

  image?: string;
  detailUrl: string;

  reservationUrl: string;
  soldOut: boolean;
  cancelled: boolean;
  published: boolean;
};

export type MusicRelease = {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  listeningUrl: string;
  order: number;
  published: boolean;
};