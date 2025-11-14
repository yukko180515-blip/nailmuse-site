'use client';

import { useState, ChangeEvent } from 'react';

type Option = {
  label: string;
  value: string;
};

type Question = {
  id: string;
  title: string;
  options: Option[];
  dependsOn?: {
    id: string;
    value: string;
  };
};

const questions: Question[] = [
  {
    id: 'scene',
    title: 'どんなシーンで使うネイル？',
    options: [
      { label: '日常用', value: 'daily' },
      { label: '仕事', value: 'work' },
      { label: 'デート', value: 'date' },
      { label: '推し活・ライブ', value: 'live' },
      { label: '特別な日（結婚式・イベントなど）', value: 'special' },
      { label: '写真映え重視', value: 'photo' },
      { label: 'おまかせ', value: 'any' },
    ],
  },
  {
    id: 'specialDetail',
    title: '特別な日の用途を教えてください',
    dependsOn: { id: 'scene', value: 'special' },
    options: [
      { label: 'ブライダル', value: 'bridal' },
      { label: '前撮り・成人式', value: 'comingofage' },
      { label: 'パーティー / 同窓会', value: 'party' },
      { label: '発表会・ステージ', value: 'stage' },
      { label: 'その他の特別な日', value: 'otherSpecial' },
    ],
  },
  {
    id: 'vibe',
    title: 'どんな雰囲気が近い？',
    options: [
      { label: 'かわいい・ガーリー', value: 'cute' },
      { label: '大人っぽい・上品', value: 'elegant' },
      { label: 'クール・モード', value: 'cool' },
      { label: '韓国っぽい', value: 'korean' },
      { label: '地雷・量産系', value: 'jirai' },
      { label: 'ナチュラル・シンプル', value: 'natural' },
      { label: 'ニュアンス', value: 'nuance' }, // ★追加
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
      { label: 'ワンカラー', value: 'oneColor' },
      { label: 'グラデーション', value: 'gradation' },
      { label: 'フレンチ', value: 'french' },
      { label: 'ラメ・ホロ多め', value: 'glitter' },
      { label: '柄・イラスト系', value: 'pattern' },
      { label: '韓国ネイル風', value: 'koreanStyle' },
      { label: '和柄', value: 'wagara' },       // ★追加
      { label: 'マグネット', value: 'magnet' }, // ★追加
      { label: 'おまかせ', value: 'any' },
    ],
  },
  // Q5 は削除
  {
    id: 'lengthShape',
    title: '長さと形のイメージは？（近いものを選んでね）',
    options: [
      { label: 'ショート × ラウンド', value: 'short-round' },
      { label: 'ショート × スクエア', value: 'short-square' },
      { label: 'ミディアム × オーバル', value: 'medium-oval' },
      { label: 'ロング × バレリーナ / ポイント', value: 'long-ballerina' },
      { label: 'こだわりなし・おまかせ', value: 'any' },
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
      { label: 'マグネット / ミラー / オーロラ', value: 'magnetMirror' },
      { label: '特になし', value: 'none' },
      { label: 'おまかせ', value: 'any' },
    ],
  },
];

type Answers = {
  [key: string]: string | undefined;
};

function generateDesignIdeas(answers: Answers): string[] {
  const ideas: string[] = [];

  const scene = answers.scene;
  const vibe = answers.vibe;
  const baseColor = answers.baseColor;
  const designType = answers.designType;
  const lengthShape = answers.lengthShape;
  const motif = answers.motif;

  let mainLine = 'シーンに合った、';

  if (vibe === 'cute') mainLine += 'ガーリーでかわいい雰囲気の';
  else if (vibe === 'elegant') mainLine += '大人っぽく上品な雰囲気の';
  else if (vibe === 'cool') mainLine += 'クールでスタ性的な';
  else if (vibe === 'korean') mainLine += '韓国っぽいトレンド感のある';
  else if (vibe === 'nuance') mainLine += 'ニュアンス感たっぷりの';
  else if (vibe === 'natural') mainLine += 'ナチュラルで普段使いしやすい';
  else mainLine += 'バランスよく仕上げた';

  mainLine += 'ネイルチップをご提案します。';

  if (baseColor && baseColor !== 'any') {
    const colorLabelMap: Record<string, string> = {
      pink: 'ピンク系',
      beige: 'ベージュ・ブラウン系',
      white: 'ホワイト・グレー系',
      blue: 'ブルー・パープル系',
      black: 'ブラック系',
      other: 'お好みのカラー',
    };
    const label = colorLabelMap[baseColor] ?? 'お好みのカラー';
    mainLine += ` ベースカラーは「${label}」をメインに想定しています。`;
  }

  if (scene === 'special' && answers.specialDetail) {
    const detailLabelMap: Record<string, string> = {
      bridal: 'ブライダル',
      comingofage: '前撮り・成人式',
      party: 'パーティー / 同窓会',
      stage: '発表会・ステージ',
      otherSpecial: 'その他の特別な日',
    };
    const detailLabel = detailLabelMap[answers.specialDetail] ?? '特別な日';
    mainLine += ` 特に「${detailLabel}」に合う華やかさと上品さを意識します。`;
  }

  ideas.push(mainLine);

  if (designType === 'wagara') {
    ideas.push('和柄モチーフをさりげなく取り入れた、写真映えする和テイストデザイン。');
  } else if (designType === 'magnet') {
    ideas.push('マグネットのきらめきを活かした、角度によって表情が変わるうるツヤネイル。');
  } else if (designType === 'gradation') {
    ideas.push('指先がきれいに見えるグラデーションで、オンオフともに使いやすい仕上がりに。');
  } else if (designType === 'french') {
    ideas.push('先端にさりげなくポイントを置いたフレンチデザインで、上品に指先を強調。');
  }

  if (lengthShape && lengthShape !== 'any') {
    const lengthLabelMap: Record<string, string> = {
      'short-round': 'ショート × ラウンド',
      'short-square': 'ショート × スクエア',
      'medium-oval': 'ミディアム × オーバル',
      'long-ballerina': 'ロング × バレリーナ / ポイント',
    };
    const lengthLabel = lengthLabelMap[lengthShape] ?? lengthShape;
    ideas.push(`チップの長さ・形は「${lengthLabel}」のイメージでデザインします。`);
  }

  if (motif && motif !== 'none' && motif !== 'any') {
    const motifLabelMap: Record<string, string> = {
      heart: 'ハート',
      ribbon: 'リボン',
      flower: 'フラワー',
      animal: 'アニマル柄',
      magnetMirror: 'マグネット / ミラー / オーロラ',
    };
    const label = motifLabelMap[motif] ?? motif;
    ideas.push(`ワンポイントで「${label}」モチーフを入れて、さりげなく個性をプラスします。`);
  }

  if (ideas.length === 0) {
    ideas.push('入力いただいた条件をもとに、バランスの良いネイルチップデザインをご提案します。');
  }

  return ideas;
}

