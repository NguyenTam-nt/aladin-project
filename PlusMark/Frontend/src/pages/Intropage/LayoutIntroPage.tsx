
import BreakCrumb, { BreadcrumbType } from '@components/Breadcrumb'
import NavigationAboutUs from '@components/about/navigate/NavigationAboutUs'
import NavigationAboutUsMobile from '@components/about/navigate/NavigationAboutUsMobile'
import PolicyServices from '@services/PolicyServices'
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

function LayoutIntroPage() {

  const [isDetailNews, setisDetailNews] = useState(false)
  const location = useLocation()
  const [policy, setPolicy] = useState([])

  useEffect(() => {
    let l = "/about-us/news/"
    setisDetailNews(location.pathname.includes(l) && location.pathname.length > l.length) 
    
  }, [location.pathname])

  useEffect(() => {
    try {
      fetchData()
        .then(data => {
          // console.log(data.data.data);
          
          setPolicy(data.data.data)
          
        })
    } catch (error) {
      
    }
  }, [])

  const fetchData = async () => {
    return  await PolicyServices.get({page: 1, limit: 10})
  }
  

  return (
    <div className='container flex flex-col lg:flex-row lg:gap-10 mt-2 lg:mt-0 px-4 lg:px-8 relative pt-8'>
        
        <div className="block lg:hidden w-full mt-2 ">
            <NavigationAboutUsMobile policy={policy} />
        </div>
        <div className="flex-1 mt-5 lg:mt-0 overflow-hidden">
            <Outlet />
        </div>
        {!isDetailNews && <div className="hidden lg:block w-[25%] ">
            <NavigationAboutUs policy={policy} />
        </div>}
    </div>
  )
}

export default LayoutIntroPage