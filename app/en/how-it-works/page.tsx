export default function Page() {
  return (
    <div style={{ padding: '40px 0' }}>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>How NailMuse Works</h1>

      <p style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 16 }}>
        NailMuse is an AI-powered design service for custom nail tips.
        You answer a few simple questions about your preferences, and our AI
        generates design ideas tailored to your style.
      </p>

      <ol style={{ fontSize: 18, lineHeight: 1.8, paddingLeft: 24, marginBottom: 24 }}>
        <li>Tell us your taste, colors, and mood.</li>
        <li>AI creates multiple design proposals just for you.</li>
        <li>Professional creators refine and finalize the design.</li>
        <li>Your custom nail tips are prepared and ready to ship.</li>
      </ol>

      <p style={{ fontSize: 18, lineHeight: 1.6 }}>
        Our goal is to make it easy and fun for you to discover
        “your one and only” nail design, without spending hours
        searching through endless photos.
      </p>
    </div>
  );
}
