import * as React from 'react';
import { IconButton } from '@fluentui/react';
import styles from './Header.module.scss';
import type { IHeaderProps } from './IHeaderProps';
import { escape } from '@microsoft/sp-lodash-subset';

const Header: React.FC<IHeaderProps> = ({
  appName,
  userDisplayName,
  onMenuClick
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <span className={styles.userName}>{escape(userDisplayName)}</span>
      </div>
      <div className={styles.headerRight}>
        <span className={styles.appName}>{escape(appName)}</span>
        <IconButton
          className={styles.menuButton}
          iconProps={{ iconName: 'GlobalNavButton' }}
          ariaLabel="Abrir menú"
          onClick={onMenuClick}
        />
      </div>
    </header>
  );
};

export default Header;
