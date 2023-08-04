import React, {useEffect, useRef, useState} from 'react';
import {Animated, Platform} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';

interface ThumbFallbackProps extends Omit<FastImageProps, 'source'> {
  sourceImgDefault?: string
}

const FastImageAnimated = Animated.createAnimatedComponent(FastImage);

export interface ThumbProps extends FastImageProps {
  avatarType?: boolean
  bannerType?: boolean
}

/**
 * component để hiển thị nền khi ảnh bị lỗi không load đc
 * @param props
 */
export const ThumbFallback: React.FC<ThumbFallbackProps> = (props: any) => {
  if (props.bannerType) {
    return (
      <FastImage
        {...props}
        source={require('../../assets/image/default-thumbnail.jpg')}
        resizeMode="cover"
      />
    );
  }
  if (props.avatarType) {
    return (
      <FastImage
        {...props}
        source={require('../../assets/image/avatar_default.png')}
        resizeMode="cover"
      />
    );
  }
  return (
    <FastImage
      {...props}
      source={require('../../assets/image/default-thumbnail.jpg')}
      resizeMode="cover"
    />
  );
};

/**
 * component thay thế hiển thị ảnh của app
 * sử dụng lại FastImage để hiển thị
 * handler loading + error
 * @param props
 */
export const Thumb: React.FC<ThumbProps> = props => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {style, onError, onLoad, children} = props;

  const {source} = props;

  useEffect(() => {
    if (Platform.OS === 'android') {
      // @ts-ignore
      if (!source.uri) {
        setLoading(false);
        setError(true);
      }
    }
    return () => {
      setError(false);
      // setLoading(true)
    };
  }, [source]);

  const mouted = useRef<boolean>(true);
  useEffect(() => {
    mouted.current = true;
    return () => {
      mouted.current = false;
    };
  }, []);

  return (
    <Animated.View style={style}>
      {source?.uri === undefined ? (
        <ThumbFallback {...props} />
      ) : (
        <>
          {error && !loading ? <ThumbFallback {...props} /> : null}
          {error ? null : (
            <FastImage
              {...props}
              onLoad={(e: any) => {
                setLoading(false);
                if (typeof onLoad === 'function') {
                  onLoad(e);
                }
              }}
              onError={() => {
                setError(true);
                setLoading(false);
                if (typeof onError === 'function') {
                  onError();
                }
              }}
            />
          )}
        </>
      )}

      {children}
    </Animated.View>
  );
};
