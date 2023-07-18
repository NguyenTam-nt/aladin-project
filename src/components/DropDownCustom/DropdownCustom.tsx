import _ from 'lodash';
import React, {
  JSXElementConstructor,
  ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  FlatList,
  I18nManager,
  Keyboard,
  KeyboardEvent,
  ListRenderItemInfo,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import { isTabletDevice } from '@configs';
import { ICDown } from '../../assets/icons/ICDown';
import CInput from './CInput';
import { DropdownProps } from './model';
import { styles } from './styles';

const  isTablet =  isTabletDevice;

const statusBarHeight: number = StatusBar.currentHeight || 0;

const DropdownComponent: <T>(
  props: DropdownProps<T>
) => ReactElement<any, string | JSXElementConstructor<any>> | null =
  React.forwardRef((props, currentRef) => {
    const orientation = isTablet ? 'LANDSCAPE' : 'PORTRAIT';
    const {
      testID,
      itemTestIDField,
      onChange,
      style = {},
      containerStyle,
      placeholderStyle,
      selectedTextStyle,
      itemContainerStyle,
      itemTextStyle,
      inputSearchStyle,
      iconStyle,
      selectedTextProps = {},
      data = [],
      labelField,
      valueField,
      searchField,
      value,
      activeColor = '#F6F7F8',
      fontFamily,
      iconColor = 'gray',
      searchPlaceholder,
      placeholder = 'Select item',
      search = false,
      maxHeight = 340,
      minHeight = 0,
      disable = false,
      keyboardAvoiding = true,
      inverted = true,
      renderLeftIcon,
      renderRightIcon,
      renderItem,
      renderInputSearch,
      onFocus,
      onBlur,
      autoScroll = true,
      showsVerticalScrollIndicator = true,
      dropdownPosition = 'auto',
      flatListProps,
      searchQuery,
      backgroundColor,
      onChangeText,
      confirmSelectItem,
      onConfirmSelectItem,
      accessibilityLabel,
      itemAccessibilityLabelField,
      mode = 'default',
    } = props;

    const ref = useRef<View>(null);
    const refList = useRef<FlatList>(null);
    const refListChild = useRef<FlatList>(null);

    const [visible, setVisible] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<any>(null);
    const [listData, setListData] = useState<any[]>(data);
    const [position, setPosition] = useState<any>();
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
    const [searchText, setSearchText] = useState('');
    const [listChild , setListChild] = useState<any>([]);

    const { width: W, height: H } = Dimensions.get('window');
    const styleContainerVertical: ViewStyle = useMemo(() => {
      return {
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
      };
    }, []);
    const styleHorizontal: ViewStyle = useMemo(() => {
      return {
        width: orientation === 'LANDSCAPE' ? W / 2 : '100%',
        alignSelf: 'center',
      };
    }, [W, orientation]);

    useImperativeHandle(currentRef, () => {
      return { open: eventOpen, close: eventClose };
    });

    useEffect(() => {
      setListData([...data]);
      if (searchText) {
        onSearch(searchText);
      }
    }, [data, searchText]);

    const eventOpen = () => {
      if (!disable) {
        setVisible(true);
        if (onFocus) {
          onFocus();
        }

        if (searchText.length > 0) {
          onSearch(searchText);
        }
        scrollIndex();
        scrollIndexChild();
      }
    };

    const eventClose = useCallback(() => {
      if (!disable) {
        setVisible(false);
        if (onBlur) {
          onBlur();
        }
      }
    }, [disable, onBlur]);

    const font = useCallback(() => {
      if (fontFamily) {
        return {
          fontFamily: fontFamily,
        };
      } else {
        return {};
      }
    }, [fontFamily]);

    const _measure = useCallback(() => {
      if (ref && ref?.current) {
        ref.current.measureInWindow((pageX, pageY, width, height) => {
          const isFull = isTablet
            ? false
            : mode === 'modal' || orientation === 'LANDSCAPE';
          const top = isFull ? 20 : height + pageY + 2;
          const bottom = H - top + height;
          const left = I18nManager.isRTL ? W - width - pageX : pageX;

          setPosition({
            isFull,
            width: Math.floor(width * 2),
            top: Math.floor(top + statusBarHeight),
            bottom: Math.floor(bottom - statusBarHeight),
            left: Math.floor(left),
            height: Math.floor(height),
          });
        });
      }
    }, [H, W, orientation, mode]);

    const onKeyboardDidShow = useCallback(
      (e: KeyboardEvent) => {
        _measure();
        setKeyboardHeight(e.endCoordinates.height);
      },
      [_measure]
    );

    const onKeyboardDidHide = useCallback(() => {
      setKeyboardHeight(0);
      _measure();
    }, [_measure]);

    useEffect(() => {
      const susbcriptionKeyboardDidShow = Keyboard.addListener(
        'keyboardDidShow',
        onKeyboardDidShow
      );
      const susbcriptionKeyboardDidHide = Keyboard.addListener(
        'keyboardDidHide',
        onKeyboardDidHide
      );

      return () => {
        if (typeof susbcriptionKeyboardDidShow?.remove === 'function') {
          susbcriptionKeyboardDidShow.remove();
        }

        if (typeof susbcriptionKeyboardDidHide?.remove === 'function') {
          susbcriptionKeyboardDidHide.remove();
        }
      };
    }, [onKeyboardDidHide, onKeyboardDidShow]);

    const getValue = useCallback(() => {
      const defaultValue =
        typeof value === 'object' && value !== null
          ? _.get(value, 'parentId' in value ? 'parentId' : valueField)
          : value;

      const getItem = data.filter(e =>
        _.isEqual(defaultValue.toString(), _.get(e, valueField).toString()),
      );
      if (getItem.length > 0) {
        setCurrentValue(value);
        setListChild(getItem[0]);
      } else {
        setCurrentValue(null);
      }
    }, [data, value, valueField]);



    useEffect(() => {
      getValue();
    }, [value, data, getValue]);

    const scrollIndex = useCallback(() => {
      if (autoScroll && data.length > 0 && listData.length === data.length) {
        setTimeout(() => {
          if (refList && refList?.current) {
            const defaultValue =
              typeof value === 'object' && value !== null
                ? _.get(value, 'parentId' in value ? 'parentId' : valueField)
                : value;

            const index = _.findIndex(listData, (e: any) =>
              _.isEqual(defaultValue.toString(), _.get(e, valueField).toString()),
            );
            if (index > -1 && index <= listData.length - 1) {
              refList?.current?.scrollToIndex({
                index: index,
                animated: true,
              });
            }
          }
        }, 200);
      }
    }, [autoScroll, data.length, listData, value, valueField]);

    const scrollIndexChild = useCallback(() => {
      if (autoScroll && data.length > 0 && listChild?.children?.length > 0) {
        setTimeout(() => {
          if (refListChild && refListChild?.current) {
            const defaultValue =
              typeof value === 'object' ? _.get(value, valueField) : value;
            const index = _.findIndex(listChild?.children, (e: any) => {
              return _.isEqual(
                defaultValue.toString(),
                _.get(e, valueField.toString()),
              );
            });

            if (index > -1 && index <= listChild?.children?.length - 1) {
              refListChild?.current?.scrollToIndex({
                index: index,
                animated: true,
              });
            }
          }
        }, 200);
      }
    }, [autoScroll, listChild.length, listChild, value, valueField]);



    const showOrClose = useCallback(() => {
      if (!disable) {
        if (keyboardHeight > 0 && visible) {
          return Keyboard.dismiss();
        }

        _measure();
        setVisible(!visible);
        setListData(data);

        if (!visible) {
          if (onFocus) {
            onFocus();
          }
        } else {
          if (onBlur) {
            onBlur();
          }
        }
        if (searchText.length > 0) {
          onSearch(searchText);
        }
        scrollIndex();
        scrollIndexChild();
      }

    }, [
      disable,
      keyboardHeight,
      visible,
      _measure,
      data,
      searchText,
      scrollIndex,
      scrollIndexChild,
      onFocus,
      onBlur,
    ]);

    const onSearch = useCallback(
      (text: string) => {
        if (text.length > 0) {
          const defaultFilterFunction = (e: any) => {
            const item = _.get(e, searchField || labelField)
              ?.toLowerCase()
              .replace(' ', '')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '');
            const key = text
              .toLowerCase()
              .replace(' ', '')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '');

            return item.indexOf(key) >= 0;
          };

          const propSearchFunction = (e: any) => {
            const labelText = _.get(e, searchField || labelField);

            return searchQuery?.(text, labelText);
          };

          const dataSearch = data.filter(
            searchQuery ? propSearchFunction : defaultFilterFunction
          );
          setListData(dataSearch);
        } else {
          setListData(data);
        }
      },
      [data, searchField, labelField, searchQuery]
    );

    const onSelect = useCallback(
      (item: any, parentId?: string) => {
        if (confirmSelectItem && onConfirmSelectItem) {
          return onConfirmSelectItem(item);
        }
        if (onChangeText) {
          setSearchText('');
          onChangeText('');
        }
        onSearch('');
        if (parentId) {
          setCurrentValue({...item, parentId: +parentId});
          onChange?.({...item, parentId: +parentId});
        } else {
          setCurrentValue(item);
          onChange?.(item);
        }

        if (item.children) {
          setListChild(item);
        } else {
          eventClose();
        }
      },
      [
        confirmSelectItem,
        eventClose,
        onChange,
        onChangeText,
        onConfirmSelectItem,
        onSearch,
      ],
    );

    const _renderDropdown = () => {
      const isSelected = currentValue && _.get(currentValue, valueField);

      const label_Parent =
        listData.find(obj => {
          return obj.value.toString() === currentValue?.parentId?.toString();
        })?.label || '';

      return (
        <TouchableWithoutFeedback
          testID={testID}
          accessible={!!accessibilityLabel}
          accessibilityLabel={accessibilityLabel}
          onPress={showOrClose}>
          <View style={styles.dropdown}>
            {renderLeftIcon?.(visible)}
            <Text
              style={[
                styles.textItem,
                isSelected !== null ? selectedTextStyle : placeholderStyle,
                font(),
              ]}
              {...selectedTextProps}>
              {isSelected !== null
                ? `${label_Parent && label_Parent + ' /'}  ${_.get(
                    currentValue,
                    labelField,
                  )}`
                : placeholder}
            </Text>
            {renderRightIcon ? (
              renderRightIcon(visible)
            ) : (
              <View>
                <ICDown />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      );
    };

    const _renderItem = useCallback(
      ({
        item,
        index,
        parentId,
      }: {
        item: any
        index: number
        parentId?: string
      }) => {
        const isSelected =
          currentValue &&
          _.get(
            currentValue,
            !parentId && currentValue.parentId ? 'parentId' : valueField,
          );
        const selected = _.isEqual(
          _.get(item, valueField)?.toString(),
          isSelected?.toString(),
        );

        _.assign(item, {_index: index});
        return (
          <TouchableHighlight
            key={index.toString()}
            testID={_.get(item, itemTestIDField || labelField)}
            accessible={!!accessibilityLabel}
            accessibilityLabel={_.get(
              item,
              itemAccessibilityLabelField || labelField,
            )}
            underlayColor={activeColor}
            onPress={() => onSelect(item, parentId)}>
            <View
              style={StyleSheet.flatten([
                itemContainerStyle,
                selected && {
                  backgroundColor: activeColor,
                },
              ])}>
              {renderItem ? (
                renderItem(item, selected)
              ) : (
                <View>
                  <View style={styles.item}>
                    <Text
                      style={StyleSheet.flatten([
                        styles.textItem,
                        itemTextStyle,
                        font(),
                      ])}>
                      {_.get(item, labelField)}
                    </Text>
                    {item.children && (
                      <View style={styles.icDownItem}>
                        <ICDown />
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>
          </TouchableHighlight>
        );
      },
      [
        accessibilityLabel,
        activeColor,
        currentValue,
        font,
        itemAccessibilityLabelField,
        itemContainerStyle,
        itemTestIDField,
        itemTextStyle,
        labelField,
        onSelect,
        renderItem,
        valueField,
      ],
    );

    const renderSearch = useCallback(() => {
      if (search) {
        if (renderInputSearch) {
          return renderInputSearch((text) => {
            if (onChangeText) {
              setSearchText(text);
              onChangeText(text);
            }
            onSearch(text);
          });
        } else {
          return (
            <CInput
              testID={testID + ' input'}
              accessibilityLabel={accessibilityLabel + ' input'}
              style={[styles.input, inputSearchStyle]}
              inputStyle={[inputSearchStyle, font()]}
              value={searchText}
              autoCorrect={false}
              placeholder={searchPlaceholder}
              onChangeText={(e) => {
                if (onChangeText) {
                  setSearchText(e);
                  onChangeText(e);
                }
                onSearch(e);
              }}
              placeholderTextColor="gray"
              iconStyle={[{ tintColor: iconColor }, iconStyle]}
            />
          );
        }
      }
      return null;
    }, [
      accessibilityLabel,
      font,
      iconColor,
      iconStyle,
      inputSearchStyle,
      onChangeText,
      onSearch,
      renderInputSearch,
      search,
      searchPlaceholder,
      testID,
      searchText,
    ]);

    const _renderList = useCallback(
      (isTopPosition: boolean , dataListChild? : any) => {
        const isInverted = !inverted ? false : isTopPosition;
        const _renderListHelper = () => {

          return (
              <View style={styles.flatListView}>
                <>
                  <View style={{width: '50%' , backgroundColor : backgroundColor }}>
                    <FlatList
                      testID={testID + ' flatlist'}
                      accessibilityLabel={accessibilityLabel + ' flatlist'}
                      {...flatListProps}
                      keyboardShouldPersistTaps="handled"
                      ref={refList}
                      onScrollToIndexFailed={scrollIndex}
                      data={dataListChild || listData}
                      inverted={isTopPosition ? inverted : false}
                      renderItem={_renderItem}
                      keyExtractor={(_item, index) => index.toString()}
                      showsVerticalScrollIndicator={
                        showsVerticalScrollIndicator
                      }
                    />
                  </View>
                  {_renderListChild(false, listChild)}
                </>
              </View>

          );
        };
        return (
          <TouchableWithoutFeedback>
            <View style={styles.flexShrink}>
              {isInverted && _renderListHelper()}
              {renderSearch()}
              {!isInverted && _renderListHelper()}
            </View>
          </TouchableWithoutFeedback>
        );
      },
      [
        _renderItem,
        accessibilityLabel,
        flatListProps,
        listData,
        inverted,
        renderSearch,
        scrollIndex,
        showsVerticalScrollIndicator,
        testID,
        listChild,
        backgroundColor,
      ]
    );

    const _renderListChild = useCallback(
      (isTopPosition: boolean, dataListChild: any) => {
        const isInverted = !inverted ? false : isTopPosition;
        const _renderListHelper = () => {
          const _renderItemCheck = (itemCheck: ListRenderItemInfo<any>) => {
            return _renderItem({
              item: itemCheck.item,
              index: itemCheck.index,
              parentId: dataListChild.value,
            });
          };
          return (
            <TouchableWithoutFeedback onPress={showOrClose}>
              <View
                style={{
                  width: position.width / 2,
                  height: '100%',
                }}>
                <FlatList
                  testID={testID + ' flatlist2'}
                  accessibilityLabel={accessibilityLabel + ' flatlist2'}
                  {...flatListProps}
                  keyboardShouldPersistTaps="handled"
                  ref={refListChild}
                  onScrollToIndexFailed={scrollIndexChild}
                  data={dataListChild.children}
                  inverted={isTopPosition ? inverted : false}
                  renderItem={_renderItemCheck}
                  keyExtractor={(_item, index) => index.toString()}
                  showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                />
              </View>
            </TouchableWithoutFeedback>
          );
        };
        return (
          <TouchableWithoutFeedback>
            <View style={styles.flexShrink}>
              {isInverted && _renderListHelper()}
              {renderSearch()}
              {!isInverted && _renderListHelper()}
            </View>
          </TouchableWithoutFeedback>
        );
      },
      [
        _renderItem,
        accessibilityLabel,
        flatListProps,
        listData,
        inverted,
        renderSearch,
        scrollIndex,
        scrollIndexChild,
        showsVerticalScrollIndicator,
        testID,
        position,
        showOrClose,
      ],
    );

    const _renderModal = useCallback(() => {
      if (visible && position) {
        const { isFull, width, height, top, bottom, left } = position;
        const onAutoPosition = () => {
          if (keyboardHeight > 0) {
            return bottom < keyboardHeight + height;
          }
          return bottom < (search ? 150 : 100);
        };
        if (width && top && bottom) {
          const styleVertical: ViewStyle = {
            left: left,
            maxHeight: maxHeight,
            minHeight: minHeight,
          };
          const isTopPosition =
            dropdownPosition === 'auto'
              ? onAutoPosition()
              : dropdownPosition === 'top';

          let keyboardStyle: ViewStyle = {};
          let extendHeight = !isTopPosition ? top : bottom;
          if (
            keyboardAvoiding &&
            keyboardHeight > 0 &&
            isTopPosition &&
            dropdownPosition === 'auto'
          ) {
            extendHeight = keyboardHeight;
          }
          return (
            <Modal
              transparent
              statusBarTranslucent
              visible={visible}
              supportedOrientations={['landscape', 'portrait']}
              onRequestClose={showOrClose}>
              <TouchableWithoutFeedback onPress={showOrClose}>
                <View
                  style={StyleSheet.flatten([
                    styles.flex1,
                    isFull && styleContainerVertical,
                    // backgroundColor && {backgroundColor: backgroundColor},
                    keyboardStyle,
                  ])}>
                  <View
                    style={StyleSheet.flatten([
                      styles.flex1,
                      {
                        width,
                      },
                      !isTopPosition
                        ? {paddingTop: extendHeight}
                        : {
                            justifyContent: 'flex-end',
                            paddingBottom: extendHeight,
                          },
                      isFull && styles.fullScreen,
                    ])}>
                    <View
                      style={StyleSheet.flatten([
                        styles.container,
                        isFull ? styleHorizontal : styleVertical,
                        containerStyle,
                      ])}>
                        {_renderList(isTopPosition)}
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          );
        }
        return null;
      }
      return null;
    }, [
      visible,
      search,
      position,
      keyboardHeight,
      maxHeight,
      minHeight,
      dropdownPosition,
      keyboardAvoiding,
      showOrClose,
      styleContainerVertical,
      backgroundColor,
      containerStyle,
      styleHorizontal,
      eventClose,
      _renderList,
    ]);

    return (
      <View
        style={StyleSheet.flatten([styles.mainWrap, style])}
        ref={ref}
        onLayout={_measure}
      >
        {_renderDropdown()}
        {_renderModal()}
      </View>
    );
  });

export default DropdownComponent;
