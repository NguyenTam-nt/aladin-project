import React, {memo, useEffect, useState} from 'react'
import {Link, useLocation, useNavigate, useSearchParams} from 'react-router-dom'
import clsx from 'clsx'
import { ICPreAll } from '@assets/icons/ICPreAll'
import { ICPre } from '@assets/icons/ICPre'
import { ICNext } from '@assets/icons/ICNext'
import { ICNextAll } from '@assets/icons/ICNextAll'

type Props = {
  total: number
  currenPage: any
  setCurrentPage: (page: any) => void
  limit?: number
}

function Pagination({total, currenPage, setCurrentPage, limit}: Props) {
  const navigate = useNavigate()
  let location = useLocation()
  const [searchParams] = useSearchParams()
  const pathName = location.pathname
  const search = pathName.indexOf('/search')
  const queryStringSearch = location.search
  const indexEqual = queryStringSearch.indexOf('=')
  const indexAnd = queryStringSearch.indexOf('&')

  const queryString =
    indexAnd != -1
      ? queryStringSearch.slice(indexEqual + 1, indexAnd)
      : queryStringSearch.slice(indexEqual + 1)

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

  useEffect(() => {
    const page = searchParams.get('page')
    if (page) {
      setCurrentPage(+page)
    }
  }, [searchParams, currenPage, setCurrentPage])

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
    const arrLimit: number[] = []
    let li = limit ?? 5
    for (let i = 1; i <= li; i++) {
      arrLimit.push(i)
    }
    const arr = [
      ...arrLimit,
      +currenPage - 1,
      +currenPage,
      +currenPage + 1,
      pages.length,
    ]
    let xhtml: any = null
    xhtml = pages.map((page, index) => {
      const isCheck = arr.includes(page)
      return isCheck ? (
        <Link
          to={`${queryPage}page=${page}`}
          key={index}
          className={clsx('mx-6 sc>768:mx-3 text-inherit', {
            activeLink: +page === +currenPage,
          })}
        >
          {page}
        </Link>
      ) : page === +currenPage - 2 ? (
        <Link
          to={`${queryPage}page=${page}`}
          key={index}
          className="mx-6 sc>768:mx-0 text-inherit"
        >
          ...
        </Link>
      ) : page === +currenPage + 2 && page !== li + 1 ? (
        <Link
          to={`${queryPage}page=${page}`}
          key={index}
          className="mx-6 sc>768:mx-0 text-inherit"
        >
          ...
        </Link>
      ) : arrLimit.includes(+currenPage) && page === li + 2 ? (
        <Link
          to={`${queryPage}page=${page}`}
          key={index}
          className="mx-6 sc>768:mx-0 text-inherit"
        >
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
      setCurrentPage(currenPage - 1)
    }
  }

  const prePageOver = () => {
    if (currenPage > 0) {
      navigate(`${queryPage}page=${1}`)
      setCurrentPage(1)
    }
  }

  const nextPage = () => {
    if (currenPage < total) {
      navigate(`${queryPage}page=${+currenPage + 1}`)
      setCurrentPage(+currenPage + 1)
    }
  }

  const nextPageOver = () => {
    if (currenPage < total) {
      navigate(`${queryPage}page=${total}`)
      setCurrentPage(total)
    }
  }

  return (
    <div className="sc1920:h-[100px] sc1536:h-[80px] sc1366:h-[80px] flex items-center justify-end text-[10px] lg:text-[18px] sc>768:justify-end">
      <span
        onClick={prePageOver}
        className="cursor-pointer"
      >
        <ICPreAll />
      </span>

      <span onClick={prePage} className="mx-[32px] mt-1cursor-pointer">
       <ICPre />
      </span>

      {renderPaging()}

      <span onClick={nextPage} className="mx-[32px] mt-1cursor-pointer">
       <ICNext />
      </span>

      <span
        onClick={nextPageOver}
        className="cursor-pointer"
      >
        <ICNextAll />
      </span>
    </div>
  )
}

export default memo(Pagination)
