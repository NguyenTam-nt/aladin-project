import {TextCustom, Thumb} from '@components';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  IAttributeFes,
  IProduct,
  IProductDetails,
  getProductsDetailApi,
} from 'src/api/products';
import HeaderBack from 'src/components/Header/HeaderBack';
import ProductDetailItem from './ProductDetailItem';
import SpaceBottom from 'src/components/SpaceBottom';
import useI18n from 'src/hooks/useI18n';
import Related from './Related';
import {useListItemProvice} from 'src/redux/provices/hooks';
import {BOTTOM_BAR_HEIGHT, defaultColors} from '@configs';
import {ButtonTouchable} from 'src/components/Buttons/ButtonTouchable';
import ButtonGradient from 'src/components/Buttons/ButtonGradient';
import {useTranslation} from 'react-i18next';
import {ICCart} from 'src/assets/icons/ICCart';
import {ICBuyNow} from 'src/assets/icons/ICBuyNow';
import TextTranslate from 'src/components/TextTranslate';
import {formatNumberDotWithO} from 'src/commons/formatMoney';
import Toast from 'react-native-toast-message';
import ImageFlatList from './ImageFlastList';
import {productRoute} from 'src/constants/routers';
import {
  useHandleAddItemToCart,
  useListItemCart,
} from 'src/redux/orderCart/hooks';
import ImperativeScrollView, {
  ImperativeScrollViewHandles,
} from 'src/hooks/useImperativeScrollView';
import Description from './Description';

