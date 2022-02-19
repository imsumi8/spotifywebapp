import React from "react";
import { DndProvider } from "react-dnd";
import FeaturedPlaylist from "../components/FeaturedPlaylist";
import UserPlaylist from "../components/UserPlaylist";
import { HTML5Backend as Backend } from "react-dnd-html5-backend";

const Homepage = () => {
  return (
    <div className={"row"}>
      <DndProvider backend={Backend}>
        <FeaturedPlaylist />
        <UserPlaylist />
      </DndProvider>
    </div>
  );
};

export default Homepage;
