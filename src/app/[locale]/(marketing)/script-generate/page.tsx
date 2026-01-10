'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

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
];

const TONES = ['warm', 'welcoming', 'chill', 'professional', 'energetic', 'humorous'];
const DURATIONS = ['short', 'medium', 'long'];
const FORMATS = ['monologue', 'dialogue'];
const PLATFORMS = ['facebook', 'linkedin', 'youtube', 'tiktok', 'x', 'instagram', 'threads'];

export default function ScriptGeneratePage() {
  const t = useTranslations('RootLayout');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    product: '',
    goal: '',
    audience: '',
    platform: 'facebook',
    tone: 'chill',
    language: 'en',
    duration: 'short',
    forbid: '',
    premium: false,
    format: 'monologue',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('./api/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { error: true, message: `Server returned non-JSON response (${response.status})`, details: text };
      }
      
      if (!response.ok || data.error) {
        setResult({ 
          error: true, 
          message: data.message || data.error || 'Failed to generate script', 
          details: data.details || data 
        });
      } else {
        setResult(data);
      }
    } catch (error: any) {
      console.error('Error generating script:', error);
      setResult({ 
        error: true, 
        message: 'Network error or server is down', 
        details: error.message 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
        AI Script Generator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product/Service</label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleChange}
              placeholder="What are you promoting?"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Goal</label>
            <input
              type="text"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="e.g., Click buy button"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Audience</label>
            <input
              type="text"
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              placeholder="e.g., Office employees"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              >
                {PLATFORMS.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tone</label>
              <select
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                {TONES.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone.charAt(0).toUpperCase() + tone.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                {DURATIONS.map((d) => (
                  <option key={d} value={d}>
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Format</label>
              <select
                name="format"
                value={formData.format}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                {FORMATS.map((f) => (
                  <option key={f} value={f}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center pt-8">
              <input
                type="checkbox"
                name="premium"
                checked={formData.premium}
                onChange={handleChange}
                className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label className="ml-2 block text-sm font-semibold text-gray-700">Premium Quality</label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Forbid (Optional)</label>
            <input
              type="text"
              name="forbid"
              value={formData.forbid}
              onChange={handleChange}
              placeholder="e.g., emoji, harsh talk"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:-translate-y-1'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              'Generate Script'
            )}
          </button>
        </form>

        <div className="bg-gray-50 p-8 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col min-h-[500px]">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Generated Result</h2>
          
          {!result && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 2v6h6"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 13H8"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 17H8"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9H8"></path>
              </svg>
              <p>Your generated script will appear here</p>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="space-y-4 w-full">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          )}

          {result && (
            <div className="flex-1 overflow-y-auto space-y-4">
              {result.error ? (
                <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center mb-4 text-red-700">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="font-bold text-lg">{result.message}</h3>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-red-100 overflow-x-auto">
                    <p className="text-sm font-mono text-red-600 whitespace-pre-wrap">
                      {typeof result.details === 'object' ? JSON.stringify(result.details, null, 2) : result.details}
                    </p>
                  </div>
                </div>
              ) : result.dialogue ? (
                result.dialogue.map((item: any, index: number) => (
                  <div key={index} className={`p-4 rounded-lg ${item.gender === 'female' ? 'bg-pink-50 border-l-4 border-pink-400' : 'bg-blue-50 border-l-4 border-blue-400'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Person {item.person_id} ({item.gender})
                      </span>
                    </div>
                    <p className="text-gray-800 leading-relaxed">{item.text}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <p className="text-gray-800 whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
