import { defaultColors } from '@configs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RadioButtonSelect } from '../../../components/Checkbox/RadioButton';
import DropdownComponent from '../../DropDownCustom/DropdownCustom';
import CompoundTable from './component/CompoundTable';
import { IProductInCart } from 'src/api/products';
import { ActionCartListChoose } from '../CartList';
import { getTableCombine, getTableDetached } from 'src/api/table';
import { useIdBill } from 'src/redux/cartOrder/hooks';

  interface IDataSelection {
    label: string
    value: any
  }

 export interface IDataSelectionCustom  {
    label: string
    value: any
    children ? : IDataSelection[]
    parentId?: number
  }

const CompoundCartList = ({dataItemCart ,setActionChoose} : { dataItemCart: IProductInCart[]
  setActionChoose: React.Dispatch<React.SetStateAction<ActionCartListChoose>> }) => {
  const idBill = useIdBill();
  const [isCompound , setIsCompound] = useState<boolean>(true);
  const [dataItem , setDataItem] = useState<IDataSelectionCustom[]>([]);
  const [table, setTable] = useState<IDataSelectionCustom | undefined>();
  const dataListUpdate = useMemo<IProductInCart[]>(() => {
    return dataItemCart.filter(item => item.state !== 'CANCEL');
  }, [dataItemCart]);

  const getTableList = useCallback(async () => {
    if (idBill) {
      const data = isCompound
        ? await getTableCombine(idBill)
        : await getTableDetached(idBill);
      if (data.success) {
        const dataCheck = data.data?.map(area => {
          return {
            label: area.nameArea,
            value: area.id.toString(),
            children: area.tables.map(table => {
              return {
                label: table.name,
                value: table.id.toString(),
              };
            }),
          };
        });
        setTable(undefined);
        setDataItem(dataCheck || []);
      }
    }
  }, [idBill ,isCompound]);

  useEffect(() => {
    if (idBill) {
    getTableList();
    }
  }, [idBill , isCompound]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableWithoutFeedback
          style={styles.button}
          onPress={() => {
            setIsCompound(true);
          }}>
          <RadioButtonSelect active={isCompound} />
          <Text style={styles.textButton}>Ghép đơn</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.button}
          onPress={() => {
            setIsCompound(false);
          }}>
          <RadioButtonSelect active={!isCompound} />
          <Text style={styles.textButton}>Tách đơn</Text>
        </TouchableWithoutFeedback>
      </View>
      <Text style={styles.textCompound}>Ghép đến</Text>
      <DropdownComponent
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={{fontSize: 14, color: defaultColors.c_fff}}
        containerStyle={styles.containerStyleDropdown}
        itemContainerStyle={styles.itemContainerStyle}
        data={dataItem}
        backgroundColor={defaultColors._33343B}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Chọn bàn"
        activeColor={defaultColors._EA222A}
        showsVerticalScrollIndicator={false}
        value={table}
        onChange={e => {
          setTable(e);
        }}
      />
      <CompoundTable
        dataItemCart={dataListUpdate}
        setActionChoose={setActionChoose}
        tableId={table?.parentId ? table.value : undefined}
        typeActions={isCompound ? 'combine' : 'detached'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flex :1,
  } ,
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  textCompound: {
    color: defaultColors.c_fff,
    fontSize: 14,
    fontWeight: '600',
    marginTop : 25,
  },
  button: {
    flexDirection: 'row',
    marginRight: 16,
  },
  textButton: {
    color: defaultColors.c_fff,
    fontSize: 14,
    marginLeft: 8,
  },
  dropdown: {
    height: 40,
    borderWidth: 1,
    borderColor: defaultColors._DBDBDB,
    borderRadius: 5,
    width: '50%',
    fontSize: 14,
    marginTop : 8,
  },
  placeholderStyle: {
    color: defaultColors.c_fff,
    fontSize: 14,
    marginLeft: 8,
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: 16,
    color: defaultColors.c_fff,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 0,
  },
  containerStyleDropdown: {
    backgroundColor: 'tranparent',
    borderWidth: 0,
    borderColor: 'tranparent',
  },
  itemContainerStyle : {
    backgroundColor: defaultColors._33343B,
  },

});

export default CompoundCartList;
