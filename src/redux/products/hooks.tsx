import { useCallback } from "react";
import { useDispatch } from "react-redux"
import { IProducts, addItemToProducts } from "./slice";
import { useSelector } from "react-redux";
import { RootState } from "..";


export const handleAddItemWatchedProducts = () => {
    const dispatch = useDispatch();
    return useCallback((data: IProducts) => {
        dispatch(addItemToProducts(data))
    }, [])
}

export const useListWatchedProducts = () => {
    const listWatchedProducts = useSelector(
        (appState: RootState) => appState.productsSlice
    )
    return listWatchedProducts;
}