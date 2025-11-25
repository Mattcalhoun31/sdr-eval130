import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { text, voice = 'Rachel' } = await req.json();

    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      // Fallback to browser TTS if no API key
      return new Response(
        JSON.stringify({ error: 'ElevenLabs API key not configured. Using fallback.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const client = new ElevenLabsClient({ apiKey });

    // Stream audio from ElevenLabs
    const audioStream = await client.textToSpeech.convert(voice, {
      text,
      modelId: 'eleven_turbo_v2_5', // Fastest, most natural model
      voiceSettings: {
        stability: 0.5,
        similarityBoost: 0.75,
        style: 0.5,
        useSpeakerBoost: true,
      },
    });

    // Convert stream to buffer
    const reader = audioStream.getReader();
    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }

    const audioBuffer = Buffer.concat(chunks);

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Text-to-speech error:', error);
    return new Response(
      JSON.stringify({ error: 'TTS failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
