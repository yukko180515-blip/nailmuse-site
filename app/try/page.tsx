'use client';

import React, { useState, ChangeEvent } from 'react';
import { questions, TOTAL_STEPS, Question, Option } from './questions';
import {
  referenceImageSets,
  ReferenceImageSet,
} from './referenceImages';

type AnswerMap = Record<string, string>;

const mainQuestionOrder = [
  'scene',
  'vibe',
  'color',
  'designType',
  'lengthShape',
  'chipType',
];

// 回答に一番マッチする参考画像セットを取得
const getReferenceImageSet = (answers: AnswerMap): ReferenceImageSet | undefined => {
  const vibe = answers['vibe'];
  const color = answers['color'];
  const designType = answers['designType'];

  // 条件にマッチするものを探す
  const matched = referenceImageSets.find((set) => {
    const m = set.match;

    const vibeOk =
      !m.vibe || !vibe ? !m.vibe : m.vibe.includes(vibe);
    const colorOk =
      !m.color || !color ? !m.color : m.color.includes(color);
    const designOk =
      !m.designType || !designType
        ? !m.designType
        : m.designType.includes(designType);

    return vibeOk && colorOk && designOk;
  });

  // 見つからなければ fallback を使う
  return matched ?? referenceImageSets.find((s) => s.id === 'fallback');
};

