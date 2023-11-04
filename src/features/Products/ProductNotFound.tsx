import {defaultColors} from '@configs';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ICProductNotFound} from 'src/assets/icons/ICProductNotFound';
import {ButtonTouchable} from 'src/components/Buttons/ButtonTouchable';
import TextTranslate from 'src/components/TextTranslate';
import {routetBottomTab} from 'src/constants/routers';
import {useGoBack} from 'src/hooks/useGoBack';

const ProductNotFound = () => {
  const navigation = useNavigation();
  const dismiss = useGoBack();
  const handleSeemoreProduct = async () => {
    //@ts-ignore
    await navigation.navigate(routetBottomTab.home);
    dismiss();
  };
  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        <ICProductNotFound />
        <View style={styles.groupText}>
          <TextTranslate
            fontSize={16}
            weight="700"
            color={defaultColors.c_0000}
            text="not-found.product.title"
          />
          <TextTranslate
            fontSize={14}
            weight="400"
            color={defaultColors.c_0000}
            text="not-found.product.desc"
          />
        </View>
        <ButtonTouchable
          //@ts-ignore
          onPress={handleSeemoreProduct}
          text="button.see-more-product"
          borderRadius={30}
          textColor={defaultColors.bg_E60E00}
          height={38}
          style={{paddingHorizontal: 16}}
        />
      </View>
    </View>
  );
};
export default ProductNotFound;
const styles = StyleSheet.create({
  container: {flex: 1},
  childContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 73,
  },
  groupText: {
    flexDirection: 'column',
    rowGap: 8,
    marginTop: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
});
