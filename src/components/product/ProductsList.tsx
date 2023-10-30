import React, {memo} from 'react';
import {View} from 'react-native';
import {globalStyles} from 'src/commons/globalStyles';
import TextTilte from '../TextTitle';
import ProductItem from 'src/features/Home/components/ProductItem';
import {IProduct} from 'src/api/products';
import {DIMENSION} from '@constants';
interface IProps {
  products: IProduct[];
  textTile?: string;
}
const ProductsList = memo((props: IProps) => {
  const {products, textTile} = props;

  return (
    <View style={{}}>
      {textTile && (
        <View style={{flex: 1, width: DIMENSION.width, paddingHorizontal: 16}}>
          <TextTilte text={textTile} />
        </View>
      )}
      <View
        style={[
          globalStyles.groupProduct,
          globalStyles.paddingScreenHorizontal,
        ]}>
        {(products ?? []).map((it, idx) => {
          return (
            <ProductItem
              key={idx}
              id={it.id}
              promo={it.promo}
              name={it.productNameVn}
              nameKr={it.productNameKr}
              totalSoldQuantity={it.totalSoldQuantity}
              // @ts-ignore
              images={it.images}
              categoryId={it.categoryId}
              subCategoryId={it.subCategoryId}
              price={it.actualPrice}
              product={it}
            />
          );
        })}
      </View>
    </View>
  );
});

export default ProductsList;
