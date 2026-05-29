import type { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IFinancieraProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  userPhotoUrl?: string;
  spfxContext: WebPartContext;
}
