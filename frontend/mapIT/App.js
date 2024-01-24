import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import store from './store/store';
import { Provider } from 'react-redux';
import Auth from './src/Auth';
import AuthCheck from './src/components/AuthCheck';
import tw from 'tailwind-react-native-classnames';
import Index from './src/Index';

export default function App() {
  return (
    <Provider store={store}>
    <SafeAreaView style={tw`h-full bg-black`}>
      <Index/>
    </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
