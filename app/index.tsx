import { Redirect } from 'expo-router';
import { IS_AUTHENTICATED } from '@/constants/auth';

export default function AppNavigation() {
  if (IS_AUTHENTICATED) {
    return <Redirect href="/(main)/home" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}