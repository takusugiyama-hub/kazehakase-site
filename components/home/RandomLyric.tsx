"use client";

import {
  useEffect,
  useState,
} from "react";

import lyricsData from "@/data/lyrics.json";

import {
  StreamingServiceLinks,
} from "@/components/music/StreamingServiceLinks";

import type {
  Lyric,
} from "@/types/content";

const publishedLyrics = (
  lyricsData as Lyric[]
).filter(
  (item) => item.published,
);

export function RandomLyric() {
  const [lyric, setLyric] =
    useState<Lyric | null>(null);

  useEffect(() => {
    if (
      publishedLyrics.length === 0
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      const randomIndex =
        Math.floor(
          Math.random() *
            publishedLyrics.length,
        );

      setLyric(
        publishedLyrics[
          randomIndex
        ],
      );
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  if (!lyric) {
    return null;
  }

  const hasStreamingLinks =
    Object.values(
      lyric.streamingLinks ?? {},
    ).some(Boolean);

  const titleDelay =
    lyric.text.length * 700 + 1000;

  const mobileStreamingDelay =
    titleDelay + 1800;

  return (
    <div className="random-lyric">
      <div className="random-lyric__text">
        {lyric.text.map(
          (line, index) => (
            <span
              key={`${lyric.id}-${index}`}
              className="random-lyric__line"
              style={{
                animationDelay:
                  `${index * 700}ms`,
              }}
            >
              {line}
            </span>
          ),
        )}

        <p
          className="random-lyric__title"
          style={{
            animationDelay:
              `${titleDelay}ms`,
          }}
        >
          「{lyric.songTitle}」
        </p>
      </div>

      {hasStreamingLinks && (
        <>
          {/* =====================================
              PC
          ===================================== */}

          <details className="random-lyric__streaming random-lyric__streaming--desktop">
            <summary className="random-lyric__toggle">
              <span>
                この曲を聴く
              </span>

              <span
                className="random-lyric__toggle-icon"
                aria-hidden="true"
              />
            </summary>

            <div className="random-lyric__links-panel">
              <StreamingServiceLinks
                links={
                  lyric.streamingLinks ??
                  {}
                }
              />
            </div>
          </details>

          {/* =====================================
              Mobile
          ===================================== */}

          <div
            className="random-lyric__streaming random-lyric__streaming--mobile"
            style={{
              animationDelay:
                `${mobileStreamingDelay}ms`,
            }}
          >
            <p className="random-lyric__mobile-label">
              この曲を聴く
            </p>

            <StreamingServiceLinks
              links={
                lyric.streamingLinks ??
                {}
              }
            />
          </div>
        </>
      )}
    </div>
  );
}