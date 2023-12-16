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
import codeStatData from '../../../public/code_stats.json';

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
    JSON: '#CFCDAC',
    JavaScript: '#575329',
    'Plain text': '#372101',
    'TypeScript (JSX)': '#FFB500',
    Markdown: '#61615A',
    TypeScript: '#A079BF',
    textmate: '#34362D',
    Rust: '#5A0007',
    ReactNativeToolsOutput: '#6B002C',
    Go: '#1B4400',
    scminput: '#3B5DFF',
    'Shell Script': '#772600',
    Docker: '#636375',
    'java-properties': '#FF90C9',
    HTML: '#4FC601',
    'go.mod': '#772600',
    CSS: '#0089A3',
    DotEnv: '#6A3A4C',
    Ignore: '#452C2C',
    'JavaScript (JSX)': '#72418F',
    Git: '#66E1D3',
    Ruby: '#1B4400',
    Properties: '#7ED379',
    Log: '#C0B9B2',
    SQL: '#1CE6FF',
    Scala: '#99ADC0',
    prisma: '#CFCDAC',
    SCSS: '#D1F7CE',
    YAML: '#CFCDAC',
    'github-actions-workflow': '#BC23FF',
    Perl: '#E83000',
    Vue: '#FFF69F',
    astro: '#FEFFE6',
    Svelte: '#886F4C',
    'C++': '#8FB0FF',
    'C#': '#300018',
    Python: '#00FECF',
    XML: '#BC23FF',
    Less: '#300018',
    Terraform: '#00FECF',
    gradle: '#DDEFFF',
    Makefile: '#CFCDAC',
    MDX: '#1E6E00',
    zig: '#7B4F4B',
    Java: '#FDE8DC',
    C: '#004B28',
    Swift: '#FFDBE5',
    TOML: '#8FB0FF',
    'ct-java': '#B77B68',
    PHP: '#C2FFED',
    Config: '#00A6AA',
    'Microsoft SQL Server': '#7900D7',
    dotnetProject: '#FF2F80',
    'Angular HTML Template': '#404E55',
    Angular2: '#FDE8DC',
    'pip-requirements': '#C8D0F6',
    CSV: '#FF913F',
    PowerShell: '#FF6832',
    nginx: '#0CBD66',
    dockercompose: '#FFB500',
    Gitignore: '#004D43',
    MSBuild: '#6B7900',
    Razor: '#FF6832',
    Diff: '#BF5650',
    'CSV (semicolon)': '#B903AA',
    Haskell: '#7900D7',
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
        borderWidth: 1,
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
            position: 'bottom' as const,
        },
        title: {
            display: false,
            text: 'Codestats XP',
        },
    },
    backgroundColor: '607274',
    layout: {
        autoPadding: true,
    },
    onClick: (e: any) => {
        console.log(e);
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
        <div className='p-5 rounded-lg mt-5 w-screen max-w-screen-lg'>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
