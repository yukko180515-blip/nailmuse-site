export const metadata = {
  title: 'NailMuse — Your Muse is AI.',
  description: 'AI designs your custom nail tip.',
  icons: { icon: '/favicon.ico' },
}

import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        {/* ✅ Google 検証タグ */}
        <meta name="google-site-verification" content="あなたのコードをここに" />
      </head>
      <body style={{ fontFamily: 'Inter, Noto Sans JP, sans-serif' }}>
        <header style={{ padding: '16px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <nav style={{ display: 'flex', gap: '16px' }}>
              <a href="/">Home</a>
              <a href="/how-it-works">仕組み</a>
              <a href="/pricing">価格</a>
              <a href="/creators">クリエイター</a>
              <a href="/about">会社</a>
              <a href="/contact">お問い合わせ</a>
              <a href="/en" style={{ opacity: 0.8 }}>EN</a>
            </nav>
          </div>
        </header>
        <main style={{ maxWidth: 1000, margin: '0 auto' }}>{children}</main>
        <footer style={{ borderTop: '1px solid #eee', padding: '16px 0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            © {new Date().getFullYear()} NailMuse
          </div>
        </footer>
      </body>
    </html>
  )
}
