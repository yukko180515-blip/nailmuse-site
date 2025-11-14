'use client';

import React, { useState } from 'react';

type QuestionId = 'scene' | 'mood' | 'color' | 'designType' | 'parts' | 'shape';

type Option = {
  id: string;
  label: string;
  description?: string;
};

type Answers = {
  scene?: string;
  sceneDetail?: string;
  mood?: string;
  color?: string;
  designType?: string;
  parts?: string;
  shape?: string;
};

const sceneOptions: Option[] = [
  { id: 'omakase', label: 'おまかせ' },
  { id: 'daily', label: '普段使い' },
  { id: 'office', label: 'オフィス' },
  { id: 'special', label: '特別な日' },
];

const sceneDetailOptions: Option[] = [
  { id: 'bridal', label: 'ブライダル' },
  { id: 'seijin', label: '成人式' },
  { id: 'party', label: 'パーティー・イベント' },
  { id: 'live', label: '推し活・ライブ' },
];

const moodOptions: Option[] = [
  { id: 'cute', label: 'かわいい' },
  { id: 'clean', label: 'きれいめ' },
  { id: 'adult', label: '大人っぽい' },
  { id: 'feminine', label: 'フェミニン' },
  { id: 'cool', label: 'クール' },
  { id: 'nuance', label: 'ニュアンス' },
];

const colorOptions: Option[] = [
  { id: 'beige', label: 'ベージュ・ブラウン' },
  { id: 'pink', label: 'ピンク' },
  { id: 'white', label: 'ホワイト・クリア' },
  { id: 'gray', label: 'グレー' },
  { id: 'colorful', label: 'カラフル' },
  { id: 'color_omakase', label: 'おまかせ' },
];

const designTypeOptions: Option[] = [
  { id: 'onecolor', label: 'ワンカラー' },
  { id: 'gradation', label: 'グラデーション' },
  { id: 'french', label: 'フレンチ' },
  { id: 'glitter', label: 'ラメ・ホロ' },
  { id: 'nuance_design', label: 'ニュアンス' },
  { id: 'flower', label: 'フラワー' },
  { id: 'pattern', label: '柄・アート' },
  { id: 'wagara', label: '和柄' },
  { id: 'magnet', label: 'マグネット' },
];

const partsOptions: Option[] = [
  { id: 'simple', label: 'パーツ控えめ' },
  { id: 'rich', label: 'パーツしっかり' },
  { id: 'matte', label: 'マット仕上げ' },
  { id: 'glossy', label: 'ツヤツヤ仕上げ' },
  { id: 'parts_omakase', label: 'おまかせ' },
];

const shapeOptions: Option[] = [
  { id: 'short_oval', label: 'ショートオーバル' },
  { id: 'medium_oval', label: 'ミディアムオーバル' },
  { id: 'long_oval', label: 'ロングオーバル' },
  { id: 'short_square', label: 'ショートスクエア' },
  { id: 'natural', label: '自爪に近い長さ' },
  { id: 'shape_omakase', label: 'おまかせ' },
];

const steps: { id: QuestionId; title: string; caption: string }[] = [
  {
    id: 'scene',
    title: 'どんなシーンで使うネイル？',
    caption: '普段使いか、特別な日かでデザインの雰囲気が変わります。',
  },
  {
    id: 'mood',
    title: 'なりたい雰囲気は？',
    caption: 'パッと見たときの印象に一番近いものを選んでください。',
  },
  {
    id: 'color',
    title: '好きなカラー・トーンは？',
    caption: '肌なじみ重視か、色で遊びたいかをイメージしてみてください。',
  },
  {
    id: 'designType',
    title: 'デザインのタイプは？',
    caption: 'やってみたいデザインがあれば選んでください。',
  },
  {
    id: 'parts',
    title: 'パーツや質感の好みは？',
    caption: 'キラキラ・マットなど、仕上がりの雰囲気です。',
  },
  {
    id: 'shape',
    title: 'チップの形・長さのイメージは？',
    caption: '普段の生活やお仕事で使いやすそうな長さを選んでください。',
  },
];

