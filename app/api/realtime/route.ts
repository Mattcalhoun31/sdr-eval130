import { NextRequest } from 'next/server';

export const runtime = 'edge';

const OPENAI_REALTIME_URL = 'wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01';

export async function GET(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response('OpenAI API key not configured', { status: 500 });
  }

  // Create WebSocket connection to OpenAI
  const response = await fetch(OPENAI_REALTIME_URL, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'OpenAI-Beta': 'realtime=v1',
    },
  });

  return response;
}

export async function POST(req: NextRequest) {
  // Proxy endpoint for realtime API
  return new Response('Use WebSocket connection', { status: 400 });
}
