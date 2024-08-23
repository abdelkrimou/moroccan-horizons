import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// export const getCurrentUser = async () => {
//   const response = await axios.get("http://127.0.0.1:8000/api/v1/users/me", {
//     withCredentials: true,
//     Credential: "include",
//   });
//   console.log(response);
//   return response.data.data.doc;
// };

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const pathName = location.pathname;
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/users/me",
          {
            withCredentials: true,
            Credential: "include",
          }
        );
        // console.log(response);
        setUser(response.data.data.doc);
        setIsAuthenticated(true);
        // return response.data.data.doc;
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [pathName]);

  return { isAuthenticated, user, setUser, loading };
};
