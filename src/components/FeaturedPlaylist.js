import DropWrapper from "./DropWrapper";
import Errorbox from "./Errorbox";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Col from "./Col";
import Item from "./Item";
import TabHeading from "./TabHeading";
import { listHeaders } from "../data";
import { fetchSpotifyToken } from "../redux/actions";
import { Messages } from "../constants/messages";

const FeaturedPlaylist = ({ playlist, fetchSpotifyToken }) => {
  useEffect(() => {
  
    fetchSpotifyToken();
  }, []);

  return (
    <div key={"featured"} className={"col-wrapper"}>
      <TabHeading heading={listHeaders[0].text} />
      <DropWrapper headId={listHeaders[0].id}>
        <Col>
          {playlist.loading ? (
            <Errorbox message={Messages.LOADING} type="danger" />
          ) :playlist.error ? (
            <Errorbox message={playlist.error} type="danger" />
          ): playlist?.featured_playlist ? (
              playlist?.featured_playlist
              .map((i, idx) => (
                <Item key={idx} item={i} index={idx} status={listHeaders[0]} />
              ))
          ) : (
            <Errorbox message={Messages.NO_DATA_FOUND} type="danger" />
          )}
        </Col>
      </DropWrapper>
    </div>
  );
};

/// map current state to variable
const mapStateToProps = (state) => {
  return {
    playlist: state.data,
  };
};

// dispatch action creator from here
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpotifyToken: () => dispatch(fetchSpotifyToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedPlaylist);
