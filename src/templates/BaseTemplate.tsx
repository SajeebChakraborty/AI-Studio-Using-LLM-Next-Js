import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { AppConfig } from '@/utils/AppConfig';

export const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const t = useTranslations('BaseTemplate');

  return (
    <div className="w-full text-gray-700 antialiased bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 rounded-b-2xl shadow-sm">
          <div className="flex items-center justify-between py-4 px-6">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                {AppConfig.name}
              </Link>
              
              <nav aria-label="Main navigation">
                <ul className="flex items-center gap-x-6 text-sm font-medium">
                  {props.leftNav}
                </ul>
              </nav>
            </div>

            <nav>
              <ul className="flex items-center gap-x-4 text-sm font-medium">
                {props.rightNav}
              </ul>
            </nav>
          </div>
        </header>

        <main>{props.children}</main>

        <footer className="border-t border-gray-300 py-8 text-center text-sm">
          {`© Copyright ${new Date().getFullYear()} ${AppConfig.name}. `}
          {t.rich('made_with', {
            author: () => (
              <a
                href="/"
                className="text-blue-700 hover:border-b-2 hover:border-blue-700"
              >
                AI Studio
              </a>
            ),
          })}
          {/*
           * PLEASE READ THIS SECTION
           * I'm an indie maker with limited resources and funds, I'll really appreciate if you could have a link to my website.
           * The link doesn't need to appear on every pages, one link on one page is enough.
           * For example, in the `About` page. Thank you for your support, it'll mean a lot to me.
           */}
        </footer>
      </div>
    </div>
  );
};
