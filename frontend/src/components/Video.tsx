import useInView from "@hooks/useInView";
import clsx from "clsx";
import React, { VideoHTMLAttributes, memo, useEffect } from "react";

type Props = VideoHTMLAttributes<HTMLVideoElement>;

export const Video = memo(({ src, className, ...props }: Props) => {
  const { ref, isInView } = useInView<HTMLVideoElement>(true);
  useEffect(() => {
    if (ref.current && !isInView) {
      ref.current.pause();
    }
  }, [isInView]);
  return (
    <video
      ref={ref}
      className={clsx("w-full h-full object-cover", { className })}
      {...props}
    >
      <source src={src} />
    </video>
  );
})
