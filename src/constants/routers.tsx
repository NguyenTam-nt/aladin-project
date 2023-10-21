import {TextCustom} from '@components';
import {defaultColors} from '@configs';
import {LabelPosition} from '@react-navigation/bottom-tabs/src/types';
import React from 'react';
import {ICAbout} from 'src/assets/icons/bottomtab/ICAbout';
import {ICAccount} from 'src/assets/icons/bottomtab/ICAccount';
import {ICContact} from 'src/assets/icons/bottomtab/ICContact';
import {ICHome} from 'src/assets/icons/bottomtab/ICHome';
import {ICProduct} from 'src/assets/icons/bottomtab/ICProduct';
import {Home} from 'src/features/Home';
import {About} from 'src/features/About';
import Products from 'src/features/Products';
import {ProductStackScreen} from 'src/navigations/ProductStack';
import {ContactStackScreen} from 'src/navigations/ContactStack';
import AccountScreen from 'src/features/Account';
import {AccountStackScreen} from 'src/navigations/AccountStack';

export const routetBottomTab = {
  home: 'home',
  about: 'about',
  product: 'product',
  contact: 'contact',
  account: 'account',
};

export const productRoute = {
  prifex: 'products',
  detail: 'products/detail',
  categories: {
    detail: 'category/detail',
  },
  cart: 'addToCart',
};
export const contactRoute = {
  prifex: '/contact',
};

export const accountRoute = {
  prifex: '/profile',
};
type PropsTitle = {
  focused: boolean;
  color: string;
  position: LabelPosition;
  children: string;
};

type PropsIcon = {
  focused: boolean;
  color: string;
  size: number;
};

export const routers = [
  {
    name: routetBottomTab.home,
    title: 'navigation.home',
    component: Home,
    tabBarLabel: ({focused}: PropsTitle) => (
      <TextCustom
        weight="400"
        fontSize={12}
        color={focused ? defaultColors.text_111213 : defaultColors.bg_939393}>
        Trang chủ
      </TextCustom>
    ),
    tabBarIcon: ({color, size}: PropsIcon) => <ICHome color={color} />,
  },
  {
    name: routetBottomTab.about,
    title: 'navigation.about',
    component: About,
    tabBarLabel: ({focused}: PropsTitle) => (
      <TextCustom
        weight="400"
        fontSize={12}
        color={focused ? defaultColors.text_111213 : defaultColors.bg_939393}>
        Giới thiệu
      </TextCustom>
    ),
    tabBarIcon: ({color, size}: PropsIcon) => <ICAbout color={color} />,
  },
  {
    name: routetBottomTab.product,
    title: 'navigation.product',
    component: ProductStackScreen,
    tabBarLabel: ({focused}: PropsTitle) => (
      <TextCustom
        weight="400"
        fontSize={12}
        color={focused ? defaultColors.text_111213 : defaultColors.bg_939393}>
        Sản phẩm
      </TextCustom>
    ),
    tabBarIcon: ({color, size}: PropsIcon) => <ICProduct color={color} />,
  },
  {
    name: routetBottomTab.contact,
    title: 'navigation.contact',
    component: ContactStackScreen,
    tabBarLabel: ({focused}: PropsTitle) => (
      <TextCustom
        weight="400"
        fontSize={12}
        color={focused ? defaultColors.text_111213 : defaultColors.bg_939393}>
        Tư vấn
      </TextCustom>
    ),
    tabBarIcon: ({color, size}: PropsIcon) => <ICContact color={color} />,
  },
  {
    name: routetBottomTab.account,
    title: 'navigation.account',
    component: AccountStackScreen,
    tabBarLabel: ({focused}: PropsTitle) => (
      <TextCustom
        weight="400"
        fontSize={12}
        color={focused ? defaultColors.text_111213 : defaultColors.bg_939393}>
        Tài khoản
      </TextCustom>
    ),
    tabBarIcon: ({color, size}: PropsIcon) => <ICAccount color={color} />,
  },
];
