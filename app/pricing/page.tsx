export default function PricingPage() {
  return (
    <div style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '16px' }}>価格</h1>

        <p style={{ marginBottom: '24px', lineHeight: 1.8 }}>
          NailMuseのネイルチップは、デザインの複雑さや使用するパーツによって価格が変動します。
          まずは下記の３つのプランをベースに、AIがデザインを提案します。
        </p>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ border: '1px solid #eee', borderRadius: 8, padding: '16px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: 8 }}>Basic</h2>
            <p style={{ marginBottom: 4 }}>目安価格：3,000円〜</p>
            <p style={{ fontSize: 14, lineHeight: 1.8 }}>
              シンプルなワンカラーやグラデーション、ワンポイントデザインなど。
              初めてNailMuseを試す方や、オフィス向けネイルにおすすめです。
            </p>
          </div>

          <div style={{ border: '1px solid #eee', borderRadius: 8, padding: '16px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: 8 }}>Standard</h2>
            <p style={{ marginBottom: 4 }}>目安価格：5,000円〜</p>
            <p style={{ fontSize: 14, lineHeight: 1.8 }}>
              アートやパーツを程よく使ったデザイン。
              特別な予定やイベント、推し活ネイルなどにぴったりです。
            </p>
          </div>

          <div style={{ border: '1px solid #eee', borderRadius: 8, padding: '16px' }}>
            <h2 style={{ fontSize: '20px', marginBottom: 8 }}>Premium</h2>
            <p style={{ marginBottom: 4 }}>目安価格：7,000円〜</p>
            <p style={{ fontSize: 14, lineHeight: 1.8 }}>
              手描きアート、立体パーツ、ストーンなどをふんだんに使ったハイデザイン。
              ウェディングや記念日など、「絶対に外したくない」日に。
            </p>
          </div>
        </div>

        <p style={{ marginTop: 24, fontSize: 14, lineHeight: 1.8, opacity: 0.8 }}>
          ※ 実際の価格は、AIが提案するデザイン内容とクリエイターのランクによって変動します。<br />
          ※ 料金は今後変更になる可能性があります。
        </p>
      </div>
    </div>
  );
}
