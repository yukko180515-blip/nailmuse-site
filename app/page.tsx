export default function Page() {
  return (
    <main
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '40px 16px 80px',
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
      }}
    >
      {/* ヒーローエリア */}
      <section
        style={{
          borderRadius: 24,
          padding: '48px 24px 64px',
          textAlign: 'center',
          backgroundImage: 'url("/images/hero-nails.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 背景の上に半透明レイヤー */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,230,230,0.8))',
          }}
        ></div>

        {/* 中身 */}
        <div style={{ position: 'relative' }}>
          <h1
            style={{
              fontSize: 32,
              lineHeight: 1.4,
              margin: 0,
              color: '#5a3327',
              fontWeight: 800,
            }}
          >
            理想のネイルチップを作ろう
          </h1>

          <p
            style={{
              marginTop: 16,
              marginBottom: 24,
              fontSize: 15,
              lineHeight: 1.7,
              color: '#6b3c2f',
              fontWeight: 600,
            }}
          >
            AIがデザイン、クリエイターが仕上げる
            <br />
            あなただけのネイルチップ
          </p>

          <a
            href="/try"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              borderRadius: 999,
              backgroundColor: '#ff9ca8',
              color: '#ffffff',
              fontSize: 16,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 6px 16px rgba(255, 140, 160, 0.4)',
            }}
          >
            無料デザイン診断
          </a>
        </div>
      </section>

      {/* 仕組みセクション */}
      <section
        style={{
          marginTop: 40,
          borderRadius: 24,
          border: '1px solid #ffe0e0',
          padding: 24,
          backgroundColor: '#fff7f7',
        }}
      >
        <h2
          style={{
            fontSize: 20,
            margin: 0,
            marginBottom: 16,
            textAlign: 'center',
            color: '#5a3327',
          }}
        >
          仕組み
        </h2>

        <ol
          style={{
            margin: 0,
            paddingLeft: 20,
            fontSize: 14,
            lineHeight: 1.9,
            color: '#4a2b21',
          }}
        >
          <li>好みのデザインを入力</li>
          <li>AIが3〜5案を提案、価格と納期目安を表示</li>
          <li>Stripeで安全に支払い</li>
          <li>クリエイターが制作・配送、追跡番号を通知</li>
        </ol>
      </section>
    </main>
  );
}
