import { ExpoRoot } from 'expo-router';
import { createContext } from 'react';

export default function App() {
  return <ExpoRoot context={createContext(null) as any} />;
}
