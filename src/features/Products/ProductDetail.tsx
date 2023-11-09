import {TextCustom, Thumb} from '@components';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
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
import {ICartItem, updateCartItem} from 'src/api/cartItem';
import {useToken} from 'src/redux/reducers/hook';
import {Thumbnail, createThumbnail} from 'react-native-create-thumbnail';
import Video from 'react-native-video';
import ProductNotFound from './ProductNotFound';
import {useDispatch} from 'react-redux';
import {removeProductByyId} from 'src/redux/products/slice';
import {Swiper, SwiperFlatList} from 'src/components/rn-swiper/Swiper';
import {DIMENSION} from '@constants';

const ProductDetail = () => {
  const {isVn} = useI18n();
  const routers = useRoute();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const videoRef = useRef(null);
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
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [quantityVailable, setQuantityVailable] = useState<number>(1);
  const listItemCart = useListItemCart();
  const [imagesProduct, setImageProduct] = useState<{url: string}[]>([]);
  const [slideProduct, setSlideProduct] = useState<{url: string}[]>([]);
  const token = useToken();
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<'ERROR' | null>(null);
  const dispatch = useDispatch();
  const scrollSwiperRef = useRef<SwiperFlatList>(null);
  const [currentIndexSwiper, setCurrentIndexSwiper] = useState<number>(0);
  const isFocused = useIsFocused();
  const getProduct = async (id: any, provice: string) => {
    try {
      setLoading(true);
      const res = await getProductsDetailApi(id, provice);
      const data = res.data;
      if (data && res.success === true) {
        setProduct(data);
        setAtributeFes(data.attributeFes);
        setProductDetails(data.productDetails);
        if (data.videoUrl) {
          const thumbnailVideo = await generateThumbnail(data.videoUrl);
          if (thumbnailVideo.path) {
            const array = [{url: thumbnailVideo.path}, ...data.images];
            setVideoUrl(data.videoUrl);
            setImageProduct(array);
            setSlideProduct([{url: data.videoUrl}, ...data.images]);
          } else {
            setImageProduct(data.images);
            setSlideProduct(data.images);
          }
        } else {
          setImageProduct(data.images);
          setSlideProduct(data.images);
        }
        setError(null);
        return;
      } else if (res.code === 406) {
        setError('ERROR');
        setAtributeFes([]);
        setProductDetails([]);
        setVideoUrl('');
        setImageLinkProduct('');
        setImageProduct([]);
        dispatch(removeProductByyId(id));
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleWaringOutOfStock = () => {
    Toast.show({
      type: 'tomatoToast',
      props: {
        status: 'warning',
        uuid: 'messages.warning.out-of-stock',
      },
    });
  };
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
        if (token) {
          handleUpdateCartItem(token, listItemCart.itemInCart);
        }
        return;
      } else if (type === 'BUY_NOW') {
        //@ts-ignore
        navigation.navigate(`${productRoute.cart}`);
      }
    }
  };
  const handleBuyNow = (type: 'ADD_TO-CART' | 'BUY_NOW') => {
    productDetailAtribute
      ? productDetailAtribute?.stockQuantity == 0
        ? handleWaringOutOfStock()
        : quantityVailable > productDetailAtribute?.stockQuantity
        ? handleWarningStockQuantity()
        : handleAddToCart(type)
      : handleWarningAddToCart();
  };

  const handleUpdateCartItem = async (token: string, data: ICartItem[]) => {
    try {
      await updateCartItem(token, data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnActionSwiper = useCallback((index: number) => {
    scrollSwiperRef.current?.scrollToIndex({index: index});
  }, []);

  const onTopScroll = () => {
    scrollViewRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const generateThumbnail = async (uri: string): Promise<Thumbnail> => {
    try {
      const thumbnails = await createThumbnail({
        url: uri,
        timeStamp: 1,
        format: 'jpeg',
      });
      return thumbnails;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getProduct(idProduct, provices.provices.Name);
  }, [idProduct, provices]);

  const onEnd = useCallback(() => {
    if (videoRef.current) {
      //@ts-ignore
      videoRef.current.seek(0);
      setTimeout(() => {
        setIsPlaying(true);
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }, [isFocused]);

  useEffect(() => {
    if (currentIndexSwiper !== 0) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [currentIndexSwiper]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        onTopScroll();
        setImageLinkProduct(null);
        setVideoUrl(null);
        setIsPlaying(false);
      };
    }, [idProduct]),
  );

  if (loading) {
    return <></>;
  }

  if (error === 'ERROR') {
    return <ProductNotFound />;
  }

  return (
    <View style={styles.container}>
      <HeaderBack isProductDetail={true} iconCart={true} />
      <ImperativeScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}>
        <View style={{width: DIMENSION.width}}>
          <Swiper
            ref={scrollSwiperRef}
            index={0}
            onChangeIndex={({index, prevIndex}) => {
              setCurrentIndexSwiper(index);
            }}
            data={slideProduct ?? []}
            e2eID="container_swiper"
            renderItem={item => {
              if (item.item.url.includes('mp4')) {
                return (
                  <Video
                    ref={videoRef}
                    source={{
                      uri: item?.item?.url,
                    }}
                    style={styles.video}
                    resizeMode="contain"
                    controls={true}
                    paused={isPlaying}
                    onEnd={onEnd}
                  />
                );
              } else {
                return (
                  <Thumb
                    style={styles.styleImage}
                    source={{uri: item?.item?.url}}
                    resizeMode="stretch"
                  />
                );
              }
            }}
          />
        </View>
        <ImageFlatList
          images={imagesProduct}
          setImageLinkProduct={setImageLinkProduct}
          imageLinkProduct={imageLinkProduct}
          setIsPlaying={setIsPlaying}
          indexScroll={currentIndexSwiper}
          handleOnActionSwiper={handleOnActionSwiper}
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
    width: DIMENSION.width,
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
  video: {
    width: DIMENSION.width,
    height: 325,
  },
});
