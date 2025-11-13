'use client';

import { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type Question = {
  id: string;
  title: string;
  options: Option[];
};

const questions: Question[] = [
  {
    id: 'scene',
    title: 'どんなシーンで使うネイル？',
    options: [
      { label: '日常用', value: 'daily' },
      { label: '仕事', value: 'work' },
      { label: 'デート', value: 'date' },
      { label: '推し活・ライブ', value: 'oshi' },
      { label: '特別な日（結婚式・パーティーなど）', value: 'special' },
      { label: '写真映え重視', value: 'photo' },
      { label: 'おまかせ', value: 'any' },
    ],
  },
  {
    id: 'vibe',
    title: 'どんな雰囲気が近い？',
    options: [
      { label: 'かわいい・ガーリー', value: 'girly' },
      { label: '大人っぽい・上品', value: 'elegant' },
      { label: 'クール・モード', value: 'mode' },
      { label: '韓国っぽい', value: 'korean' },
      { label: '地雷・量産系', value: 'jirai' },
      { label: 'ナチュラル・シンプル', value: 'simple' },
      { label: 'おまかせ', value: 'any' },
    ],
  },
  {
    id: 'baseColor',
    title: 'ベースに使いたい色は？',
    options: [
      { label: 'ピンク系', value: 'pink' },
      { label: 'ベージュ・ブラウン系', value: 'beige' },
      { label: 'ホワイト・グレー系', value: 'white' },
      { label: 'ブルー・パープル系', value: 'blue' },
      { label: 'ブラック系', value: 'black' },
      { label: 'その他', value: 'other' },
      { label: 'おまかせ', value: 'any' },
    ],
  },
  {
    id: 'designType',
    title: 'デザインのタイプは？',
    options: [
      { label: 'ワンカラー', value: 'onecolor' },
      { label: 'グラデーション', value: 'grad' },
      { label: 'フレンチ', value: 'french' },
      { label: 'ラメ・ホロ多め', value: 'glitter' },
      { label: '柄・イラスト系', value: 'pattern' },
      { label: '韓国ネイル風', value: 'koreanStyle' },
      { label: 'おまかせ', value: 'any' },
    ],
  },
  {
    id: 'sparkle',
    title: 'ラメ・ストーン・パーツの量は？',
    options: [
      { label: 'できるだけ控えめ', value: 'low' },
      { label: 'ほどほど', value: 'medium' },
      { label: 'しっかり盛りたい', value: 'high' },
      { label: 'おまかせ', value: 'any' },
    ],
  },
  {
    id: 'lengthShape',
    title: '長さと形のイメージは？',
    options: [
      { label: 'ショート', value: 'short' },
      { label: 'ミディアム', value: 'medium' },
      { label: 'ロング', value: 'long' },
      { label: 'ラウンド', value: 'round' },
      { label: 'スクエア', value: 'square' },
      { label: 'バレリーナ・ポイント', value: 'ballerina' },
      { label: 'こだわりなし', value: 'any' },
    ],
  },
  {
    id: 'motif',
    title: '好きなモチーフがあれば教えて（なくてもOK）',
    options: [
      { label: 'ハート', value: 'heart' },
      { label: 'リボン', value: 'ribbon' },
      { label: 'フラワー', value: 'flower' },
      { label: 'アニマル柄', value: 'animal' },
      { label: 'マグネット / ミラー / オーロラ', value: 'effect' },
      { label: '特になし', value: 'none' },
      { label: 'おまかせ', value: 'any' },
    ],
  },
];

export default function TryPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[step];

  const handleSelect = (value: string) => {
    const q = questions[step];
    const nextAnswers = { ...answers, [q.id]: value };
    setAnswers(nextAnswers);

    if (step === questions.length - 1) {
      // 最後の質問に答えた
      setIsFinished(true);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 0) return;
    setStep(step - 1);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setIsFinished(false);
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
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>無料デザイン診断</h1>
      <p style={{ marginBottom: 24, color: '#555', lineHeight: 1.6 }}>
        いくつかの質問に答えると、あなたの好みに合った
        ネイルチップのデザイン条件がまとまります。
        （のちほどここからAIがデザイン案を生成する予定です）
      </p>

      {/* 質問ステップ or 結果 */}
      {!isFinished && currentQuestion && (
        <section
          style={{
            borderRadius: 16,
            border: '1px solid #eee',
            padding: 24,
            marginBottom: 24,
          }}
        >
          <p
            style={{
              fontSize: 14,
              marginBottom: 8,
              color: '#888',
            }}
          >
            質問 {step + 1} / {questions.length}
          </p>
          <h2 style={{ fontSize: 20, marginBottom: 16 }}>
            {currentQuestion.title}
          </h2>

          <div
            style={{
              display: 'grid',
              gap: 12,
            }}
          >
            {currentQuestion.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                style={{
                  textAlign: 'left',
                  padding: '12px 16px',
                  borderRadius: 999,
                  border: '1px solid #ddd',
                  backgroundColor: '#fff',
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div
            style={{
              marginTop: 16,
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 13,
            }}
          >
            <button
              onClick={handleBack}
              disabled={step === 0}
              style={{
                border: 'none',
                background: 'transparent',
                color: step === 0 ? '#ccc' : '#555',
                textDecoration: step === 0 ? 'none' : 'underline',
                cursor: step === 0 ? 'default' : 'pointer',
              }}
            >
              ← 前の質問に戻る
            </button>
            <span style={{ color: '#999' }}>
              タップすると次の質問に進みます
            </span>
          </div>
        </section>
      )}

      {isFinished && (
        <section
          style={{
            borderRadius: 16,
            border: '1px solid #eee',
            padding: 24,
            marginBottom: 24,
          }}
        >
          <h2 style={{ fontSize: 20, marginBottom: 16 }}>
            あなたのデザイン条件まとめ
          </h2>
          <p style={{ fontSize: 14, color: '#555', marginBottom: 16 }}>
            ここでは、選んだ条件を一覧で確認できます。
            この結果をもとに、次のステップでAIがデザイン案を
            自動生成できるようにしていきます。
          </p>

          <ul style={{ listStyle: 'none', padding: 0, fontSize: 14 }}>
            {questions.map((q) => {
              const opt = q.options.find(
                (o) => o.value === answers[q.id]
              );
              return (
                <li
                  key={q.id}
                  style={{
                    padding: '8px 0',
                    borderBottom: '1px solid #f3f3f3',
                  }}
                >
                  <div style={{ color: '#888', marginBottom: 2 }}>
                    {q.title}
                  </div>
                  <div style={{ fontWeight: 500 }}>
                    {opt ? opt.label : '未選択'}
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            onClick={handleRestart}
            style={{
              marginTop: 24,
              padding: '10px 20px',
              borderRadius: 999,
              border: '1px solid #333',
              backgroundColor: '#fff',
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            もう一度やり直す
          </button>
        </section>
      )}
    </main>
  );
}
