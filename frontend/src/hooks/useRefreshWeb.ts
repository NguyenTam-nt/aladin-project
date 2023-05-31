import { prefixRootRoute } from "@configs/index";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export const useRefreshWeb = () => {
  const location = useLocation();
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      window.scrollTo(0, 0);
    });

    return () => {
      window.addEventListener("beforeunload", () => {
        window.scrollTo(0, 0);
      });
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if(location.pathname.includes(prefixRootRoute.admin)) {
      document.body.style.overflowX = 'auto';
    }else {
      document.body.style.overflowX = 'hidden';
    }
  }, [location.pathname, location.search]);
};
