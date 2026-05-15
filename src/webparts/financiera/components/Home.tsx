import * as React from 'react';
import styles from './Home.module.scss';
import type { IHomeProps } from './IHomeProps';
import Header from './Header';
import { escape } from '@microsoft/sp-lodash-subset';

const Home: React.FC<IHomeProps> = ({
  appName,
  userDisplayName,
  userPhotoUrl,
  environmentMessage,
  description
}) => {
  return (
    <div className={styles.home}>
      <Header userDisplayName={userDisplayName} userPhotoUrl={userPhotoUrl} />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Bienvenido a {escape(appName)}.</h1>
          <p className={styles.subtitle}>
            Hola {escape(userDisplayName)}, esta es tu página de inicio en Circo Finanzas.
          </p>
          <div className={styles.card}>
            <p>{escape(environmentMessage)}</p>
            <p>
              <strong>Descripción:</strong> {escape(description)}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
