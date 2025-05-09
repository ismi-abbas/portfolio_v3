import { format } from 'date-fns';
import { useEffect, useState } from 'react';

interface CodeStatsResponse {
  dates: Dates;
  languages: { [key: string]: ExpData };
  machines: { [key: string]: ExpData };
  new_xp: number;
  total_xp: number;
  user: string;
}

interface ExpData {
  new_xps: number;
  xps: number;
}

interface Dates {
  [key: string]: number;
}

export const Calendar = () => {
  const [codeStats, setCodeStats] = useState<CodeStatsResponse>();
  const [level, setLevel] = useState(0);
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('https://codestats.net/api/users/ismiabbas');
    const data = (await response.json()) as CodeStatsResponse;
    const level = getLevel(data.total_xp);
    const progress = getLevelProgress(data.total_xp);

    setLevel(level);
    setCodeStats(data);
    setPercentage(progress);
  };

  const LEVEL_FACTOR = 0.025;

  function getLevel(xp: number) {
    return Math.floor(LEVEL_FACTOR * Math.sqrt(xp));
  }

  function getNextLevelXP(level: number): number {
    return Math.pow(Math.ceil((level + 1) / LEVEL_FACTOR), 2);
  }

  function getLevelProgress(xp: number): number {
    const level = getLevel(xp);
    const currentLevelXP = getNextLevelXP(level - 1);
    const nextLevelXP = getNextLevelXP(level);

    const haveXP = xp - currentLevelXP;
    const neededXP = nextLevelXP - currentLevelXP;

    return Math.round((haveXP / neededXP) * 100);
  }

  const today = new Date();
  const todayDate = format(today, 'dd-MMM-yyyy');

  return (
    <div className='flex flex-row w-full'>
      <div
        className='text-white text-center'
        style={{
          writingMode: 'vertical-rl',
        }}>
        Level Progress
      </div>
      <ExpBar percentage={percentage} />

      <div className='ml-5 text-white'>
        <div>
          <div className='font-bold text-sky-500 text-2xl'>
            <a href='https://codestats.net/users/ismiabbas' target='_blank' rel='noreferrer'>
              Code Stats
            </a>
          </div>
          <div className=''>Last coding on: {todayDate}</div>
        </div>

        <div className='mt-2'>
          <div className=''>Level: {level}</div>
          <div className=''>Total Exp: {codeStats?.total_xp} XP</div>
          <div className=''>New Exp Today: {codeStats?.new_xp} XP</div>
        </div>

        {/* Render languages */}
        <div className=' text-lg mt-4'>Languages:</div>
        <div className='gap-5'>
          <ul className='text-sm'>
            {codeStats?.languages &&
              Object.entries(codeStats.languages)
                .sort((a, b) => b[1].xps - a[1].xps)
                .sort((a, b) => b[1].new_xps - a[1].new_xps)
                .slice(0, 7)
                .map(([language, data]) => (
                  <li key={language} className='leading-relaxed'>
                    <span className='capitalize font-semibold'>{language}</span>: {data.xps} XP{' '}
                    {data.new_xps > 0 ? '⬆️' : '➡️'}
                    {data.new_xps} XP
                  </li>
                ))}
          </ul>
          <ul className='text-sm'>
            {codeStats?.languages &&
              Object.entries(codeStats.languages)
                .sort((a, b) => b[1].xps - a[1].xps)
                .sort((a, b) => b[1].new_xps - a[1].new_xps)
                .slice(7, 15)
                .map(([language, data]) => (
                  <li key={language} className='leading-relaxed'>
                    <span className='capitalize font-semibold'>{language}</span>: {data.xps} XP{' '}
                    {data.new_xps > 0 ? '⬆️' : '➡️'}
                    {data.new_xps} XP
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ExpBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className='w-10 bg-white rounded-md overflow-hidden rotate-180'>
      <div
        className='bg-green-500 rounded-t-md h-full transition-height'
        style={{
          height: `${percentage}%`,
        }}></div>
      <div className='text-center font-semibold rotate-180'>{percentage}%</div>
    </div>
  );
};
