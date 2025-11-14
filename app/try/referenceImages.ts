// app/try/referenceImages.ts

export type ReferenceImage = {
  src: string;      // 画像パス（あとで /public 配下にアップ）
  alt: string;      // 代替テキスト
  caption?: string; // 画像の下に出すキャプション
};

export type ReferenceImageSet = {
  id: string;
  label: string; // セットの名前（内部用＋表示用）
  match: {
    vibe?: string[];       // 質問「vibe」の回答ID
    color?: string[];      // 質問「color」の回答ID
    designType?: string[]; // 質問「designType」の回答ID
  };
  images: ReferenceImage[];
  note?: string;
};

/**
 * ここで「回答パターン → 参考画像たち」を定義します。
 * 画像ファイルは /public/images/reference 以下に置いていく想定です。
 *
 * 例：
 *  /public/images/reference/girly-pink-01.jpg
 *  /public/images/reference/girly-pink-02.jpg
 */

export const referenceImageSets: ReferenceImageSet[] = [
  {
    id: 'girly-pink-onehong',
    label: 'ガーリー × ピンク × ワンホン系',
    match: {
      vibe: ['girly'],
      color: ['pink'],
      designType: ['onehong'],
    },
    images: [
      {
        src: '/images/reference/girly-pink-01.jpg',
        alt: 'ガーリーなピンク系ワンホンネイルチップ',
        caption: 'ぷっくりパーツ＋ピンクで王道ガーリー',
      },
      {
        src: '/images/reference/girly-pink-02.jpg',
        alt: 'ピンクグラデーションのワンホンネイルチップ',
        caption: 'グラデーションと大きめストーンの組み合わせ',
      },
    ],
    note: 'ふんわりガーリー・ワンホン系が好きな方向けのサンプルです。',
  },
  {
    id: 'simple-beige-office',
    label: 'シンプル × ベージュ × オフィス',
    match: {
      vibe: ['simple', 'cool'],
      color: ['beige', 'brown'],
      designType: ['simple'],
    },
    images: [
      {
        src: '/images/reference/simple-beige-01.jpg',
        alt: 'シンプルなベージュ系ネイルチップ',
        caption: '肌なじみの良いベージュでオフィス向け',
      },
      {
        src: '/images/reference/simple-beige-02.jpg',
        alt: 'ワンカラーのベージュネイルチップ',
        caption: 'さりげなくツヤ感重視のデザイン',
      },
    ],
    note: 'オフィスや普段使いしやすい、シンプルなデザインイメージです。',
  },
  {
    id: 'nuance-brown-magnet',
    label: 'ニュアンス × ブラウン × マグネット',
    match: {
      vibe: ['nuance', 'unique'],
      color: ['brown', 'beige'],
      designType: ['magnet', 'sheer'],
    },
    images: [
      {
        src: '/images/reference/nuance-brown-01.jpg',
        alt: 'ブラウン系ニュアンスネイルチップ',
        caption: 'ブラウンベースにマグネットで奥行きをプラス',
      },
      {
        src: '/images/reference/nuance-brown-02.jpg',
        alt: 'マグネットニュアンスネイルチップ',
        caption: '角度で表情が変わるマグネットデザイン',
      },
    ],
    note: '大人っぽいニュアンス×マグネットのイメージです。',
  },
  {
    id: 'fallback',
    label: 'おまかせサンプル',
    match: {},
    images: [
      {
        src: '/images/reference/omakase-01.jpg',
        alt: 'おまかせ系ネイルチップサンプル',
        caption: 'サービス全体の雰囲気に近いイメージサンプル',
      },
      {
        src: '/images/reference/omakase-02.jpg',
        alt: 'ニュアンス系ネイルチップサンプル',
        caption: 'ニュアンス寄りのおまかせデザイン',
      },
    ],
    note: '条件にぴったり合うセットがない場合に表示する、汎用サンプルです。',
  },
];
