import LoadingPage from '@components/LoadingPage';
import NewsDetail from '@pages/DetailNewspage/NewsDetail'
import { newsData } from '@pages/Newspage/Banner';
import PolicyServices from '@services/PolicyServices';
import convertToHtml from '@utility/convertoHtml';
import { firstUpper, some } from '@utility/helper'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Policypage() {

  const [policy, setPolicy] = useState<some>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const param = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      setIsLoading(true)
      fetchData(param.id)
        .then(data => {
          // console.log(data.data.data);
          setIsLoading(false)
          setPolicy(data.data)
          
        })
    } catch (error) {
      setIsLoading(false)
    }
  }, [param.id])

  const fetchData = async (id: any) => {
    return  await PolicyServices.getById(id)
  }

  return (
    <div className="w-full">
      {
        !isLoading ? <>
          <h3 className="text-normal1 lg:text-title font-semibold lg:font-bold text-black capitalize">{policy && policy.title}</h3>
          <div className="mb-4 mt-1">
            <p className="text-wap-regular2 lg:text-normal1 font-semibold lg:font-bold ">{policy && firstUpper(policy.describe)}</p>
          </div>
          
          <div className= "leading-tight my-4 myEditor" dangerouslySetInnerHTML={{__html: policy ? convertToHtml(policy.content) : "" }}></div>
        </> : <div className="h-48 min-h-full w-full flex justify-center items-center">
            <LoadingPage /> 
          </div>
      }
    </div>
  )
}

export default Policypage