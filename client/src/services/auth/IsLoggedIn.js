import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    const checkAuth = useCallback(async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/users/me`,
          {
            withCredentials: true,
          }
        );
        // console.log(response);
        setUser(response.data.data.doc);
        setIsAuthenticated(true);
        // return response.data.data.doc;
      } catch (err) {
        console.error("Authentication check failed:", err);

        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });
    checkAuth();
  }, [pathName]);

  return { isAuthenticated, user, setUser, loading };
};
