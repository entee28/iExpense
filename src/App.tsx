import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { MainStack } from 'libs/navigation'
import { Provider } from 'react-redux'
import { persistor, store } from 'libs/redux'
import { PersistGate } from 'redux-persist/integration/react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <BottomSheetModalProvider>
              <MainStack />
            </BottomSheetModalProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  )
}

export default App
