export default function EnPage() {
  return (
    <main
      style={{
        maxWidth: 1000,
        margin: '0 auto',
        padding: '80px 16px 120px',
      }}
    >
      {/* Hero */}
      <section style={{ marginBottom: 80 }}>
        <p
          style={{
            fontSize: 14,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          NailMuse
        </p>
        <h1
          style={{
            fontSize: 32,
            lineHeight: 1.6,
            marginBottom: 24,
          }}
        >
          AI becomes <br />
          your nail muse.
        </h1>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.9,
            marginBottom: 32,
          }}
        >
          NailMuse combines AI and human creators to help you discover nail
          designs that feel like you. Describe your mood or style, explore
          designs, and get nails that match your personality.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <a
            href="/"
            style={{
              padding: '12px 24px',
              borderRadius: 999,
              border: '1px solid #000',
              textDecoration: 'none',
              fontSize: 14,
            }}
          >
            Try the design experience
          </a>
          <a
            href="/pricing"
            style={{
              padding: '12px 24px',
              borderRadius: 999,
              border: '1px solid #ddd',
              textDecoration: 'none',
              fontSize: 14,
            }}
          >
            View pricing
          </a>
        </div>
      </section>

      {/* How it works */}
      <section style={{ marginBottom: 80 }}>
        <h2
          style={{
            fontSize: 24,
            marginBottom: 16,
          }}
        >
          How NailMuse works
        </h2>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.9,
            marginBottom: 24,
          }}
        >
          From idea to finished nails, NailMuse supports you throughout the
          journey.
        </p>
        <ol
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gap: 16,
          }}
        >
          <li
            style={{
              padding: '16px 20px',
              borderRadius: 12,
              backgroundColor: '#fafafa',
              border: '1px solid #eee',
            }}
          >
            <strong style={{ display: 'block', marginBottom: 4 }}>
              1. Tell us your mood and preferences
            </strong>
            <span style={{ fontSize: 14, lineHeight: 1.8 }}>
              Colors you like, occasions, outfits, or keywords &mdash; anything
              that expresses your current mood.
            </span>
          </li>
          <li
            style={{
              padding: '16px 20px',
              borderRadius: 12,
              backgroundColor: '#fafafa',
              border: '1px solid #eee',
            }}
          >
            <strong style={{ display: 'block', marginBottom: 4 }}>
              2. Explore AI-suggested designs
            </strong>
            <span style={{ fontSize: 14, lineHeight: 1.8 }}>
              The AI proposes multiple design ideas. You can compare, refine,
              and choose the ones that feel right for you.
            </span>
          </li>
          <li
            style={{
              padding: '16px 20px',
              borderRadius: 12,
              backgroundColor: '#fafafa',
              border: '1px solid #eee',
            }}
          >
            <strong style={{ display: 'block', marginBottom: 4 }}>
              3. Creators polish the details
            </strong>
            <span style={{ fontSize: 14, lineHeight: 1.8 }}>
              Professional creators use the AI concepts as a base and adjust
              layouts, balance, and details so the design works beautifully as
              nail art.
            </span>
          </li>
        </ol>
      </section>

      {/* For creators */}
      <section style={{ marginBottom: 80 }}>
        <h2
          style={{
            fontSize: 24,
            marginBottom: 16,
          }}
        >
          For creators
        </h2>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.9,
            marginBottom: 12,
          }}
        >
          NailMuse is also a tool for nail artists and creators.
        </p>
        <ul
          style={{
            paddingLeft: 18,
            fontSize: 14,
            lineHeight: 1.8,
          }}
        >
          <li>Use AI to explore new design directions.</li>
          <li>Save time on ideation and focus on quality and detail.</li>
          <li>Share designs in a format that clients can easily understand.</li>
        </ul>
      </section>

      {/* Contact / CTA */}
      <section>
        <h2
          style={{
            fontSize: 24,
            marginBottom: 16,
          }}
        >
          Get in touch
        </h2>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.9,
            marginBottom: 24,
          }}
        >
          Interested in NailMuse, collaborations, or using it at your salon?
          Feel free to contact us.
        </p>
        <a
          href="/contact"
          style={{
            padding: '12px 24px',
            borderRadius: 999,
            border: '1px solid #000',
            textDecoration: 'none',
            fontSize: 14,
          }}
        >
          Go to contact form
        </a>
      </section>
    </main>
  );
}
