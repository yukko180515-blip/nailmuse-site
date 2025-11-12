export default function Page() {
  return (
    <>
      <section style={{textAlign:'center', padding:'64px 12px', background:'linear-gradient(180deg,#fff,#f5d2c333)'}}>
        <h1 style={{fontSize:42, marginBottom:12}}>AIが、あなたのミューズになる。</h1>
        <p style={{fontSize:18, color:'#444'}}>AIがデザイン、クリエイターが仕上げる“あなただけのネイルチップ”。</p>
        <div style={{marginTop:24, display:'flex', gap:12, justifyContent:'center'}}>
          <a className="btn" href="/how-it-works">無料でデザインを試す</a>
          <a className="btn-outline" href="/pricing">価格を見る</a>
        </div>
      </section>
      <section style={{padding:'48px 0'}}>
        <h2>仕組み</h2>
        <ol>
          <li>好み入力（色・雰囲気・用途）</li>
          <li>AIが3–5案を提案、価格と納期目安を表示</li>
          <li>Stripeで安全にお支払い</li>
          <li>クリエイターが制作・配送、追跡番号を通知</li>
        </ol>
      </section>
      <section>
        <h2>価格</h2>
        <ul>
          <li><b>Basic</b> ¥3,000</li>
          <li><b>Standard</b> ¥5,000</li>
          <li><b>Premium</b> ¥7,000〜</li>
        </ul>
      </section>
    </>
  )
}
