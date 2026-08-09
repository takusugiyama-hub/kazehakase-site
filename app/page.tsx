import { Hero } from "@/components/home/Hero";
import { HomeInfoBar } from "@/components/home/HomeInfoBar";
import { NewsSection } from "@/components/home/NewsSection";

export default function HomePage() {
  return (
    <>
      <div className="home-first-view">
        <Hero />
        <HomeInfoBar />
      </div>

      <NewsSection />
    </>
  );
}