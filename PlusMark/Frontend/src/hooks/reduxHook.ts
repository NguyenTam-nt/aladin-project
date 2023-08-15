import {useDispatch, useSelector} from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';
import type { RootState, Appdispatch } from 'redux/store'; 


export const    useAppDispatch : ()=> Appdispatch = useDispatch
export const useAppSelector : TypedUseSelectorHook<RootState>  = useSelector