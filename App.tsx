import React from 'react';
import {MainTabNavigation} from './src/components/navigations/_MainTabNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MainTabNavigation />
    </SafeAreaView>
  );
}

export default App;
