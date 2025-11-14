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
    // ★ ここがポイント：public/hero-nails.png を参照する
    backgroundImage: 'url("/hero-nails.png")',
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
        'linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.98))',
    }}
  />

  {/* 中身 */}
  <div style={{ position: 'relative' }}>
    <h1
      style={{
        fontSize: 32,
        lineHeight: 1.4,
        marginBottom: 16,
      }}
    >
      理想のネイルチップを作ろう
    </h1>
    <p
      style={{
        fontSize: 16,
        lineHeight: 1.8,
        marginBottom: 24,
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
        padding: '14px 32px',
        borderRadius: 999,
        background:
          'linear-gradient(90deg, #ff8dad, #ff9fba)',
        color: '#fff',
        fontWeight: 600,
        textDecoration: 'none',
        boxShadow:
          '0 10px 20px rgba(255,143,171,0.35)',
      }}
    >
      無料デザイン診断
    </a>
  </div>
</section>
    </main>
  );
}
// minor tweak
