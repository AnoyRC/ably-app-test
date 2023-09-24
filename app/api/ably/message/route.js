import { NextResponse } from 'next/server';

import * as Ably from 'ably/promises';

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);

    const { message, channelName } = body;
    const client = new Ably.Rest(process.env.ABLY_API_KEY);
    const channel = client.channels.get(channelName);

    const disallowedWords = ['foo', 'bar', 'fizz', 'buzz'];

    const containsDisallowedWord = disallowedWords.some((word) => {
      return message.text.match(new RegExp(`\\b${word}\\b`));
    });

    if (containsDisallowedWord) {
      return new NextResponse('Bad word', { status: 403 });
    }

    const response = await channel.publish('update-from-server', message);
    console.log(response);
    return NextResponse.json(response);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
