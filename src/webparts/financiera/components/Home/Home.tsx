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
    color: '#E8751C'
  },
  {
    path: '/grafica',
    icon: 'BarChart4',
    label: 'Gráfica',
    color: '#6A4A9C'
  },
  {
    path: '/administracion',
    icon: 'Settings',
    label: 'Administración',
    color: '#0B5DAA'
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
    <div className={styles.homeContainer}>
      <main className={styles.homeMain}>
        <section className={styles.contentGrid}>
          {/* Columna izquierda - Mensaje de bienvenida */}
          <div className={styles.leftColumn}>
            <div className={`${styles.card} ${styles.welcomeCard}`}>
              <div className={styles.welcomeContent}>
                <div className={styles.iconCircle}>
                  💡
                </div>
                <h1 className={styles.welcomeTitle}>{escape(appName)}</h1>
                <p className={styles.welcomeText}>
                  Te damos la bienvenida al sistema de gestión financiera. Un espacio para administrar tus instrumentos, 
                  seguir tendencias clave y optimizar tu portafolio desde un solo lugar.
                </p>
                <div className={styles.welcomeUser}>
                  {userPhotoUrl && (
                    <img src={userPhotoUrl} alt={escape(userDisplayName)} className={styles.userProfilePic} />
                  )}
                  <div>
                    <p className={styles.welcomeUserName}>{escape(userDisplayName)}</p>
                    <p className={styles.welcomeUserRole}>Gestor Financiero</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Botones de navegación */}
          <div className={styles.rightColumn}>
            <div className={styles.navigationGrid}>
              {actionItems.map((item) => (
                <button
                  key={item.path}
                  className={styles.navButton}
                  onClick={() => navigate(item.path)}
                  style={{ 
                    backgroundColor: item.color,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                    padding: '2rem',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    minHeight: '140px',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <span style={{ textAlign: 'left', lineHeight: '1.3', flex: 1 }}>{item.label}</span>
                  <i className={`ms-Icon ms-Icon--${item.icon}`} style={{ fontSize: '2.8rem', color: 'rgba(255, 255, 255, 0.95)', minWidth: '60px', textAlign: 'center', flexShrink: 0 }} />
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
