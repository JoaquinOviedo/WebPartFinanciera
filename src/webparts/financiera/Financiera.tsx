import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './Financiera.module.scss';
import type { IFinancieraProps } from './components/shared/IFinancieraProps';
import Header from './components/Header/Header';
import NavMenu from './components/NavMenu/NavMenu';
import Home from './components/Home/Home';
import GaleriaInstrumentos from './components/GaleriaInstrumentos/GaleriaInstrumentos';
import Grafica from './components/Grafica/Grafica';
import Administracion from './components/Administracion/Administracion';

type Screen = 'home' | 'galeria' | 'grafica' | 'administracion';

const parseHashToScreen = (hash: string): Screen => {
  switch (hash.replace('#', '').toLowerCase()) {
    case 'galeria':
      return 'galeria';
    case 'grafica':
      return 'grafica';
    case 'administracion':
      return 'administracion';
    case 'home':
    default:
      return 'home';
  }
};

const Financiera: React.FC<IFinancieraProps> = ({
  description,
  isDarkTheme,
  environmentMessage,
  hasTeamsContext,
  userDisplayName,
  userPhotoUrl
}) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(() => parseHashToScreen(window.location.hash));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onHashChange = (): void => {
      setCurrentScreen(parseHashToScreen(window.location.hash));
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleMenuClick = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (screen: Screen): void => {
    if (window.location.hash !== `#${screen}`) {
      window.location.hash = screen;
    } else {
      setCurrentScreen(screen);
    }
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
