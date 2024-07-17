/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import Root from './src/screens/Root';

AppRegistry.registerComponent(appName, () => Root);
