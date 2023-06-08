import React from "react";
import AddJob from "../../components/AddJob";
import JobContainer from "../../components/JobContainer";

const Home = () => {
  return (
    <>
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
