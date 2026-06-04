import { Toaster } from '@/components/ui/toaster';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { Inter, Tajawal } from 'next/font/google';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import Providers from '../components/providers';
import {
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { cn } from '@/lib/utils/tailwind-merge';

const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const tajawal = Tajawal({
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  subsets: ['latin', 'arabic'],
  variable: '--font-tajawal',
});

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata() {
  const t = await getTranslations('metadata');

  return {
    title: t('title'),
  };
}

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({
  children,
  params: { locale },
}: LayoutProps) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="font-primary rtl:font-tajawal"
    >
      <body
        className={cn(
          locale === 'ar'
            ? tajawal.className
            : geistMono.className,
          geistMono.variable,
          inter.variable,
          tajawal.variable,
          'antialiased',
        )}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
