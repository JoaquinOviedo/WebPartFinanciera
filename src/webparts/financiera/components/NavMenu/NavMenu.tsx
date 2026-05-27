import * as React from 'react';
import { IconButton } from '@fluentui/react';
import { NavLink } from 'react-router-dom';
import styles from './NavMenu.module.scss';

interface INavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavMenu: React.FC<INavMenuProps> = ({
  isOpen,
  onClose
}) => {
  const getLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `${styles.menuItem} ${isActive ? styles.active : ''}`;

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
            <NavLink to="/" className={getLinkClass} onClick={onClose}>
              <i className={`${styles.icon} ms-Icon ms-Icon--Home`} />
              <span>Inicio</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/galeria" className={getLinkClass} onClick={onClose}>
              <i className={`${styles.icon} ms-Icon ms-Icon--ImageCollection`} />
              <span>Galería de Instrumentos</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/grafica" className={getLinkClass} onClick={onClose}>
              <i className={`${styles.icon} ms-Icon ms-Icon--BarChart4`} />
              <span>Gráfica</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/administracion" className={getLinkClass} onClick={onClose}>
              <i className={`${styles.icon} ms-Icon ms-Icon--Settings`} />
              <span>Administración</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavMenu;
