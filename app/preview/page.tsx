'use client';

import React, { useEffect, useState, ChangeEvent } from 'react';

type Answers = {
  scene?: string;
  sceneDetail?: string;
  mood?: string;
  color?: string;
  designType?: string;
  parts?: string;
  shape?: string;
};

// ラベル表示用（/try の選択肢と同じ ID にしてある前提）
type Option = { id: string; label: string };

const sceneOptions: Option[] = [
  { id: 'omakase', label: 'おまかせ' },
  { id: 'daily', label: '普段使い' },
  { id: 'office', label: 'オフィス' },
  { id: 'special', label: '特別な日' },
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
  { id: 'beige', label: 'ベージュ・ブラウン系' },
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
  { id: 'simple', label: 'パーツ控えめ・なし' },
  { id: 'rich', label: 'パーツしっかり' },
  { id: 'matte', label: 'マット仕上げ' },
  { id: 'glossy', label: 'ツヤツヤ仕上げ' },
  { id: 'parts_omakase', label: 'おまかせ' },
];

const shapeOptions: Option[] = [
  { id: 'short_oval', label: 'ショートオーバル（短めの楕円）' },
  { id: 'medium_oval', label: 'ミディアムオーバル' },
  { id: 'long_oval', label: 'ロングオーバル' },
  { id: 'short_square', label: 'ショートスクエア' },
  { id: 'natural', label: '自爪に近い形' },
  { id: 'shape_omakase', label: 'おまかせ' },
];

function getLabel(options: Option[], id?: string) {
  if (!id) return '未選択';
  const found = options.find((o) => o.id === id);
  return found ? found.label : id;
}

export default function PreviewPage() {
  const [answers, setAnswers] = useState<Answers | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem('nailmuse_order_answers');
    if (raw) {
      try {
        setAnswers(JSON.parse(raw));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleGoOrder = () => {
    if (typeof window === 'undefined') return;
    window.location.href = '/order';
  };

  return (
    <main
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '40px 16px 80px',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont',
      }}
    >
      <section style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          着画イメージプレビュー
        </h1>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.8,
            color: '#555',
          }}
        >
          手の写真をアップロードして、ネイルチップの位置やサイズを調整できます。
          <br />
          イメージを確認したあと、「この内容で注文内容を確認する」ボタンから次へ進んでください。
        </p>
      </section>

      {!answers && (
        <section
          style={{
            borderRadius: 24,
            padding: 24,
            background: '#fff7fa',
            border: '1px solid #ffe1ea',
            marginBottom: 32,
            fontSize: 14,
          }}
        >
          診断結果が見つかりませんでした。
          <br />
          お手数ですが、もう一度 AIデザイン診断からやり直してください。
        </section>
      )}

      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* 左：画像アップロード & プレビュー */}
        <div
          style={{
            borderRadius: 24,
            padding: 24,
            background: '#fff',
            boxShadow: '0 18px 40px rgba(255, 143, 190, 0.15)',
            border: '1px solid #ffe1ea',
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            手の写真をアップロード
          </h2>
          <p
            style={{
              fontSize: 13,
              color: '#777',
              marginBottom: 16,
              lineHeight: 1.7,
            }}
          >
            手の甲が写っている写真をアップロードしてください。
            <br />
            ネイルチップは中央あたりに重なるよう、位置とサイズを調整できます。
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginBottom: 16 }}
          />

          <div
            style={{
              borderRadius: 16,
              border: '1px dashed #ffd2e2',
              padding: 12,
              background: '#fff7fa',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '130%',
                borderRadius: 16,
                overflow: 'hidden',
                background: '#fdf2f7',
              }}
            >
              {imageUrl ? (
                <>
                  <img
                    src={imageUrl}
                    alt="手の写真プレビュー"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />

                  {/* ネイルチップの簡易オーバーレイ */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
                      width: 180,
                      height: 80,
                      borderRadius: 999,
                      border: '2px solid rgba(255, 143, 190, 0.9)',
                      background:
                        'linear-gradient(135deg, rgba(255, 210, 230, 0.7), rgba(255, 255, 255, 0.3))',
                      boxShadow: '0 8px 30px rgba(255, 143, 190, 0.4)',
                      pointerEvents: 'none',
                    }}
                  />
                </>
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    color: '#b28ca4',
                    padding: '0 16px',
                    textAlign: 'center',
                  }}
                >
                  まだ写真がアップロードされていません。
                  <br />
                  上のボタンから手の写真をアップしてください。
                </div>
              )}
            </div>

            {/* 位置・サイズ調整スライダー */}
            <div
              style={{
                marginTop: 16,
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 8,
                fontSize: 12,
                color: '#555',
              }}
            >
              <label>
                横位置（左右）：
                <input
                  type="range"
                  min={-120}
                  max={120}
                  value={offsetX}
                  onChange={(e) => setOffsetX(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </label>
              <label>
                縦位置（上下）：
                <input
                  type="range"
                  min={-120}
                  max={120}
                  value={offsetY}
                  onChange={(e) => setOffsetY(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </label>
              <label>
                サイズ：
                <input
                  type="range"
                  min={50}
                  max={150}
                  value={scale * 100}
                  onChange={(e) => setScale(Number(e.target.value) / 100)}
                  style={{ width: '100%' }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* 右：条件のまとめ & 次へボタン */}
        <div
          style={{
            borderRadius: 24,
            padding: 24,
            background: '#fff7fa',
            border: '1px solid #ffe1ea',
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            選んだ条件のまとめ
          </h2>

          {answers ? (
            <>
              <ul
                style={{
                  fontSize: 14,
                  color: '#555',
                  lineHeight: 1.9,
                  marginBottom: 20,
                }}
              >
                <li>
                  ・シーン：{getLabel(sceneOptions, answers.scene)}
                </li>
                <li>
                  ・雰囲気：{getLabel(moodOptions, answers.mood)}
                </li>
                <li>
                  ・ベースカラー：
                  {getLabel(colorOptions, answers.color)}
                </li>
                <li>
                  ・デザインタイプ：
                  {getLabel(designTypeOptions, answers.designType)}
                </li>
                <li>
                  ・パーツ・質感：
                  {getLabel(partsOptions, answers.parts)}
                </li>
                <li>
                  ・チップの形・長さ：
                  {getLabel(shapeOptions, answers.shape)}
                </li>
              </ul>

              <p
                style={{
                  fontSize: 12,
                  color: '#777',
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                ※この内容をもとに、次の画面でオーダー内容・価格の相談内容を確認できます。
              </p>

              <button
                type="button"
                onClick={handleGoOrder}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  borderRadius: 999,
                  border: 'none',
                  background:
                    'linear-gradient(90deg, #ff8fbf, #ff68a5)',
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 700,
                  boxShadow: '0 10px 24px rgba(255, 143, 190, 0.5)',
                  cursor: 'pointer',
                }}
              >
                この内容で注文内容を確認する
              </button>
            </>
          ) : (
            <p
              style={{
                fontSize: 13,
                color: '#777',
              }}
            >
              診断結果が読み込めませんでした。もう一度 AIデザイン診断をお試しください。
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
