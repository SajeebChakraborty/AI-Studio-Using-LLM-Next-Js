import { NextResponse } from 'next/server';
import { Env } from '@/libs/Env';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // The user specified the endpoint: base url + /api/llm/generate-script
    const apiUrl = `${Env.LLM_API_BASE_URL}/api/llm/generate-script`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      return NextResponse.json(
        { error: `External API returned non-JSON (${response.status})`, details: text },
        { status: response.status }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: `External API error: ${response.statusText}`, details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
