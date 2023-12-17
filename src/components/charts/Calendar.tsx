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
        const languages = data.languages;
        const machines = data.machines;
        const date = data.dates;

        for (const key in languages) {
            if (Object.prototype.hasOwnProperty.call(languages, key)) {
                const element = languages[key];
                console.log(key, element);
            }
        }
        setCodeStats(data);
    };

    const today = new Date();
    today.setDate(today.getDate() + 1);
    today.setHours(0, 0, 0, 0);
    console.log(today);
    return (
        <div>
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
                                <span className='capitalize font-semibold'>{language}</span>: New XP - {data.new_xps},
                                Total XP - {data.xps}
                            </li>
                        ))}
            </ul>

            {/* Render machines */}
            <div className='text-white text-lg mt-4'>Machines:</div>
            <ul className='text-white text-sm'>
                {codeStats?.machines &&
                    Object.entries(codeStats.machines).map(([machine, data]) => (
                        <li key={machine}>
                            {machine}: New XP - {data.new_xps}, Total XP - {data.xps}
                        </li>
                    ))}
            </ul>
        </div>
    );
};
