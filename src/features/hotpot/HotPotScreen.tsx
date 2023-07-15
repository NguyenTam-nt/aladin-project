import { View, Text } from 'react-native';
import React from 'react';
import { defaultColors } from '@configs';

const HotPotScreen = () => {
  return (
    <View style={{backgroundColor: defaultColors.bg_primary, flex: 1}}>
      <Text style={{ color : 'red'}}>hotPotScreen</Text>
    </View>
  );
};

export default HotPotScreen;
