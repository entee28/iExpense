import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { MainStack } from 'libs/navigation'
import { Provider } from 'react-redux'
import { persistor, store } from 'libs/redux'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
