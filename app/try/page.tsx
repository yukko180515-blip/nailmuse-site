'use client';

import React, { useState } from 'react';

type Option = {
  id: string;
  label: string;
  description?: string;
};

const sceneOptions: Option[] = [
  { id: 'omakase', label: 'おまかせ' },
  { id: 'daily', label: '普段使い' },
  { id: 'office', label: 'オフィス' },
  { id: 'special', label: '特別な日' },
];

const specialSceneOptions: Option[] = [
  { id: 'bridal', label: 'ブライダル' },
  { id: 'coming-of-age', label: '成人式' },
  { id: 'party', label: 'パーティー・イベント' },
  { id: 'other-special', label: 'その他の特別な日' },
];

const moodOptions: Option[] = [
  { id: 'cute', label: 'かわいい' },
  { id: 'adult-cute', label: '大人かわいい' },
  { id: 'cool', label: 'クール' },
  { id: 'nuance', label: 'ニュアンス系' }, // 追加
];

const designTypeOptions: Option[] = [
  { id: 'simple', label: 'シンプル' },
  { id: 'bijou', label: 'ビジュー' },
  { id: 'korean', label: '韓国っぽ' },
  { id: 'art', label: 'ニュアンスアート' },
  { id: 'japanese', label: '和柄' }, // 追加
  { id: 'magnet', label: 'マグネット' }, // 追加
];

const shapeOptions: Option[] = [
  { id: 'short-square', label: 'ショート × スクエア' },
  { id: 'short-oval', label: 'ショート × オーバル' },
  { id: 'middle-oval', label: 'ミディアム × オーバル' },
  { id: 'long-coffin', label: 'ロング × コフィン' },
];

const baseCardStyle: React.CSSProperties = {
  borderRadius: 16,
  border: '1px solid #f4d6db',
  padding: '20px 20px 16px',
  background: '#fff',
  marginBottom: 24,
};

const cardGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
  gap: 12,
  marginTop: 16,
};

type CardProps = {
  option: Option;
  selected: boolean;
  onClick: () => void;
};

const SelectCard: React.FC<CardProps> = ({ option, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        borderRadius: 12,
        border: selected ? '2px solid #ff9fb6' : '1px solid #f2d7de',
        padding: '12px 10px',
        background: selected ? '#fff5f8' : '#fff',
        cursor: 'pointer',
        textAlign: 'left',
        fontSize: 14,
        lineHeight: 1.5,
      }}
    >
      <div style={{ fontWeight: 600 }}>{option.label}</div>
      {option.description && (
        <div style={{ fontSize: 12, color: '#777', marginTop: 4 }}>
          {option.description}
        </div>
      )}
    </button>
  );
};

// AIに送る指示テキストを組み立てる
const buildPromptText = (
  sceneLabel: string,
  moodLabel: string,
  designTypeLabel: string,
  shapeLabel: string
) => {
  const lines = [
    'あなたはプロのネイルデザイナーです。',
    '次の条件に合うネイルチップのデザイン案を 3〜5 個、日本語で提案してください。',
    '',
    `■使うシーン: ${sceneLabel}`,
    `■なりたい雰囲気: ${moodLabel}`,
    `■デザインタイプ: ${designTypeLabel}`,
    `■チップの長さ・形: ${shapeLabel}`,
    '',
    'それぞれの案について、',
    '・ベースカラー',
    '・アートやパーツの内容',
    '・配置のイメージ（どの指に何を置くか など）',
    '・どんな人／シーンにおすすめか',
    'を、1案ずつ箇条書きで書いてください。',
  ];
  return lines.join('\n');
};

