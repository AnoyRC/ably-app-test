import * as Ably from 'ably/promises';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    console.log('Sucessfully connected to the server auth endpoint');

    const { searchParams } = new URL(req.url);
    const clientId = searchParams.get('id');
    console.log('Client Id: ' + clientId);

    const client = new Ably.Rest({
      key: process.env.ABLY_API_KEY,
      prefixUrl: 'https://rest.ably.io',
    });

    const tokenRequestData = await client.auth.createTokenRequest({
      clientId: clientId,
    });

    console.log(tokenRequestData);
    return NextResponse.json(tokenRequestData);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
