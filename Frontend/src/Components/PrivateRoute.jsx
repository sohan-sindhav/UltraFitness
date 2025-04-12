import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = () => {
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/verify", {
          withCredentials: true,
        });
        setIsValid(res.data.valid);
      } catch (err) {
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;
  return isValid ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
