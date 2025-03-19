import {
  OdsSearchSelector,
  OdsSideBar,
  OdsSideBarNavItem,
  OdsSideBarNavList,
  OdsSideBarNavSubItem,
  SelectorItem,
  SelectorOptions,
} from '@ods/cucumber/components';
import { Link } from '@mui/material';
import { Fragment, useState } from 'react';

export interface Site {
  name: string;
  siteType: string;
  someNumber: number;
}

const siteItems: Site[] = [];
for (let i = 0; i < 25; i++) {
  siteItems.push({
    name: `Site ${i}`,
    siteType: `Type ${i % 3}`,
    someNumber: 100 - i,
  });
}

export default function SideBar() {
  const [site, setSite] = useState<Site>(siteItems[0]);

  const navItems: string[] = [];
  for (let i = 0; i < 2; i++) {
    navItems.push(`Item ${i}`);
  }

  const siteSelectorOptions: SelectorOptions<Site> = {
    selected: { item: site, displayName: site.name },
    onChanged: (selected) => setSite(selected.item),
    fetch: async (search) => {
      await new Promise((resolve) => setTimeout(resolve, 400)); // Simulate api call delay.
      const filtered = siteItems.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));
      return filtered.map(
        (site, i) =>
          ({
            item: site,
            displayName: site.name,
            categoryId: i % 11 === 0 ? undefined : `cat${i % 4}${i % 5 == 0 ? 'unk' : ''}`, // Generate some dummy unknown and uncategorised items.
          }) as SelectorItem<Site>,
      );
    },
    categories: [
      { id: 'cat0', displayName: 'BlastIQ Sites' },
      { id: 'cat1', displayName: 'Fragtrack Sites', right: <Link href="/">See More</Link> },
      { id: 'cat2', displayName: 'Other Sites' },
      { id: 'cat3', displayName: 'Axis Campaigns' },
    ],
  };

  return (
    <Fragment>
      <OdsSideBar>
        <OdsSearchSelector selectorOptions={siteSelectorOptions} />

        <OdsSideBarNavList>
          {/* <OdsSideBarNavItem label="Parent" route="/" selected>
            <OdsSideBarNavSubItem label="Child" route="/" />
          </OdsSideBarNavItem> */}
          {/* {navItems.map((x, i) => (
            <OdsSideBarNavItem key={x} label={x} route={i % 3 === 0 ? undefined : '/'}>
              <OdsSideBarNavSubItem label={'Child ' + i} route="/" />
            </OdsSideBarNavItem>
          ))} */}

          <OdsSideBarNavItem key={'home'} label={'Home'} route={'/'}>
            {/* <OdsSideBarNavSubItem key={'sub'} label={'Sub'} route="/sec" /> */}
            <OdsSideBarNavSubItem key={'dashboard'} label={'Dashboard'} route="/dashboard" />
            <OdsSideBarNavSubItem key={'details'} label={'Details'} route="/details" />
            <OdsSideBarNavSubItem key={'forecast'} label={'Forecast'} route="/forecast" />
          </OdsSideBarNavItem>
        </OdsSideBarNavList>
      </OdsSideBar>
    </Fragment>
  );
}
