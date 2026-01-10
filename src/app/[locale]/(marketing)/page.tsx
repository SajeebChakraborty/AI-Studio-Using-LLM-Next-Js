import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: 'AI Studio - Generate Scripts and Audio',
    description: 'The ultimate AI-powered studio for content creators.',
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600">
          Your Creative AI Studio
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Unlock the power of artificial intelligence to generate high-quality scripts and immersive audio for your content in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="group bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all transform hover:-translate-y-2">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">AI Script Generate</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Create compelling dialogues and monologues for any platform. Tailored to your audience, tone, and goals.
          </p>
          <Link 
            href="/script-generate/"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
          >
            Start Generating
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </Link>
        </div>

        <div className="group bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all transform hover:-translate-y-2">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">AI Audio Generate</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Transform your scripts into professional-grade audio with natural-sounding AI voices. (Coming Soon)
          </p>
          <Link 
            href="/audio-generate/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            Explore Audio
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-900 to-black text-white p-12 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-6">Why choose AI Studio?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2 text-purple-400">Lightning Fast</h3>
              <p className="text-gray-400">Generate content in seconds, not hours. Focus on your creativity while we handle the heavy lifting.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-blue-400">Multi-Language</h3>
              <p className="text-gray-400">Support for over 15 languages, allowing you to reach a global audience effortlessly.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-teal-400">Premium Quality</h3>
              <p className="text-gray-400">Our advanced AI models ensure that the output is professional, engaging, and ready to use.</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>
      </div>
    </div>
  );
}
