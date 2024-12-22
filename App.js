import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './screens/Login';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginScreen />
    </SafeAreaView>
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
