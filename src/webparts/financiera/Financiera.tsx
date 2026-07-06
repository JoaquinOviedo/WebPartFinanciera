import * as React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styles from './Financiera.module.scss';
import type { IFinancieraProps } from './components/shared/IFinancieraProps';
import Header from './components/Header/Header';
import { AppLayout } from './components/shared/ui';
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
  userPhotoUrl,
  spfxContext
}) => {
  return (
    <Router>
      <div className={`${styles.financiera} ${isDarkTheme ? styles.dark : ''}`}>
        <AppLayout
          header={<Header userDisplayName={userDisplayName} userPhotoUrl={userPhotoUrl} />}
        >
          <Routes>
            <Route
              path="/"
              element={
                <div className={styles.container}>
                  <Home
                    appName="Circo Finanzas"
                    userDisplayName={userDisplayName}
                    userPhotoUrl={userPhotoUrl}
                    environmentMessage={environmentMessage}
                    description={description}
                  />
                </div>
              }
            />
            <Route
              path="/galeria"
              element={
                <div className={styles.container}>
                  <GaleriaInstrumentos />
                </div>
              }
            />
            <Route
              path="/grafica"
              element={
                <div className={styles.container}>
                  <Grafica />
                </div>
              }
            />
            <Route path="/administracion" element={<Administracion spfxContext={spfxContext} />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </AppLayout>
      </div>
    </Router>
  );
};

export default Financiera;