const TOTAL_STEPS = steps.length;

export default function TryPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [hasFinished, setHasFinished] = useState(false);

  const currentStep = steps[currentStepIndex];

  const handleOptionClick = (questionId: QuestionId, value: string) => {
    setAnswers((prev) => {
      const next: Answers = { ...prev };

      if (questionId === 'scene') {
        next.scene = value;
        // 特別な日以外を選んだときは詳細をクリア
        if (value !== 'special') {
          next.sceneDetail = undefined;
        }
      } else {
        (next as any)[questionId] = value;
      }

      return next;
    });
  };

  const handleSceneDetailClick = (value: string) => {
    setAnswers((prev) => ({ ...prev, sceneDetail: value }));
  };

  const canGoNext = () => {
    if (currentStep.id === 'scene') {
      if (!answers.scene) return false;
      if (answers.scene === 'special' && !answers.sceneDetail) return false;
      return true;
    }
    return Boolean((answers as any)[currentStep.id]);
  };

  const handleNext = () => {
    if (!canGoNext()) return;

    if (currentStepIndex < TOTAL_STEPS - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setHasFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex === 0) return;
    setCurrentStepIndex((prev) => prev - 1);
  };

  const progressPercent = hasFinished
    ? 100
    : Math.round(((currentStepIndex + 1) / TOTAL_STEPS) * 100);

  return (
    <main
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '40px 16px 80px',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* タイトル */}
      <section style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: '0.08em',
            marginBottom: 8,
          }}
        >
          AIデザイン診断
        </h1>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.8,
            color: '#555',
          }}
        >
          いくつかの質問に答えるだけで、あなたに似合うネイルチップの
          <br />
          デザイン条件とイメージ案をまとめます。
        </p>
      </section>

      {/* 進捗バー */}
      <section
        style={{
          marginBottom: 24,
          padding: '16px 20px',
          borderRadius: 999,
          border: '1px solid #ffe1ea',
          background: '#fff7fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, color: '#b6657a' }}>
          質問 {hasFinished ? TOTAL_STEPS : currentStepIndex + 1} / {TOTAL_STEPS}
        </div>
        <div
          style={{
            flex: 1,
            height: 8,
            borderRadius: 999,
            background: '#ffe5ef',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              borderRadius: 999,
              background:
                'linear-gradient(90deg, #ff9bb4, #ff7faa)',
              transition: 'width 0.25s ease-out',
            }}
          />
        </div>
        <div style={{ fontSize: 12, color: '#b6657a', minWidth: 48, textAlign: 'right' }}>
          {progressPercent}%
        </div>
      </section>

      {/* 質問ステップ or 結果 */}
      {!hasFinished ? (
        <QuestionStep
          step={currentStep}
          answers={answers}
          onOptionClick={handleOptionClick}
          onSceneDetailClick={handleSceneDetailClick}
          onNext={handleNext}
          onPrev={handlePrev}
          canGoNext={canGoNext()}
        />
      ) : (
        <ResultSection answers={answers} />
      )}
    </main>
  );
}

type QuestionStepProps = {
  step: (typeof steps)[number];
  answers: Answers;
  onOptionClick: (id: QuestionId, value: string) => void;
  onSceneDetailClick: (value: string) => void;
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
};

