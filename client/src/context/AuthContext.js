import { createContext, useState, useContext, useEffect } from 'react';
import { registerRequest, loginRequest,verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("El useAuth debe estar dentro de un AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) =>{
      
    try {
        const res = await registerRequest(user);
        console.log(res?.data);
        setUser(res?.data);
        setIsAuthenticated(true);
    } catch (error) {
        if(Array.isArray(error.response?.data)){
          return setErrors(error.response?.data);
        }
        setErrors([error.response?.data.message])
    }
    };

    const signin = async (user) =>{
      try {
          const res = await loginRequest(user);
          console.log(res?.data);
          setIsAuthenticated(true);
          setUser(res?.data)
      } catch (error) {
        // console.log(error.response)
          setErrors(error.response?.data);
      }
      };
      
      useEffect(() => {
        if (errors?.length > 0) {
          const timer = setTimeout(() => {
            setErrors([]); // Limpia los errores después de 5 segundos
          }, 5000);
          
          return () => clearTimeout(timer); // Limpia el temporizador cuando el componente se desmonte o los errores cambien
        }
      }, [errors]);
      
      useEffect(() => {
        async function checkLogin  (){
          const cookies = Cookies.get()
  
          if(!cookies?.token){
            setIsAuthenticated(false);
            setLoading(false);          
            return setUser(null);
          }
  
        if(cookies?.token){
          try {
            const res = await verifyTokenRequest(cookies?.token)
            if (!res.data){
              setIsAuthenticated(false)
              setLoading(false);     
              return;      
            } 
  
            setIsAuthenticated(true)
            setUser(res.data)
            setLoading(false);      
     
          } catch (error) {
              setIsAuthenticated(false)
              setUser(null)
              setLoading(false);      
        
          }
        }
        }
        checkLogin();
      }, [])
  return (
    <AuthContext.Provider value={{ 
        signup,
        signin,
        loading,
        user,
        isAuthenticated,
        errors,
     }}
    >
      {children}
    </AuthContext.Provider>
  );
};