const ProductDetail = () => {
  const {isVn} = useI18n();
  const routers = useRoute();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const handleAddItemToCart = useHandleAddItemToCart();
  const handleListItemCart = useListItemCart();
  const scrollViewRef = useRef<ImperativeScrollViewHandles>(null);
  const params = routers.params;
  //@ts-ignore
  const idProduct = params?.idProduct;
  //@ts-ignore
  const categoryId = params?.categoryId;
  //@ts-ignore
  const subCategoryId = params?.subCategoryId;
  const [product, setProduct] = useState<IProduct>();
  const [atributeFes, setAtributeFes] = useState<IAttributeFes[]>([]);
  const [productDetails, setProductDetails] = useState<IProductDetails[]>([]);
  const [productDetailAtribute, setProductDetailAtribute] = useState<
    any | null
  >();
  const provices = useListItemProvice();
  const [imageLinkProduct, setImageLinkProduct] = useState<string | null>(null);
  const [quantityVailable, setQuantityVailable] = useState<number>(1);
  const getProduct = async (id: any, provice: string) => {
    try {
      const res = await getProductsDetailApi(id, provice);
      const data = res.data;
      if (data) {
        setProduct(data);
        setAtributeFes(data.attributeFes);
        setProductDetails(data.productDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct(idProduct, provices.provices.Name);
  }, [idProduct, provices]);

  const handleWarningAddToCart = () => {
    Toast.show({
      type: 'tomatoToast',
      props: {
        status: 'warning',
        uuid: 'messages.warning.add-to-cart',
      },
    });
  };

  const handleWarningStockQuantity = () => {
    Toast.show({
      type: 'tomatoToast',
      props: {
        status: 'warning',
        uuid: 'messages.warning.product-stock-quantity',
      },
    });
  };

  // productDetailId: number;
  // priceDetail: number;
  // promoDetail: number;
  // actualPriceDetail: number;
  // stockQuantity: number;
  // soldQuantity: number;
  // addressWarehouse: string;
  // imageDetailUrl: string;
  // productDetailNameVn: string;
  // productDetailNameKr: string;
  // choose: boolean;
  // quantitySelected: number;
  // productId: number;
  // attributes: {
  //   valueVn: string;
  //   attributeNameVn: string;
  // }[];
  // attributesKr: {
  //   valueKr: string;
  //   attributeNameKr: string;
  // }[];
  const handleAddToCart = (type: 'ADD_TO-CART' | 'BUY_NOW') => {
    const datacheck = handleListItemCart.itemInCart;
    const index = datacheck.findIndex(
      item =>
        item.productId === product?.id &&
        item.productDetailId === productDetailAtribute.productDetailId,
    );
    if (index >= 0) {
      Toast.show({
        type: 'tomatoToast',
        props: {
          status: 'warning',
          uuid: 'messages.warning.product-already-exists',
        },
      });
    } else {
      const itemCart = {
        // ...productDetailAtribute,
        productDetailId: productDetailAtribute?.productDetailId,
        priceDetail: productDetailAtribute?.priceDetail,
        promoDetail: productDetailAtribute?.promoDetail,
        actualPriceDetail: productDetailAtribute?.actualPriceDetail,
        stockQuantity: productDetailAtribute?.stockQuantity,
        soldQuantity: productDetailAtribute?.soldQuantity,
        addressWarehouse: productDetailAtribute?.addressWarehouse,
        imageDetailUrl: productDetailAtribute?.imageDetailUrl,
        choose: true,
        productId: product?.id,
        productDetailNameVn: product?.productNameVn,
        productDetailNameKr: product?.productNameKr,
        quantitySelected: quantityVailable,
        attributes: [
          {
            valueVn: productDetailAtribute?.attributes?.[0].valueVn,
            valueKr: productDetailAtribute?.attributesKr?.[0].valueKr,
            attributeNameVn:
              productDetailAtribute?.attributes?.[0].attributeNameVn,
            attributeNameKr:
              productDetailAtribute?.attributesKr?.[0].attributeNameKr,
          },
        ],
      };
      //@ts-ignore
      handleAddItemToCart(itemCart);
      if (type === 'ADD_TO-CART') {
        Toast.show({
          type: 'tomatoToast',
          props: {
            status: 'success',
            uuid: 'messages.success.add-product-to-cart',
          },
        });
        return;
      } else if (type === 'BUY_NOW') {
        //@ts-ignore
        navigation.navigate(`${productRoute.cart}`);
      }
    }
  };
  const handleBuyNow = (type: 'ADD_TO-CART' | 'BUY_NOW') => {
    productDetailAtribute
      ? quantityVailable > productDetailAtribute?.stockQuantity
        ? handleWarningStockQuantity()
        : handleAddToCart(type)
      : handleWarningAddToCart();
  };

  const onTopScroll = () => {
    scrollViewRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        onTopScroll();
      };
    }, [idProduct]),
  );

  return (
    <View style={styles.container}>
      <HeaderBack isProductDetail={true} iconCart={true} />
      <ImperativeScrollView ref={scrollViewRef}>
        <Thumb
          style={styles.styleImage}
          source={{uri: imageLinkProduct ?? product?.images?.[0].url}}
          resizeMode="stretch"
        />
        <ImageFlatList
          images={product?.images}
          setImageLinkProduct={setImageLinkProduct}
          imageLinkProduct={imageLinkProduct}
        />
        <ProductDetailItem
          name={isVn ? product?.productNameVn : product?.productNameKr}
          priece={product?.price}
          promo={product?.promo}
          actualPrice={product?.actualPrice}
          salientFeatures={
            isVn ? product?.salientFeaturesVn : product?.salientFeaturesKr
          }
          attributeFes={atributeFes}
          productDetails={productDetails}
          setProductDetailAtribute={setProductDetailAtribute}
          setQuantityVailable={setQuantityVailable}
        />
        <Description
          productInfo={isVn ? product?.detailVn : product?.detailKr}
          spec={isVn ? product?.specVn : product?.specKr}
        />
        {product && (
          <Related
            categoryId={categoryId ?? product?.categoryId}
            subCategoryId={subCategoryId ?? product?.subCategoryId}
            productId={idProduct}
          />
        )}
        <SpaceBottom />
        <View style={{height: 90}} />
      </ImperativeScrollView>
      <View style={styles.styleOrder}>
        <View style={styles.styleOrderItem}>
          <View style={styles.styleTotalPriece}>
            <TextTranslate
              fontSize={14}
              weight="400"
              color={defaultColors.text_303030}
              text="common.total-priece"
            />
            <TextCustom
              fontSize={16}
              weight="700"
              color={defaultColors.text_111213}>
              {formatNumberDotWithO(
                productDetailAtribute
                  ? productDetailAtribute?.actualPriceDetail * quantityVailable
                  : product?.actualPrice ?? 0 * quantityVailable,
              )}
            </TextCustom>
          </View>
          <View style={styles.styleButtonOrder}>
            <View style={{flex: 1}}>
              <ButtonTouchable
                onPress={() => handleBuyNow('ADD_TO-CART')}
                text="common.add-to-cart"
                borderRadius={30}
                textColor={defaultColors.bg_E60E00}
                height={38}
                renderLeff={<ICCart color={defaultColors.bg_00C3AB} />}
                style={{columnGap: 4}}
                fontSize={17}
              />
            </View>
            <View style={{flex: 1}}>
              <ButtonGradient
                onPress={() => handleBuyNow('BUY_NOW')}
                text={t('common.buy_now')}
                renderLeff={<ICBuyNow />}
                style={{columnGap: 4}}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetail;
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  styleImage: {
    width: '100%',
    height: 325,
  },
  styleOrder: {
    position: 'absolute',
    bottom: BOTTOM_BAR_HEIGHT,
    left: 0,
    height: 90,
    zIndex: 9999,
    backgroundColor: defaultColors.c_fff,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.bg_00C3AB,
  },
  styleOrderItem: {
    paddingTop: 11,
    paddingHorizontal: 13,
    flexDirection: 'column',
    rowGap: 11,
  },
  styleTotalPriece: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  styleButtonOrder: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 7,
  },
});
