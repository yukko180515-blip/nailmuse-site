import React from 'react';
import Script from 'next/script';
import './globals.css';

export const metadata = {
  title: 'NailMuse — Your Muse is AI.',
  description:
    'AI designs your custom nail tips, and creators polish the final design. NailMuse helps you find nails that feel like you.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* deploy test */}
        {/* Google Search Console verification */}
        <meta
          name="google-site-verification"
          content="WGj_FeARZQs4NiLiooBk1ZyWrscP7UDbG4egRJWQsmw"
        />

        {/* GA4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body
        style={{
          fontFamily:
            'Inter, Noto Sans JP, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          margin: 0,
          padding: 0,
          backgroundColor: '#fafafa',
        }}
      >
        <header
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid #eee',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              maxWidth: 1000,
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <a
              href="/"
              style={{
                fontWeight: 700,
                fontSize: 20,
                textDecoration: 'none',
                color: '#111',
              }}
            >
              NailMuse
            </a>
            <nav
              style={{
                display: 'flex',
                gap: 16,
                fontSize: 14,
              }}
            >
              <a href="/how-it-works" style={{ textDecoration: 'none' }}>
                仕組み
              </a>
              <a href="/pricing" style={{ textDecoration: 'none' }}>
                価格
              </a>
              <a href="/creators" style={{ textDecoration: 'none' }}>
                クリエイター
              </a>
              <a href="/about" style={{ textDecoration: 'none' }}>
                会社
              </a>
              <a href="/contact" style={{ textDecoration: 'none' }}>
                お問い合わせ
              </a>
              <a href="/en" style={{ textDecoration: 'none', opacity: 0.8 }}>
                EN
              </a>
            </nav>
          </div>
        </header>

        <main
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            padding: '0 16px 80px',
          }}
        >
          {children}
        </main>

        <footer
          style={{
            borderTop: '1px solid #eee',
            marginTop: 40,
            padding: '24px 16px',
          }}
        >
          <div
            style={{
              maxWidth: 1000,
              margin: '0 auto',
              fontSize: 12,
              color: '#888',
            }}
          >
            © {new Date().getFullYear()} NailMuse
          </div>
        </footer>
      </body>
    </html>
  );
}
