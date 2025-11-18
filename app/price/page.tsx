'use client';

import React, { useEffect, useState } from 'react';

type Answers = {
  scene?: string;
  sceneDetail?: string;
  mood?: string;
  baseColor?: string;
  designType?: string;
  parts?: string;
  shape?: string;
};

// 診断結果のID → 日本語ラベル
const SCENE_LABELS: Record<string, string> = {
  omakase: 'おまかせ',
  daily: '普段使い',
  office: 'オフィス',
  special: '特別な日',
};

const SCENE_DETAIL_LABELS: Record<string, string> = {
  bridal: 'ブライダル',
  seijin: '成人式',
  party: 'パーティー',
  live: '推し活・ライブ',
};

const MOOD_LABELS: Record<string, string> = {
  cute: 'かわいい',
  clean: 'きれいめ',
  adult: '大人っぽい',
  feminine: 'フェミニン',
  cool: 'クール',
  nuance: 'ニュアンス',
};

const COLOR_LABELS: Record<string, string> = {
  beige: 'ベージュ・ブラウン系',
  pink: 'ピンク',
  white: 'ホワイト・クリア',
  gray: 'グレー',
  colorful: 'カラフル',
  color_omakase: 'おまかせ',
};

const DESIGN_LABELS: Record<string, string> = {
  onecolor: 'ワンカラー',
  gradation: 'グラデーション',
  french: 'フレンチ',
  glitter: 'ラメ・ホロ',
  nuance_design: 'ニュアンス',
  flower: 'フラワー',
  pattern: '柄・アート',
  wagara: '和柄',
  magnet: 'マグネット',
};

const PARTS_LABELS: Record<string, string> = {
  simple: 'パーツ控えめ・なし',
  rich: 'パーツしっかりめ',
  matte: 'マット仕上げ',
  glossy: 'ツヤツヤ仕上げ',
  parts_omakase: 'おまかせ',
};

const SHAPE_LABELS: Record<string, string> = {
  short_oval: 'ショートオーバル（短めの楕円）',
  medium_oval: 'ミディアムオーバル（標準的な長さ）',
  long_oval: 'ロングオーバル（長めの楕円）',
  short_square: 'ショートスクエア（四角め・短め）',
  natural: '自爪に近い形',
  shape_omakase: 'おまかせ',
};

type BudgetOption = {
  id: string;
  label: string;
};

const BUDGET_OPTIONS: BudgetOption[] = [
  { id: 'under6000', label: '〜 ¥6,000 くらいまで' },
  { id: '6000to8000', label: '¥6,000 〜 ¥8,000くらい' },
  { id: '8000to10000', label: '¥8,000 〜 ¥10,000くらい' },
  { id: 'over10000', label: '¥10,000以上でもOK' },
  { id: 'ask', label: 'まだ決めていない・相談したい' },
];

function toLabel(map: Record<string, string>, value?: string) {
  if (!value) return '未選択';
  return map[value] ?? value;
}

