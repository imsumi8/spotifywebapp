import Col from "../components/Col";
import { listHeaders } from "../data";
import React, { useEffect } from "react";
import spotifyService from "../server/SpotifyService";
import DropWrapper from "../components/DropWrapper";
import Item from "../components/Item";
import { useSelector, useDispatch } from "react-redux";
import { getItem, dropItem } from "../actions/index";
import Errorbox from "../components/Errorbox";

const Homepage = () => {
  const playlists = useSelector((state) => state.featuredList);
  const dispatch = useDispatch();

  useEffect(() => {
    getSpotifyToken();
  });

  //get spotify token
  function getSpotifyToken() {
    spotifyService
      .fetchToken()
      .then((response) => {
        if (response.status === 200) {
          if (response.data.access_token) {
            getFeaturedPlaylist(response.data.access_token);
          }
        } 
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //get featured list data from spotify service
  function getFeaturedPlaylist(token) {
    spotifyService
      .fetchFeaturedPlayList(token)
      .then((response) => {
        if (response.status === 200) {
          if (!playlists.data.length) {
            response.data.playlists.items.forEach((i) => {
              i.header_id = listHeaders[0].id;
            });
            dispatch(getItem(response.data.playlists.items));
          }
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  //call when drop item to another place
  const onDrop = (item, monitor, status) => {
    const mapping = listHeaders.find((si) => si.id === status);

    const newItems = playlists.data
      .filter((i) => i?.id !== item?.id)
      .concat({ ...item, status, header_id: mapping.id });
    dispatch(dropItem(newItems));
  };

  //call when item move from list
  const moveItem = (dragIndex, hoverIndex) => {
    const item = playlists[dragIndex];
    const newItems = playlists.data.filter((i, idx) => idx !== dragIndex);
    newItems.splice(hoverIndex, 1, item);
    dispatch(dropItem(newItems));
  };

  return (
    <div className={"row"}>
      {listHeaders.map((s) => {
        return (
          <div key={s.id} className={"col-wrapper"}>
            <h2 className={"col-header"}>{s.text.toUpperCase()}</h2>
            <DropWrapper onDrop={onDrop} status={s.id}>
              <Col>
                {playlists?.data?.filter((i) => i?.header_id === s.id).length >
                0 ? (
                  playlists?.data
                    ?.filter((i) => i?.header_id === s.id)
                    .map((i, idx) => (
                      <Item
                        key={idx}
                        item={i}
                        index={idx}
                        moveItem={moveItem}
                        status={s}
                      />
                    ))
                ) : (
                  <Errorbox message="No Data Found" type="danger" />
                )}
              </Col>
            </DropWrapper>
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;
