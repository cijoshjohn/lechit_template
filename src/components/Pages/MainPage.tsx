import { useMemo, useState } from 'react';
import Page from 'components/Page';
import { Box, Typography } from '@mui/material';
import { OdsSearchBar, OdsSearchSelector, SelectorItem, SelectorOptions } from '@ods/cucumber/components';
import { Lipsum } from '@ods/cucumber';
import { FourK, OneK, ThreeK, TwoK } from '@mui/icons-material';

export interface ExampleItem {
  text: string;
}

const exampleItems: ExampleItem[] = [];
for (let i = 0; i < 25; i++) {
  exampleItems.push({ text: `Item ${i}` });
}

export default function MainPage() {
  const [searchString, setSearchString] = useState('');
  const [exampleItem, setExampleItem] = useState<ExampleItem>(exampleItems[0]);

  const exampleSelectorOptions = useMemo(
    () =>
      ({
        selected: { item: exampleItem, displayName: exampleItem.text },
        onChanged: (selected) => setExampleItem(selected.item),
        fetch: async (search) => {
          await new Promise((resolve) => setTimeout(resolve, 400)); // Simulate api call delay.
          const filtered = exampleItems.filter((x) => x.text.toLowerCase().includes(search.toLowerCase()));
          return filtered.map(
            (x, i) => ({ item: x, displayName: x.text, categoryId: `cat${i % 4}` }) as SelectorItem<ExampleItem>,
          );
        },
        categories: [
          { id: 'cat0', displayName: 'Category 1', right: <OneK /> },
          { id: 'cat1', displayName: 'Category 2', right: <TwoK /> },
          { id: 'cat2', displayName: 'Category 3', right: <ThreeK /> },
          { id: 'cat3', displayName: 'Category 4', right: <FourK /> },
        ],
      }) as SelectorOptions<ExampleItem>,
    [exampleItem],
  );

  const paras = useMemo(
    () =>
      Lipsum(5, 'paragraphs', (s) => (
        <Typography key={s} align="justify" gutterBottom component="p">
          {s}
        </Typography>
      )),
    [],
  );

  return (
    <Page>
      <Box sx={{ margin: 2 }}>
        <OdsSearchBar
          sx={{ pb: 2 }}
          label="Example search bar"
          onFetch={async () => await Promise.resolve()}
          searchString={[searchString, setSearchString]}
        />

        <OdsSearchSelector selectorOptions={exampleSelectorOptions} />

        {paras}
      </Box>
    </Page>
  );
}
