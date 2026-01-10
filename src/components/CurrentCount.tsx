import { getTranslations } from 'next-intl/server';

export const CurrentCount = async () => {
  const t = await getTranslations('CurrentCount');

  // Database functionality has been removed
  // Returning a static count of 0
  const count = 0;

  return (
    <div>
      {t('count', { count })}
    </div>
  );
};
