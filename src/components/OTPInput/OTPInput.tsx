import { defaultColors } from '@configs';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';

const OTPInput = ({ code, setCode, maximumLength, setIsPinReady } : any) => {
  const boxArray = new Array(maximumLength).fill(0);
  const inputRef = useRef<any>(null);
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);
  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };
  useEffect(() => {
    // update pin ready status
    setIsPinReady(code.length === maximumLength);
    // clean up function
    return () => {
      setIsPinReady(false);
    };
  }, [code]);
  const boxDigit = (_: any, index: number) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;

    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    const StyledSplitBoxes: StyleProp<ViewStyle> =
      isInputBoxFocused && isValueFocused
        ? styles.SplitBoxesFocused
        : styles.SplitBoxes;
    return (
      <View key={index} style={StyledSplitBoxes}>
        <Text style={styles.SplitBoxText}>{digit}</Text>
      </View>
    );
  };

  return (
    <View style={styles.OTPInputContainer}>
      <Pressable onPress={handleOnPress} style={styles.SplitOTPBoxesContainer}>
        {boxArray.map(boxDigit)}
      </Pressable>
      <TextInput
        style={styles.TextInputHidden}
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
      />
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  OTPInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  TextInputHidden: {
    position: 'absolute',
    opacity: 0,
  },
  SplitOTPBoxesContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  SplitBoxes: {
    backgroundColor: defaultColors._33343B,
    borderRadius: 8,
    padding: 12,
    height: 40,
    width : 40,
  },
  SplitBoxText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  SplitBoxesFocused: {
    backgroundColor: 'grey',
    borderRadius: 8,
    padding: 12,
    height: 40,
    width : 40,
  },
  ButtonContainer: {
    backgroundColor: '#000000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    marginTop: 30,
  },
  ButtonText: {
    color: 'black',
    fontSize: 20,
  },
});
