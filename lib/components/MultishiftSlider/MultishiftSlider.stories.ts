import { fn } from '@storybook/test';

import MultishiftSliderForm from './MultishiftSlider';

export default {
  component: MultishiftSliderForm,
  title: 'Pages/Utils/MultishiftSliderForm',
  tags: ['autodocs'],

  // Use `fn` to spy on the onSelected arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

export const Default = {
  args: {
    sliderVal: [0, 5],
    propertyName: 'throughput',
  },
};
