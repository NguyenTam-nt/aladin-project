import {StyleSheet, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {Header} from '../kitchen/components/Header';
import {categoryReportNames, defaultColors} from '@configs';
import {HandleTabReport} from './components/HandleTabReport';
import {createStackNavigator} from '@react-navigation/stack';
import {ReportDetail} from './Detail';
import {useNavigation, useRoute} from '@react-navigation/native';
import { routerPath } from 'src/navigations/DrawerKitchen'
import { General } from './General'

const ReportStack = createStackNavigator();

export const Report = () => {
  const router = useRoute();
  const navigation = useNavigation();
  const currentRoute = useMemo(() => {
    return router.name;
  }, [router]);

  console.log({currentRoute})

  const handleNavigate = useCallback((slug: string) => {
    //@ts-ignore
    navigation.navigate(slug);
  }, [navigation]);

  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      animationEnabled: false,
      headerStyle: {
        shadowColor: 'transparent',
      },
    }),
    [],
  );

  return (
    <View style={styles.container}>
      <Header
        renderLeft={
          <HandleTabReport
            currentCategory={currentRoute}
            onChange={handleNavigate}
          />
        }
      />
      <ReportStack.Navigator
        initialRouteName={categoryReportNames.general}
        screenOptions={screenOptions}>
        <ReportStack.Screen
          name={categoryReportNames.general}
          component={General}
        />
        <ReportStack.Screen
          name={categoryReportNames.detail}
          component={ReportDetail}
        />
      </ReportStack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.c_fff,
  },
});
