import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IProductOutStanding, getProductsOutStanding} from 'src/api/products';
import FeaturedComponents from 'src/components/FeaturedComponents';
import {useListItemProvice} from 'src/redux/provices/hooks';

const ProductOutStandingList = () => {
  const proviceItem = useListItemProvice();
  const [productsOutStanding, setProductsOutStanding] = useState<
    IProductOutStanding[]
  >([]);
  const getProductOutStanding = async (provice: string) => {
    try {
      const params = {
        page: 0,
        size: 15,
        // sort: 'createAt,desc',
        address: provice,
      };
      const res = await getProductsOutStanding(params);
      if (res.success) {
        setProductsOutStanding(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductOutStanding(proviceItem.provices.Name);
  }, [proviceItem]);
  return (
    <View style={styles.container}>
      {productsOutStanding.length > 0 && (
        <FeaturedComponents data={productsOutStanding} />
      )}
    </View>
  );
};
export default ProductOutStandingList;

const styles = StyleSheet.create({
  container: {},
});
