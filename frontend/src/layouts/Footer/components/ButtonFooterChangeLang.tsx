import { Ilanguage, TranslateContext } from "@contexts/Translation"
import clsx from "clsx"
import { useContext, useMemo } from "react"

export const ButtonFooterChangeLang = ({type, text}: {type: Ilanguage, text: string}) => {
    const {t, setLanguage, currentLanguage} = useContext(TranslateContext)
    const isActive = useMemo(() => {
        return currentLanguage === type
    }, [currentLanguage, type])
    const handleClick = () => {
        setLanguage(type)
    }
    return (
        <button onClick={handleClick} className={clsx("h-[40px] ml-[4px] font-bold px-[16px] text-text_white", {"bg-primary": isActive})}>
            {t(text)}
        </button>

    )
}
