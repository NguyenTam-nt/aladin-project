import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {defaultColors} from '@configs';
import {TextCustom} from '../Text';
import TextTranslate from '../TextTranslate';
import {
  useHandleAddProvice,
  useListItemProvice,
} from 'src/redux/provices/hooks';
import {useDropdown} from 'src/hooks/useDropdown';
import {ICClose} from 'src/assets/icons/ICClose';
import InputSearch from '../InputSearch';
import PROVICE from '../../assets/provice/province_date.json';
import {DIMENSION} from '@constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const CityFilter = () => {
  const dataItem = useListItemProvice();
  const {toggleDropdown, visible, setVisible, dropdownTop, refDropdown} =
    useDropdown();
  const handleAddProvice = useHandleAddProvice();
  const {top: statusBarHeight} = useSafeAreaInsets();
  const height = DIMENSION.height;

  const [keyWord, setKeyWord] = useState<string>('');
  const [proviceFilter, setProviceFilter] = useState<any[]>([]);

  const handleSearchKeyWord = (keyWordSearch: string) => {
    const dataFilter = PROVICE.filter(it => it.Name.includes(keyWordSearch));
    setProviceFilter(dataFilter);
  };

  useEffect(() => {
    const timer = setTimeout(() => handleSearchKeyWord(keyWord), 500);
    return () => clearTimeout(timer);
  }, [keyWord]);

  const renderDropdownProvice = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles().overlay}
          onPress={() => setVisible(false)}>
          <View
            style={[
              styles(statusBarHeight, height).dropdown,
              {top: dropdownTop + 20},
            ]}>
            <View style={styles().groupStyleButton}>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={styles().buttonClose}>
                <ICClose />
              </TouchableOpacity>
              <InputSearch
                style={styles().inputSearch}
                containerStyle={{paddingRight: 8}}
                onChangeText={e => setKeyWord(e)}
              />
            </View>
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: 14,
                height: 40,
                borderBottomWidth: 1,
                borderBottomColor: defaultColors.br_E9E9E9,
              }}>
              <TextTranslate
                fontSize={14}
                weight="700"
                color={defaultColors.text_626262}
                text="common.choose-provice"
              />
            </View>
            <ScrollView>
              <View style={styles().proviceContainer}>
                {proviceFilter.map((it, idx) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        handleAddProvice({Id: it.Id, Name: it.Name});
                      }}
                      key={idx}
                      style={[
                        styles().proviceItem,
                        dataItem.provices.Name === it.Name &&
                          styles().proviceItemAction,
                      ]}>
                      <TextCustom>{it.Name}</TextCustom>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  return (
    <View style={styles().container}>
      <TouchableOpacity ref={refDropdown} onPress={toggleDropdown}>
        <TextTranslate
          text="common.view_price"
          color={defaultColors.c_fff}
          fontSize={8}
          weight="400"
        />
        <TextCustom color={defaultColors.c_fff} fontSize={12} weight="bold">
          {dataItem.provices.Name}
        </TextCustom>
        {renderDropdownProvice()}
      </TouchableOpacity>
    </View>
  );
};

export default CityFilter;

const styles = (statusBarHeight?: number, height?: number) =>
  StyleSheet.create({
    container: {
      width: 'auto',
      height: 32,
      borderWidth: 1,
      borderColor: defaultColors.c_fff,
      borderRadius: 6,
      padding: 4,
    },
    provice: {
      backgroundColor: defaultColors._014F59,
    },
    styleBackgroudOpacity: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      top: 0,
      left: 0,
      // opacity: 0.99,
      // zIndex: 100,
      // justifyContent: getValueForDevice('center','flex-end') ,
      alignItems: 'center',
      margin: 0,
    },
    dropdown: {
      position: 'absolute',
      backgroundColor: defaultColors.bg_EFEFEF,
      width: '100%',
      shadowColor: '#000000',
      shadowRadius: 4,
      shadowOffset: {height: 4, width: 0},
      shadowOpacity: 0.5,
      borderRadius: 4,
      height: (height ?? 0) - (statusBarHeight ?? 0) - 300,
    },
    overlay: {
      width: 'auto',
      height: '100%',
    },
    styleBackgroupProvice: {
      margin: 0,
      zIndex: 1,
      backgroundColor: defaultColors.bg_EFEFEF,
      height: '100%',
      width: '100%',
    },
    groupStyleButton: {
      width: '100%',
      height: 120,
      paddingHorizontal: 14,
      flexDirection: 'column',
      backgroundColor: defaultColors.bg_00C3AB,
    },
    buttonClose: {
      marginTop: 11,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginBottom: 20,
    },
    inputSearch: {
      flex: 1,
      height: '100%',
      paddingHorizontal: 14,
    },
    proviceContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      paddingHorizontal: 14,
    },
    proviceItem: {
      width: '50%',
      height: 50,
      borderBottomWidth: 1,
      borderBottomColor: defaultColors.br_E9E9E9,
      alignItems: 'center',
      justifyContent: 'center',
    },
    proviceItemAction: {
      backgroundColor: defaultColors.bg_DAF1E7,
      borderRadius: 20,
    },
  });