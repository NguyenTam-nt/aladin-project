import useInView from "@hooks/useInView"
import React, { ImgHTMLAttributes, memo, useEffect } from "react"

export const Image = memo(
  ({ ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
    const { ref, isInView } = useInView<HTMLImageElement>()
    useEffect(() => {
      if (isInView && ref.current) {
        ref.current.src = ref.current.alt
      }
    }, [isInView])
    const handleError = () => {
      ref.current!.src = "/vite.svg"
    }
    return <img onError={handleError} ref={ref} {...props} />
  }
)
