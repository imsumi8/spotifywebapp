import { ActionTypes } from "../../constants/action-types";
import { listHeaders } from "../../data";

///call when item is drop any drppable location
export const UpdatePlaylist = (item, head_id, playlists) => {
  return function (dispatch) {
    const mapping = listHeaders.find((si) => si.id === head_id); 
    let feat_playlist = [];
    let user_playlist = [];
    if (mapping.id === listHeaders[0].id) {
      feat_playlist = playlists.user_playlist
        .filter((i) => i?.id !== item?.id)
        .concat({ ...item, head_id, header_id: mapping.id })
        .find((i) => i.header_id === listHeaders[0].id);

      user_playlist = playlists.user_playlist.filter((i) => i?.id !== item?.id);
      if (!playlists.featured_playlist.find((i) => i.id === feat_playlist.id)) {
        feat_playlist = [...playlists.featured_playlist, feat_playlist];
      } else {
        feat_playlist = [...playlists.featured_playlist];
      }
    } else {
      user_playlist = playlists.featured_playlist
        .filter((i) => i?.id !== item?.id)
        .concat({ ...item, head_id, header_id: mapping.id })
        .find((i) => i.header_id === listHeaders[1].id);

      if (!playlists.user_playlist.find((i) => i.id === user_playlist.id)) {
        user_playlist = [...playlists.user_playlist, user_playlist];
      } else {
        user_playlist = [...playlists.user_playlist];
      }

      feat_playlist = playlists.featured_playlist.filter(
        (i) => i?.id !== item?.id
      );
    }
    dispatch({
      type: ActionTypes.DROP_ITEM,
      playlist: feat_playlist,
      user_playlist: user_playlist,
    });
  };
};

///call when item is move any movable location
export const MoveItem = (dragIndex, hoverIndex, playlists, head_id) => {
  return function (dispatch) {
    let feat_playlist = [];
    let user_playlist = [];
    if (head_id === listHeaders[0].id) {
      const item = playlists.featured_playlist[dragIndex];
      feat_playlist = playlists.featured_playlist.filter(
        (i, idx) => idx !== dragIndex
      );
      feat_playlist = [...feat_playlist, item];
      user_playlist = playlists.user_playlist;
    } else {
      const item = playlists.user_playlist[dragIndex];

      user_playlist = playlists.user_playlist.filter(
        (i, idx) => idx !== dragIndex
      );
      user_playlist = [...user_playlist, item];
      feat_playlist = playlists.featured_playlist;
    }
    dispatch({
      type: ActionTypes.MOVE_ITEM,
      payload: feat_playlist,
      user_playlist: user_playlist,
    });
  };
};
