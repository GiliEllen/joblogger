import React, { useEffect } from "react";
import AddJob from "../../components/AddJob";
import JobContainer from "../../components/JobContainer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserByCookie } from "../../features/user/userAPI";
import { userSelector } from "../../features/user/userSlice";

const Home = () => {

    const dispatch = useAppDispatch()
    const user = useAppSelector(userSelector)

    useEffect(() => {
        dispatch(getUserByCookie())
    },[])

  return (
    <>
    {user?.firstName}
      <div>
        <h1>home</h1>
        to implament: add job archive job edit job
        <AddJob />
      </div>
      <div>
        <JobContainer/>
      </div>
    </>
  );
};

export default Home;
