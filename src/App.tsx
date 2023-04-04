import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native'
import { MainStack } from 'libs/navigation'
import { persistor, store } from 'libs/redux'
import { toastConfig } from 'libs/ui'
import React from 'react'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const client = new ApolloClient({
  uri: 'http://10.0.2.2:4000/graphql',
  cache: new InMemoryCache({
    addTypename: false
  })
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <BottomSheetModalProvider>
                <StatusBar
                  translucent
                  backgroundColor="transparent"
                  barStyle="dark-content"
                />
                <MainStack />
              </BottomSheetModalProvider>
            </NavigationContainer>
            <Toast config={toastConfig} />
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </ApolloProvider>
  )
}

export default App
