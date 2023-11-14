import useInView from "@hooks/useInView"
import React, { ImgHTMLAttributes, memo, useEffect, useRef } from "react"
import logoImage from "@assets/images/logo.png"

export const Image = memo(
  ({ ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
    const { ref, isInView } = useInView<HTMLImageElement>()
    useEffect(() => {
      if (isInView && ref.current) {
        ref.current.src = ref.current.alt
      }
    }, [isInView])
    const handleError = () => {
      ref.current!.src = logoImage
    }
    return <img onError={handleError} ref={ref} {...props} />
  }
)