export default function TryPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isFinished, setIsFinished] = useState(false);
  const [handImage, setHandImage] = useState<string | null>(null);

  const visibleQuestions = questions.filter((q) => {
    if (!q.dependsOn) return true;
    const depValue = answers[q.dependsOn.id];
    return depValue === q.dependsOn.value;
  });

  const currentQuestion = visibleQuestions[step];

  const handleSelect = (value: string) => {
    const q = currentQuestion;
    if (!q) return;

    const nextAnswers: Answers = {
      ...answers,
      [q.id]: value,
    };
    setAnswers(nextAnswers);

    if (step === visibleQuestions.length - 1) {
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
    setHandImage(null);
  };

  const handleHandImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setHandImage(url);
  };

  const designIdeas = isFinished ? generateDesignIdeas(answers) : [];

  return (
    <main
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '40px 16px 80px',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>無料デザイン診断</h1>
      <p style={{ marginBottom: 24, fontSize: 14, lineHeight: 1.7 }}>
        いくつかの質問に答えると、AIがあなたの好みに合わせたネイルチップのデザイン条件を整理し、
        テキストでデザイン案をお出しします。今後はここからそのままオーダーできるようにしていきます。
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
            質問 {step + 1} / {visibleQuestions.length}
          </p>
          <h2 style={{ fontSize: 20, marginBottom: 16 }}>{currentQuestion.title}</h2>

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
            <span style={{ color: '#888' }}>タップすると次の質問に進みます</span>
          </div>
        </section>
      )}

      {/* 結果＆着画アップロードエリア */}
      {isFinished && (
        <section
          style={{
            borderRadius: 16,
            border: '1px solid #eee',
            padding: 24,
            marginBottom: 24,
          }}
        >
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>あなたへのAIデザイン案</h2>
          <p style={{ fontSize: 14, marginBottom: 16 }}>
            入力してもらった内容をもとに、こんなイメージのネイルチップを想定しています。
          </p>

          <ul style={{ listStyle: 'disc', paddingLeft: 20, marginBottom: 24 }}>
            {designIdeas.map((idea, i) => (
              <li key={i} style={{ marginBottom: 8, fontSize: 14 }}>
                {idea}
              </li>
            ))}
          </ul>

          <hr style={{ margin: '16px 0' }} />

          <h3 style={{ fontSize: 18, marginBottom: 8 }}>手の写真から着画イメージを作る（ベータ）</h3>
          <p style={{ fontSize: 13, marginBottom: 12, color: '#666' }}>
            指先が写った写真をアップロードすると、
            将来的には「あなたの手にネイルチップをつけたイメージ画像」をAIで生成できるようにしていきます。
            現在はテスト版として、アップロードした写真をプレビュー表示しています。
          </p>

          <label
            style={{
              display: 'inline-block',
              padding: '10px 18px',
              borderRadius: 999,
              border: '1px solid #ff9cae',
              background: '#ffeef2',
              fontSize: 14,
              cursor: 'pointer',
              marginBottom: 16,
            }}
          >
            手の写真を選ぶ
            <input
              type="file"
              accept="image/*"
              onChange={handleHandImageChange}
              style={{ display: 'none' }}
            />
          </label>

          {handImage && (
            <div
              style={{
                marginTop: 12,
                borderRadius: 12,
                border: '1px solid #eee',
                padding: 12,
              }}
            >
              <p style={{ fontSize: 13, marginBottom: 8, color: '#666' }}>
                現在はアップロードした写真そのものを表示しています。
                今後ここに「ネイルチップを装着した着画イメージ」を表示できるように開発していきます。
              </p>
              <img
                src={handImage}
                alt="hand preview"
                style={{
                  width: '100%',
                  maxHeight: 320,
                  objectFit: 'contain',
                  borderRadius: 8,
                }}
              />
            </div>
          )}

          <h3 style={{ fontSize: 18, marginTop: 24, marginBottom: 8 }}>選んだ条件まとめ</h3>
          <p style={{ fontSize: 13, marginBottom: 8, color: '#666' }}>
            ここでは、選んだ条件を一覧で確認できます。
          </p>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: 14 }}>
            {questions
              .filter((q) => answers[q.id])
              .map((q) => {
                const opt = q.options.find((o) => o.value === answers[q.id]);
                return (
                  <li
                    key={q.id}
                    style={{
                      padding: '8px 0',
                      borderBottom: '1px solid #f2f2f2',
                    }}
                  >
                    <div style={{ color: '#999', marginBottom: 2 }}>{q.title}</div>
                    <div>{opt ? opt.label : answers[q.id]}</div>
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
