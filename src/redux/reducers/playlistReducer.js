import  initialState  from "../../constants/initialState";
import { ActionTypes } from "../../constants/action-types";

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_FEATURED_PLAYLISTS_REQUEST:
      return {
        ...state,
        loading: true,
        user_playlist: state.user_playlist,
      };
      case ActionTypes.FETCH_SPOTIFY_TOKEN_SUCCESS:
        return {
          ...state,
          token: action.payload,
        };
    case ActionTypes.FETCH_FEATURED_PLAYLISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        featured_playlist: action.playlist,
        user_playlist: action.user_playlist,
        error:''
      };
    case ActionTypes.FETCH_FEATURED_PLAYLISTS_FAILURE:
      return {
        ...state,
        loading: false,
        featured_playlist:[],
        error: action.payload,
      };
      case ActionTypes.DROP_ITEM:
      return {
        ...state,
        featured_playlist:action.playlist,
        user_playlist: action.user_playlist,
      };
      case ActionTypes.MOVE_ITEM:
      return {
        ...state,
        featured_playlist:action.payload,
        user_playlist: action.user_playlist,

      };
    default:
      return state;
  }
};

export default playlistReducer;
