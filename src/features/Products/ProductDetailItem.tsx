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
import {ButtonTouchable} from 'src/components/Buttons/ButtonTouchable';
import {ICCart} from 'src/assets/icons/ICCart';
import {isAction} from '@reduxjs/toolkit';
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
  const [stockQuantity, setStockQuantity] = useState(0);
  const [quantityDescActive, setQuantityDescActive] = useState<boolean>(false);
  const [quantityAscActive, setQuantityAscActive] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityDefault, setQuantityDefault] = useState<number>(0);

  const handleSelected = (key: string, atb: any) => {
    const keySelectedList = [...keySelected];
    //&& index[0].name != atb && atb && index[0].key == key
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
    // const json = localStorage.getItem("province")
    // let province;
    // if (json == null) {
    //   province = initProvince
    // } else {
    //   province = JSON.parse(json)
    // }
    // if (productDetail?.productDetails.length === 0) {
    //   // onAddToast({ type: "warn", message: t("warning.product-province", { "province": lowerCase(province.name) }) })
    //   return;
    // }

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
    }
  }, [productDetailItem]);

  useEffect(() => {
    setQuantityVailable(quantity);
  }, [quantity]);

  const html =
    '<p style="text-align:justify;">\r\n\t<span style="font-size:16px;"><span style="font-family:\'times new roman\', times, serif;">Sau gần 3 năm liên tục gửi tín hiệu vào vũ trụ thì đến bây giờ vũ trụ "HOZO" 2022 của nhạc sĩ Huy Tuấn đã trả lời Hà Lê bằng một lời mời tham gia festival.</span></span></p>\r\n<p style="text-align:justify;">\r\n\t<span style="font-size:16px;"><span style="font-family:\'times new roman\', times, serif;">Hà Lê cảm thấy rất phấn khích, hạnh phúc và biết ơn anh Huy Tuấn cũng như "HOZO" 2022 đã trao cho mình cơ hội này. Thực sự Hà Lê rất trân trọng!</span></span></p>\r\n<p style="text-align:justify;">\r\n\t<span style="font-size:16px;"><span style="font-family:\'times new roman\', times, serif;"><img alt="" src="http://imedia.imuzik.com.vn/media1/ckfinder/images/anh-chup-man-hinh-2022-11-27-luc-143910-1669534762658(1).png" style="width:620px;height:935px;" /></span></span></p>\r\n<p style="text-align:justify;">\r\n\t<span style="font-size:16px;"><span style="font-family:\'times new roman\', times, serif;"><em>Ba‌byf‌‌ace - nghệ sĩ từng đoạt 12 giải Grammy, viết hit cho Whitney Houston, Mariah Carey... cũ‌ng sẽ góp giọng tại "HOZO" 2022. Bạn có chịu nhiều áp lực khi đứng chung một <a href="https://dantri.com.vn/su-kien.htm">sự kiện</a> với huyền thoại âm nhạ‌c thế giới như thế?</em></span></span></p>\r\n<p style="text-align:justify;">\r\n\t<span style="font-size:16px;"><span style="font-family:\'times new roman\', times, serif;">- Áp lực đương nhiên là có rồi nhưng một chút áp lực sẽ làm cho người nghệ sĩ được thăng hoa hơn trên sân khấu. Hà Lê nghĩ vậy.</span></span></p>\r\n<p style="text-align:justify;">\r\n\t<span style="font-size:16px;"><span style="font-family:\'times new roman\', times, serif;">Hà Lê rất mong chờ được thưởng thức phần trình diễn của huyền thoại Babyface. Đây cũng là một trong những nghệ sĩ mà Hà Lê nghe rất nhiều nhạc của họ. Hy vọng Babyface sẽ yêu thích Việt Nam của chúng ta và mang lại một phần biểu diễn bùng nổ.</span></span></p>\r\n<p style="text-align:justify;">\r\n\t<span style="font-size:16px;"><span style="font-family:\'times new roman\', times, serif;"><em>Bạn đã chuẩn bị những gì để sẵn sàng cho màn trình diễn tại "HOZO" 2022?</em></span></span></p>\r\n<p style="text-align:justify;">\r\n\t<span style="font-size:16px;"><span style="font-family:\'times new roman\', times, serif;">- Hà Lê đã sẵn sàng để "ở trọ tại HOZO" với những tác phẩm kinh điển được làm mới của nhạc sĩ Trịnh Công Sơn và đồng thời giới thiệu tới các bạn yêu nhạc dự án mới nhất của mình là "EP Lost" (được sản xuất bởi nhạc sĩ Khắc Hưng) .</span></span></p>\r\n<p style="text-align:justify;">\r\n\t<span style="font-size:16px;"><span style="font-family:\'times new roman\', times, serif;"><em>Nhiều nghệ sĩ chia sẻ họ rất mong chờ được đến với "HOZO" để được bộc lộ khía cạnh mới của mình đến với công chúng, liệu khán giả "HOZO" sẽ nhận được một "món quà" nào đó hé lộ màu sắc mới trong âm nhạc của Hà Lê?</em></span></span></p>\r\n<p style="text-align:justify;">\r\n\t<span style="font-size:16px;"><span style="font-family:\'times new roman\', times, serif;">- Chắc chắn là như vậy rồi. Hà Lê mới ra mắt "EP Lost" hồi tháng 9 và chưa có nhiều điều kiện để giới thiệu "EP Lost" này tới nhiều hơn các bạn khán giả. "HOZO" chắc chắn là sân khấu lớn nhất mà Hà Lê được trình diễn những ca khúc mới này. Hà Lê hy vọng mọi người sẽ ủng hộ cho mình!</span></span></p>\r\n<p style="text-align:justify;">\r\n\t<span style="font-size:16px;"><span style="font-family:\'times new roman\', times, serif;"><em>Có quan điểm cho rằng: Các lễ hội âm nhạc là nơi các nghệ sĩ biểu diễn cũng vươn tới những đỉnh cao mới hơn trong sự nghiệp làm nghề của mình. HOZO 2022 liệu sẽ là một bước "chuyển mình" của Hà Lê?</em></span></span></p>\r\n<p style="text-align:justify;">\r\n\t<span style="font-size:16px;"><span style="font-family:\'times new roman\', times, serif;">- Được biểu diễn trên những sân khấu của các lễ hội âm nhạc thực sự là một đỉnh cao mà người nghệ sĩ nào cũng hướng tới, trong đó có Hà Lê.</span></span></p>\r\n<p style="text-align:justify;">\r\n\t<span style="font-size:16px;"><span style="font-family:\'times new roman\', times, serif;">Đây là một đặc ân, một cơ hội lớn cho người nghệ sĩ không chỉ ở khía cạnh biểu diễn và giới thiệu sản phẩm âm nhạc mà còn là thước đo cho sự phát triển của chính người nghệ sĩ đó trong sự phát triển chung của nền âm nhạc. Hà Lê chắc chắn sẽ muốn làm thật tốt để có thể có được bước đà tốt hơn cho những chương tiếp theo của sự nghiệp.</span></span></p>\r\n<p style="text-align:justify;">\r\n\t<span style="font-size:16px;"><span style="font-family:\'times new roman\', times, serif;"><em>Tinh thần của "HOZO" là mang đến cho công chúng một không gian âm nhạc không biên giới, với đa sân khấu - đa thể loại âm nhạc - đa sắc tộc, bạn có cảm nhận ra sao về tinh thần này?</em></span></span></p>\r\n<p style="text-align:justify;">\r\n\t<span style="font-size:16px;"><span style="font-family:\'times new roman\', times, serif;">- Hà Lê rất thích thú và ủng hộ tinh thần này của "HOZO" ! Thế giới của chúng ta bây giờ là thế giới phẳng, với rất nhiều những sự giao thoa, kết nối và điều đó xảy ra mạnh mẽ nhất là trong âm nhạc.</span></span></p>\r\n<p style="text-align:justify;">\r\n\t<span style="font-size:16px;"><span style="font-family:\'times new roman\', times, serif;">Hà Lê cũng sẽ mang màu sắc và bản sắc riêng của mình đến để góp thêm vào sự đa dạng tuyệt vời này của sự kiện âm nhạc này.</span></span></p>\r\n<p style="text-align:justify;">\r\n\t<span style="font-size:16px;"><span style="font-family:\'times new roman\', times, serif;"><em>Cảm ơn Hà Lê về những chia sẻ!</em></span></span></p>\r\n<p>\r\n\t </p>';
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

          {/* <View style={styles.groupButton}>
            <View style={{flexDirection: 'row', columnGap: 8}}>
              <ButtonTouchable
                text="Mua Hang"
                renderLeff={<ICCart color={defaultColors.bg_00C3AB} />}
                style={{
                  flex: 1,
                  borderColor: defaultColors.bg_00C3AB,
                  borderRadius: 20,
                  height: 40,
                }}
              />
              <ButtonTouchable
                text="Mua Hang"
                renderLeff={<ICCart />}
                style={{
                  flex: 1,
                  borderColor: defaultColors.bg_00C3AB,
                  borderRadius: 20,
                  height: 40,
                }}
              />
            </View>
          </View> */}
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
