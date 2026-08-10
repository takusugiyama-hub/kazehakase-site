import type { Metadata } from "next";

import UnderConstruction from "@/components/UnderConstruction";

export const metadata: Metadata = {
  title: "風博士 | Under Construction",
  description: "風博士のウェブサイトは現在準備中です。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function UnderConstructionPage() {
  return <UnderConstruction />;
}