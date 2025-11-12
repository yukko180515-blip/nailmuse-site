export default function Pricing() {
  return (
    <>
      <h1>価格</h1>
      <p>デザインの複雑度に応じて±¥1,000調整されます。</p>
      <div className="cards">
        <div className="card"><h3>Basic</h3><p>¥3,000</p><p>単色・控えめデコ</p></div>
        <div className="card"><h3>Standard</h3><p>¥5,000</p><p>トレンド・中デコ</p></div>
        <div className="card"><h3>Premium</h3><p>¥7,000〜</p><p>特殊素材・限定デザイン</p></div>
      </div>
    </>
  )
}
