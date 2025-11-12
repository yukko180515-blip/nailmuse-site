export const metadata = {
  title: 'NailMuse – Your Muse is AI.',
  description: 'AI designs your custom nail tips, crafted by creators.',
  icons: { icon: '/favicon.ico' },
}
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta name="google-site-verification" content="WGj_FeARZQs4NiLiooBk1ZyWrscP7UDbG4egRJWQsmw" />
      </head>
      <body style={{fontFamily:'Inter, Noto Sans JP, system-ui'}}>
        <header style={{padding:'16px 24px', borderBottom:'1px solid #eee', background:'#fff', position:'sticky', top:0}}>
          <div style={{maxWidth:1000, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <a href="/" style={{fontWeight:700, letterSpacing:0.5}}>NailMuse</a>
            <nav style={{display:'flex', gap:16}}>
              <a href="/how-it-works">仕組み</a>
              <a href="/pricing">価格</a>
              <a href="/creators">クリエイター</a>
              <a href="/about">会社</a>
              <a href="/contact">お問い合わせ</a>
              <a href="/en" style={{opacity:.8}}>EN</a>
            </nav>
          </div>
        </header>
        <main style={{maxWidth:1000, margin:'0 auto', padding:'32px 16px'}}>{children}</main>
        <footer style={{borderTop:'1px solid #eee', padding:'24px', fontSize:13, color:'#666'}}>
          <div style={{maxWidth:1000, margin:'0 auto'}}>
            © {new Date().getFullYear()} NailMuse · <a href="/policies/terms">利用規約</a> · <a href="/policies/privacy">プライバシー</a> · <a href="/policies/tokushoho">特商法</a> · <a href="/policies/returns">返品/配送</a>
          </div>
        </footer>
      </body>
    </html>
  )
}
