import * as React from 'react';
import { useState } from 'react';
import styles from './Financiera.module.scss';
import type { IFinancieraProps } from './IFinancieraProps';
import Header from './Header';
import NavMenu from './NavMenu';
import Home from './Home';
import GaleriaInstrumentos from './GaleriaInstrumentos';
import Grafica from './Grafica';
import Administracion from './Administracion';

type Screen = 'home' | 'galeria' | 'grafica' | 'administracion';

const Financiera: React.FC<IFinancieraProps> = ({
  description,
  isDarkTheme,
  environmentMessage,
  hasTeamsContext,
  userDisplayName,
  userPhotoUrl
}) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (screen: Screen): void => {
    setCurrentScreen(screen);
    setIsMenuOpen(false);
  };

  const renderScreen = (): JSX.Element => {
    switch (currentScreen) {
      case 'galeria':
        return <GaleriaInstrumentos />;
      case 'grafica':
        return <Grafica />;
      case 'administracion':
        return <Administracion />;
      case 'home':
      default:
        return (
          <Home
            appName="Circo Finanzas"
            userDisplayName={userDisplayName}
            userPhotoUrl={userPhotoUrl}
            environmentMessage={environmentMessage}
            description={description}
          />
        );
    }
  };

  return (
    <div className={`${styles.financiera} ${isDarkTheme ? styles.dark : ''}`}>
      <Header
        userDisplayName={userDisplayName}
        userPhotoUrl={userPhotoUrl}
        onMenuClick={handleMenuClick}
      />
      <NavMenu
        isOpen={isMenuOpen}
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onClose={() => setIsMenuOpen(false)}
      />
      <div className={styles.container}>
        {renderScreen()}
      </div>
    </div>
  );
};

export default Financiera;
