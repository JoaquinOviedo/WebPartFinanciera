import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss';
import type { IHomeProps } from './IHomeProps';
import { escape } from '@microsoft/sp-lodash-subset';

const actionItems = [
  {
    path: '/galeria',
    icon: 'ImageCollection',
    label: 'Galería de Instrumentos',
    description: 'Explora los instrumentos financieros disponibles.'
  },
  {
    path: '/grafica',
    icon: 'BarChart4',
    label: 'Gráfica',
    description: 'Consulta visualizaciones y tendencias clave.'
  },
  {
    path: '/administracion',
    icon: 'Settings',
    label: 'Administración',
    description: 'Ajusta la configuración y gestiona tu espacio.'
  }
];

const Home: React.FC<IHomeProps> = ({
  appName,
  userDisplayName,
  userPhotoUrl,
  environmentMessage,
  description
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.home}>
      <main className={styles.main}>
        <section className={styles.bodyGrid}>
          <div className={styles.topIntro}>
            <p className={styles.sectionTag}>Inicio</p>
            <h1 className={styles.pageTitle}>Bienvenido a {escape(appName)}</h1>
            <p className={styles.pageText}>
              Hola {escape(userDisplayName)}, esta es tu página principal. Desde aquí puedes acceder rápidamente a las secciones más importantes de la aplicación.
            </p>
          </div>

          <aside className={styles.rightPanel}>
            <h2>Ir a</h2>
            <div className={styles.actionList}>
              {actionItems.map((item) => (
                <button
                  key={item.path}
                  className={styles.actionButton}
                  type="button"
                  onClick={() => navigate(item.path)}
                >
                  <i className={`${styles.actionIcon} ms-Icon ms-Icon--${item.icon}`} aria-hidden="true" />
                  <div className={styles.actionInfo}>
                    <span className={styles.actionLabel}>{item.label}</span>
                    <span className={styles.actionDescription}>{item.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default Home;
