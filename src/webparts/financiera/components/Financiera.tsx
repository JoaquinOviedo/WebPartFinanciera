import * as React from 'react';
import Home from './Home';
import type { IFinancieraProps } from './IFinancieraProps';

const Financiera: React.FC<IFinancieraProps> = ({
  description,
  environmentMessage,
  userDisplayName
}) => {
  return (
    <Home
      appName="Circo Finanzas"
      userDisplayName={userDisplayName}
      description={description}
      environmentMessage={environmentMessage}
    />
  );
};

export default Financiera;
