import Link from "next/link";

import newsData from "@/data/news.json";
import type { NewsItem } from "@/types/content";

function formatNewsDate(date: string) {
  return date.replaceAll("-", ".");
}

export function NewsSection() {
  const publishedNews = (newsData as NewsItem[])
    .filter((item) => item.published)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  if (publishedNews.length === 0) {
    return null;
  }

  return (
    <section className="news-section">
      <div className="news-section__inner">
        <p className="news-section__label">NEWS</p>

        <div className="news-list">
          {publishedNews.map((item) => (
            <article key={item.id} className="news-item">
              <time
                className="news-item__date"
                dateTime={item.date}
              >
                {formatNewsDate(item.date)}
              </time>

              <div className="news-item__content">
                {item.url ? (
                  <Link
                    href={item.url}
                    className="news-item__link"
                  >
                    <span className="news-item__title">
                      {item.title}
                    </span>

                    <span
                      className="news-item__arrow"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                ) : (
                  <span className="news-item__title">
                    {item.title}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}