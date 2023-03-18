import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/routes/Navigation';
import { ToastProvider } from 'react-native-toast-notifications'
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/store';
import { Provider as ModalProvider} from 'react-native-paper';
import axios from 'axios';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ModalProvider>
            <ToastProvider
              renderType={{
                custom_type: (toast) => (
                  <>
                    {
                      toast.message
                    }
                  </>
                )
              }}
              placement="top"
              offsetTop={30}
            >
              <Navigation />
            </ToastProvider>
          </ModalProvider>
        </PersistGate>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
