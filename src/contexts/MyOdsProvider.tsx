import { PropsWithChildren, useContext } from 'react';
import { UserContext } from './UserContext';
import { OdsProvider, odsTheme, odsThemePink } from '@ods/cucumber';

export default function MyOdsProvider(props: PropsWithChildren): JSX.Element {
  const { user } = useContext(UserContext);

  return (
    <OdsProvider themes={[odsTheme, odsThemePink]} localStorage={{ key: user.fullName.replace(' ', '_') }}>
      {props.children}
    </OdsProvider>
  );
}
