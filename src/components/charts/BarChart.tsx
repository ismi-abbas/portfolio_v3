import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import codeStatData from '../../../code_stats.json';

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
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  'TypeScript (JSX)': '#61DAFB',
  'JavaScript (JSX)': '#F7DF1E',
  HTML: '#E34F26',
  CSS: '#1572B6',
  SCSS: '#CC6699',
  JSON: '#000000',
  Markdown: '#083D77',
  MDX: '#FF7139',
  Rust: '#DEA584',
  Go: '#00ADD8',
  Python: '#3776AB',
  Java: '#007396',
  'C++': '#00599C',
  'C#': '#178600',
  Ruby: '#CC342D',
  PHP: '#777BB4',
  Swift: '#F05138',
  Kotlin: '#F18E33',
  Shell: '#4EAA25',
  Docker: '#2496ED',
  YAML: '#CB171E',
  TOML: '#9C4221',
  SQL: '#336791',
  GraphQL: '#E10098',
  Vue: '#4FC08D',
  React: '#61DAFB',
  Angular: '#DD0031',
  Svelte: '#FF3E00',
  Astro: '#FF5D01',
  Next: '#000000',
  Vite: '#646CFF',
  Webpack: '#8DD6F9',
  Babel: '#F9DC3E',
  ESLint: '#4B32C3',
  Prettier: '#F7B93E',
  Jest: '#C21325',
  Testing: '#99425B',
  Git: '#F05032',
  GitHub: '#181717',
  GitLab: '#FC6D26',
  Bitbucket: '#0052CC',
  Jira: '#0052CC',
  Confluence: '#172B4D',
  Slack: '#4A154B',
  Discord: '#5865F2',
  VSCode: '#007ACC',
  WebStorm: '#000000',
  Sublime: '#FF9800',
  Vim: '#019733',
  Neovim: '#57A143',
  Terminal: '#4D4D4D',
  Linux: '#FCC624',
  macOS: '#000000',
  Windows: '#0078D6',
  AWS: '#232F3E',
  Azure: '#0078D4',
  GCP: '#4285F4',
  Firebase: '#FFCA28',
  MongoDB: '#47A248',
  PostgreSQL: '#336791',
  MySQL: '#4479A1',
  Redis: '#DC382D',
  Node: '#339933',
  Deno: '#000000',
  Bun: '#000000',
  npm: '#CB3837',
  yarn: '#2C8EBB',
  pnpm: '#F69220',
  Dockerfile: '#2496ED',
  Kubernetes: '#326CE5',
  Terraform: '#7B42BC',
  Ansible: '#EE0000',
  Jenkins: '#D24939',
  GitHubActions: '#2088FF',
  GitLabCI: '#FC6D26',
  CircleCI: '#343434',
  TravisCI: '#3EAAAF',
  Cypress: '#17202C',
  Playwright: '#2EAD33',
  Puppeteer: '#40B5A8',
  Selenium: '#43B02A',
  Mocha: '#8D6748',
  Chai: '#A30701',
  Sinon: '#000000',
  Storybook: '#FF4785',
  Docusaurus: '#25C2A0',
  Gatsby: '#663399',
  Hugo: '#FF4088',
  Jekyll: '#CC0000',
  WordPress: '#21759B',
  Drupal: '#0678BE',
  Magento: '#EE6723',
  Shopify: '#96BF48',
  WooCommerce: '#96588A',
  Stripe: '#6772E5',
  PayPal: '#003087',
  Square: '#3E4348',
  Twilio: '#F22F46',
  SendGrid: '#1A82FF',
  Mailchimp: '#FFE01B',
  HubSpot: '#FF7A59',
  Salesforce: '#00A1E0',
  Zendesk: '#03363D',
  Intercom: '#1F8FF7',
  Freshdesk: '#25B0E6',
  Trello: '#0079BF',
  Asana: '#FC636B',
  Monday: '#FF0000',
  ClickUp: '#7B68EE',
  Notion: '#000000',
  MicrosoftTeams: '#6264A7',
  Zoom: '#2D8CFF',
  GoogleMeet: '#00897B',
  Webex: '#00BEF2',
  Figma: '#F24E1E',
  Sketch: '#F7B500',
  AdobeXD: '#FF61F6',
  InVision: '#FF3366',
  Zeplin: '#FDBD39',
  Abstract: '#191A1B',
  Framer: '#0055FF',
  Webflow: '#4353FF',
  Wix: '#000000',
  Squarespace: '#000000',
  BigCommerce: '#34313F',
  PrestaShop: '#DF0067',
  OpenCart: '#34495E',
  Joomla: '#5091CD',
  Ghost: '#738A94',
  Medium: '#000000',
  'Dev.to': '#0A0A0A',
  Hashnode: '#2962FF',
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
  }, {}),
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

const slicedData: any = sortedData.slice(0, 8).map((dataset) => ({
  ...dataset,
  barThickness: 24,
  borderRadius: 6,
  hoverBorderWidth: 2,
  hoverBorderColor: '#ffffff',
  hoverBackgroundColor: dataset.backgroundColor,
}));

export const data: ChartData<'bar', any, any> = {
  labels: labels,
  datasets: slicedData,
};

export const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: 12,
          family: "'Inter', sans-serif",
        },
        color: '#ffffff',
      },
    },
    title: {
      display: true,
      text: 'Coding Activity Timeline',
      font: {
        size: 18,
        family: "'Inter', sans-serif",
        weight: 600,
      },
      padding: {
        top: 10,
        bottom: 20,
      },
      color: '#ffffff',
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: {
        size: 14,
        family: "'Inter', sans-serif",
      },
      bodyFont: {
        size: 13,
        family: "'Inter', sans-serif",
      },
      cornerRadius: 8,
      callbacks: {
        label: function (context) {
          const label = context.dataset.label || '';
          const value = context.parsed.x;
          return `${label}: ${value.toLocaleString()} characters`;
        },
      },
    },
  },
  layout: {
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: "'Inter', sans-serif",
        },
        color: '#ffffff',
        callback: function (value) {
          return value.toLocaleString();
        },
      },
    },
    y: {
      type: 'category',
      labels: labels,
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: "'Inter', sans-serif",
        },
        color: '#ffffff',
      },
    },
  },
  indexAxis: 'y',
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart',
  },
};

const BarChart = () => {
  return (
    <div className='p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg mt-5 w-full max-w-screen-lg mx-auto hover:bg-white/10 transition-colors duration-300'>
      <div className='h-[700px]'>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
