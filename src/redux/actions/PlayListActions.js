import { ActionTypes } from "../../constants/action-types";
import spotifyService from "../../server/SpotifyService";
import { listHeaders } from "../../data";

export const fetchFeaturedPlayListRequest = () => {
  return {
    type: ActionTypes.FETCH_FEATURED_PLAYLISTS_REQUEST,
  };
};

export const fetchFeaturedPlayListSuccess = (feat_playlist, user_playlist) => {
  return {
    type: ActionTypes.FETCH_FEATURED_PLAYLISTS_SUCCESS,
    playlist: feat_playlist,
    user_playlist: user_playlist,
  };
};

export const fetchFeaturedPlayListFailure = (error) => {
  return {
    type: ActionTypes.FETCH_FEATURED_PLAYLISTS_FAILURE,
    payload: error,
  };
};

export const saveUserPlaylist = (playlist) => {
  return {
    type: ActionTypes.SAVE_USER_PLAYLIST,
    payload: playlist,
  };
};

export const fetchSpotifyTokenSuccess = (playlist) => {
  return {
    type: ActionTypes.FETCH_SPOTIFY_TOKEN_SUCCESS,
    payload: playlist,
  };
};

export const fetchSpotifyToken = () => {
  return function (dispatch) {
    dispatch(fetchFeaturedPlayListRequest());

    spotifyService
      .fetchToken()
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchSpotifyTokenSuccess(response.data));

          dispatch(fetchFeaturedPlayList(response.data.access_token));
        } else {
          dispatch(fetchFeaturedPlayListFailure(response.statusText));
        }
      })
      .catch((err) => {
        dispatch(fetchFeaturedPlayListFailure(err.message));
      });
  };
};

export const fetchFeaturedPlayList = (token) => {
  return function (dispatch, getState) {
    const prevUserPlaylist = getState().data.user_playlist;

    spotifyService
      .fetchFeaturedPlayList(token)
      .then((response) => {
        let feat_playlist = [];
        let user_playlist = prevUserPlaylist;

        if (response.status === 200) {
          response.data.playlists.items.forEach((i) => {
            if (prevUserPlaylist.length) {
              if (!prevUserPlaylist.find((user) => user.id === i.id)) {
                i.header_id = listHeaders[0].id;
                feat_playlist.push(i);
              }
            } else {
              i.header_id = listHeaders[0].id;

              feat_playlist.push(i);
            }
          });
          dispatch(fetchFeaturedPlayListSuccess(feat_playlist, user_playlist));
        } else {
          dispatch(fetchFeaturedPlayListFailure(response.statusText));
        }
      })
      .catch((err) => {
        dispatch(fetchFeaturedPlayListFailure(err.message));
      });
  };
};
