import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ICTickerDiscount} from 'src/assets/icons/ICTickerDiscount';
import {formatNumberDotWithVND} from 'src/commons/formatMoney';
import {globalStyles} from 'src/commons/globalStyles';
import SelectedPicker from './SelectedPicker';
import AmountChange from './AmountChange';
import {IAttributeFes, IProductDetails} from 'src/api/products';
import useI18n from 'src/hooks/useI18n';
import {ICPolicyCheck} from 'src/assets/icons/ICPolicyCheck';
import TextTranslate from 'src/components/TextTranslate';
import {Html} from 'src/components/Html';
import Toast from 'react-native-toast-message';
interface IProps {
  name?: string;
  priece?: number;
  promo?: number;
  actualPrice?: number;
  salientFeatures?: string;
  attributeFes: IAttributeFes[];
  productDetails: IProductDetails[];
  setProductDetailAtribute: (value: any) => void;
  setQuantityVailable: (value: number) => void;
}

const POLICY: {icon: JSX.Element; text: string}[] = [
  {icon: <ICPolicyCheck />, text: 'product.policy.hight-quanlity'},
  {icon: <ICPolicyCheck />, text: 'product.policy.best-priece'},
  {icon: <ICPolicyCheck />, text: 'product.policy.service'},
  {icon: <ICPolicyCheck />, text: 'product.policy.nationwide-delivery'},
];
const ProductDetailItem = (props: IProps) => {
  const {
    name,
    priece,
    promo,
    actualPrice,
    salientFeatures,
    attributeFes,
    productDetails,
    setProductDetailAtribute,
    setQuantityVailable,
  } = props;
  const {isVn} = useI18n();
  const [keySelected, setKeySelected] = useState<{key: string; name: string}[]>(
    [],
  );
  const [productDetailItem, setProductDetailItem] = useState<any | null>();
  const [quantityDescActive, setQuantityDescActive] = useState<boolean>(false);
  const [quantityAscActive, setQuantityAscActive] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityDefault, setQuantityDefault] = useState<number>(0);

  const handleSelected = (key: string, atb: any) => {
    const keySelectedList = [...keySelected];
    const index = keySelectedList.filter(it => it.key === key);
    if (
      index.length > 0 &&
      index[0].name !== atb &&
      atb &&
      index[0].key === key
    ) {
      const data = keySelected.map(it => {
        if (it.key === key) {
          return {...it, name: atb};
        }
        return it;
      });
      getProductDetailItem(data);
      setKeySelected(data);
    } else if (
      index.length > 0 &&
      index[0].name === atb &&
      index[0].key === key
    ) {
      const data = keySelected.filter(it => it.key !== key);
      getProductDetailItem(data);
      setKeySelected(data);
    } else {
      const newSelected = {
        key: key,
        name: atb,
      };
      getProductDetailItem([...keySelected, newSelected]);
      setKeySelected([...keySelected, newSelected]);
    }
  };

  const getProductDetailItem = (selected: {key: any; name: any}[]) => {
    const key = selected.map(it => {
      return {
        attributeNameVn: it.key.slice(0, -4),
        valueVn: it.name.slice(0, -5),
      };
    });

    const it_key_sort = key.sort((a, b) => {
      let fa = a.attributeNameVn.toLowerCase(),
        fb = b.attributeNameVn.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });

    const item = productDetails?.map((its, idx) => {
      return {
        ...its,
        attributes: its.attributes.map(it => {
          return {attributeNameVn: it.attributeNameVn, valueVn: it.valueVn};
        }),
        attributesKr: its.attributes.map(it => {
          return {attributeNameKr: it.attributeNameKr, valueKr: it.valueKr};
        }),
      };
    });

    const result = item?.filter(
      its =>
        (JSON.stringify(it_key_sort) === JSON.stringify(its.attributes)) ===
        true,
    );

    if (result && result?.length > 0) {
      setProductDetailItem(result[0]);
      setProductDetailAtribute(result[0]);
    } else {
      setProductDetailItem(null);
      setProductDetailAtribute(null);
    }
  };

  const handleIncrease = () => {

    if (productDetailItem === undefined || productDetailItem === null) {
      // onAddToast({ type: "warn", message: t("warning.product") });
      return;
    }

    let total = productDetailItem.stockQuantity || 0;
    if (total === 1 || total === 0) {
      // onAddToast({ type: "warn", message: t("warning.product-one") });
    }
    if (total === quantity + 1) {
      setQuantity(quantity + 1);
      setQuantityAscActive(false);
    }
    if (total > quantity) {
      setQuantity(quantity + 1);
      setQuantityDescActive(true);
    }
  };
  const handleDecrease = () => {
    let total = productDetailItem.stockQuantity || 0;
    if (total > quantity - 1) {
      setQuantityAscActive(true);
    }
    setQuantity(prev => {
      if (prev === 2) {
        setQuantityDescActive(false);
      }
      if (prev > 1) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  const handleBuyNow = () => {
    Toast.show({
      type: 'tomatoToast',
      props: {
        status: 'warning',
        uuid: 'messages.warning.add-to-cart',
      },
    });
  };

  const checkQuantityWithStockQuantity = () => {
    Toast.show({
      type: 'tomatoToast',
      props: {
        status: 'warning',
        uuid: 'messages.warning.product-stock-quantity',
      },
    });
    setQuantity(1);
  };

  useEffect(() => {
    if (productDetailItem) {
      setQuantityDefault(productDetailItem?.stockQuantity);
    } else {
      setQuantityDefault(0);
    }
  }, [productDetailItem]);

  useEffect(() => {
    setQuantityVailable(quantity);
  }, [quantity]);

  return (
    <View style={styles.conteiner}>
      <View style={styles.containerChild}>
        {promo !== 0 && (
          <View style={styles.ticker}>
            <View style={[StyleSheet.absoluteFillObject]}>
              <ICTickerDiscount />
            </View>
            <TextCustom color={defaultColors.c_fff} weight="bold" fontSize={14}>
              -{productDetailItem ? productDetailItem?.promoDetail : promo}%
            </TextCustom>
          </View>
        )}
        <View style={styles.groupContent}>
          <TextCustom
            fontSize={18}
            weight="700"
            color={defaultColors.text_313131}>
            {name}
          </TextCustom>
          <View style={styles.prieceGroup}>
            <TextCustom
              fontSize={20}
              weight="700"
              color={defaultColors.bg_E60E00}>
              {formatNumberDotWithVND(
                productDetailItem
                  ? productDetailItem?.actualPriceDetail
                  : actualPrice,
              )}
            </TextCustom>
            {promo != 0 && (
              <TextCustom
                fontSize={14}
                weight="400"
                color={defaultColors.bg_939393}
                textDecorationLine="line-through"
                textDecorationStyle="solid">
                {formatNumberDotWithVND(
                  productDetailItem ? productDetailItem?.priceDetail : priece,
                )}
              </TextCustom>
            )}
          </View>
          <View style={styles.selectedPicker}>
            {(attributeFes ?? []).map((its, idx) => {
              const actionKey = keySelected.filter(
                it => it.key === `${its.attributeFeNameVn}_key`,
              );
              return (
                <SelectedPicker
                  key={idx}
                  nameAttribute={
                    isVn ? its.attributeFeNameVn : its.attributeFeNameKr
                  }
                  attributeFeValues={its.attributeFeValues}
                  handleClick={handleSelected}
                  selected={keySelected}
                  keySelected={`${its.attributeFeNameVn}_key`}
                  actionKey={actionKey[0]}
                />
              );
            })}
          </View>
          <View style={styles.amountStyle}>
            <AmountChange
              quanlity={
                productDetailItem
                  ? productDetailItem?.stockQuantity > 0
                    ? quantity
                    : 0
                  : 1
              }
              handleDecrease={
                productDetailItem
                  ? quantity > quantityDefault
                    ? checkQuantityWithStockQuantity
                    : handleDecrease
                  : handleBuyNow
              }
              handleIncrease={
                productDetailItem
                  ? quantity > quantityDefault
                    ? checkQuantityWithStockQuantity
                    : handleIncrease
                  : handleBuyNow
              }
              ascActive={quantityAscActive}
              descActive={quantityDescActive}
              quantityDefault={quantityDefault}
            />
          </View>
          <View style={styles.policy}>
            <TextTranslate
              fontSize={16}
              weight="700"
              color={defaultColors.text_313131}
              text="product.policy.title"
            />
            <View style={styles.policyChid}>
              {POLICY.map((it, idx) => {
                return (
                  <View style={styles.policyItem} key={idx}>
                    {it.icon}
                    <TextTranslate
                      fontSize={14}
                      color={defaultColors.c_0000}
                      weight="400"
                      text={it.text}
                    />
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{marginTop: 19}}>
            <TextTranslate
              fontSize={16}
              weight="700"
              color={defaultColors.c_0000}
              text="product.features"
            />
            {/* <View> */}
            <Html content={salientFeatures} />
            {/* </View> */}
          </View>
        </View>
      </View>
    </View>
  );
};
export default ProductDetailItem;
const styles = StyleSheet.create({
  conteiner: {
    paddingHorizontal: 15,
    // position: 'relative',
    // paddingHpaddingp: 15,
  },
  containerChild: {
    width: '100%',
    // height: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 8,
    marginTop: 25,
    paddingBottom: 20,
    backgroundColor: defaultColors.c_fff,
  },
  ticker: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 72,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  groupContent: {
    marginTop: 50,
    paddingHorizontal: 11,
  },
  prieceGroup: {
    ...globalStyles.row,
    marginTop: 11,
    alignItems: 'baseline',
    columnGap: 10,
    borderBottomWidth: 1,
    paddingBottom: 2,
    borderBottomColor: defaultColors.bg_00C3AB,
  },
  selectedPicker: {
    marginTop: 19,
    flexDirection: 'column',
    rowGap: 12,
  },
  amountStyle: {
    marginTop: 12,
    flexDirection: 'column',
    rowGap: 12,
  },
  policy: {
    marginTop: 17,
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingTop: 7,
    backgroundColor: defaultColors.bg_DAF1E7,
  },
  policyChid: {
    flexDirection: 'column',
    rowGap: 8,
    marginTop: 12,
    marginBottom: 4,
  },
  policyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  groupButton: {
    marginTop: 25,
  },
});
