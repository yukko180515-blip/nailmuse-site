export default function AboutPage() {
  return (
    <div style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '16px' }}>会社について</h1>

        <p style={{ marginBottom: '24px', lineHeight: 1.8 }}>
          NailMuse（ネイルミューズ）は、
          「ネイルで自分らしさをもっと楽しめる世界」をつくることを目指したプロジェクトです。
          AIと人のクリエイティビティを組み合わせて、オーダーメイドのネイル体験をデザインします。
        </p>

        <h2 style={{ fontSize: '20px', marginBottom: 8 }}>ミッション</h2>
        <p style={{ marginBottom: 16, lineHeight: 1.8 }}>
          ・ネイルをもっと気軽に、もっと自由に。<br />
          ・「似合う」が見つかる体験を、テクノロジーでサポート。<br />
          ・世界中のネイルクリエイターが活躍できる場をつくる。
        </p>

        <h2 style={{ fontSize: '20px', marginBottom: 8 }}>今後の展開</h2>
        <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
          <li>海外対応（通貨・配送・デザイントレンド）への拡大</li>
          <li>AIデザインの精度向上とパーソナライズ</li>
          <li>クリエイター向けダッシュボード・評価システムの提供</li>
        </ul>

        <p style={{ marginTop: 24, fontSize: 14, lineHeight: 1.8, opacity: 0.8 }}>
          ※ 本ページの内容はサービスの成長に合わせて更新されます。
        </p>
      </div>
    </div>
  );
}
