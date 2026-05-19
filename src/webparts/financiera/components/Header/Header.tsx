import * as React from 'react';
import { IconButton } from '@fluentui/react';
import styles from './Header.module.scss';
import type { IHeaderProps } from './IHeaderProps';
import { escape } from '@microsoft/sp-lodash-subset';

const Header: React.FC<IHeaderProps> = ({
  userDisplayName,
  userPhotoUrl,
  onMenuClick
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <IconButton
          className={styles.menuButton}
          iconProps={{ iconName: 'GlobalNavButton' }}
          ariaLabel="Abrir menú"
          onClick={onMenuClick}
        />
      </div>
      <div className={styles.headerRight}>
        <span className={styles.userName}>{escape(userDisplayName)}</span>
        {userPhotoUrl && (
          <img
            src={userPhotoUrl}
            alt={escape(userDisplayName)}
            className={styles.userPhoto}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
