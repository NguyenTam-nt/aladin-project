import {TextCustom, Thumb} from '@components';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
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
import {useDispatch} from 'react-redux';
import {removeCartList} from 'src/redux/orderCart/slice';

const ProductDetail = () => {
  const {isVn} = useI18n();
  const routers = useRoute();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const handleAddItemToCart = useHandleAddItemToCart();
  const handleListItemCart = useListItemCart();
  const dispatch = useDispatch();
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
  const handleAddToCart = () => {
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
        ...productDetailAtribute,
        choose: false,
        productId: product?.id,
        productDetailNameVn: product?.productNameVn,
        productDetailNameKr: product?.productNameKr,
        quantitySelected: quantityVailable,
      };
      handleAddItemToCart(itemCart);
      //@ts-ignore
      navigation.navigate(productRoute.cart);
    }
  };
  const handleBuyNow = () => {
    productDetailAtribute
      ? quantityVailable > productDetailAtribute?.stockQuantity
        ? handleWarningStockQuantity()
        : handleAddToCart()
      : handleWarningAddToCart();
  };

  return (
    <View style={styles.container}>
      <HeaderBack isProductDetail={true} />
      <ScrollView>
        <Thumb
          style={styles.styleImage}
          source={{uri: imageLinkProduct ?? product?.images?.[0].url}}
          resizeMode="cover"
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
        {/* <Description
          productInfo={isVn ? product?.detailVn : product?.detailKr}
          spec={isVn ? product?.specVn : product?.specKr}
        /> */}
        <Related
          categoryId={categoryId}
          subCategoryId={subCategoryId}
          productId={idProduct}
        />
        <SpaceBottom />
        <View style={{height: 90}} />
      </ScrollView>
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
                  ? productDetailAtribute?.actualPriceDetail
                  : product?.actualPrice,
              )}
            </TextCustom>
          </View>
          <View style={styles.styleButtonOrder}>
            <View style={{flex: 1}}>
              <ButtonTouchable
                onPress={() => {}}
                text="common.add-to-cart"
                borderRadius={30}
                textColor={defaultColors.bg_E60E00}
                height={38}
                renderLeff={<ICCart color={defaultColors.bg_00C3AB} />}
                style={{columnGap: 4}}
              />
            </View>
            <View style={{flex: 1}}>
              <ButtonGradient
                onPress={handleBuyNow}
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
    height: 280,
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

const data = [
  {
    actualPriceDetail: 26730,
    addressWarehouse: 'Thành phố Hà Nội',
    attributes: [[Object]],
    attributesKr: [[Object]],
    choose: false,
    imageDetailUrl:
      'https://marketmoa.com.vn/getimage/169770341777824380422-ac81-433f-a1ce-d9789e42cc3f.webp',
    priceDetail: 27000,
    productDetailId: 21688,
    productDetailNameKr: '차가운 주스 ade 과일 맛 230ml 한국 - 진정한 수입품',
    productDetailNameVn:
      'Nước Trái Cây Lạnh Ade các vị hoa quả 230ml Hàn Quốc - hàng nhập khẩu chính hãng',
    productId: 21680,
    promoDetail: 1,
    quantitySelected: 2,
    soldQuantity: 0,
    stockQuantity: 272,
  },
  {
    actualPriceDetail: 26730,
    addressWarehouse: 'Thành phố Hà Nội',
    attributes: [[Object]],
    attributesKr: [[Object]],
    choose: false,
    imageDetailUrl:
      'https://marketmoa.com.vn/getimage/1697703417709ca974675-ba46-40fe-afe6-c0735936434c.webp',
    priceDetail: 27000,
    productDetailId: 21690,
    productDetailNameKr: '차가운 주스 ade 과일 맛 230ml 한국 - 진정한 수입품',
    productDetailNameVn:
      'Nước Trái Cây Lạnh Ade các vị hoa quả 230ml Hàn Quốc - hàng nhập khẩu chính hãng',
    productId: 21680,
    promoDetail: 1,
    quantitySelected: 2,
    soldQuantity: 0,
    stockQuantity: 272,
  },
];
