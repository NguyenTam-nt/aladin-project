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
  }, [location.pathname, location.search]);
};
