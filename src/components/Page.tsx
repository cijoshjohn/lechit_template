import { OdsPage } from '@ods/cucumber/components';

export interface PageProps {
  children: React.ReactNode;
}

export default function Page(props: PageProps) {
  return <OdsPage>{props.children}</OdsPage>;
}
