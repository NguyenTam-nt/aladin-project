import React, {useRef, useImperativeHandle, PropsWithChildren} from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';

export interface ImperativeScrollViewHandles {
  scrollToStart(options?: {animated: boolean}): void;
  scrollToEnd(options?: {animated: boolean}): void;
  scrollTo(options: {x?: number; y?: number; animated?: boolean}): void;
}
// export default forwardRef(ImperativeScrollView);

const ImperativeScrollView = React.forwardRef(
  (props: PropsWithChildren<ScrollViewProps>, ref) => {
    const scrollViewRef = useRef<ScrollView>(null);

    useImperativeHandle(ref, () => ({
      scrollToStart: (options: {animated: boolean}) => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: 0,
            y: 0,
            animated: options ? options.animated : true,
          });
        }
      },
      scrollToEnd: (options: {animated?: boolean | undefined} | undefined) => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd(options);
        }
      },
      scrollTo: (
        options:
          | number
          | {
              x?: number | undefined;
              y?: number | undefined;
              animated?: boolean | undefined;
            }
          | undefined,
      ) => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo(options);
        }
      },
    }));
    return <ScrollView ref={scrollViewRef} {...props} />;
  },
);

export default ImperativeScrollView;
