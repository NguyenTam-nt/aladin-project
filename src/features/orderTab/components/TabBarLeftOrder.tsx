import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {defaultColors, isTabletDevice} from '@configs';
import CheckBox from 'src/components/Checkbox/CheckBox';
import ButtonMenuTabBar from 'src/components/DropDownView/ButtonMenuTabBar';
import DropDownView from 'src/components/DropDownView/DropDownView';
import MenuTabMobile from 'src/components/DropDownView/MenuTabMobile';
import {TabBarOrder} from '../ContentOrderTab';
import {ICategory, IChildCategory, getCategories} from 'src/api/hotpot';

const dataCheckbox = [
  {
    label: 'Bếp',
    value: 1,
  },
  {
    label: 'Bar',
    value: 2,
  },
];

interface IStateFilter {
  [key: string]: number | undefined
}

const TabBarLeftOrder = React.memo((props: TabBarOrder) => {
  const {isOpenTab, setIsOpenTab} = props;
  const [typeLocation, setTypeLocaion] = useState<number[]>([]);
  const [stateFilter, setStateFilter] = useState<IStateFilter>({});

  const [categoty, setCategory] = React.useState<ICategory[]>([]);
  const onSetStateFilter = (id: number, idParent?: number) => {
    const newStateFilter = stateFilter;
    if (idParent) {
      if (stateFilter[idParent]) {
        if (stateFilter[idParent] === id) {
          delete stateFilter[idParent];
          setStateFilter({...newStateFilter});
        } else {
          newStateFilter[idParent] = id;
          setStateFilter({...newStateFilter});
        }
      } else {
        newStateFilter[idParent] = id;
        setStateFilter({...newStateFilter});
      }
    } else {
      if (Object.keys(newStateFilter).find(key => key === id.toString())) {
        delete newStateFilter[id];
      } else {
        newStateFilter[id] = undefined;
      }

      setStateFilter({...newStateFilter});
    }
  };
  const getCategoriesData = async () => {
    const category = await getCategories();
    if (category.success) {
      setCategory(category.data);
    }
  };

  React.useEffect(() => {
    getCategoriesData();
  }, []);

  const onSetTypeLocation = useCallback(
    (value: number) => {
      const index = typeLocation.findIndex(type => {
        return type === value;
      });

      const checkType = [...typeLocation];
      if (index >= 0) {
        delete checkType[index];
        setTypeLocaion(checkType);
      } else {
        checkType.push(value);
        setTypeLocaion(checkType);
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
          <ScrollView showsVerticalScrollIndicator={false}>
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
                      const isActive = typeLocation.find(type => {
                        return type === e.value;
                      });
                      return (
                        <TouchableOpacity
                          style={styles.buttonCheckBoxDropDown}
                          activeOpacity={0.7}
                          onPress={() => {
                            onSetTypeLocation(e.value);
                          }}
                          key={index}>
                          <CheckBox active={isActive ? true : false} />
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
                  setTypeLocaion([]);
                }}
                textStyle={styles.textStyle}
                headerButtonStyle={styles.headerButtonStyleDropDown}
                isOpen={true}
              />
              <View style={styles.textHeader2}>
                <TouchableOpacity onPress={() => setStateFilter({})}>
                  <Text style={styles.textStyle}>Danh mục</Text>
                </TouchableOpacity>
              </View>
              {categoty.map((item, index) => {
                const activeParent = Object.keys(stateFilter).find(
                  itemCheck => itemCheck === item.id.toString(),
                );
                return (
                  <DropDownView
                    key={index}
                    onPressHeaderText={() => {
                      onSetStateFilter(item.id);
                    }}
                    itemView={
                      <View style={styles.itemViewDropDown}>
                        {item.listCategoryChild.length > 0 ? (
                          item.listCategoryChild.map(
                            (e: IChildCategory, index: number) => {
                              const isActive = stateFilter[e.idParent] === e.id;
                              return (
                                <TouchableOpacity
                                  style={styles.buttonCheckBoxDropDown}
                                  activeOpacity={0.7}
                                  onPress={() => {
                                    onSetStateFilter(e.id, e.idParent);
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
                        ) : (
                          <Text style={styles.emptyText}>
                            Món không có danh mục con
                          </Text>
                        )}
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
                );
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
    marginLeft: 24,
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
  },
  containerStyleDropdown: {
    marginTop: 24,
  },
  headerButtonStyleDropDown: {
    width: '78%',
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
    width: '78%',
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
