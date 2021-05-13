export const intialState = {
  accountDropDown: false,
  maxWidthCross: false,
  activeTab: "home",
  user: null,
  playlists: null,
  currentTrack: null,
  recents: null,
  topArtist: null,
  topTracks: null,
  user_playlists: null,
  user__folowings: null,
  profie_edit_dropdown: false,
  toast: false,
  modal: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ACCOUNT_DROPDOWN":
      return {
        ...state,
        accountDropDown: action.accountDropdown,
      };

    case "SET_EDIT_PROFILE":
      return {
        ...state,
        profie_edit_dropdown: action.profie_edit_dropdown,
      };

    case "SET_TOAST":
      return {
        ...state,
        toast: action.toast,
      };

    case "SET_MODAL":
      return {
        ...state,
        modal: action.modal,
      };

    case "SET_FOLLOWINGS":
      return {
        ...state,
        user__folowings: action.user__folowings,
      };

    case "SET_RECENTS":
      return {
        ...state,
        recents: action.recents,
      };

    case "SET_USER_PLAYLIST":
      return {
        ...state,
        user_playlists: action.user_playlists,
      };

    case "SET_TOP_ARTIST":
      return {
        ...state,
        topArtist: action.topArtist,
      };

    case "SET_TOP_TRACKS":
      return {
        ...state,
        topTracks: action.topTracks,
      };

    case "SET_CURRENT_TRACK":
      return {
        ...state,
        currentTrack: action.currentTrack,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };

    case "SET_MAX_WIDTH":
      return {
        ...state,
        maxWidthCross: action.width,
      };

    case "SET_ACTIVE_TAB":
      return {
        ...state,
        activeTab: action.activeTab,
      };

    default:
      return state;
  }
};

export default reducer;
