import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../spinner.js";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      console.log("go")
      const res = await axios.get("/api/v1/auth/user-auth");
      console.log("nn")
      if (res.data.ok) {
        setOk(true);
        console.log("yes")
      } else {
        setOk(false);
        console.log("no")
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
}
