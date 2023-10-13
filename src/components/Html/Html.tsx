import {useWindowDimensions} from 'react-native';
import RenderHTML, {
  HTMLContentModel,
  HTMLElementModel,
  MixedStyleDeclaration,
  MixedStyleRecord,
} from 'react-native-render-html';
import React from 'react';

export interface HtmlProps {
  content?: string;
  tagsStyles?: MixedStyleRecord;
  baseStyle?: MixedStyleDeclaration;
}

export const Html = (props: HtmlProps) => {
  const {width} = useWindowDimensions();
  const customHTMLElementModels = {
    'blue-circle': HTMLElementModel.fromCustomModel({
      tagName: 'blue-circle',
      mixedUAStyles: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignSelf: 'center',
        backgroundColor: 'blue',
      },
      contentModel: HTMLContentModel.block,
    }),
  };

  return (
    <RenderHTML
      contentWidth={width}
      source={{html: props.content || ''}}
      tagsStyles={props.tagsStyles ?? {}}
      baseStyle={props.baseStyle ?? {}}
      customHTMLElementModels={customHTMLElementModels}
    />
  );
};
