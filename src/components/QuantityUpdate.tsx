import { defaultColors } from '@configs';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ICAddQuanity } from '../assets/icons/ICAddQuanity';
import { ICSubtractionQuanity } from '../assets/icons/ICSubtractionQuanity';

const QuantityUpdate = ({value}: {value?: number}) => {
  const [number, setNumber] = useState<number>(0);

  useEffect(() => {
    if (value) {
      setNumber(+value);
    }
  }, [value]);

  const AddQuality = () => {
    setNumber(number + 1);
  };


  const Subtraction = () => {
    if (number > 0) {
      setNumber(number - 1);
    } else {
      setNumber(0);
    }
  };

  return (
    <View style={styles.container}>
      {number > 0 && (
        <>
          <TouchableWithoutFeedback
            style={styles.button}
            onPress={Subtraction}
            onLongPress={() => {
              setNumber(0);
            }}>
            <ICSubtractionQuanity />
          </TouchableWithoutFeedback>
          <Text style={styles.textNumber}>{number}</Text>
        </>
      )}
      <TouchableWithoutFeedback style={styles.button} onPress={AddQuality}>
        <ICAddQuanity />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent : 'flex-end',
  },
  textNumber :{
    color : defaultColors.c_fff,
    paddingHorizontal : 16,
    fontSize : 16 ,
    fontWeight : '600',
  },
  button : {
    padding : 5,
  },
});

export default QuantityUpdate;
