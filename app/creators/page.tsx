export default function CreatorsPage() {
  return (
    <div style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '16px' }}>クリエイター</h1>

        <p style={{ marginBottom: '24px', lineHeight: 1.8 }}>
          NailMuseでは、ネイルが好きなクリエイターさんと一緒に、
          お客さまだけのネイルチップを届けています。
        </p>

        <h2 style={{ fontSize: '20px', marginTop: 24, marginBottom: 8 }}>働き方のイメージ</h2>
        <ol style={{ paddingLeft: 20, lineHeight: 1.8 }}>
          <li>AIが提案したデザインとオーダー内容を、オンラインで受注。</li>
          <li>自宅など、好きな場所・好きな時間にネイルチップを制作。</li>
          <li>仕上がった作品を梱包し、指定の方法で発送。</li>
          <li>お客様からの評価や実績に応じて、クリエイターランクがアップ。</li>
        </ol>

        <h2 style={{ fontSize: '20px', marginTop: 24, marginBottom: 8 }}>ランク制度について</h2>
        <p style={{ marginBottom: 12, lineHeight: 1.8 }}>
          クリエイターは「松／竹／梅」の３ランクで構成され、
          ランクが上がるほど１件あたりの報酬とボーナスが増えていきます。
        </p>
        <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
          <li>梅：スタートランク。まずは基本的な案件からお任せします。</li>
          <li>竹：品質と納期が安定しているクリエイターさん。</li>
          <li>松：高評価が多く、難しい案件も安心してお任せできるトップランク。</li>
        </ul>

        <p style={{ marginTop: 24, lineHeight: 1.8 }}>
          クリエイター募集の詳細や報酬シミュレーションは、今後このページで公開予定です。
          興味がある方は、お問い合わせページからご連絡ください。
        </p>
      </div>
    </div>
  );
}
