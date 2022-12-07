/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './src/App'
import 'libs/i18n'
import 'react-native-get-random-values'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
