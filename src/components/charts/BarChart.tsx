import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
} from 'chart.js';
import codeStatData from './CodeStat.json';

type CodeStatData = {
    sent_at: string;
    sent_at_local: string;
    tz_offset: number;
    language: string;
    machine: string;
    amount: number;
};

//

const colorMap: Record<string, string> = {
    'C#': '#F875AA',
    JSON: '#9AD0C2',
    Haskell: '#EEF296',
    'TypeScript (JSX)': '#FF8F8F',
    TypeScript: '#4EB3FF',
    Rust: '#FD9903',
    Go: '#9EDDFF',
    JavaScript: '#FFCD4E',
    'JavaScript (JSX)': '#D9CA58',
    astro: '#FF45C8',
};

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const myData = codeStatData as CodeStatData[];

const groupedData = myData.reduce((result: any, item) => {
    const key = item.sent_at_local.split(' ')[0] as keyof typeof groupedData;
    if (!result[key]) {
        result[key] = {};
    }

    if (!result[key][item.language]) {
        result[key][item.language] = 0;
    }

    result[key][item.language] += item.amount;

    return result;
}, {});

const labels = Object.keys(groupedData)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .slice(0, 10);
const datasets = Object.keys(
    myData.reduce((result: any, item) => {
        result[item.language] = true;
        return result;
    }, {})
).map((language) => {
    return {
        label: language,
        data: labels.map((date) => groupedData[date][language] || 0),
        backgroundColor: colorMap[language] || '#000000',
        borderWidth: 2,
        borderColor: '#fff',
        stack: 1,
    };
});

const sortedData = datasets.sort((a, b) => {
    const latestA = Math.max(...a.data);
    const latestB = Math.max(...b.data);
    return latestB - latestA;
});

const slicedData: any = sortedData.slice(0, 8);

export const data: ChartData<'bar', any, any> = {
    labels: labels,
    datasets: slicedData,
};

export const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Codestats XP',
        },
    },
    scales: {
        x: {
            beginAtZero: true,
        },
        y: {
            type: 'category',
            labels: labels,
        },
    },
    indexAxis: 'y',
};

const BarChart = () => {
    return (
        <div className='p-5 rounded-lg mt-5  bg-slate-100 w-screen max-w-screen-lg'>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
