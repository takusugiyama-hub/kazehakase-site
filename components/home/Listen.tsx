"use client";

import Image from "next/image";
import { useState } from "react";

import musicData from "@/data/music.json";

type MusicLinks = {
  spotify?: string;
  appleMusic?: string;
  youtubeMusic?: string;
  amazonMusic?: string;
  lineMusic?: string;
};

type MusicItem = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  releaseDate: string;
  coverImage: string;
  links: MusicLinks;
  published: boolean;
};

const serviceLabels: {
  key: keyof MusicLinks;
  label: string;
}[] = [
  {
    key: "spotify",
    label: "Spotify",
  },
  {
    key: "appleMusic",
    label: "Apple Music",
  },
  {
    key: "youtubeMusic",
    label: "YouTube Music",
  },
  {
    key: "amazonMusic",
    label: "Amazon Music",
  },
  {
    key: "lineMusic",
    label: "LINE MUSIC",
  },
];

export function Listen() {
  const albums = (musicData as MusicItem[]).filter(
    (item) =>
      item.category === "album" &&
      item.published === true,
  );

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [isServicesOpen, setIsServicesOpen] =
    useState(false);

  if (albums.length === 0) {
    return null;
  }

  const album = albums[currentIndex];

  const goPrevious = () => {
    setCurrentIndex((current) =>
      current === 0
        ? albums.length - 1
        : current - 1,
    );

    setIsServicesOpen(false);
  };

  const goNext = () => {
    setCurrentIndex((current) =>
      current === albums.length - 1
        ? 0
        : current + 1,
    );

    setIsServicesOpen(false);
  };

  const availableServices =
    serviceLabels.filter(
      ({ key }) => album.links[key],
    );

  return (
    <div className="home-info-bar__listen">
      <p className="home-info-bar__label">
        LISTEN
      </p>

      <div className="home-info-bar__release">
        <div className="home-info-bar__cover">
          {album.coverImage && (
            <Image
              src={album.coverImage}
              alt={`${album.title} ジャケット`}
              fill
              sizes="82px"
            />
          )}
        </div>

        <div className="home-info-bar__release-details">
          <p className="home-info-bar__release-title">
            {album.title}
          </p>

          <p className="home-info-bar__release-subtitle">
            {album.subtitle}
          </p>

          <div className="home-info-bar__listen-actions">
            {availableServices.length > 0 && (
              <button
                type="button"
                className="home-info-bar__listen-button"
                onClick={() =>
                  setIsServicesOpen(
                    (current) => !current,
                  )
                }
                aria-expanded={isServicesOpen}
                aria-controls="listen-services"
              >
                試聴する
              </button>
            )}

            <div className="home-info-bar__listen-navigation">
              <button
                type="button"
                onClick={goPrevious}
                className="home-info-bar__listen-arrow"
                aria-label="前のアルバム"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={goNext}
                className="home-info-bar__listen-arrow"
                aria-label="次のアルバム"
              >
                ›
              </button>
            </div>
          </div>

          {availableServices.length > 0 && (
  <div
    id="listen-services"
    className={`home-info-bar__streaming-services${
      isServicesOpen
        ? " home-info-bar__streaming-services--open"
        : ""
    }`}
    aria-hidden={!isServicesOpen}
  >
    {availableServices.map(
      ({ key, label }) => {
        const href = album.links[key];

        if (!href) {
          return null;
        }

        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="home-info-bar__streaming-link"
            tabIndex={
              isServicesOpen ? 0 : -1
            }
          >
            {label}
          </a>
        );
      },
    )}
  </div>
)}
        </div>
      </div>
    </div>
  );
}