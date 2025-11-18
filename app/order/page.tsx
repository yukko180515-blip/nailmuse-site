'use client';

import React from 'react';

export default function OrderPage({ searchParams }: any) {
  const {
    scene,
    mood,
    baseColor,
    designType,
    texture,
    shape
  } = searchParams;

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">オーダー内容の確認</h1>

      <p className="text-gray-600 mb-4">
        以下はあなたが選んだデザイン条件です。
        内容に問題がなければ、このまま注文に進むことができます。
      </p>

      <div className="bg-pink-50 p-4 rounded-xl border border-pink-200 space-y-2">
        <p><strong>シーン：</strong> {scene}</p>
        <p><strong>雰囲気：</strong> {mood}</p>
        <p><strong>ベースカラー：</strong> {baseColor}</p>
        <p><strong>デザインタイプ：</strong> {designType}</p>
        <p><strong>パーツ・質感：</strong> {texture}</p>
        <p><strong>チップの形・長さ：</strong> {shape}</p>
      </div>

      <p className="text-gray-600 text-sm mt-4">
        ※この時点ではまだ注文は確定していません。
      </p>

      <a
        href="/order/confirm"
        className="block mt-6 bg-pink-400 text-white py-3 text-center rounded-xl font-semibold shadow-md"
      >
        注文手続きへ進む
      </a>
    </main>
  );
}
