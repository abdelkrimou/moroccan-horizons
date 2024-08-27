import axios from "axios";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/users/me`,
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
        console.error("Authentication check failed:", err);

        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return { isAuthenticated, user, setUser, loading };
};
