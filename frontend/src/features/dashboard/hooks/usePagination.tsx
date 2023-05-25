import { useState } from "react";


export const usePagination = () => {
    const [currenPage, setCurrentPage] = useState(1);

    return {
        currenPage, setCurrentPage
    }
}