export default function TryNailDesign() {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(
    mainQuestionOrder[0]
  );
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [answeredCount, setAnsweredCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [handImageUrl, setHandImageUrl] = useState<string | null>(null);

  const currentQuestion: Question = questions.find(
    (q) => q.id === currentQuestionId
  )!;

  const progressPercent = Math.round((answeredCount / TOTAL_STEPS) * 100);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptionId(optionId);
  };

  const goToNextQuestion = () => {
    if (!selectedOptionId) return;

    const q = currentQuestion;

    setAnswers((prev) => ({
      ...prev,
      [q.id]: selectedOptionId,
    }));

    setAnsweredCount((prev) => {
      if (q.step > prev) {
        return q.step;
      }
      return prev;
    });

    if (
      q.id === 'scene' &&
      selectedOptionId === 'special' &&
      q.specialSubQuestionId
    ) {
      setCurrentQuestionId(q.specialSubQuestionId);
      setSelectedOptionId('');
      return;
    }

    const nextMainQuestion = getNextMainQuestion(q);

    if (nextMainQuestion) {
      setCurrentQuestionId(nextMainQuestion.id);
      setSelectedOptionId('');
    } else {
      setIsFinished(true);
    }
  };

  const getNextMainQuestion = (q: Question): Question | undefined => {
    const next = questions
      .filter(
        (item) =>
          item.step > q.step &&
          mainQuestionOrder.includes(item.id)
      )
      .sort((a, b) => a.step - b.step)[0];

    return next;
  };

  const handleHandImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setHandImageUrl(url);
  };

  const resetAll = () => {
    setCurrentQuestionId(mainQuestionOrder[0]);
    setSelectedOptionId('');
    setAnswers({});
    setAnsweredCount(0);
    setIsFinished(false);
    setHandImageUrl(null);
  };

  const referenceSet = getReferenceImageSet(answers);

  return (
    <main
      style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '40px 16px 80px',
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Yu Gothic", "YuGothic", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
      }}
    >
      {/* タイトル */}
      <section style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 8,
            textAlign: 'center',
          }}
        >
          ネイルチップ無料デザイン診断
        </h1>
        <p
          style={{
            fontSize: 14,
            color: '#555',
            textAlign: 'center',
            lineHeight: 1.7,
          }}
        >
          6つの質問に答えると、
          <br />
          あなたのためのAIデザイン案と着画イメージ（ベータ）をご提案します。
        </p>
      </section>

      {/* 質問ウィザード */}
      {!isFinished && (
        <section
          style={{
            background: '#fff',
            borderRadius: 24,
            padding: '24px 20px 28px',
            boxShadow: '0 18px 45px rgba(0,0,0,0.05)',
            border: '1px solid #f7dfe5',
          }}
        >
          {/* 進捗 */}
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 12,
                marginBottom: 4,
              }}
            >
              <span>
                質問 {currentQuestion.step} / {TOTAL_STEPS}
              </span>
              <span>入力完了 {progressPercent}%</span>
            </div>
            <div
              style={{
                width: '100%',
                height: 8,
                borderRadius: 999,
                background: '#ffe7f0',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  borderRadius: 999,
                  background:
                    'linear-gradient(90deg, #ff9bbd 0%, #ff7fb0 50%, #ff9bbd 100%)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>

          {/* 質問文 */}
          <div style={{ marginBottom: 16 }}>
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              {currentQuestion.title}
            </h2>
            {currentQuestion.body && (
              <p
                style={{
                  fontSize: 13,
                  color: '#666',
                  lineHeight: 1.7,
                }}
              >
                {currentQuestion.body}
              </p>
            )}
          </div>

          {/* 選択肢 */}
          <div style={{ display: 'grid', gap: 8, marginBottom: 24 }}>
            {currentQuestion.options.map((option: Option) => {
              const isSelected = selectedOptionId === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleOptionSelect(option.id)}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: 14,
                    border: isSelected
                      ? '1.5px solid #ff8fb3'
                      : '1px solid #f0d8df',
                    background: isSelected ? '#fff5f8' : '#fff',
                    cursor: 'pointer',
                    fontSize: 14,
                    lineHeight: 1.6,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    transition:
                      'background 0.15s ease, border 0.15s ease',
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {option.label}
                  </span>
                  {option.description && (
                    <span
                      style={{
                        fontSize: 12,
                        color: '#777',
                      }}
                    >
                      {option.description}
                    </span>
                  )}
                  {option.image && (
                    <span
                      style={{
                        fontSize: 11,
                        color: '#bbb',
                      }}
                    >
                      ※ここにチップ画像を表示予定（後で差し替え）
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {currentQuestion.note && (
            <p
              style={{
                fontSize: 12,
                color: '#888',
                marginBottom: 16,
              }}
            >
              {currentQuestion.note}
            </p>
          )}

          {/* 次へ */}
          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={goToNextQuestion}
              disabled={!selectedOptionId}
              style={{
                minWidth: 200,
                padding: '12px 28px',
                borderRadius: 999,
                border: 'none',
                background: selectedOptionId
                  ? 'linear-gradient(90deg, #ff8fb3, #ff6fa0)'
                  : '#f5c9d8',
                color: '#fff',
                fontWeight: 700,
                fontSize: 14,
                cursor: selectedOptionId ? 'pointer' : 'not-allowed',
                boxShadow: selectedOptionId
                  ? '0 10px 25px rgba(255,143,179,0.45)'
                  : 'none',
                transition:
                  'background 0.15s ease, box-shadow 0.15s ease, transform 0.05s ease',
              }}
            >
              {currentQuestion.step === TOTAL_STEPS ? '結果を見る' : '次の質問へ'}
            </button>
          </div>
        </section>
      )}

      {/* 結果画面 */}
      {isFinished && (
        <>
          {/* AIデザイン案＋参考画像 */}
          <section
            style={{
              marginTop: 24,
              marginBottom: 24,
              background: '#fff',
              borderRadius: 24,
              padding: '24px 20px 28px',
              boxShadow: '0 18px 45px rgba(0,0,0,0.05)',
              border: '1px solid #f7dfe5',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
                gap: 8,
              }}
            >
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                あなたへのAIデザイン案
              </h2>
              <button
                type="button'
                onClick={resetAll}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: 12,
                  color: '#999',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                回答をやり直す
              </button>
            </div>

            <p
              style={{
                fontSize: 13,
                color: '#555',
                lineHeight: 1.8,
                marginBottom: 12,
              }}
            >
              入力してもらった内容をもとに、
              <br />
              このようなイメージのネイルチップをご提案します。
            </p>

            <ul
              style={{
                fontSize: 13,
                color: '#444',
                paddingLeft: 18,
                lineHeight: 1.8,
                marginBottom: 12,
              }}
            >
              <li>
                シーンや雰囲気に合わせて、ベースカラーやパーツ量をバランスよく調整します。
              </li>
              <li>
                和柄・マグネット・ミラーなど、お好みの要素をさりげなく取り入れたデザインを想定しています。
              </li>
              <li>
                実際のオーダー時には、この条件をもとにクリエイターがデザインを具体化していきます。
              </li>
            </ul>

            {/* 参考ネイルチップ画像 */}
            {referenceSet && (
              <div
                style={{
                  marginTop: 16,
                  borderRadius: 16,
                  border: '1px solid #f0dde3',
                  padding: 14,
                  background: '#fff7f9',
                }}
              >
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  参考ネイルチップ画像（サンプル）
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    color: '#666',
                    lineHeight: 1.7,
                    marginBottom: 10,
                  }}
                >
                  条件に近いイメージのネイルチップ写真です。
                  <br />
                  現在は仮の画像パスになっているため、実際の作品写真と差し替えてご利用ください。
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: 10,
                    marginTop: 6,
                  }}
                >
                  {referenceSet.images.map((img) => (
                    <figure
                      key={img.src}
                      style={{
                        margin: 0,
                        borderRadius: 12,
                        overflow: 'hidden',
                        border: '1px solid #f0dde3',
                        background: '#fff',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.src}
                        alt={img.alt}
                        style={{
                          display: 'block',
                          width: '100%',
                          height: 'auto',
                          aspectRatio: '3 / 4',
                          objectFit: 'cover',
                        }}
                      />
                      {img.caption && (
                        <figcaption
                          style={{
                            fontSize: 11,
                            color: '#777',
                            padding: '6px 6px 8px',
                            lineHeight: 1.5,
                          }}
                        >
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>

                {referenceSet.note && (
                  <p
                    style={{
                      fontSize: 11,
                      color: '#999',
                      marginTop: 8,
                      lineHeight: 1.6,
                    }}
                  >
                    {referenceSet.note}
                  </p>
                )}
              </div>
            )}

            <p
              style={{
                fontSize: 12,
                color: '#888',
                lineHeight: 1.7,
                marginTop: 12,
              }}
            >
              ※今後は、ここに「実際のクリエイター作品」や「AIが提案した具体的なデザイン案」を並べて表示していきます。
            </p>
          </section>

          {/* 手の写真アップロード（ベータ） */}
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
              手の写真から着画イメージを作る（ベータ）
            </h2>
            <p
              style={{
                fontSize: 13,
                color: '#555',
                lineHeight: 1.8,
                marginBottom: 16,
              }}
            >
              指先が写った写真をアップロードすると、将来的には
              <br />
              「あなたの手にネイルチップをつけたイメージ画像」
              をAIで生成できるようにしていきます。
              <br />
              現在はテスト版として、アップロードした写真をプレビュー表示しています。
            </p>

            <label
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                borderRadius: 999,
                background:
                  'linear-gradient(90deg, #ff8fb3 0%, #ff6fa0 100%)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(255,143,179,0.4)',
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

            {handImageUrl && (
              <div
                style={{
                  marginTop: 8,
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid #f0dde3',
                }}
              >
                {/* 実際には、ここでAI合成した「着画イメージ」を表示していく想定 */}
                {/* 今はアップロード画像をそのまま表示 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={handImageUrl}
                  alt="アップロードした手の写真"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </div>
            )}
          </section>

          {/* 選んだ条件まとめ */}
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
              選んだ条件まとめ
            </h2>
            <p
              style={{
                fontSize: 13,
                color: '#555',
                lineHeight: 1.8,
                marginBottom: 16,
              }}
            >
              ここでは、あなたが選んだ条件を一覧で確認できます。
              <br />
              この内容をもとに、クリエイターがデザイン・制作していくイメージです。
            </p>

            <dl
              style={{
                fontSize: 13,
                color: '#333',
                lineHeight: 1.8,
              }}
            >
              {mainQuestionOrder.map((id) => {
                const q = questions.find((qq) => qq.id === id);
                if (!q) return null;
                const answerId = answers[id];
                const option = q.options.find((op) => op.id === answerId);
                return (
                  <div
                    key={id}
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
                      {q.title}
                    </dt>
                    <dd
                      style={{
                        margin: 0,
                        color: option ? '#444' : '#aaa',
                      }}
                    >
                      {option ? option.label : '未選択'}
                    </dd>
                  </div>
                );
              })}

              {answers['scene'] === 'special' && (
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
                    特別な日の詳細
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      color: '#444',
                    }}
                  >
                    {(() => {
                      const q = questions.find(
                        (qq) => qq.id === 'specialScene'
                      );
                      const answerId = answers['specialScene'];
                      const option = q?.options.find(
                        (op) => op.id === answerId
                      );
                      return option ? option.label : '未選択';
                    })()}
                  </dd>
                </div>
              )}
            </dl>
          </section>
        </>
      )}
    </main>
  );
}
