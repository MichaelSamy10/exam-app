import { Link } from '@/i18n/navigation';
import LoginForm from './_components/login-form';
import { Suspense } from 'react';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  // Translation
  const t = useTranslations('auth-pages.login-page');

  return (
    <div className="m-auto w-4/5 md:w-[452px]">
      <h2 className="mb-10 font-secondary text-3xl font-bold rtl:font-tajawal">
        {t('header')}
      </h2>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
      <div className="mt-9 text-center text-gray-500">
        {t('no-account-text')}&nbsp;
        <Link
          className="text-sm text-primary"
          href={'/register'}
        >
          {t('register-link')}
        </Link>
      </div>
    </div>
  );
}
