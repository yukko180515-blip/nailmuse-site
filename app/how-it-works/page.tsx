export default function HowItWorksPage() {
  return (
    <div style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '16px' }}>仕組み</h1>

        <p style={{ marginBottom: '24px', lineHeight: 1.8 }}>
          NailMuse（ネイルミューズ）は、AIとクリエイターが協力して
          「あなただけのネイルチップ」を作るサービスです。
        </p>

        <ol style={{ lineHeight: 1.8, paddingLeft: '20px' }}>
          <li style={{ marginBottom: '12px' }}>
            あなたの好み（色・雰囲気・用途・予算など）を簡単なフォームで入力します。
          </li>
          <li style={{ marginBottom: '12px' }}>
            AIが入力内容をもとに、複数パターンのネイルデザイン案を自動生成します。
          </li>
          <li style={{ marginBottom: '12px' }}>
            気に入ったデザインを選ぶと、NailMuseに登録しているクリエイターが、
            そのデザインをベースに実物のネイルチップを制作します。
          </li>
          <li style={{ marginBottom: '12px' }}>
            制作が完了したら、検品のうえ、ご自宅にお届けします。
          </li>
        </ol>

        <p style={{ marginTop: '24px', lineHeight: 1.8 }}>
          AIが「イメージ作り」を助けてくれるので、
          「どんなデザインがいいか分からない…」という人でも、
          自分らしいネイルに出会えるように設計されています。
        </p>
      </div>
    </div>
  );
}
