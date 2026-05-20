export interface IHomeProps {
  appName: string;
  userDisplayName: string;
  userPhotoUrl?: string;
  environmentMessage: string;
  description: string;
  onNavigate: (screen: 'home' | 'galeria' | 'grafica' | 'administracion') => void;
}
