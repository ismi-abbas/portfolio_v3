import type { SSTConfig } from 'sst';
import { AstroSite, Bucket } from 'sst/constructs';

export default {
    config(_input) {
        return {
            name: 'portfolio-v3',
            region: 'ap-southeast-1',
        };
    },
    stacks(app) {
        app.stack(function Site({ stack }) {
            const bucket = new Bucket(stack, 'public');
            const site = new AstroSite(stack, 'site', {
                bind: [bucket],
            });
            stack.addOutputs({
                url: site.url,
            });
        });
    },
} satisfies SSTConfig;
