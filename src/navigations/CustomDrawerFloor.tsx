import {
  activeBackgroundColor,
  activeTintColor,
  defaultColors,
  inactiveBackgroundColor,
  inactiveTintColor,
} from '@configs';
import {ICLogo} from '@icons';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {LogoutDrawer} from '../components/LogoutDrawer';
import {IFLoor, getFloor} from 'src/api/table';
import {DrawerItemCustom} from './DrawerItemCustom';
import { useDispatch } from 'react-redux';
import { setAreaId, setFloorActiveRedux } from 'src/redux/infoDrawer/slice';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationHelpers } from './types';
const AllFloor =  [
  {
  id: 0,
  name: 'Tất cả',
  description: 'Không',
  ndinnerTable: 100,
  nseat: 0,
  },
];


const CustomDrawerFloor = ({ navigation } : { navigation : DrawerNavigationHelpers }) => {
  const [floor, setFloor] = React.useState<IFLoor[]>(AllFloor);
  const [floorActive, setFloorActive] = React.useState(0);
  const dispatch = useDispatch();
  const getDataFloor = async () => {
  const floor = await getFloor();
    if (floor.success) {
      setFloor(AllFloor.concat(floor.data[0].area));
      dispatch(setAreaId({id: floor.data[0].infrastructure.id, name: floor.data[0].infrastructure.name}));
    }
  };
  React.useLayoutEffect(() => {
    getDataFloor();
  }, []);
  const onPress = (index: number) => {
    setFloorActive(index);
    dispatch(setFloorActiveRedux(floor[index].name));
    navigation.closeDrawer();
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        contentContainerStyle={{backgroundColor: 'transparent'}}>
        <View>
          <View style={{alignItems: 'center'}}>
            <ICLogo color={defaultColors.c_fff} height={168} width={168} />
          </View>
        </View>
        {floor.map((floor, index) => {
          return (
            <DrawerItemCustom
              key={index}
              //@ts-ignore
              route={''}
              label={floor.name}
              icon={() => {
                return (
                  <RenderIconFloor
                    index={index}
                    focused={floorActive === index}
                  />
                );
              }}
              focused={floorActive === index}
              activeTintColor={activeTintColor}
              inactiveTintColor={inactiveTintColor}
              activeBackgroundColor={activeBackgroundColor}
              inactiveBackgroundColor={inactiveBackgroundColor}
              labelStyle={[{fontWeight: '500'}]}
              style={styles.drawerStyle}
              onPress={() => {
                onPress(index);
              }}
            />
          );
        })}
      </DrawerContentScrollView>
      <LogoutDrawer />
    </View>
  );
};

const RenderIconFloor = ({
  index,
  focused,
}: {
  index: number
  focused: boolean
}) => {
  const colorStyle = React.useMemo(() => {
    return {
      backgroundColor: focused ? defaultColors.c_0000 : defaultColors.c_fff,
    };
  }, [focused]);

  const colorTextStyle = React.useMemo(() => {
    return {
      color: !focused ? defaultColors.c_0000 : defaultColors.c_fff,
    };
  }, [focused]);

  return (
    <View style={[styles.iconFloor, colorStyle]}>
      <Text style={[styles.textNumber, colorTextStyle]}> {index + 1} </Text>
    </View>
  );
};

export default CustomDrawerFloor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.c_222124,
    width: 216,
  },
  iconFloor: {
    height: 20,
    width: 20,
    backgroundColor: defaultColors.c_fff,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNumber: {
    color: defaultColors.c_0000,
    fontWeight: 'bold',
  },
  drawerStyle: {
    width: 216,
  },
});
