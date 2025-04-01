import type { Meta, StoryObj } from '@storybook/react';
import { Banner, BannerProps } from './Banner';
import { expect, within } from '@storybook/test';

const props: BannerProps = {
  cnAdded: 5,
  cumulativeResidenceTime: 6,
  cyanideProfile_model_cn: 7,
  leachingProfile_recoverable_au: 8,
  leachingProfile_recovered_au: 9,
};

const meta = {
  title: 'component/Banner',
  component: Banner,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: props,
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TestCheckAllText: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    let element = canvas.getByText('Gold');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('Recovered per hour');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('9 g/h');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('Recovery');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('8 %');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('Cyanide');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('Added');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('5 kg');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('Used per hour');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('6 kg/h');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('Tailings Conc.');
    await expect(element).toBeInTheDocument();

    element = canvas.getByText('7 ppm');
    await expect(element).toBeInTheDocument();
  },
};
