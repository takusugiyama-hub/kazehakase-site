export default function BiographyPage() {
  return (
    <main className="biography-page">
      <div className="biography-page__container">
        {/* =====================================
            Header
        ===================================== */}

        <header className="biography-page__header">
          <h1 className="biography-page__label">
            BIOGRAPHY
          </h1>
        </header>

        {/* =====================================
            Intro
        ===================================== */}

        <section className="biography-page__intro">
          <p className="biography-page__quote">
            「軽快さと熱さ、都会的で土着的、叙情とクール」
          </p>

          <p className="biography-page__text">
            いつかライブを観てくれた人が、
            風博士の音楽をそんなふうに表現してくれた。
          </p>

          <p className="biography-page__text">
            幼い頃は特にニューミュージックが好きだった。
            やがて、ブラジル音楽にも惹かれた。
            そうして出会ってきた音楽を自分なりに取り込みながら、
            弾き語りをつくってきた。
          </p>

          <p className="biography-page__closing">
            ギターを弾き、曲をつくり、歌う。
            <br />
            今も変わらず、その続きをやっている。
          </p>
        </section>

        {/* =====================================
            History
        ===================================== */}

        <div className="biography-page__history">
          {/* 浦安から京都へ */}

          <section className="biography-page__chapter">
            <h2 className="biography-page__chapter-title">
              浦安から京都へ
            </h2>

            <div className="biography-page__chapter-body">
              <p>
                1975年生まれ。千葉県浦安市で育つ。
              </p>

              <p>
                中学生の頃にバンドで歌い、
                ギターを弾き始めた。
                その後しばらく音楽から離れていたが、
                大学進学で移り住んだ京都で再び曲を書き始める。
              </p>

              <p>
                最初のステージは、拾得の飛び入りライブ。
                この頃から、好きだった坂口安吾のデビュー作に名前を借り、
                「風博士」と名乗り始めた。
              </p>
            </div>
          </section>

          {/* 京都 */}

          <section className="biography-page__chapter">
            <h2 className="biography-page__chapter-title">
              京都
            </h2>

            <div className="biography-page__chapter-body">
              <p>
                一人で始めた風博士は、
                演奏仲間が増えるにつれ、
                次第にバンドのような形になっていった。
                2004年、1stアルバム
                『風のノイズは僕たちの』を発表。
              </p>

              <p>
                大学に入った頃から、
                ボサノヴァを入口にブラジル音楽に夢中になった。
                とりわけその独特のリズムに惹かれ、
                ギターを繰り返し練習した。
              </p>

              <p>
                一方、大学在学中に友人たちと
                ソフトウェア会社を立ち上げ、
                仕事と音楽を並行する日々を送っていた。
                やがて、もっと音楽をやりたいという気持ちが
                大きくなっていく。
              </p>

              <p>
                2007年末、会社を退社。
                翌年『グッバイラヴタウン』を録音し、
                2008年3月、ギター一本で旅に出た。
              </p>
            </div>
          </section>

          {/* 旅 */}

          <section className="biography-page__chapter">
            <h2 className="biography-page__chapter-title">
              旅
            </h2>

            <div className="biography-page__chapter-body">
              <p>
                定住所を持たず、
                各地でライブをしながら全国を巡った。
              </p>

              <p>
                旅の間にも曲をつくり、録音し、
                『日暮しグルーヴィアン』
                『SOMETHING OF MUSIC』と作品を重ねた。
              </p>

              <p>
                最初から決めていた3年間を旅し、
                2011年3月、その生活を終えた。
              </p>
            </div>
          </section>

          {/* ふたりの旅 */}

          <section className="biography-page__chapter">
            <h2 className="biography-page__chapter-title">
              ふたりの旅
            </h2>

            <div className="biography-page__chapter-body">
              <p>
                同じ月に結婚。
                長野での3ヶ月半の暮らしを経て、
                今度は妻と二人、
                車をマイホームに見立てて再び全国を巡った。
              </p>

              <p>
                この時期に5thアルバム『home』を発表。
              </p>

              <p>
                やがて子どもが生まれ、
                二人の旅も終わりを迎えた。
              </p>
            </div>
          </section>

          {/* 山口・周南 */}

          <section className="biography-page__chapter">
            <h2 className="biography-page__chapter-title">
              山口・周南
            </h2>

            <div className="biography-page__chapter-body">
              <p>
                家族で山口県周南市へ移り住んだ。
                しばらくは音楽だけで生計を立てようと、
                ライブをしながら暮らした。
                2012年、6thアルバム『声とギター』を発表。
              </p>

              <p>
                第二子を授かったことをきっかけに仕事を探し、
                日立の車両製造工場で働き始めた。
                それまでとはまったく違う人たちに囲まれ、
                鉄道車両をつくる仕事は思いのほか面白かった。
              </p>

              <p>
                働きながらも、音楽は続けた。
              </p>
            </div>
          </section>

          {/* 鳥取・岩美 */}

          <section className="biography-page__chapter">
            <h2 className="biography-page__chapter-title">
              鳥取・岩美
            </h2>

            <div className="biography-page__chapter-body">
              <p>
                2017年春、第三子の誕生を機に、
                妻の郷里である鳥取県へ。
                海と山のある岩美町に移り住んだ。
              </p>

              <p>
                妻とともに「まのいいりょうし」を始め、
                古い家を直し、木や土に触れながら、
                自然から糧を得る暮らしを探っている。
              </p>

              <p className="biography-page__family">
                家族は妻と三人の息子、犬一匹。
              </p>

              <p className="biography-page__ending">
                その暮らしのなかで、
                今も曲をつくり、ギターを弾き、歌っている。
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}