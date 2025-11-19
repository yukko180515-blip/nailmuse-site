// app/api/ai-design/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY が設定されていません。' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const answers = body.answers || {};

    const {
      scene,
      sceneDetail,
      mood,
      color,
      designType,
      parts,
      shape,
    } = answers;

    const userContent = `
あなたは日本人向けのネイルチップ専門デザイナーです。
以下の条件から、丁寧で分かりやすい日本語のデザイン案を3〜4文で作成してください。

- シーン: ${scene || 'おまかせ'}
- シーンの詳細: ${sceneDetail || '特になし'}
- 雰囲気: ${mood || 'おまかせ'}
- ベースカラー: ${color || 'おまかせ'}
- デザインタイプ: ${designType || 'おまかせ'}
- パーツ・質感: ${parts || 'おまかせ'}
- チップの形・長さ: ${shape || 'おまかせ'}

【文章のトーン】
・お客様に提案するような、やさしく丁寧な口調
・専門用語を使いすぎず、イメージしやすい表現
・最後はポジティブな一文で締める

【出力形式】
・箇条書き（「・」から始める）で3〜4行
・絵文字や顔文字は使わない
    `.trim();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.8,
      messages: [
        {
          role: 'system',
          content: 'You are a professional Japanese nail designer assistant.',
        },
        {
          role: 'user',
          content: userContent,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content ?? '';

    return NextResponse.json({ text });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'AIデザイン案の生成に失敗しました。' },
      { status: 500 }
    );
  }
}
