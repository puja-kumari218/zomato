import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//redux
import { useDispatch } from "react-redux";
import { googleAuth } from "../redux/reducers/auth/auth.action";
import { getMySelf } from "../redux/reducers/user/user.action";

const GoogleAuth = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  

  useEffect(() => {
    if (token) {
      dispatch(googleAuth(token)).then(
        () => (window.location.href = "/delivery")
      );
    }
  }, [token]);

  return <>Loading, Please Wait...</>;
};

export default GoogleAuth;