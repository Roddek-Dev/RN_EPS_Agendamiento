import React from 'react';
import { IS_AUTHENTICATED } from '@/constants/auth';
import MainNavigation from './NavigationMain';
import AuthNavigation from './AuthNavigation';

export default function AppNavigation() {
  return IS_AUTHENTICATED ? <MainNavigation /> : <AuthNavigation />;
}