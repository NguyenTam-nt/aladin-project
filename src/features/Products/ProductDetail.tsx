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

const ProductDetail = () => {
  const {isVn} = useI18n();
  const routers = useRoute();
  const params = routers.params;
  //@ts-ignore
  const idProduct = params?.idProduct;
  const [product, setProduct] = useState<IProduct>();
  const [atributeFes, setAtributeFes] = useState<IAttributeFes[]>([]);
  const [productDetails, setProductDetails] = useState<IProductDetails[]>([]);
  const getProduct = async (id: any) => {
    try {
      const res = await getProductsDetailApi(id, 'Thành phố Hà Nội');
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
    getProduct(idProduct);
  }, [idProduct]);

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
        <Description
          productInfo={isVn ? product?.detailVn : product?.detailKr}
          spec={isVn ? product?.specVn : product?.specKr}
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
