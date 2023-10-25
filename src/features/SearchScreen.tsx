import {TextCustom, Thumb} from '@components';
import {defaultColors} from '@configs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ICClose} from 'src/assets/icons/ICClose';
import {formatNumberDotWithVND} from 'src/commons/formatMoney';
import ButtonGradient from 'src/components/Buttons/ButtonGradient';
import TextTranslate from 'src/components/TextTranslate';
interface IProps {
  dismiss?: () => void;
}

const ProductItem = () => {
  return (
    <View style={styles.containerChid}>
      <View style={styles.styleProduct}>
        <View>
          <Thumb
            style={styles.styleImage}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2023/09/21/17/05/european-shorthair-8267220_640.jpg',
            }}
            resizeMode="stretch"
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingVertical: 2,
          }}>
          <TextCustom
            fontSize={12}
            weight="400"
            color={defaultColors.text_313131}
            numberOfLines={3}>
            Hộp trà tắc giảm cân an toàn Jeju Hàn Quốc
          </TextCustom>
          <TextCustom fontSize={15} weight="600" color={defaultColors.primary}>
            {formatNumberDotWithVND(40000)}
          </TextCustom>
        </View>
      </View>
    </View>
  );
};
const SearchScreen = (props: IProps) => {
  const {dismiss} = props;
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <StatusBar />
      <Pressable
        onPress={dismiss}
        style={{position: 'absolute', right: 20, zIndex: 10}}>
        <ICClose width={20} height={20} />
      </Pressable>
      <View style={styles.searchBox}>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.inputText}
            placeholder={t('common.search')}
            {...props}
          />
        </View>
        <ButtonGradient style={{width: 100}} text={t('button.search')} />
      </View>
      <View style={{marginTop: 10}}>
        <TextCustom>Ket qua tim kiem "" akka "" la 9 </TextCustom>
      </View>
      <ScrollView>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((it, idx) => {
          return <ProductItem key={idx} />;
        })}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {flex: 1, marginTop: 20, marginBottom: 20},
  containerChid: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    rowGap: 10,
    marginTop: 10,
    // paddingHorizontal: 5,
  },
  styleProduct: {
    width: '100%',
    height: 'auto',
    backgroundColor: defaultColors.c_fff,
    borderRadius: 20,
    flexDirection: 'row',
    columnGap: 10,
    alignContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  styleImage: {
    width: 90,
    height: 70,
    borderRadius: 10,
  },
  searchBox: {
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  containerInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderColor: defaultColors.c_fff,
    borderWidth: 1,
    backgroundColor: defaultColors.c_fff,
    // marginTop: 30,
    // marginHorizontal: 10,
  },
  inputText: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
  },
});
