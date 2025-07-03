// index.js (en la raíz del proyecto)
import 'react-native-gesture-handler'; // Importante: debe estar en la primera línea
import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent llama a AppRegistry.registerComponent('main', () => App);
// Asegúrate de que App es el componente principal que contiene tu navegación
registerRootComponent(App);