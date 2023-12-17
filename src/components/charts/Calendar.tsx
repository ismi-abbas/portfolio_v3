import { useEffect, useState } from 'react';
// import { ResponsiveCalendar } from '@nivo/calendar';

const token = import.meta.env.TOKEN;

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

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch('https://codestats.net/api/users/ismiabbas');
        const data = (await response.json()) as CodeStatsResponse;
        setCodeStats(data);
    };

    const today = new Date();
    today.setDate(today.getDate() + 1);
    today.setHours(0, 0, 0, 0);

    return (
        <div className='flex flex-row'>
            <div className='w-10 bg-green-500'>
                <div className='h-[40%] bg-white'></div>
            </div>

            <div className='ml-5'>
                <div>
                    <div className='font-bold text-sky-500 text-2xl'>Code Stats Exp</div>
                    <div className='text-white'>{today.toString()}</div>
                </div>
                <div className='mt-2'>
                    <div className='text-white'>TOTAL EXP: {codeStats?.total_xp} XP</div>
                    <div className='text-white'>NEW EXP: {codeStats?.new_xp} XP</div>
                </div>

                {/* Render languages */}
                <div className='text-white text-lg mt-4'>Languages:</div>
                <ul className='text-white text-sm'>
                    {codeStats?.languages &&
                        Object.entries(codeStats.languages)
                            .sort((a, b) => b[1].new_xps - a[1].new_xps)
                            .slice(0, 10)
                            .map(([language, data]) => (
                                <li key={language}>
                                    <span className='capitalize font-semibold'>{language}</span>: New XP -{' '}
                                    {data.new_xps}, Total XP - {data.xps}
                                </li>
                            ))}
                </ul>
            </div>
        </div>
    );
};