function QuestionStep(props: QuestionStepProps) {
  const { step, answers, onOptionClick, onSceneDetailClick, onNext, onPrev, canGoNext } =
    props;

  const renderOptions = () => {
    switch (step.id) {
      case 'scene':
        return (
          <>
            <OptionGrid
              options={sceneOptions}
              selectedId={answers.scene}
              onSelect={(v) => onOptionClick('scene', v)}
            />
            {answers.scene === 'special' && (
              <div style={{ marginTop: 24 }}>
                <p
                  style={{
                    fontSize: 13,
                    color: '#b6657a',
                    marginBottom: 8,
                    fontWeight: 600,
                  }}
                >
                  特別な日のシーンを教えてください
                </p>
                <OptionGrid
                  options={sceneDetailOptions}
                  selectedId={answers.sceneDetail}
                  onSelect={(v) => onSceneDetailClick(v)}
                />
              </div>
            )}
          </>
        );
      case 'mood':
        return (
          <OptionGrid
            options={moodOptions}
            selectedId={answers.mood}
            onSelect={(v) => onOptionClick('mood', v)}
          />
        );
      case 'color':
        return (
          <OptionGrid
            options={colorOptions}
            selectedId={answers.color}
            onSelect={(v) => onOptionClick('color', v)}
          />
        );
      case 'designType':
        return (
          <OptionGrid
            options={designTypeOptions}
            selectedId={answers.designType}
            onSelect={(v) => onOptionClick('designType', v)}
          />
        );
      case 'parts':
        return (
          <OptionGrid
            options={partsOptions}
            selectedId={answers.parts}
            onSelect={(v) => onOptionClick('parts', v)}
          />
        );
      case 'shape':
        return (
          <OptionGrid
            options={shapeOptions}
            selectedId={answers.shape}
            onSelect={(v) => onOptionClick('shape', v)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section
      style={{
        borderRadius: 32,
        padding: '28px 20px 24px',
        background: '#fff7fa',
        border: '1px solid #ffe1ea',
        boxShadow: '0 18px 40px rgba(255, 143, 179, 0.16)',
      }}
    >
      <h2
        style={{
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 4,
        }}
      >
        {step.title}
      </h2>
      <p
        style={{
          fontSize: 13,
          color: '#777',
          marginBottom: 20,
          lineHeight: 1.8,
        }}
      >
        {step.caption}
      </p>

      {/* ここが選択肢 */}
      {renderOptions()}

      {/* 参考画像エリア（あとでSNS画像を入れる場所） */}
      <div
        style={{
          marginTop: 24,
          padding: 16,
          borderRadius: 16,
          border: '1px dashed #ffd1e0',
          background: '#fff',
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: '#b28b96',
            marginBottom: 4,
            fontWeight: 600,
          }}
        >
          参考ネイルイメージ（準備中）
        </p>
        <p
          style={{
            fontSize: 12,
            color: '#b28b96',
            lineHeight: 1.6,
          }}
        >
          今後ここに、SNSで人気のネイルチップ写真（同じ角度で撮影されたもの）を
          表示して、イメージしながら選べるようにしていきます。
        </p>
      </div>

      {/* 次へ / 戻る */}
      <div
        style={{
          marginTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <button
          type="button"
          onClick={onPrev}
          disabled={false}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: 999,
            border: '1px solid #e3d4da',
            background: '#fff',
            fontSize: 14,
            fontWeight: 500,
            color: '#8c707b',
          }}
        >
          ← 前の質問へ
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: 999,
            border: 'none',
            background: canGoNext
              ? 'linear-gradient(90deg, #ff93b0, #ff7aa7)'
              : '#f3ccd9',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            boxShadow: canGoNext ? '0 10px 24px rgba(255, 137, 176, 0.45)' : 'none',
          }}
        >
          {step.id === 'shape' ? '結果を見る' : '次の質問へ →'}
        </button>
      </div>
    </section>
  );
}

type OptionGridProps = {
  options: Option[];
  selectedId?: string;
  onSelect: (value: string) => void;
};

function OptionGrid({ options, selectedId, onSelect }: OptionGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: 12,
      }}
    >
      {options.map((opt) => {
        const selected = opt.id === selectedId;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelect(opt.id)}
            style={{
              padding: '10px 12px',
              borderRadius: 999,
              border: selected ? '1px solid #ff7aa7' : '1px solid #f0d9e2',
              background: selected ? 'rgba(255, 155, 180, 0.12)' : '#fff',
              fontSize: 13,
              fontWeight: selected ? 600 : 500,
              color: selected ? '#b0426f' : '#654b57',
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

type ResultSectionProps = {
  answers: Answers;
};

function ResultSection({ answers }: ResultSectionProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 8 }}>
      {/* あなたへのAIデザイン案 */}
      <section
        style={{
          borderRadius: 32,
          padding: '28px 20px',
          background: '#fff7fa',
          border: '1px solid #ffe1ea',
          boxShadow: '0 18px 40px rgba(255, 143, 179, 0.16)',
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
        <p
          style={{
            fontSize: 13,
            color: '#777',
            marginBottom: 16,
            lineHeight: 1.8,
          }}
        >
          入力してもらった内容をもとに、こんなイメージのネイルチップを想定しています。
        </p>
        <ul
          style={{
            fontSize: 14,
            color: '#444',
            lineHeight: 1.8,
            paddingLeft: 20,
          }}
        >
          <li>
            シーンに合った雰囲気で、{answers.mood ? `${answers.mood}テイスト` : 'バランスの良いテイスト'}
            のネイルチップをご提案します。
          </li>
          <li>
            ベースカラーは
            {answers.color ? answers.color : '肌なじみの良いトーン'}
            を中心に、手元がきれいに見える配色にします。
          </li>
          <li>
            デザインは
            {answers.designType ? answers.designType : 'シンプル〜ニュアンス'}
            をベースに、{answers.parts ? answers.parts : '程よいパーツ感'}で仕上げます。
          </li>
        </ul>
      </section>

      {/* 手の写真アップロードの案内（ベータ） */}
      <section
        style={{
          borderRadius: 32,
          padding: '24px 20px',
          background: '#fff',
          border: '1px solid #f0dde5',
        }}
      >
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          手の写真から着画イメージを作る（ベータ）
        </h3>
        <p
          style={{
            fontSize: 13,
            color: '#666',
            lineHeight: 1.8,
            marginBottom: 16,
          }}
        >
          指先が写った写真をアップロードすると、将来的には
          「あなたの手にネイルチップをつけたイメージ画像」を
          AIで生成できるようにしていきます。
          <br />
          現在はテスト版として、アップロードした写真をプレビュー表示しています。
        </p>
        <button
          type="button"
          style={{
            display: 'inline-block',
            padding: '12px 20px',
            borderRadius: 999,
            border: 'none',
            background: 'linear-gradient(90deg, #ff93b0, #ff7aa7)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            boxShadow: '0 10px 24px rgba(255, 137, 176, 0.45)',
          }}
        >
          手の写真を選ぶ
        </button>
      </section>

      {/* 選んだ条件まとめ */}
      <section
        style={{
          borderRadius: 32,
          padding: '24px 20px',
          background: '#fff',
          border: '1px solid #f0dde5',
        }}
      >
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          選んだ条件まとめ
        </h3>
        <div style={{ fontSize: 14, color: '#444', lineHeight: 1.9 }}>
          <p>
            <strong>シーン：</strong>
            {answers.scene
              ? answers.scene === 'special' && answers.sceneDetail
                ? `特別な日（${answers.sceneDetail}）`
                : answers.scene
              : '未入力'}
          </p>
          <p>
            <strong>雰囲気：</strong>
            {answers.mood ?? '未入力'}
          </p>
          <p>
            <strong>カラー：</strong>
            {answers.color ?? '未入力'}
          </p>
          <p>
            <strong>デザインタイプ：</strong>
            {answers.designType ?? '未入力'}
          </p>
          <p>
            <strong>パーツ・質感：</strong>
            {answers.parts ?? '未入力'}
          </p>
          <p>
            <strong>チップの形・長さ：</strong>
            {answers.shape ?? '未入力'}
          </p>
        </div>
      </section>
    </div>
  );
}
