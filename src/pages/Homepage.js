import React from "react";
import FeaturedPlaylist from "../components/FeaturedPlaylist";
import UserPlaylist from "../components/UserPlaylist";

const Homepage = () => {

  return (
    <div className={"row"}>
      <FeaturedPlaylist/>
      <UserPlaylist/>
    </div>
  );
};

export default Homepage;
