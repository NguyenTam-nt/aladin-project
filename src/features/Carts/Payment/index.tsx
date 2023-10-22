import { View, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import HeaderBack from 'src/components/Header/HeaderBack';
import { defaultColors } from '@configs';
import { TextCustom, Thumb } from '@components';
import { formatNumberDotWithO, formatNumberDotWithVND } from 'src/commons/formatMoney';
import TextTranslate from 'src/components/TextTranslate';
import TextInputComponent from 'src/components/TextInputGroup/TextInputComponent';
import { ICISChecked } from 'src/assets/icons/ICISChecked';
import ButtonGradient from 'src/components/Buttons/ButtonGradient';
import { useTranslation } from 'react-i18next';
import { ButtonTouchable } from 'src/components/Buttons/ButtonTouchable';
const CartItem = () => {
  return (
    <View style={styles.cartItem}>
      <Thumb
        style={styles.styleImage}
        source={{ uri: "https://cdn.pixabay.com/photo/2023/09/21/17/05/european-shorthair-8267220_1280.jpg" }}
        resizeMode='cover'
      />
      <View style={styles.cartItemDetail}>
        <TextCustom numberOfLines={2} fontSize={14} weight='400' color={defaultColors.text_313131}>Hộp trà tắc giảm cân an toàn Jeju Hàn Quốc</TextCustom>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextCustom fontSize={14} weight='700' color={defaultColors.primary}>X3</TextCustom>
          <TextCustom fontSize={14} weight='700' color={defaultColors.primary}>{formatNumberDotWithVND(400000)}</TextCustom>
        </View>
      </View>
    </View>
  )
}
const PaymentScreen = () => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <HeaderBack isProductDetail={true} />
      <ScrollView>
        <View style={styles.listCarts}>
          <CartItem />
          <View style={styles.prodcutValue}>
            <View style={styles.styleShowContentBuyNow}>
              <TextTranslate fontSize={16} weight='400' color={defaultColors.text_303030} text='' />
              <TextCustom fontSize={16} weight='400' color={defaultColors.text_303030}>{formatNumberDotWithO(4000000)}</TextCustom>
            </View>
            <View style={styles.styleShowContentBuyNow}>
              <TextTranslate fontSize={16} weight='400' color={defaultColors.text_303030} text='' />
              <TextCustom fontSize={16} weight='400' color={defaultColors.primary}>-{formatNumberDotWithO(30000)}</TextCustom>
            </View>
          </View>
          <View style={styles.styleShowContentBuyNow}>
            <TextTranslate fontSize={16} weight='400' color={defaultColors.text_303030} text='' />
            <TextCustom fontSize={16} weight='700' color={defaultColors.text_111213}>-{formatNumberDotWithO(70000)}</TextCustom>
          </View>
        </View>
        <View style={styles.styleform}>
          <View style={styles.styleform}>
            <TextTranslate
              fontSize={18}
              weight='700'
              color={defaultColors.text_000000}
              text='cart.form.title' />
            <TextInputComponent
              textTitle="cart.form.full-name"
              textPlanholder="cart.form.planhoder-full-name"
              onChangeText={() => { }}
              value={"values.fullName"}
              // @ts-ignore
              message={''}
              option={{ max: 40 }}
              maxLength={40}
            />
            <TextInputComponent
              textTitle="cart.form.phone-number"
              textPlanholder="cart.form.planhoder-phone-number"
              onChangeText={() => { }}
              value={"values.fullName"}
              // @ts-ignore
              message={''}
              option={{ max: 40 }}
              maxLength={40}
            />

            <TextInputComponent
              textTitle="cart.form.email"
              textPlanholder="cart.form.planhoder-email"
              onChangeText={() => { }}
              value={"values.fullName"}
              // @ts-ignore
              message={''}
              option={{ max: 40 }}
              maxLength={40}
            />
            <TextInputComponent
              textTitle="cart.form.phone-number"
              textPlanholder="cart.form.planhoder-phone-number"
              onChangeText={() => { }}
              value={"values.fullName"}
              // @ts-ignore
              message={''}
              option={{ max: 40 }}
              maxLength={40}
              isRequire={false}
            />
            <TextInputComponent
              textTitle="cart.form.address"
              textPlanholder="cart.form.planhoder-address"
              onChangeText={() => { }}
              value={"values.fullName"}
              // @ts-ignore
              message={''}
              option={{ max: 40 }}
              maxLength={40}
            />
            <TextInputComponent
              textTitle="cart.form.note"
              textPlanholder="cart.form.planhoder-note"
              onChangeText={() => { }}
              value={"values.fullName"}
              // @ts-ignore
              message={''}
              option={{ max: 40 }}
              maxLength={40}
            />
            <>
              <TextTranslate
                fontSize={16}
                weight="700"
                textAlign="justify"
                color={defaultColors.c_0000}
                text="cart.form.payments-methods" />

              <View style={styles.paymentMethod}>
                <TextTranslate
                  style={{ flex: 1 }}
                  fontSize={16}
                  weight='400'
                  color={defaultColors.text_313131}
                  text='cart.form.payment-COD' />
                <ICISChecked />
              </View>
            </>
            <View style={{ marginTop: 20, flexDirection: 'column', rowGap: 12 }}>
              <ButtonGradient
                onPress={() => { }}
                text={t('button.required-contact')}
                isLoading={true}
              />
              <ButtonTouchable
                // @ts-ignore
                onPress={() => navigation.navigate('products')}
                text="button.see-more-product"
                borderRadius={30}
                textColor={defaultColors.bg_E60E00}
                height={38}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 17
  },
  carts: {
    paddingTop: 13,
    height: 'auto',
    width: '100%',
    borderRadius: 20,
    backgroundColor: defaultColors.c_fff
  },
  listCarts: {
    flexDirection: 'column',
    rowGap: 10,
    paddingTop: 14
  },
  cartItem: {
    flexDirection: 'row',
    columnGap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  styleImage: {
    borderRadius: 20
  },
  cartItemDetail: {
    flexDirection: 'column',
    rowGap: 4,
    borderLeftColor: defaultColors.br_E9E9E9,
    borderLeftWidth: 1
  },
  prodcutValue: {
    flexDirection: 'column',
    rowGap: 4,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.bg_00C3AB,
  },
  styleShowContentBuyNow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  constainerForm: {
    marginVertical: 30,
    borderRadius: 20
  },
  styleform: {
    paddingHorizontal: 11,
    flexDirection: 'column',
    rowGap: 12
  },
  paymentMethod: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: "space-between",
    borderColor: defaultColors.text_C4C4C4,
    borderWidth: 1,
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    height: 40,
  }
})
