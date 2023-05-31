import { PopUpContext } from "@contexts/PopupContext"
import { contentService } from "@services/content"
import type { ContentType, IContent } from "@typeRules/content"
import { useCallback, useContext, useEffect, useState } from "react"

export const useHandlePost = (type:ContentType) => {
    const [listContent, setListContent] = useState<IContent[]>([])
    const [isShow, setIsShow] = useState(false);
    const handShow = () => {
      if(isShow) return
      setIsShow(true);
    };

    const {showError, showSuccess} = useContext(PopUpContext)

    const handlePostContent = useCallback((data:IContent) => {
        contentService.post({
            ...data,
            category: type,
            categoryKo: type,
            type
        }).then(res => {
            setListContent([...listContent, res])
            showSuccess("message.success._success")
        }).catch(() => {
            showError("message.error._error")
        })
    }, [listContent, showSuccess, showError, type])

    const handlePutContent = useCallback((data:IContent) => {
        contentService.put(data).then(res => {
            const newContents = [...listContent]
            const index = newContents.findIndex(item => item.id === res.id)
            newContents.splice(index, 1, res)
            setListContent([...newContents])
            showSuccess("message.success._success")
        }).catch(() => {
            showError("message.error._error")
        })
    }, [listContent, showSuccess, showError])

    const handleDeleteContent = useCallback((id:number) => {
        contentService.delete(id).then(() => {
            const newContents = [...listContent]
            const index = newContents.findIndex(item => item.id === id)
            newContents.splice(index, 1)
            setListContent([...newContents])
            showSuccess("message.success._success")
        }).catch(() => {
            showError("message.error._error")
        })
    }, [listContent, showSuccess, showError])


    useEffect(() => {
        contentService.getByType(type).then((data) => {
            setListContent([...data.data])
        })
    }, [type])

    return {
        listContent,
        handlePostContent,
        handlePutContent,
        handleDeleteContent,
        isShow,
        handShow
    }
}
