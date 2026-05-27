import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import stylesSource from './Home.module.scss';
import type { IHomeProps } from './IHomeProps';
import { escape } from '@microsoft/sp-lodash-subset';

const styles = stylesSource as Record<string, string>;

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

const metrics = [
  {
    icon: 'Trending12',
    label: 'Tendencia semanal',
    value: '+12.8%'
  },
  {
    icon: 'Money',
    label: 'Valor total',
    value: '$1.2M'
  },
  {
    icon: 'Shield',
    label: 'Seguridad',
    value: 'Operativo'
  }
];

const highlights = [
  { label: 'Nuevos instrumentos', value: '6' },
  { label: 'Alertas hoy', value: '2' },
  { label: 'Tareas pendientes', value: '4' }
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
        <section className={styles.hero}>
          <div className={styles.heroIntro}>
            <p className={styles.sectionTag}>Inicio</p>
            <h1 className={styles.pageTitle}>Hola {escape(userDisplayName)}, bienvenido a {escape(appName)}</h1>
            <p className={styles.pageText}>
              Administra tus instrumentos, sigue las tendencias clave y controla la configuración desde un solo lugar.
            </p>
          </div>

          <div className={styles.heroCards}>
            {metrics.map((item) => (
              <article key={item.label} className={styles.heroCard}>
                <i className={`${styles.metricIcon} ms-Icon ms-Icon--${item.icon}`} aria-hidden="true" />
                <div>
                  <span className={styles.cardLabel}>{item.label}</span>
                  <strong className={styles.cardValue}>{item.value}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.bodyGrid}>
          <div className={styles.leftPanel}>
            <div className={`${styles.card} ${styles.overviewCard}`}>
              <div className={styles.cardHeader}>
                <div>
                  <h2>Resumen rápido</h2>
                  <p className={styles.cardSubtitle}>{environmentMessage || description}</p>
                </div>
                {userPhotoUrl && (
                  <img src={userPhotoUrl} alt={escape(userDisplayName)} className={styles.userAvatar} />
                )}
              </div>
              <p>
                Revisa los indicadores principales, accede a las funciones clave y mantén tu espacio financiero siempre actualizado.
              </p>

              <div className={styles.highlightList}>
                {highlights.map((item) => (
                  <div key={item.label} className={styles.highlightItem}>
                    <span className={styles.highlightValue}>{item.value}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.actionGrid}>
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
          </div>

          <aside className={styles.rightPanel}>
            <div className={`${styles.card} ${styles.quickLinks}`}>
              <h2>Acciones rápidas</h2>
              <p>Selecciona una sección para comenzar o revisa tu estado actual en segundos.</p>
              <div className={styles.quickLinkList}>
                <div className={styles.quickLinkItem}>
                  <strong>35</strong>
                  <span>Avisos pendientes</span>
                </div>
                <div className={styles.quickLinkItem}>
                  <strong>8</strong>
                  <span>Actualizaciones recientes</span>
                </div>
                <div className={styles.quickLinkItem}>
                  <strong>14</strong>
                  <span>Elementos guardados</span>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default Home;