export default function TryPage() {
  const [scene, setScene] = useState<string>('omakase');
  const [specialScene, setSpecialScene] = useState<string | null>(null);
  const [mood, setMood] = useState<string>('adult-cute');
  const [designType, setDesignType] = useState<string>('simple');
  const [shape, setShape] = useState<string>('short-oval');
  const [showResult, setShowResult] = useState<boolean>(false);

  const [promptText, setPromptText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const getLabel = (options: Option[], id: string | null | undefined) =>
    options.find((o) => o.id === id)?.label ?? '—';

  const sceneLabel =
    scene === 'special'
      ? `特別な日（${getLabel(specialSceneOptions, specialScene)}）`
      : getLabel(sceneOptions, scene);

  const moodLabel = getLabel(moodOptions, mood);
  const designTypeLabel = getLabel(designTypeOptions, designType);
  const shapeLabel = getLabel(shapeOptions, shape);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = buildPromptText(
      sceneLabel,
      moodLabel,
      designTypeLabel,
      shapeLabel
    );
    setPromptText(prompt);
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error(err);
      alert('コピーに失敗しました…（ブラウザの制限かもしれません）');
    }
  };

  return (
    <main
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '40px 16px 80px',
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* ページタイトル */}
      <section style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          無料AIデザイン診断
        </h1>
        <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7 }}>
          いくつかの質問に答えると、AIがあなたの好みに合わせてネイルチップのデザイン案を考えます。
          そのままオーダーできる形まで少しずつアップデートしていきます。
        </p>
      </section>

      {/* フォーム本体 */}
      <form onSubmit={handleSubmit}>
        {/* Q1 シーン */}
        <section style={baseCardStyle}>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            Q1. どんなシーンで使うネイル？
          </h2>
          <p style={{ fontSize: 13, color: '#777' }}>
            「特別な日」を選ぶと、さらに詳しくシーンを選べます。
          </p>

          <div style={cardGridStyle}>
            {sceneOptions.map((opt) => (
              <SelectCard
                key={opt.id}
                option={opt}
                selected={scene === opt.id}
                onClick={() => setScene(opt.id)}
              />
            ))}
          </div>

          {scene === 'special' && (
            <div style={{ marginTop: 16 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                特別な日の内容を教えてください
              </div>
              <div style={cardGridStyle}>
                {specialSceneOptions.map((opt) => (
                  <SelectCard
                    key={opt.id}
                    option={opt}
                    selected={specialScene === opt.id}
                    onClick={() => setSpecialScene(opt.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Q2 雰囲気 */}
        <section style={baseCardStyle}>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            Q2. なりたい雰囲気は？
          </h2>
          <p style={{ fontSize: 13, color: '#777' }}>
            直感で近いものを選んでください。ニュアンス系は「ふんわり」「抜け感」のある雰囲気です。
          </p>

          <div style={cardGridStyle}>
            {moodOptions.map((opt) => (
              <SelectCard
                key={opt.id}
                option={opt}
                selected={mood === opt.id}
                onClick={() => setMood(opt.id)}
              />
            ))}
          </div>
        </section>

        {/* Q3 デザインタイプ */}
        <section style={baseCardStyle}>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            Q3. 好きなデザインタイプは？
          </h2>
          <p style={{ fontSize: 13, color: '#777' }}>
            複数タイプが好きでも、今一番やってみたいテイストを選んでください。
          </p>

          <div style={cardGridStyle}>
            {designTypeOptions.map((opt) => (
              <SelectCard
                key={opt.id}
                option={opt}
                selected={designType === opt.id}
                onClick={() => setDesignType(opt.id)}
              />
            ))}
          </div>
        </section>

        {/* Q4 チップの形・長さ */}
        <section style={baseCardStyle}>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            Q4. チップの長さと形は？
          </h2>
          <p style={{ fontSize: 13, color: '#777' }}>
            後から変更もできるので、普段よく使う長さ・形を選んでください。
            <br />
            （今はテキスト表示だけですが、今後ここに実物イメージの画像を入れていきます）
          </p>

          <div style={cardGridStyle}>
            {shapeOptions.map((opt) => (
              <SelectCard
                key={opt.id}
                option={opt}
                selected={shape === opt.id}
                onClick={() => setShape(opt.id)}
              />
            ))}
          </div>
        </section>

        {/* 送信ボタン */}
        <div style={{ textAlign: 'center', marginTop: 24, marginBottom: 40 }}>
          <button
            type="submit"
            style={{
              display: 'inline-block',
              padding: '14px 40px',
              borderRadius: 999,
              border: 'none',
              background: 'linear-gradient(90deg, #ff8fb1, #ffb3c8)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 15,
              boxShadow: '0 10px 20px rgba(255, 143, 177, 0.25)',
              cursor: 'pointer',
            }}
          >
            デザイン案を見る
          </button>
          <p style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
            ※まだテスト版のため、この結果から直接オーダーはできません
          </p>
        </div>
      </form>

      {/* デザイン案エリア */}
      {showResult && (
        <>
          {/* AIデザイン案（説明） */}
          <section
            style={{
              ...baseCardStyle,
              background: '#fff7f9',
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              あなたへのAIデザイン案
            </h2>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8 }}>
              入力してもらった内容をもとに、こんなイメージのネイルチップを想定しています。
            </p>

            <ul
              style={{
                marginTop: 12,
                paddingLeft: 20,
                fontSize: 14,
                lineHeight: 1.8,
                color: '#444',
              }}
            >
              <li>
                シーン：
                <b>{sceneLabel}</b> に合わせたデザイン。
              </li>
              <li>
                雰囲気：
                <b>{moodLabel}</b> な印象になるよう、色味や質感を調整します。
              </li>
              <li>
                デザインタイプ：
                <b>{designTypeLabel}</b> をベースに、バランス良く配置します。
              </li>
              <li>
                チップ：
                <b>{shapeLabel}</b> を想定してデザインします。
              </li>
            </ul>

            <p
              style={{
                fontSize: 13,
                color: '#777',
                marginTop: 8,
              }}
            >
              ※今後は、ここに具体的な「デザイン案1〜3」の画像や詳細テキストが表示されるようにしていきます。
            </p>
          </section>

          {/* AIに送る指示テキスト */}
          <section
            style={{
              ...baseCardStyle,
              marginTop: 24,
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              AIに送る指示テキスト
            </h2>
            <p style={{ fontSize: 13, color: '#777', lineHeight: 1.7 }}>
              下のテキストをそのままコピーして、ChatGPT などのAIに貼り付けると、
              あなたの条件に合わせたネイルチップのデザイン案が返ってきます。
            </p>

            <textarea
              readOnly
              value={promptText}
              style={{
                width: '100%',
                minHeight: 190,
                marginTop: 12,
                padding: 12,
                borderRadius: 12,
                border: '1px solid #f0cdd8',
                fontSize: 13,
                lineHeight: 1.7,
                fontFamily:
                  'SFMono-Regular, ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                background: '#fffafc',
                whiteSpace: 'pre-wrap',
              }}
            />

            <div
              style={{
                marginTop: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  padding: '8px 16px',
                  borderRadius: 999,
                  border: 'none',
                  background: '#ff9fb6',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                テキストをコピー
              </button>
              <span
                style={{
                  fontSize: 12,
                  color: copied ? '#ff6f9b' : '#999',
                  transition: 'color 0.2s',
                }}
              >
                {copied ? 'コピーしました！' : '※AIチャットに貼り付けて使ってください'}
              </span>
            </div>
          </section>

          {/* 手の写真アップロード（ベータ） */}
          <section style={{ ...baseCardStyle, marginTop: 24 }}>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              手の写真から着画イメージを作る（ベータ）
            </h2>
            <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8 }}>
              指先が写った写真をアップロードすると、将来的には
              「あなたの手にネイルチップをつけたイメージ画像」をAIで生成できるようにしていきます。
              現在はテスト版として、アップロードした写真をプレビュー表示するところまでを想定しています。
            </p>

            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <button
                type="button"
                style={{
                  display: 'inline-block',
                  padding: '12px 28px',
                  borderRadius: 999,
                  border: '1px solid #ffb3c8',
                  background: '#fff',
                  color: '#ff6f9b',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                手の写真を選ぶ
              </button>
              <p
                style={{
                  fontSize: 12,
                  color: '#999',
                  marginTop: 8,
                }}
              >
                ※まだ動作しません。今後、画像アップロード &amp; AI生成機能を追加予定です。
              </p>
            </div>
          </section>

          {/* 選んだ条件まとめ */}
          <section
            style={{
              ...baseCardStyle,
              marginTop: 24,
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              選んだ条件まとめ
            </h2>

            <dl
              style={{
                fontSize: 14,
                lineHeight: 1.8,
              }}
            >
              <div style={{ marginBottom: 8 }}>
                <dt style={{ fontWeight: 600, color: '#777' }}>
                  どんなシーンで使うネイル？
                </dt>
                <dd>{sceneLabel}</dd>
              </div>

              <div style={{ marginBottom: 8 }}>
                <dt style={{ fontWeight: 600, color: '#777' }}>
                  なりたい雰囲気
                </dt>
                <dd>{moodLabel}</dd>
              </div>

              <div style={{ marginBottom: 8 }}>
                <dt style={{ fontWeight: 600, color: '#777' }}>
                  デザインタイプ
                </dt>
                <dd>{designTypeLabel}</dd>
              </div>

              <div style={{ marginBottom: 8 }}>
                <dt style={{ fontWeight: 600, color: '#777' }}>
                  チップの長さ・形
                </dt>
                <dd>{shapeLabel}</dd>
              </div>
            </dl>
          </section>
        </>
      )}
    </main>
  );
}
