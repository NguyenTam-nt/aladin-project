import React from 'react'
import './btn-loading.css'
import { animated, useSpring } from '@react-spring/web'

export default function BtnLoading({ isLoading, children, ...props }: any) {

  const [showLoader, setShowLoader] = React.useState(false);

  React.useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    }
    if (!isLoading && showLoader) {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 400);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isLoading, showLoader]);


  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const ref = React.useRef<any>(null);

  React.useEffect(() => {
    if (ref.current && ref.current.getBoundingClientRect().width) {
      setWidth(ref.current.getBoundingClientRect().width);
    }
    if (ref.current && ref.current.getBoundingClientRect().height) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [children]);

  const fadeOutProps = useSpring({ opacity: showLoader ? 1 : 0 });
  const fadeInProps = useSpring({ opacity: showLoader ? 0 : 1 });

  return (
    <button
      className="btn"
      {...props}
      ref={ref}
      style={
        showLoader
          ? {
              width: `${width}px`,
              height: `${height}px`
            }
          : {}
      }
    >
      {showLoader ? (
        <animated.div style={fadeOutProps}>
          <div className="btn-loader" />
        </animated.div>
      ) : (
        <animated.div style={fadeInProps}>{children}</animated.div>
      )}
    </button>
  );
}
