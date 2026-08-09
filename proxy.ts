import { NextRequest, NextResponse } from "next/server";

const UNDER_CONSTRUCTION = true;

export function proxy(request: NextRequest) {
  if (!UNDER_CONSTRUCTION) {
    return NextResponse.next();
  }

  const hostname = request.nextUrl.hostname;
  const pathname = request.nextUrl.pathname;

  const isProductionDomain =
    hostname === "kazehakase.jp" ||
    hostname === "www.kazehakase.jp";

  // localhost やプレビューURLでは通常サイトを表示
  if (!isProductionDomain) {
    return NextResponse.next();
  }

  // 工事中ページ自身はそのまま表示
  if (pathname === "/under-construction") {
    return NextResponse.next();
  }

  // kazehakase.jp のアクセスを工事中ページへ内部的に書き換え
  const url = request.nextUrl.clone();
  url.pathname = "/under-construction";

  const response = NextResponse.rewrite(url);

  // 工事中ページを検索エンジンに登録させない
  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};