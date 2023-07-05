import {useState, useEffect, useRef} from 'react'


 export function useInView<T>(isListening = false){
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    const rf = ref.current as HTMLElement
    const observer = new IntersectionObserver((entries) => {
      if(isListening) {
        setIsInView(entries[0].isIntersecting)
      }else {
        if (entries[0].isIntersecting) {
          setIsInView(entries[0].isIntersecting)
        }
      }
    })

    if (rf) observer.observe(rf)

    return () => {
      if (rf) observer.unobserve(rf)
    }
  }, [isListening])

  return {isInView, ref}
}

export default useInView
