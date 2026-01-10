import { NextResponse } from 'next/server';
import { Env } from '@/libs/Env';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const apiUrl = `${Env.LLM_API_BASE_URL}/api/llm/generate-tts`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      let details;
      if (contentType && contentType.includes('application/json')) {
        details = await response.json();
      } else {
        details = await response.text();
      }
      return NextResponse.json(
        { error: `External API error: ${response.statusText}`, details },
        { status: response.status }
      );
    }

    // The response is an MP3 file
    const audioBuffer = await response.arrayBuffer();
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'attachment; filename="output.mp3"',
      },
    });
  } catch (error: any) {
    console.error('Proxy error (TTS):', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