export default function PricePage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // ローカルストレージから診断結果を読み込み
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = window.localStorage.getItem('nailmuse_order_answers');
      if (saved) {
        const parsed = JSON.parse(saved);
        setAnswers(parsed);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget) {
      alert('ご予算の目安を選択してください。');
      return;
    }
    setSubmitted(true);
    alert(
      '価格のご相談ありがとうございます！\nこの内容はまだ送信されていません。\nこの画面をスクリーンショットして、\nLINE や Instagram からお送りください。'
    );
  };

  const handleBackToOrder = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/order';
    }
  };

  const handleBackToTry = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/try';
    }
  };

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
      <section style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: '0.08em',
            marginBottom: 8,
          }}
        >
          価格のご相談
        </h1>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.8,
            color: '#555',
          }}
        >
          AIデザイン診断とオーダー内容をもとに、
          ご予算やこだわりを伺いながら最適なネイルチップのプランをご提案します。
        </p>
      </section>

      {/* 診断結果のサマリー */}
      <section
        style={{
          marginBottom: 24,
          padding: '24px 20px',
          borderRadius: 24,
          background: '#fff7fa',
          border: '1px solid #ffe1ea',
          boxShadow: '0 12px 32px rgba(255,143,171,0.12)',
        }}
      >
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          診断結果のまとめ（ダイジェスト）
        </h2>
        <ul
          style={{
            fontSize: 14,
            color: '#555',
            lineHeight: 1.8,
            paddingLeft: 16,
          }}
        >
          <li>
            ・シーン：{toLabel(SCENE_LABELS, answers.scene)}
            {answers.scene === 'special' && answers.sceneDetail
              ? `（${toLabel(SCENE_DETAIL_LABELS, answers.sceneDetail)}）`
              : null}
          </li>
          <li>・雰囲気：{toLabel(MOOD_LABELS, answers.mood)}</li>
          <li>・ベースカラー：{toLabel(COLOR_LABELS, answers.baseColor)}</li>
          <li>・デザインタイプ：{toLabel(DESIGN_LABELS, answers.designType)}</li>
          <li>・パーツ・質感：{toLabel(PARTS_LABELS, answers.parts)}</li>
          <li>・チップの形・長さ：{toLabel(SHAPE_LABELS, answers.shape)}</li>
        </ul>
      </section>

      {/* 価格相談フォーム */}
      <section
        style={{
          padding: '24px 20px',
          borderRadius: 24,
          background: '#ffffff',
          border: '1px solid #f3ccd9',
          boxShadow: '0 12px 32px rgba(220,124,160,0.12)',
        }}
      >
        <h2
          style={{
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          ご希望の価格・相談内容
        </h2>

        <form onSubmit={handleSubmit}>
          {/* ご予算 */}
          <div style={{ marginBottom: 20 }}>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              ご予算の目安 <span style={{ color: '#e85a89' }}>※必須</span>
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 12,
              }}
            >
              {BUDGET_OPTIONS.map((opt) => {
                const selected = budget === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setBudget(opt.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 999,
                      border: selected ? 'none' : '1px solid #f3ccd9',
                      background: selected
                        ? 'linear-gradient(90deg, #ff8db8, #ff6bb2)'
                        : '#fff',
                      color: selected ? '#fff' : '#b02872',
                      fontSize: 13,
                      fontWeight: 600,
                      boxShadow: selected
                        ? '0 10px 24px rgba(255,105,180,0.35)'
                        : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease-out',
                      textAlign: 'center',
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* こだわり・相談したいこと */}
          <div style={{ marginBottom: 20 }}>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              デザインや予算について相談したいこと
            </p>
            <p
              style={{
                fontSize: 12,
                color: '#777',
                marginBottom: 8,
                lineHeight: 1.6,
              }}
            >
              例：できればこの金額以内に収めたい／普段使っているブランドの雰囲気に合わせたい／
              推しカラーをどこかに入れたい など。
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="自由にご記入ください。空欄でもOKです。"
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: 13,
                borderRadius: 12,
                border: '1px solid #e3c7d9',
                resize: 'vertical',
                outline: 'none',
                lineHeight: 1.6,
              }}
            />
          </div>

          {/* お名前・連絡先（任意） */}
          <div style={{ marginBottom: 20 }}>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              お名前（ニックネーム可） <span style={{ fontSize: 12, color: '#999' }}>任意</span>
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例）ゆっこ"
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: 13,
                borderRadius: 999,
                border: '1px solid #e3c7d9',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              ご連絡先（Instagram / LINE / メールなど）
              <span style={{ fontSize: 12, color: '#999' }}> 任意</span>
            </p>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="例）Instagram @nailmuse / LINE ID など"
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: 13,
                borderRadius: 999,
                border: '1px solid #e3c7d9',
                outline: 'none',
              }}
            />
          </div>

          {/* 注意書き */}
          <p
            style={{
              fontSize: 11,
              color: '#888',
              marginBottom: 16,
              lineHeight: 1.7,
            }}
          >
            ※このページでは、まだオンライン決済は行われません。
            <br />
            ※「この内容で相談する」ボタンを押したあと、
            表示された内容をスクリーンショットして、LINE／Instagramなどからお送りください。
          </p>

          {/* ボタン群 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <button
              type="submit"
              style={{
                padding: '12px 26px',
                borderRadius: 999,
                border: 'none',
                background: 'linear-gradient(90deg, #ff8db8, #ff6bb2)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 700,
                boxShadow: '0 10px 24px rgba(255,105,180,0.35)',
                cursor: 'pointer',
              }}
            >
              この内容で相談する（スクショ用）
            </button>

            <button
              type="button"
              onClick={handleBackToOrder}
              style={{
                padding: '10px 24px',
                borderRadius: 999,
                border: '1px solid #e3c7d9',
                background: '#fff',
                color: '#8c707b',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              注文内容の確認ページに戻る
            </button>

            <button
              type="button"
              onClick={handleBackToTry}
              style={{
                padding: '10px 24px',
                borderRadius: 999,
                border: 'none',
                background: '#f6f2f7',
                color: '#a0889b',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              最初から診断をやり直す
            </button>
          </div>

          {submitted && (
            <p
              style={{
                marginTop: 16,
                fontSize: 12,
                color: '#b02872',
                lineHeight: 1.8,
              }}
            >
              ありがとうございます！
              <br />
              このページの内容をスクリーンショットして、LINE / Instagram / メールなどからお送りください。
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
