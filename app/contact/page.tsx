export default function ContactPage() {
  return (
    <div style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '16px' }}>お問い合わせ</h1>

        <p style={{ marginBottom: '16px', lineHeight: 1.8 }}>
          サービスに関するご質問、取材・提携のご相談、クリエイターとしての参加希望など、
          下記の方法からお気軽にお問い合わせください。
        </p>

        <h2 style={{ fontSize: '20px', marginBottom: 8 }}>メールでのお問い合わせ</h2>
        <p style={{ marginBottom: 16, lineHeight: 1.8 }}>
          こちらのアドレス宛にご連絡ください。<br />
          {/* TODO: 実際のメールアドレスが決まったら差し替えてください */}
          <a href="mailto:info@nailmuse.jp" style={{ textDecoration: 'underline' }}>
            info@nailmuse.jp
          </a>
        </p>

        <h2 style={{ fontSize: '20px', marginBottom: 8 }}>ご記入いただきたい内容</h2>
        <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
          <li>お名前（またはニックネーム）</li>
          <li>ご連絡先メールアドレス</li>
          <li>お問い合わせの種類（例：サービスについて／クリエイター応募／その他）</li>
          <li>具体的な内容</li>
        </ul>

        <p style={{ marginTop: 24, fontSize: 14, lineHeight: 1.8, opacity: 0.8 }}>
          ※ 現在、多くのお問い合わせをいただいている場合、返信にお時間をいただくことがあります。<br />
          ※ 迷惑メールフォルダに振り分けられてしまうことがありますので、ご確認をお願いいたします。
        </p>
      </div>
    </div>
  );
}
