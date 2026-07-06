import * as React from 'react';
import { PrimaryButton, Stack } from '@fluentui/react';

interface CardLinkProps {
  title: string;
  subtitle?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const CardLink: React.FC<CardLinkProps> = ({ title, subtitle, onClick, icon }) => {
  return (
    <PrimaryButton onClick={onClick} styles={{ root: { borderRadius: 12, padding: 20, display: 'flex', justifyContent: 'space-between', boxShadow: '0 6px 18px rgba(0,0,0,0.12)' } }}>
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 12 }} style={{ width: '100%', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, opacity: 0.9 }}>{subtitle}</div>}
        </div>
        <div>{icon}</div>
      </Stack>
    </PrimaryButton>
  );
};

export default CardLink;
