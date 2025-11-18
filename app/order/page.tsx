'use client';

import React, { useEffect, useState } from 'react';

type Answers = {
  scene?: string;
  sceneDetail?: string;
  mood?: string;
  color?: string;
  designType?: string;
  parts?: string;
  shape?: string;
};

type Option = { id: string; label: string };

const sceneOptions: Option[] = [
  { id: 'omakase', label: 'おまかせ' },
  { id: 'daily', label: '普段使い' },
  { id: 'office', label: 'オフィス' },
  { id: 'special', label: '特別な日' },
];

const sceneDetailOptions: Option[] = [
  { id: 'bridal', label: 'ブライダル' },
  { id: 'seijin', label: '成人式' },
  { id: 'party', label: 'パーティー' },
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

export default function OrderPage() {
  const [answers, setAnswers] = useState<Answers | null>(null);

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

  const handleBackToPreview = () => {
    if (typeof window === 'undefined') return;
    window.history.back();
  };

  const handleContact = () => {
    // ここは後で Stripe / フォーム連携に差し替え予定
    alert(
      'この内容での正式なお申し込み・価格のご相談は、今後のアップデートで追加予定です🙇‍♀️'
    );
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
          オーダー内容の確認
        </h1>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.8,
            color: '#555',
          }}
        >
          AIデザイン診断と着画プレビューで選んだ内容をもとに、
          <br />
          実際にお作りするネイルチップの条件を確認できます。
        </p>
      </section>

      {!answers && (
        <section
          style={{
            borderRadius: 24,
            padding: 24,
            background: '#fff7fa',
            border: '1px solid #ffe1ea',
            fontSize: 14,
          }}
        >
          オーダー内容が見つかりませんでした。
          <br />
          お手数ですが、もう一度 AIデザイン診断からやり直してください。
        </section>
      )}

      {answers && (
        <section
          style={{
            borderRadius: 24,
            padding: 24,
            background: '#fff',
            border: '1px solid #ffe1ea',
            boxShadow: '0 18px 40px rgba(255, 143, 190, 0.12)',
            marginBottom: 32,
          }}
        >
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            デザイン条件の詳細
          </h2>

          <dl
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              rowGap: 10,
              columnGap: 16,
              fontSize: 14,
              color: '#555',
            }}
          >
            <dt style={{ fontWeight: 600 }}>シーン</dt>
            <dd>{getLabel(sceneOptions, answers.scene)}</dd>

            {answers.scene === 'special' && (
              <>
                <dt style={{ fontWeight: 600 }}>特別なシーン</dt>
                <dd>
                  {getLabel(sceneDetailOptions, answers.sceneDetail)}
                </dd>
              </>
            )}

            <dt style={{ fontWeight: 600 }}>雰囲気</dt>
            <dd>{getLabel(moodOptions, answers.mood)}</dd>

            <dt style={{ fontWeight: 600 }}>ベースカラー</dt>
            <dd>{getLabel(colorOptions, answers.color)}</dd>

            <dt style={{ fontWeight: 600 }}>デザインタイプ</dt>
            <dd>{getLabel(designTypeOptions, answers.designType)}</dd>

            <dt style={{ fontWeight: 600 }}>パーツ・質感</dt>
            <dd>{getLabel(partsOptions, answers.parts)}</dd>

            <dt style={{ fontWeight: 600 }}>チップの形・長さ</dt>
            <dd>{getLabel(shapeOptions, answers.shape)}</dd>
          </dl>

          <p
            style={{
              fontSize: 12,
              color: '#777',
              lineHeight: 1.8,
              marginTop: 20,
            }}
          >
            ※最終的なデザイン・料金は、実際のご希望の画像や長さ、サイズに応じてご相談のうえ決定いたします。
          </p>
        </section>
      )}

      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <button
          type="button"
          onClick={handleBackToPreview}
          style={{
            padding: '12px 24px',
            borderRadius: 999,
            border: '1px solid #e3d4e7',
            background: '#fff',
            fontSize: 14,
            fontWeight: 500,
            color: '#8c707b',
          }}
        >
          ← 着画プレビューに戻って修正する
        </button>

        <button
          type="button"
          onClick={handleContact}
          style={{
            padding: '14px 24px',
            borderRadius: 999,
            border: 'none',
            background: 'linear-gradient(90deg, #ff8fbf, #ff68a5)',
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            boxShadow: '0 10px 24px rgba(255, 143, 190, 0.5)',
            cursor: 'pointer',
          }}
        >
          この内容で相談したい（β版）
        </button>

        <p
          style={{
            fontSize: 11,
            color: '#888',
            marginTop: 4,
            lineHeight: 1.6,
          }}
        >
          ※現在はテスト運用中のため、正式なオンライン決済・カート機能は準備中です。
          <br />
          ※本サービスの販売条件・キャンセルポリシーは、特定商取引法に基づく表記・利用規約をご確認ください。
        </p>
      </section>
    </main>
  );
}
