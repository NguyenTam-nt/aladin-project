import {Dimensions, View, useWindowDimensions, StyleSheet} from 'react-native';
import RenderHTML, {
  CustomRendererProps,
  HTMLContentModel,
  HTMLElementModel,
  MixedStyleDeclaration,
  MixedStyleRecord,
  TBlock,
  defaultHTMLElementModels,
} from 'react-native-render-html';
import React from 'react';
import WebView from 'react-native-webview';
import {
  HTMLIframe,
  iframeModel,
  useHtmlIframeProps,
} from '@native-html/iframe-plugin';
export interface HtmlProps {
  content?: string;
  tagsStyles?: MixedStyleRecord;
  baseStyle?: MixedStyleDeclaration;
}

export const Html = (props: HtmlProps) => {
  // const {width} = useWindowDimensions();
  // eslint-disable-next-line react/no-unstable-nested-components
  const IframeRenderer = function IframeRenderer(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    props: CustomRendererProps<TBlock>,
  ) {
    const iframeProps = useHtmlIframeProps(props);
    const {width, height} = StyleSheet.flatten(iframeProps.style);
    return (
      <View style={{width, height}}>
        <HTMLIframe {...iframeProps} />
      </View>
    );
  };
  const customHTMLElementModels = {
    img: defaultHTMLElementModels.img.extend({
      contentModel: HTMLContentModel.mixed,
    }),
    iframe: defaultHTMLElementModels.iframe.extend({
      contentModel: HTMLContentModel.mixed,
    }),
    table: defaultHTMLElementModels.table.extend({
      contentModel: HTMLContentModel.mixed,
    }),
    'blue-circle': HTMLElementModel.fromCustomModel({
      tagName: 'blue-circle',
      mixedUAStyles: {
        // width: 50,
        // height: 50,
        // borderRadius: 25,
        // alignSelf: 'center',
        // backgroundColor: 'blue',
      },
      contentModel: HTMLContentModel.block,
    }),
  };

  const renderers = {
    iframe: IframeRenderer,
  };

  const contentWidth = Dimensions.get('screen').width * 0.9;
  return (
    <RenderHTML
      ignoredStyles={['height', 'width']}
      renderers={renderers}
      contentWidth={contentWidth}
      // defaultWebViewProps={{}}
      WebView={WebView}
      source={{html: props.content || ''}}
      // tagsStyles={props.tagsStyles ?? {}}
      baseStyle={props.baseStyle ?? {}}
      customHTMLElementModels={customHTMLElementModels}
      renderersProps={{
        iframe: {
          scalesPageToFit: true,
          webViewProps: {
            allowsFullScreen: true,
          },
        },
      }}
      tagsStyles={{
        // p: {marginTop: 15, marginBottom: 0},
        iframe: {
          // marginTop: 15,
          // borderRadius: 5,
          // marginHorizontal: 0,
          // paddingBottom: 10,
          // width: '100%',
        },
      }}
    />
  );
};
