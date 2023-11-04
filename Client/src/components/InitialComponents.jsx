import React, { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import useAxios from "../hooks/auth/useAxios";

const InitialComponents = ({ children }) => {
  // Hooks
  const { userVerify, getAllSettings, getAllUser, getAllSessions } = useAxios();
  const { myData, alluser, sessions } = useSelector((state) => state);
  const [internetStatus, setInterNetStatus] = useState(false);
  // const isOnline = useMemo();

  useEffect(() => {
    userVerify();
  }, []);

  useEffect(() => {
    if (myData.isLogin) {
      getAllSettings();
      if (myData.data?.role === "admin") {
        if (alluser.data?.length <= 1) {
          getAllUser();
        }
      }
      // Getting All Sessions
      if (sessions.data?.length === 0) {
        getAllSessions();
      }
    }
  }, [myData]);

  // Internet online Status Changing
  /**
   * 
   useEffect(() => {
     const internetErrMessagenger = () => {
       if (navigator.onLine) {
         setInterNetStatus(true);
         // toast.success("You are online!😊");
        } else {
          setInterNetStatus(false);
          // toast.dark("You are Offline!😊");
        }
      };
      let interval = setInterval(internetErrMessagenger, 6000); // call the function name only not with function with call `()`
      return () => {
        clearInterval(interval); // for component unmount stop the interval
      };
    }, []);
    */

  return (
    <>
      {children}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={8}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default InitialComponents;
