import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import axios from "axios";


const ProtectedRoutes = ({ children }) => {
  const [token, setToken] = useRecoilState(authState);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidToken, setIsValidToken] =useRecoilState(tokenValidationState);
  
  const navigate = useNavigate(); 

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const apiUrl = import.meta.env.VITE_API_URL; 
          const response = await axios.post(
            `${apiUrl}/api/checking`, 
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            setIsValidToken(true);
         
          } else {
            setToken(null);
            localStorage.removeItem("token");
            navigate("/login"); 
          }
        } catch (error) {
          console.error("Token validation failed", error);
          setToken(null);
          localStorage.removeItem("token");
          navigate("/login"); 
        }
      } else {
        navigate("/login"); 
      }
      setIsLoading(false);
    };

    validateToken();
  }, [token, setToken, navigate]);

  if (isLoading) {
    return <Spinner/>; 
  }

  if (!isValidToken) {
    return null; 
  }

  return children; 
};

export default ProtectedRoutes;