import { useEffect, useState } from 'react';

interface CodeStatsResponse {
  dates: Record<string, number>;
  languages: Record<string, { new_xps: number; xps: number }>;
  new_xp: number;
  total_xp: number;
}

const LEVEL_FACTOR = 0.025;

function getLevel(xp: number) {
  return Math.floor(LEVEL_FACTOR * Math.sqrt(xp));
}

function getNextLevelXP(level: number) {
  return Math.pow(Math.ceil((level + 1) / LEVEL_FACTOR), 2);
}

function getLevelProgress(xp: number) {
  const level = getLevel(xp);
  const currentLevelXP = getNextLevelXP(level - 1);
  const nextLevelXP = getNextLevelXP(level);
  return Math.round(((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100);
}

const formatNumber = new Intl.NumberFormat('en-US');

export const Calendar = () => {
  const [codeStats, setCodeStats] = useState<CodeStatsResponse>();
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch('https://codestats.net/api/users/ismiabbas', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`CodeStats request failed: ${response.status}`);
        return response.json() as Promise<CodeStatsResponse>;
      })
      .then(setCodeStats)
      .catch((requestError) => {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        console.error(requestError);
        setError(true);
      });

    return () => controller.abort();
  }, []);

  if (error) {
    return (
      <div className='border-y border-line py-16 text-center'>
        <p className='font-mono text-xs uppercase tracking-[0.12em] text-accent'>Feed unavailable</p>
        <p className='mt-3 text-ink-muted'>The live CodeStats feed could not be reached.</p>
      </div>
    );
  }

  if (!codeStats) {
    return (
      <div className='grid animate-pulse gap-px border border-line bg-line sm:grid-cols-3' aria-label='Loading code activity'>
        {[0, 1, 2].map((item) => <div key={item} className='h-40 bg-surface' />)}
      </div>
    );
  }

  const level = getLevel(codeStats.total_xp);
  const percentage = getLevelProgress(codeStats.total_xp);
  const latestDate = Object.keys(codeStats.dates).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];
  const languages = Object.entries(codeStats.languages)
    .sort(([, a], [, b]) => b.xps - a.xps)
    .slice(0, 12);
  const maxXp = languages[0]?.[1].xps ?? 1;

  return (
    <div>
      <div className='grid gap-px border border-line bg-line sm:grid-cols-3'>
        <Stat label='Current level' value={String(level).padStart(2, '0')} />
        <Stat label='Total experience' value={formatNumber.format(codeStats.total_xp)} suffix='XP' />
        <Stat label='New today' value={formatNumber.format(codeStats.new_xp)} suffix='XP' />
      </div>

      <div className='mt-12 grid gap-10 lg:grid-cols-[18rem_1fr] lg:gap-16'>
        <div>
          <p className='font-mono text-xs uppercase tracking-[0.14em] text-accent'>Level progress</p>
          <div className='mt-5 border border-line p-5'>
            <div className='flex items-end justify-between gap-4'>
              <strong className='text-5xl font-semibold tracking-[-0.05em]'>{percentage}%</strong>
              <span className='font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ink-faint'>Toward level {level + 1}</span>
            </div>
            <div className='mt-6 h-2 bg-surface-2' role='progressbar' aria-label={`Progress toward level ${level + 1}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}>
              <div className='h-full bg-accent transition-transform duration-700' style={{ transform: `scaleX(${percentage / 100})`, transformOrigin: 'left' }} />
            </div>
          </div>
          {latestDate && (
            <p className='mt-4 font-mono text-[0.65rem] uppercase leading-relaxed tracking-[0.1em] text-ink-faint'>Latest recorded activity<br />{new Date(latestDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          )}
          <a href='https://codestats.net/users/ismiabbas' target='_blank' rel='noreferrer' className='mt-8 inline-flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] transition-colors hover:text-accent'>View source feed ↗</a>
        </div>

        <div>
          <div className='flex items-end justify-between gap-4 border-b border-line pb-4'>
            <div>
              <p className='font-mono text-xs uppercase tracking-[0.14em] text-accent'>Language ledger</p>
              <h2 className='mt-2 text-2xl font-semibold tracking-tight'>Lifetime activity</h2>
            </div>
            <span className='hidden font-mono text-[0.65rem] uppercase tracking-[0.1em] text-ink-faint sm:block'>Top {languages.length}</span>
          </div>
          <ol>
            {languages.map(([language, data], index) => (
              <li key={language} className='grid grid-cols-[2rem_1fr_auto] items-center gap-4 border-b border-line py-4 sm:grid-cols-[2rem_8rem_1fr_auto]'>
                <span className='font-mono text-[0.65rem] text-ink-faint'>{String(index + 1).padStart(2, '0')}</span>
                <strong className='truncate text-sm font-medium capitalize'>{language}</strong>
                <div className='col-span-2 h-1 bg-surface-2 sm:col-span-1'>
                  <div className='h-full bg-ink' style={{ width: `${Math.max((data.xps / maxXp) * 100, 1)}%` }} />
                </div>
                <span className='font-mono text-[0.65rem] text-ink-faint'>{formatNumber.format(data.xps)} XP</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value, suffix }: { label: string; value: string; suffix?: string }) => (
  <div className='bg-surface p-5 sm:p-7'>
    <p className='font-mono text-[0.65rem] uppercase tracking-[0.12em] text-ink-faint'>{label}</p>
    <p className='mt-7 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl'>{value} {suffix && <span className='font-mono text-xs tracking-normal text-accent'>{suffix}</span>}</p>
  </div>
);
