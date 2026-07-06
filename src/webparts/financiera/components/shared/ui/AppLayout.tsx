import * as React from 'react';
import { ReactNode } from 'react';
import { Stack } from '@fluentui/react';

interface AppLayoutProps {
  header?: ReactNode;
  menu?: ReactNode;
  children?: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ header, children }) => {
  return (
    <Stack verticalFill styles={{ root: { height: '100%', display: 'flex', flexDirection: 'column' } }}>
      {header}
      <Stack.Item grow styles={{ root: { overflow: 'auto', padding: 0, background: 'var(--bodyBackground, #fff)', flex: 1, display: 'flex', flexDirection: 'column' } }}>
        {children}
      </Stack.Item>
    </Stack>
  );
};

export default AppLayout;
