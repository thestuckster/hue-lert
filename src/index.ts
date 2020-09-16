import {Response} from "./Notification";
import {Light} from './Light';

const {Octokit} = require('@octokit/rest');
const huejay = require('huejay');

const hueUser = "";

let hueClient: any = null;
let hueIp = null;
let oldPrs = 0;

const octokit = new Octokit({
    auth: '',
    userAgent: 'hue-let',
    baseUrl: 'https://api.github.com'
});

async function main(): Promise<void> {
    hueIp = await getBridgeIp();

    hueClient = new huejay.Client({
        host: hueIp,
        username: hueUser
    });

    await notifyPullRequest(); //run once at start up because why not.
    setInterval(() => notifyPullRequest(), 300000);
}

async function notifyPullRequest(): Promise<boolean> {
    const prCount: number = await getPullRequests();

    if (prCount > oldPrs) {
        oldPrs = prCount;
        let lights: Light[] = await hueClient.lights.getAll();
        lights = lights.filter(l => l.name.toLowerCase().includes('desk'));
        for (const light of lights) {
            light.alert = "lselect";
            // light.effect = "colorloop";
            hueClient.lights.save(light);
        }
    }

    return true;
}

function getPullRequests(): Promise<number> {
    const review = "review_requested";
    return octokit.request('/notifications?participating=true')
        .then((response: Response) => {
            const pullRequests = response.data.filter(pr => pr.reason === review);
            return pullRequests.length;
        });
}

async function getBridgeIp(): Promise<string> {
    const bridges: any[] = await huejay.discover();
    return bridges[0].ip
}

main();