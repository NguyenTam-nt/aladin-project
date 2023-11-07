import React, { useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { defaultColors, isTabletDevice } from '@configs';
import { ICCheckBoxTable } from '@icons';
import { ICategory, IChildCategory, getCategories } from 'src/api/hotpot';
import { ICCheckBox } from 'src/assets/icons/ICCheckBox';
import ButtonMenuTabBar from 'src/components/DropDownView/ButtonMenuTabBar';
import DropDownView from 'src/components/DropDownView/DropDownView';
import MenuTabMobile from 'src/components/DropDownView/MenuTabMobile';
import { TabBarOrder } from '../ContentOrderTab';
import { RefreshControl } from 'react-native';

const dataCheckbox = [
  {
    label: 'Bếp',
    value: 'KITCHEN',
  },
  {
    label: 'Bar',
    value: 'BAR',
  },
];
 interface ITabBarLeftOrder {
  typeLocation : string | undefined
  setTypeLocaion : React.Dispatch<React.SetStateAction<string | undefined>>
 }



const TabBarLeftOrder = React.memo((props: TabBarOrder & ITabBarLeftOrder) => {
  const {isOpenTab, setIsOpenTab , stateFilter , setStateFilter , setTypeLocaion , typeLocation} = props;
  const [category, setCategory] = React.useState<ICategory[]>([]);

  const onSetStateFilter = ({
    idParent,
    id,
  }: {
    idParent: number
    id?: number
  }) => {
    if (setStateFilter) {
      if (id) {
        setStateFilter({idParent: idParent, id: id});
      } else {
        setStateFilter({idParent: idParent});
      }
    }
  };

  const getCategoriesData = async () => {
    const category = await getCategories();
    if (category.success) {
      setCategory(category.data);
    }
  };

  const onRefresh = () => {
    getCategoriesData();
  };

  React.useEffect(() => {
    getCategoriesData();
  }, []);

  const onSetTypeLocation = useCallback(
    (value: string) => {
      const check = typeLocation === value;
      setStateFilter(undefined);
      if (check) {
        setTypeLocaion(undefined);
      } else {
        setTypeLocaion(value);
      }
    },
    [typeLocation],
  );

  return (
    <MenuTabMobile
      isOpenTab={isOpenTab}
      setIsOpenTab={setIsOpenTab}
      content={
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={onRefresh} />
              }
          >
            <View style={styles.content}>
              {!isTabletDevice && (
                <View style={styles.buttonView}>
                  <ButtonMenuTabBar onPress={setIsOpenTab} />
                </View>
              )}
              <DropDownView
                itemView={
                  <View style={styles.itemViewDropDown}>
                    {dataCheckbox.map((e, index) => {
                      const isActive = typeLocation === e.value;
                      return (
                        <TouchableOpacity
                          style={styles.buttonCheckBoxDropDown}
                          activeOpacity={0.7}
                          onPress={() => {
                            onSetTypeLocation(e.value);
                          }}
                          key={index}>
                          {isActive ? <ICCheckBox color={defaultColors._E73F3F} /> : <ICCheckBoxTable color={defaultColors.c_0000} />}
                          <Text style={styles.labelTextDropDown}>
                            {e.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                }
                containerStyle={styles.containerStyleDropdown}
                textHeader="Loại thực đơn"
                onPressHeaderText={() => {
                  setTypeLocaion(undefined);
                }}
                textStyle={styles.textStyle}
                headerButtonStyle={styles.headerButtonStyleDropDown}
                isOpen={true}
              />
              <View style={styles.textHeader2}>
                <TouchableOpacity onPress={() => setStateFilter?.(undefined)}>
                  <Text style={styles.textStyle}>Danh mục</Text>
                </TouchableOpacity>
              </View>
              {category.map((item, index) => {
                const activeParent =  stateFilter?.idParent === item.id;
                return typeLocation === item.isMenu || !typeLocation  ? (
                  <DropDownView
                    key={index}
                    onPressHeaderText={() => {
                      onSetStateFilter({idParent : item.id});
                    }}
                    showDrop={item.listCategoryChild.length > 0 ? true : false}
                    itemView={
                      <View style={styles.itemViewDropDown}>
                        {
                          item.listCategoryChild.map(
                            (e: IChildCategory, index: number) => {
                              const isActive = stateFilter?.id === e.id;
                              return (
                                <TouchableOpacity
                                  style={styles.buttonCheckBoxDropDown}
                                  activeOpacity={0.7}
                                  onPress={() => {
                                    onSetStateFilter({ idParent : e.idParent , id : e.id});
                                  }}
                                  key={index}>
                                  <Text
                                    style={[
                                      styles.labelTextDropDown2,
                                      isActive
                                        ? {color: defaultColors._074A20}
                                        : undefined,
                                    ]}>
                                    {e.name}
                                  </Text>
                                </TouchableOpacity>
                              );
                            },
                          )
                    }
                      </View>
                    }
                    containerStyle={styles.containerStyleDropdown}
                    textHeader={item.name}
                    textStyle={[
                      styles.textStyleDropDown2,
                      {
                        color: activeParent
                          ? defaultColors._red
                          : defaultColors.c_222124,
                      },
                    ]}
                    headerButtonStyle={styles.headerButtonStyleDropDown}
                    isOpen={false}
                  />
                ) : <></>;
              })}
            </View>
          </ScrollView>
        </View>
      }
    />
  );
});

const styles = StyleSheet.create({
  container: {
    width: 226,
    backgroundColor: defaultColors.bg_FAFAFA,
    height: '100%',
  },
  content: {
    paddingHorizontal : 24,
  },
  textStyle: {
    color: defaultColors._EA222A,
    fontSize: 16,
    fontWeight: '600',
  },
  textStyleDropDown2: {
    color: defaultColors.c_222124,
    fontSize: 16,
    fontWeight: '600',
    maxWidth : 155,
  },
  containerStyleDropdown: {
    marginTop: 24,
  },
  headerButtonStyleDropDown: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: defaultColors.bg_EFEFEF,
    alignItems: 'center',
  },
  itemViewDropDown: {},
  buttonCheckBoxDropDown: {
    flexDirection: 'row',
    marginTop: 16,

  },
  labelTextDropDown: {
    marginLeft: 8,
    fontSize: 14,
    color: defaultColors.c_222124,

  },
  labelTextDropDown2: {
    fontSize: 14,
    color: defaultColors.c_222124,
  },
  textHeader2: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: defaultColors.bg_EFEFEF,
    marginTop: 33,
    paddingBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    marginTop: 16,
    fontWeight: 'bold',
    color: defaultColors.c_222124,
  },
  modal: {
    backgroundColor: 'white',
    margin: 0,
    alignItems: undefined,
    justifyContent: undefined,
  },
  buttonView: {
    marginTop: 24,
  },
});

export default TabBarLeftOrder;
