import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import clsx from 'clsx'
import { NextAllPageIcon, NextPageIcon, PreAllPageIcon, PrePageIcon } from '@assets/icons'
// import { useAppDispatch } from '../../hooks/hook'
// import { AnyAction } from '@reduxjs/toolkit'
// import { hostBE } from '../../types/host'

type Props = {
    total: number
    currenPage: any
    // setCurrentPage: (page: number) => AnyAction
    setCurrentPage: (page: number) => 0
    limit?: number
}

function Pagination2({ total, currenPage, setCurrentPage, limit }: Props) {
    const navigate = useNavigate()
    let location = useLocation()
    const [searchParams] = useSearchParams();
    const pathName = location.pathname
    const search = pathName.indexOf('/search')
    const queryStringSearch = location.search
    const indexEqual = queryStringSearch.indexOf('=')
    const indexAnd = queryStringSearch.indexOf('&')
    // const dispatch = useAppDispatch();
    const queryString =
        indexAnd != -1 ? queryStringSearch.slice(indexEqual + 1, indexAnd) : queryStringSearch.slice(indexEqual + 1)

    let queryPage = '?'
    if (search != -1) {
        queryPage = `?search=${queryString}&`
    }
    const [pages, setPages] = useState<number[]>(() => {
        const newArr = []
        for (let i = 1; i <= total; ++i) {
            newArr.push(i)
        }
        return newArr
    })


    useEffect(()=> {
        const page = searchParams.get("page");
        if(page) {
            // dispatch(setCurrentPage(+page));
        }
    }, [searchParams, setCurrentPage])

    useEffect(() => {
        setPages(() => {
            const newArr = []
            for (let i = 1; i <= total; ++i) {
                newArr.push(i)
            }
            return newArr
        })
    }, [total])
    const renderPaging = () => {
        const arrLimit:number[] = []
        let li = limit ?? 5;
        for(let i = 1;i <= li;i++) {
            arrLimit.push(i);
        }
        const arr = [...arrLimit, +currenPage - 1, +currenPage, +currenPage + 1, pages.length]
        let xhtml: any = null
        xhtml = pages.map((page, index) => {
            const isCheck = arr.includes(page)
            return isCheck ? (
                <Link
                    to={`${queryPage}page=${page}`}
                    key={index}
                    className={clsx('mx-1 lg:mx-6 sc>768:mx-3 text-inherit px-4 py-2 hover:bg-[#F7F7F1] rounded-md', {
                        activeLink: +page === +currenPage,
                    })}
                >
                    {page}
                </Link>
            ) : page === +currenPage - 2 ? (
                <Link to={`${queryPage}page=${page}`} key={index} className="mx-1 lg:mx-6 sc>768:mx-0 text-inherit px-4 py-2 hover:bg-[#F7F7F1] rounded-md">
                    ...
                </Link>
            ) : page === +currenPage + 2 && page !== li + 1 ? (
                <Link to={`${queryPage}page=${page}`} key={index} className="mx-1 lg:mx-6 sc>768:mx-0 text-inherit px-4 py-2 hover:bg-[#F7F7F1] rounded-md">
                    ...
                </Link>
            ) : arrLimit.includes(+currenPage) && page === li + 2 ? (
                <Link to={`${queryPage}page=${page}`} key={index} className="mx-1 lg:mx-6 sc>768:mx-0 text-inherit px-4 py-2 hover:bg-[#F7F7F1] rounded-md">
                    ...
                </Link>
            ) : (
                ''
            )
        })
        return xhtml
    }

    const prePage = () => {
        if (currenPage > 1) {
            navigate(`${queryPage}page=${+currenPage - 1}`)
            // dispatch(setCurrentPage(currenPage - 1));
          
        }
    }

    const prePageOver = () => {
        if (currenPage > 0) {
            navigate(`${queryPage}page=${1}`)
            // dispatch(setCurrentPage(1));

        }
    }

    const nextPage = () => {
        if (currenPage < total) {
            navigate(`${queryPage}page=${+currenPage + 1}`)
            // dispatch(setCurrentPage(+currenPage + 1));

        }
    }

    const nextPageOver = () => {
        if (currenPage < total) {
            navigate(`${queryPage}page=${total}`)
            // dispatch(setCurrentPage(total));

        }
    }

    return (
        <div className="sc1920:h-[100px] sc1536:h-[80px] sc1366:h-[80px] flex items-center text-[10px] sm:text-[14px]   md:justify-end  justify-center font-nomal text-main">
            <span onClick={prePageOver} className="mx-1 lg:mx-6 mt-1 sc>768:mx-3 cursor-pointer px-4 py-3 hover:bg-[#F7F7F1] rounded-md">
                <PreAllPageIcon className='lssm:w-[10px] md:w-[12px] ' fill='var(--main-color)'/>
                {/* <img className='lssm:w-[10px] md:w-[12px]' src={`/assets/icons/pagination/preAllPage.svg`} alt="" width={18} /> */}
            </span>

            <span onClick={prePage} className="mx-1 lg:mx-6 mt-1 sc>768:mx-3 cursor-pointer px-4 py-3 hover:bg-[#F7F7F1] rounded-md">
                <PrePageIcon className='lssm:w-[8px] md:w-[12px]' fill='var(--main-color)'/>
                {/* <img className='lssm:w-[8px] md:w-[12px]' src={`/assets/icons/pagination/prePage.svg`} width={12}  alt=""/> */}
            </span>

            {renderPaging()}

            <span onClick={nextPage} className="mx-1 lg:mx-6 mt-1 sc>768:mx-3 cursor-pointer px-4 py-3 hover:bg-[#F7F7F1] rounded-md">
                <NextPageIcon className='lssm:w-[8px] md:w-[12px]' fill='var(--main-color)' />
                {/* <img className='lssm:w-[8px] md:w-[12px]' src={`/assets/icons/pagination/nextPage.svg`} width={12} alt="" /> */}
            </span>

            <span onClick={nextPageOver} className="mx-1 lg:mx-6 mt-1 sc>768:mx-3 cursor-pointer px-4 py-3 hover:bg-[#F7F7F1] rounded-md">
                <NextAllPageIcon className='lssm:w-[10px] md:w-[12px]' fill='var(--main-color)' />
                {/* <img className='lssm:w-[10px] md:w-[12px]' src={`/assets/icons/pagination/nextAllPage.svg`} width={18} alt="" /> */}
            </span>
        </div>
    )
}

export default Pagination2
