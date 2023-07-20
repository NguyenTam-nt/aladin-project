import { categoryReportNames, defaultColors } from '@configs';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../kitchen/components/Header';
import { ReportDetail } from './Detail';
import General from './General/index';
import { HandleTabReport } from './components/HandleTabReport';

const ReportStack = createStackNavigator();

export const Report = () => {

  const navigation = useNavigation();

  const currentRoute = useMemo(() => {
    return navigation.getState().routes[2].state?.routes
      ? navigation.getState().routes[2].state?.routes[
          //@ts-ignore
          navigation?.getState()?.routes[2]?.state?.routes?.length - 1
        ].name
      : categoryReportNames.general;
  }, [navigation?.getState()?.routes[2]?.state]);

  const handleNavigate = useCallback(
    (slug: string) => {
      //@ts-ignore
      navigation.navigate(slug);
    },
    [navigation],
  );

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
