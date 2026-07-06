import * as React from 'react';
import { Nav, IconButton, Stack } from '@fluentui/react';

interface MenuItem {
  key: string;
  label: string;
  path?: string;
  onClick?: () => void;
}

interface AppMenuProps {
  isOpen?: boolean;
  onToggle?: () => void;
  items?: MenuItem[];
}

export const AppMenu: React.FC<AppMenuProps> = ({ isOpen = true, onToggle, items = [] }) => {
  const navLinks = items.map((it) => ({ key: it.key, name: it.label, url: '#', onClick: it.onClick }));

  return (
    <Stack styles={{ root: { height: '100%', background: '#0b5daa', color: '#fff', padding: 8 } }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton iconProps={{ iconName: 'GlobalNavButton' }} title="Menu" ariaLabel="toggle" onClick={onToggle} styles={{ root: { color: '#fff' } }} />
      </div>
      <nav style={{ marginTop: 8 }}>
        <Nav groups={[{ links: navLinks }]} styles={{ root: { selectors: { '.ms-Nav-link': { color: '#fff' } } } }} />
      </nav>
    </Stack>
  );
};

export default AppMenu;
