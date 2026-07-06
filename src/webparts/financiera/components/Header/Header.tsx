import * as React from 'react';
import styles from './Header.module.scss';
import type { IHeaderProps } from './IHeaderProps';
import { escape } from '@microsoft/sp-lodash-subset';

const Header: React.FC<IHeaderProps> = ({
  userDisplayName,
  userPhotoUrl
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--ypf-blue)' }}>Ideas YPF</span>
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
