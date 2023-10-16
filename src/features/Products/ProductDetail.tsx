import {TextCustom, Thumb} from '@components';
import {useRoute} from '@react-navigation/native';
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
import Description from './Description';
import Related from './Related';
import {getArrayToAsyncStorage} from 'src/constants/ayncStorage';
import {storegeKey} from 'src/constants/defines';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useListItemProvice} from 'src/redux/provices/hooks';

const ProductDetail = () => {
  const {isVn} = useI18n();
  const routers = useRoute();
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
  const provices = useListItemProvice();
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

  return (
    <View style={styles.container}>
      <HeaderBack isProductDetail={true} />
      <ScrollView>
        <View>
          <Thumb
            style={styles.styleImage}
            source={{uri: product?.images?.[0].url}}
            resizeMode="cover"
          />
        </View>
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
        />
        {/* <Description
          productInfo={isVn ? product?.detailVn : product?.detailKr}
          spec={isVn ? product?.specVn : product?.specKr}
        /> */}
        <Related
          // productInfo={isVn ? product?.detailVn : product?.detailKr}
          // spec={isVn ? product?.specVn : product?.specKr}
          categoryId={categoryId}
          subCategoryId={subCategoryId}
          productId={idProduct}
        />
        <SpaceBottom />
      </ScrollView>
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
    height: 350,
  },
});
