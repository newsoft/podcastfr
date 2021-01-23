import { generateContentFiles } from './generateContentFiles';

interface NetlifyUtils {
  cache: {
    restore: (path: string, options?: Partial<{ cwd: string }>) => Promise<boolean>;
    save: (path: string, options?: Partial<{ digests: string[]; cwd: string; ttl: number }>) => Promise<boolean>;
  };
  run: {
    command: (args: string) => Promise<void>;
  };
}

interface NetlifyInputs {
  podcastsYamlDirectory: string;
  podcastsJsonDirectory: string;
}

interface NetlifyOpts {
  utils: NetlifyUtils;
  netlifyConfig: { build: { base: string } };
  inputs: NetlifyInputs;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constants: any;
}

// https://docs.netlify.com/configure-builds/build-plugins/create-plugins/
// https://github.com/netlify/build/blob/master/packages/run-utils/README.md
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async onPreBuild({ constants, utils, inputs }: NetlifyOpts) {
    console.log('>netlify>plugin>onPreBuild');
    console.log('>netlify>plugin>input>podcastsYamlDirectory>', inputs.podcastsYamlDirectory);
    await utils.run.command(`ls -l ${inputs.podcastsYamlDirectory}`);
    console.log('>netlify>plugin>input>podcastsJsonDirectory>', inputs.podcastsJsonDirectory);
    await utils.run.command(`ls -l ${inputs.podcastsJsonDirectory}`);
    console.log('>netlify>plugin>input>constants>', JSON.stringify(constants));

    await generateContentFiles({
      inputYamlDirectory: inputs.podcastsYamlDirectory,
      outputJsonDirectory: inputs.podcastsJsonDirectory,
    });
  },
  async onSuccess() {
    console.log('>netlify>plugin>onSuccess');
  },
};
