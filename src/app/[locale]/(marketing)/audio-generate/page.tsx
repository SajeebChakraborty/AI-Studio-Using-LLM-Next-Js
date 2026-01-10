'use client';

import { useState } from 'react';

const LANGUAGES = [
  { code: 'ar', name: 'Arabic' },
  { code: 'zh', name: 'Chinese' },
  { code: 'cs', name: 'Czech' },
  { code: 'nl', name: 'Dutch' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'German' },
  { code: 'hi', name: 'Hindi' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'pl', name: 'Polish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'es', name: 'Spanish' },
  { code: 'tr', name: 'Turkish' },
  { code: 'bn', name: 'Bangla' },
];

const GENDERS = ['male', 'female'];

interface Segment {
  text: string;
  language_id: string;
  gender: string;
  person_id: number;
}

export default function AudioGeneratePage() {
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<any>(null);
  
  const [segments, setSegments] = useState<Segment[]>([
    { text: '', language_id: 'en', gender: 'female', person_id: 1 }
  ]);
  const [enhanceText, setEnhanceText] = useState(true);
  const [premium, setPremium] = useState(false);

  const handleAddSegment = () => {
    const nextIndex = segments.length;
    const person_id = (nextIndex % 2) + 1;
    setSegments([...segments, { text: '', language_id: 'en', gender: person_id === 1 ? 'female' : 'male', person_id }]);
  };

  const handleRemoveSegment = (index: number) => {
    const newSegments = segments
      .filter((_, i) => i !== index)
      .map((s, i) => ({ ...s, person_id: (i % 2) + 1 }));
    setSegments(newSegments);
  };

  const handleSegmentChange = (index: number, field: keyof Segment, value: any) => {
    const newSegments = [...segments];
    const currentSegment = newSegments[index];
    if (currentSegment) {
      newSegments[index] = { ...currentSegment, [field]: value };
      setSegments(newSegments);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const response = await fetch('./api/generate-tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          segments,
          enhance_text: enhanceText,
          premium,
        }),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let details;
        if (contentType && contentType.includes('application/json')) {
          details = await response.json();
        } else {
          details = await response.text();
        }
        throw new Error(JSON.stringify(details));
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err: any) {
      console.error('Error generating audio:', err);
      try {
        setError(JSON.parse(err.message));
      } catch {
        setError({ message: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
        AI Audio Generator
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Audio Segments</h2>
                <button
                  type="button"
                  onClick={handleAddSegment}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Segment
                </button>
              </div>

              {segments.map((segment, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 space-y-4 relative group">
                  {segments.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSegment(index)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Person ID</label>
                      <input
                        type="number"
                        value={segment.person_id}
                        readOnly
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-100 cursor-not-allowed outline-none font-semibold text-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Language</label>
                      <select
                        value={segment.language_id}
                        onChange={(e) => handleSegmentChange(index, 'language_id', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        {LANGUAGES.map((lang) => (
                          <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Gender</label>
                      <select
                        value={segment.gender}
                        onChange={(e) => handleSegmentChange(index, 'gender', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        {GENDERS.map((g) => (
                          <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Text Content</label>
                    <textarea
                      value={segment.text}
                      onChange={(e) => handleSegmentChange(index, 'text', e.target.value)}
                      placeholder="Enter text to convert to speech..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px] resize-none"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={enhanceText}
                    onChange={(e) => setEnhanceText(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-12 h-6 rounded-full transition-colors ${enhanceText ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${enhanceText ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
                <span className="text-sm font-semibold text-gray-700">Enhance Text</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={premium}
                    onChange={(e) => setPremium(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-12 h-6 rounded-full transition-colors ${premium ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${premium ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
                <span className="text-sm font-semibold text-gray-700">Premium Quality</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 transform hover:-translate-y-1'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Audio...
                </span>
              ) : (
                'Generate Audio'
              )}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-8 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col min-h-[400px]">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Result</h2>
            
            {!audioUrl && !loading && !error && (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-center">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <p>Your generated audio will appear here</p>
              </div>
            )}

            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
                <p className="text-blue-600 font-medium animate-pulse">Processing your request...</p>
              </div>
            )}

            {error && (
              <div className="flex-1">
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-bold">Error Occurred</span>
                  </div>
                  <pre className="text-xs bg-white p-3 rounded border border-red-100 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(error, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {audioUrl && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <audio controls src={audioUrl} className="w-full mb-6">
                    Your browser does not support the audio element.
                  </audio>
                  
                  <div className="flex gap-4">
                    <a
                      href={audioUrl}
                      download="ai-studio-output.mp3"
                      className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-bold text-center hover:bg-black transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download MP3
                    </a>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-500">Audio generated successfully!</p>
                  <button 
                    onClick={() => setAudioUrl(null)}
                    className="text-blue-600 text-sm font-semibold mt-2 hover:underline"
                  >
                    Generate Another
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Better Audio Tips
            </h3>
            <ul className="text-sm text-blue-700 space-y-3 list-disc pl-4 leading-relaxed">
              <li>
                <strong>Use words instead of symbols:</strong> Instead of <strong>"$"</strong>, write <strong>"dollars"</strong> or <strong>"taka"</strong>.
              </li>
              <li>
                <strong>Phonetic spelling:</strong> If a name sounds wrong, write it phonetically (e.g., instead of <strong>"sajeeb"</strong>, try <strong>"sho-jib"</strong>).
              </li>
              <li>
                <strong>Punctuation matters:</strong> Commas <strong>","</strong> and full stops <strong>"."</strong> at appropriate places make the voice sound more natural.
              </li>
              <li>
                <strong>Conversation mode:</strong> Add multiple segments to create a natural dialogue between two different people.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
