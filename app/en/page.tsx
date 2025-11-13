export default function Page() {
  return (
    <>
      <section style={{ textAlign: 'center', padding: '48px 24px' }}>
        <h1 style={{ fontSize: 42, marginBottom: 16 }}>
          Create Your Perfect Nail Tips with AI
        </h1>
        <p style={{ fontSize: 18, color: '#555' }}>
          Easily order nail tips designed based on your preferred style.
        </p>
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 16 }}>
          <a className="btn" href="/how-it-works">How It Works</a>
          <a className="btn-outline" href="/pricing">Pricing</a>
        </div>
      </section>

      <section style={{ padding: '48px 24px' }}>
        <h2>How It Works</h2>
        <ol>
          <li>Input your preferences (color, mood, style, purpose)</li>
          <li>AI proposes 3–5 design concepts with price and delivery time</li>
          <li>Pay securely with Stripe</li>
          <li>Creators produce, ship, and provide aftercare assistance</li>
        </ol>
      </section>

      <section>
        <h2>Pricing</h2>
        <ul>
          <li><b>Basic</b> ¥3,000〜</li>
          <li><b>Standard</b> ¥5,000〜</li>
          <li><b>Premium</b> ¥7,000〜</li>
        </ul>
      </section>
    </>
  );
}
