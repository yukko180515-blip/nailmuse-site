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

export default function OrderPage() {
  const [answers, setAnswers] = useState<Answers | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const raw = window.localStorage.getItem('nailmuse_order_answers');
      if (raw) {
        try {
          setAnswers(JSON.parse(raw));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  return (
    <main
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '40px 16px 80px',
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Yu Gothic", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
      }}
    >
      <section style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          オーダー内容の確認
        </h1>
        <p
          style={{
            fontSize: 13,
            color: '#555',
            lineHeight: 1.8,
          }}
        >
          さきほど診断で選んでいただいた条件をもとに、
          <br />
          この内容でネイルチップをお作りします。
          お間違いがないかご確認ください。
        </p>
      </section>

      {/* 診断内容がまだ読み込めていない場合 */}
      {!answers && (
        <p
          style={{
            fontSize: 13,
            color: '#999',
          }}
        >
          診断結果が見つかりませんでした。
          お手数ですが、もう一度{' '}
          <a href="/try" style={{ color: '#ff7aa7', textDecoration: 'underline' }}>
            無料デザイン診断
          </a>
          からお試しください。
        </p>
      )}

      {answers && (
        <>
          {/* 条件のまとめ */}
          <section
            style={{
              marginBottom: 24,
              background: '#fff',
              borderRadius: 24,
              padding: '24px 20px 28px',
              boxShadow: '0 18px 45px rgba(0,0,0,0.05)',
              border: '1px solid #f7dfe5',
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              診断結果にもとづくデザイン条件
            </h2>

            <dl
              style={{
                fontSize: 13,
                color: '#333',
                lineHeight: 1.9,
              }}
            >
              <div
                style={{
                  padding: '6px 0',
                  borderBottom: '1px dashed #f0dde3',
                }}
              >
                <dt
                  style={{
                    fontWeight: 600,
                  }}
                >
                  シーン
                </dt>
                <dd style={{ margin: 0 }}>
                  {answers.scene === 'special' && answers.sceneDetail
                    ? `特別な日（${answers.sceneDetail}）`
                    : answers.scene ?? '未入力'}
                </dd>
              </div>

              <div
                style={{
                  padding: '6px 0',
                  borderBottom: '1px dashed #f0dde3',
                }}
              >
                <dt
                  style={{
                    fontWeight: 600,
                  }}
                >
                  雰囲気
                </dt>
                <dd style={{ margin: 0 }}>{answers.mood ?? '未入力'}</dd>
              </div>

              <div
                style={{
                  padding: '6px 0',
                  borderBottom: '1px dashed #f0dde3',
                }}
              >
                <dt
                  style={{
                    fontWeight: 600,
                  }}
                >
                  カラー
                </dt>
                <dd style={{ margin: 0 }}>{answers.color ?? '未入力'}</dd>
              </div>

              <div
                style={{
                  padding: '6px 0',
                  borderBottom: '1px dashed #f0dde3',
                }}
              >
                <dt
                  style={{
                    fontWeight: 600,
                  }}
                >
                  デザインタイプ
                </dt>
                <dd style={{ margin: 0 }}>{answers.designType ?? '未入力'}</dd>
              </div>

              <div
                style={{
                  padding: '6px 0',
                  borderBottom: '1px dashed #f0dde3',
                }}
              >
                <dt
                  style={{
                    fontWeight: 600,
                  }}
                >
                  パーツ・質感
                </dt>
                <dd style={{ margin: 0 }}>{answers.parts ?? '未入力'}</dd>
              </div>

              <div
                style={{
                  padding: '6px 0',
                  borderBottom: '1px dashed #f0dde3',
                }}
              >
                <dt
                  style={{
                    fontWeight: 600,
                  }}
                >
                  チップの形・長さ
                </dt>
                <dd style={{ margin: 0 }}>{answers.shape ?? '未入力'}</dd>
              </div>
            </dl>
          </section>

          {/* 料金イメージ（仮） */}
          <section
            style={{
              marginBottom: 24,
              background: '#fff',
              borderRadius: 24,
              padding: '24px 20px 28px',
              boxShadow: '0 18px 45px rgba(0,0,0,0.05)',
              border: '1px solid #f7dfe5',
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              料金の目安（サンプル）
            </h2>
            <p
              style={{
                fontSize: 13,
                color: '#555',
                lineHeight: 1.8,
                marginBottom: 12,
              }}
            >
              ここには、ベース料金・オプション料金・送料など、
              お客様にお支払い頂く金額の目安を表示します。
              実際の金額が決まり次第、この部分を書き換えましょう。
            </p>
            <ul
              style={{
                fontSize: 13,
                color: '#444',
                lineHeight: 1.8,
                paddingLeft: 18,
              }}
            >
              <li>ベース：オーダーメイドネイルチップ 1セット ◯◯円</li>
              <li>オプション：パーツ多め・マグネット仕上げ など</li>
              <li>送料：◯◯円（ネコポス / クリックポストなど）</li>
            </ul>
          </section>

          {/* Stripe 決済ボタンの置き場 */}
          <section
            style={{
              background: '#fff',
              borderRadius: 24,
              padding: '24px 20px 28px',
              boxShadow: '0 18px 45px rgba(0,0,0,0.05)',
              border: '1px solid #f7dfe5',
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              お支払いに進む
            </h2>
            <p
              style={{
                fontSize: 13,
                color: '#555',
                lineHeight: 1.8,
                marginBottom: 16,
              }}
            >
              内容をご確認のうえ、よろしければ下のボタンからお支払いにお進みください。
              （テスト段階では、まだ実際の決済は行われません）
            </p>

            {/* Stripe の支払いリンクを発行したら、href にそのURLを入れる */}
            <a
              href="#"
              style={{
                display: 'inline-block',
                padding: '12px 26px',
                borderRadius: 999,
                background: 'linear-gradient(90deg, #ff93b0, #ff7aa7)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 10px 24px rgba(255, 137, 176, 0.45)',
              }}
            >
              Stripeでお支払いに進む
            </a>

            <p
              style={{
                fontSize: 11,
                color: '#999',
                marginTop: 8,
              }}
            >
              ※本番公開時は、ここにStripeで発行した本番用の決済リンクURLを設定します。
            </p>
          </section>
        </>
      )}
    </main>
  );
}
