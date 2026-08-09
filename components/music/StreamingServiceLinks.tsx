import Image from "next/image";

export type StreamingService =
  | "spotify"
  | "appleMusic"
  | "youtubeMusic"
  | "amazonMusic"
  | "lineMusic";

export type StreamingServiceUrls =
  Partial<Record<StreamingService, string>>;

type StreamingServiceLinksProps = {
  links: StreamingServiceUrls;
  className?: string;
};

const services: Record<
  StreamingService,
  {
    label: string;
    icon: string;
  }
> = {
  spotify: {
    label: "Spotify",
    icon: "/icons/streaming/spotify.svg",
  },

  appleMusic: {
    label: "Apple Music",
    icon: "/icons/streaming/apple-music.svg",
  },

  youtubeMusic: {
    label: "YouTube Music",
    icon: "/icons/streaming/youtube-music.svg",
  },

  amazonMusic: {
    label: "Amazon Music",
    icon: "/icons/streaming/amazon-music.svg",
  },

  lineMusic: {
    label: "LINE MUSIC",
    icon: "/icons/streaming/line-music.svg",
  },
};

export function StreamingServiceLinks({
  links,
  className = "",
}: StreamingServiceLinksProps) {
  const availableServices =
    Object.entries(links).filter(
      ([, url]) => Boolean(url),
    ) as [StreamingService, string][];

  if (availableServices.length === 0) {
    return null;
  }

  return (
    <div
      className={`streaming-service-links ${className}`}
    >
      {availableServices.map(
        ([service, url]) => {
          const config = services[service];

          return (
            <a
              key={service}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="streaming-service-links__item"
              aria-label={`${config.label}で聴く`}
              title={config.label}
            >
              <Image
                src={config.icon}
                alt=""
                width={26}
                height={26}
              />
            </a>
          );
        },
      )}
    </div>
  );
}