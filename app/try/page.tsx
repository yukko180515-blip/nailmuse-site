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
  { id: 'special', label: '特別な日' }
];

const nuanceOptions: Option[] = [
  { id: 'simple', label: 'シンプル' },
  { id: 'cute', label: '可愛い' },
  { id: 'cool', label: 'クール' },
  { id: 'natural', label: 'ナチュラル' },
  { id: 'nuance', label: 'ニュアンス' }
];

const designTypeOptions: Option[] = [
  { id: 'french', label: 'フレンチ' },
  { id: 'gradation', label: 'グラデーション' },
  { id: 'bijou', label: 'ビジュー' },
  { id: 'art', label: 'アート' },
  { id: 'japanese', label: '和柄' },
  { id: 'magnet', label: 'マグネット' }
];

const partsOptions: Option[] = [
  { id: 'none', label: 'なし' },
  { id: 'stone', label: 'ストーン' },
  { id: 'mirror', label: 'ミラー' },
  { id: 'aurora', label: 'オーロラ' }
];

const shapeOptions: Option[] = [
  { id: 'short', label: 'ショート' },
  { id: 'medium', label: 'ミディアム' },
  { id: 'long', label: 'ロング' },
  { id: 'square', label: 'スクエア' },
  { id: 'oval', label: 'オーバル' }
];

export default function TryPage() {
  const [scene, setScene] = useState('');
  const [nuance, setNuance] = useState('');
  const [designType, setDesignType] = useState('');
  const [parts, setParts] = useState('');
  const [shape, setShape] = useState '';

  const resetAll = () => {
    setScene('');
    setNuance('');
    setDesignType('');
    setParts('');
    setShape('');
  };

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">ネイルデザイン診断</h1>

      {/* Scene */}
      <section className="mb-6">
        <h2 className="font-semibold mb-2">どんなシーンで使うネイル？</h2>
        <div className="flex flex-wrap gap-2">
          {sceneOptions.map((o) => (
            <button
              key={o.id}
              type="button"
              className={`px-3 py-2 rounded-full border ${
                scene === o.id ? 'bg-pink-500 text-white' : 'bg-white'
              }`}
              onClick={() => setScene(o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </section>

      {/* Nuance */}
      <section className="mb-6">
        <h2 className="font-semibold mb-2">どんな雰囲気が好き？</h2>
        <div className="flex flex-wrap gap-2">
          {nuanceOptions.map((o) => (
            <button
              key={o.id}
              type="button"
              className={`px-3 py-2 rounded-full border ${
                nuance === o.id ? 'bg-pink-500 text-white' : 'bg-white'
              }`}
              onClick={() => setNuance(o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </section>

      {/* Design Type */}
      <section className="mb-6">
        <h2 className="font-semibold mb-2">デザインタイプは？</h2>
        <div className="flex flex-wrap gap-2">
          {designTypeOptions.map((o) => (
            <button
              key={o.id}
              type="button"
              className={`px-3 py-2 rounded-full border ${
                designType === o.id ? 'bg-pink-500 text-white' : 'bg-white'
              }`}
              onClick={() => setDesignType(o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </section>

      {/* Parts */}
      <section className="mb-6">
        <h2 className="font-semibold mb-2">パーツや質感は？</h2>
        <div className="flex flex-wrap gap-2">
          {partsOptions.map((o) => (
            <button
              key={o.id}
              type="button"
              className={`px-3 py-2 rounded-full border ${
                parts === o.id ? 'bg-pink-500 text-white' : 'bg-white'
              }`}
              onClick={() => setParts(o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </section>

      {/* Shape */}
      <section className="mb-6">
        <h2 className="font-semibold mb-2">チップの形は？</h2>
        <div className="flex flex-wrap gap-2">
          {shapeOptions.map((o) => (
            <button
              key={o.id}
              type="button"
              className={`px-3 py-2 rounded-full border ${
                shape === o.id ? 'bg-pink-500 text-white' : 'bg-white'
              }`}
              onClick={() => setShape(o.id)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </section>

      {/* Reset */}
      <div className="mt-8">
        <button
          type="button"
          onClick={resetAll}
          className="px-4 py-2 bg-gray-200 rounded-full"
        >
          やり直す
        </button>
      </div>
    </main>
  );
}
