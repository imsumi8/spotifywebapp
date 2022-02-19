import DropWrapper from "./DropWrapper";
import Errorbox from "./Errorbox";
import React from "react";
import { useSelector } from "react-redux";
import Col from "./Col";
import Item from "./Item";
import TabHeading from "./TabHeading";
import { listHeaders } from "../data";

const UserPlaylist = () => {
  const playlists = useSelector((state) => state.data.user_playlist);

  return (
    <div key={"user"} className={"col-wrapper"}>
      <TabHeading heading={listHeaders[1].text} />
      <DropWrapper headId={listHeaders[1].id}>
        <Col>
          {playlists?.length > 0 ? (
            playlists.map((i, idx) => (
              <Item key={idx} item={i} index={idx} status={listHeaders[1]} />
            ))
          ) : (
            <Errorbox message="No Data Found" type="danger" />
          )}
        </Col>
      </DropWrapper>
    </div>
  );
};

export default UserPlaylist;
