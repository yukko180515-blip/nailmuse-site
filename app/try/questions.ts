// app/try/questions.ts

// 各質問の選択肢
export type Option = {
  id: string;
  label: string;
  description?: string;
  image?: string; // ※Q6でチップ形状の画像を使う用（あとで差し替え）
};

// 質問そのもの
export type Question = {
  id: string;
  step: number;         // 何問目か
  title: string;        // 質問タイトル（太字の部分）
  body?: string;        // 説明文（あれば）
  options: Option[];    // 選択肢
  note?: string;        // 補足
  // 特別な日のときだけ出すサブ質問を持てるように
  specialSubQuestionId?: string;
};

// 全体のステップ数（進捗バー用）
export const TOTAL_STEPS = 6;

// 6問ぶんの質問定義
export const questions: Question[] = [
  {
    id: 'scene',
    step: 1,
    title: 'どんなシーンで使うネイルチップ？',
    body: '一番近いものを選んでください。',
    options: [
      { id: 'omakase', label: 'おまかせ' },
      { id: 'daily', label: '普段使い' },
      { id: 'office', label: 'オフィス・お仕事' },
      {
        id: 'special',
        label: '特別な日',
        description: 'ブライダル・成人式・パーティーなど'
      }
    ],
    // 「特別な日」が選ばれたときだけ、次の specialScene を追加で出す
    specialSubQuestionId: 'specialScene'
  },

  // Q1の中に出すサブ質問（進捗には含めない想定）
  {
    id: 'specialScene',
    step: 1, // 進捗バーは scene と同じ 1問目として扱う
    title: 'どんな「特別な日」ですか？',
    body: '特別な日を選んだ方のみお答えください。',
    options: [
      { id: 'bridal', label: 'ブライダル' },
      { id: 'seijin', label: '成人式' },
      { id: 'party', label: 'パーティー / イベント' },
      { id: 'photo', label: '前撮り・撮影' },
      { id: 'other', label: 'その他の特別な日' }
    ]
  },

  {
    id: 'vibe',
    step: 2,
    title: 'どんな雰囲気が好き？',
    body: 'イメージに近い雰囲気を選んでください。（複数選べる想定でもOK）',
    options: [
      { id: 'simple', label: 'シンプル' },
      { id: 'girly', label: 'ガーリー / かわいい' },
      { id: 'korean', label: '韓国っぽ' },
      { id: 'cool', label: 'クール / 大人っぽい' },
      { id: 'unique', label: '個性派 / ちょっと攻めたい' },
      {
        id: 'nuance',
        label: 'ニュアンス',
        description: 'ふんわりした色味・ニュアンスネイルが好き'
      }
    ]
  },

  {
    id: 'color',
    step: 3,
    title: '好きなカラー・使いたい色は？',
    body: 'メインで使いたい色を選んでください。（あとで詳細をテキストで補足してもOKです）',
    options: [
      { id: 'pink', label: 'ピンク' },
      { id: 'beige', label: 'ベージュ' },
      { id: 'white', label: 'ホワイト / クリア' },
      { id: 'brown', label: 'ブラウン / モカ' },
      { id: 'blue', label: 'ブルー / ネイビー' },
      { id: 'black', label: 'ブラック' },
      { id: 'other', label: 'その他（コメントで指定）' }
    ]
  },

  {
    id: 'designType',
    step: 4,
    title: 'デザインのタイプは？',
    body: '気になるワードを選んでください。',
    options: [
      { id: 'onehong', label: 'ワンホン' },
      { id: 'sheer', label: 'シアー・透け感' },
      { id: 'aurora', label: 'オーロラ' },
      { id: 'mirror', label: 'ミラー' },
      { id: 'magnet', label: 'マグネット' }, // 追加
      { id: 'wa', label: '和柄', description: '和装や和テイストに合うデザイン' }, // 追加
      { id: 'French', label: 'フレンチ' },
      { id: 'simple', label: 'ワンカラー / さりげないデザイン' }
    ]
  },

  {
    id: 'lengthShape',
    step: 5,
    title: 'チップの長さ・形は？',
    body: '普段の生活やお仕事に合わせて選んでください。',
    options: [
      {
        id: 'shortOval',
        label: 'ショート × オーバル',
        description: '自爪に近い長さで、日常使いしやすい'
      },
      {
        id: 'mediumOval',
        label: 'ミディアム × オーバル',
        description: 'ほどよい長さで、写真映えも◎'
      },
      {
        id: 'shortSquare',
        label: 'ショート × スクエア',
        description: '先端がまっすぐで、すっきりした印象'
      },
      {
        id: 'longCoffin',
        label: 'ロング × コフィン / バレリーナ',
        description: 'イベント・特別な日に向けてしっかり盛りたい方向け'
      }
    ]
  },

  {
    id: 'chipType',
    step: 6,
    title: 'チップの種類イメージ',
    body: 'イメージに近いチップの形・厚みを選んでください。（画像は仮置きです）',
    options: [
      {
        id: 'naturalThin',
        label: '自然な薄さ・自爪っぽい',
        image: '/images/chips/natural-thin.png'
      },
      {
        id: 'standard',
        label: '標準的な厚み',
        image: '/images/chips/standard.png'
      },
      {
        id: 'strong',
        label: 'しっかり厚めで強度重視',
        image: '/images/chips/strong.png'
      }
    ],
    note: '後で、実際のネイルチップ写真（同じ角度＆アップ）と差し替えます。'
  }
];
