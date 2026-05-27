import * as React from 'react';
import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styles from './Financiera.module.scss';
import type { IFinancieraProps } from './components/shared/IFinancieraProps';
import Header from './components/Header/Header';
import NavMenu from './components/NavMenu/NavMenu';
import Home from './components/Home/Home';
import GaleriaInstrumentos from './components/GaleriaInstrumentos/GaleriaInstrumentos';
import Grafica from './components/Grafica/Grafica';
import Administracion from './components/Administracion/Administracion';

const Financiera: React.FC<IFinancieraProps> = ({
  description,
  isDarkTheme,
  environmentMessage,
  hasTeamsContext,
  userDisplayName,
  userPhotoUrl
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className={`${styles.financiera} ${isDarkTheme ? styles.dark : ''}`}>
        <Header
          userDisplayName={userDisplayName}
          userPhotoUrl={userPhotoUrl}
          onMenuClick={handleMenuClick}
        />
        <NavMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
        <div className={styles.container}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  appName="Circo Finanzas"
                  userDisplayName={userDisplayName}
                  userPhotoUrl={userPhotoUrl}
                  environmentMessage={environmentMessage}
                  description={description}
                />
              }
            />
            <Route path="/galeria" element={<GaleriaInstrumentos />} />
            <Route path="/grafica" element={<Grafica />} />
            <Route path="/administracion" element={<Administracion />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Financiera;
