import Script from 'next/script';
import './globals.css';

export const metadata = {
  title: 'NailMuse – Your Muse is AI',
  description: 'AI designs your custom nail art.',
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
        {/* Google Search Console 認証 */}
        <meta
          name="google-site-verification"
          content="WGj_FeARZQs4NiLiouY1PCFp1zl9b4lEWxwjFIrZF9I"
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
          fontFamily: 'Inter, sans-serif',
          margin: 0,
          padding: 0,
          backgroundColor: '#fafafa',
        }}
      >
        <header
          style={{
            padding: '16px 0',
            borderBottom: '1px solid #eee',
            marginBottom: '24px',
          }}
        >
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <a href="/" style={{ fontSize: 24, fontWeight: 700 }}>NailMuse</a>
            </nav>
          </div>
        </header>

        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
// update for GA
