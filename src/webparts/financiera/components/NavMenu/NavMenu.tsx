import * as React from 'react';
import { IconButton } from '@fluentui/react';
import styles from './NavMenu.module.scss';

interface INavMenuProps {
  isOpen: boolean;
  currentScreen: 'home' | 'galeria' | 'grafica' | 'administracion';
  onNavigate: (screen: 'home' | 'galeria' | 'grafica' | 'administracion') => void;
  onClose: () => void;
}

const NavMenu: React.FC<INavMenuProps> = ({
  isOpen,
  currentScreen,
  onNavigate,
  onClose
}) => {
  const handleNavigate = (screen: 'home' | 'galeria' | 'grafica' | 'administracion'): void => {
    onNavigate(screen);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className={styles.overlay} onClick={onClose} />
      )}
      
      {/* Menu lateral */}
      <nav className={`${styles.navMenu} ${isOpen ? styles.open : ''}`}>
        <div className={styles.menuHeader}>
          <h2>Menú</h2>
          <IconButton
            className={styles.closeButton}
            iconProps={{ iconName: 'Cancel' }}
            onClick={onClose}
            ariaLabel="Cerrar menú"
          />
        </div>

        <ul className={styles.menuList}>
          <li>
            <button
              className={`${styles.menuItem} ${currentScreen === 'home' ? styles.active : ''}`}
              onClick={() => handleNavigate('home')}
            >
              <i className={`${styles.icon} ms-Icon ms-Icon--Home`} />
              <span>Inicio</span>
            </button>
          </li>
          <li>
            <button
              className={`${styles.menuItem} ${currentScreen === 'galeria' ? styles.active : ''}`}
              onClick={() => handleNavigate('galeria')}
            >
              <i className={`${styles.icon} ms-Icon ms-Icon--ImageCollection`} />
              <span>Galería de Instrumentos</span>
            </button>
          </li>
          <li>
            <button
              className={`${styles.menuItem} ${currentScreen === 'grafica' ? styles.active : ''}`}
              onClick={() => handleNavigate('grafica')}
            >
              <i className={`${styles.icon} ms-Icon ms-Icon--BarChart4`} />
              <span>Gráfica</span>
            </button>
          </li>
          <li>
            <button
              className={`${styles.menuItem} ${currentScreen === 'administracion' ? styles.active : ''}`}
              onClick={() => handleNavigate('administracion')}
            >
              <i className={`${styles.icon} ms-Icon ms-Icon--Settings`} />
              <span>Administración</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavMenu;
