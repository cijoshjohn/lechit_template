import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../lib/**/*.mdx','../src/**/*.mdx','../src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)', '../lib/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-viewport",
    '@storybook/addon-jest',
    '@storybook/test-runner',
    '@storybook/addon-docs',
    "@storybook/experimental-addon-test"
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: { builder: "@storybook/builder-vite" }
};
export default config;
