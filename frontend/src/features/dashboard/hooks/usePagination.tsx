import { useState } from "react";
import { useSearchParams } from "react-router-dom";


export const usePagination = () => {
    const [searchParam] = useSearchParams()
    const [currenPage, setCurrentPage] = useState(searchParam.get("page") ?? 1);

    return {
        currenPage, setCurrentPage
    }
}
