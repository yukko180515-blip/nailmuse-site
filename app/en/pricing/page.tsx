export default function Page() {
  return (
    <div style={{ padding: '40px 0' }}>
      <h1 style={{ fontSize: 32, marginBottom: 16 }}>Pricing</h1>

      <p style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 24 }}>
        We are preparing official pricing for the global (English) version.
        The information below is a placeholder and may change.
      </p>

      <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 24, marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, marginBottom: 8 }}>AI Design + Creator Finish</h2>
        <p style={{ fontSize: 18, marginBottom: 4 }}>Includes:</p>
        <ul style={{ fontSize: 18, lineHeight: 1.8, paddingLeft: 20 }}>
          <li>Personalized AI design proposals</li>
          <li>Final supervision by a professional creator</li>
          <li>Design data ready for nail tips</li>
        </ul>
      </div>

      <p style={{ fontSize: 18, lineHeight: 1.6 }}>
        For the most up-to-date pricing, please check the Japanese page
        or contact us directly.
      </p>
    </div>
  );
}
