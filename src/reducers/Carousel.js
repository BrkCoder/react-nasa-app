import {
  SET_CUREENT_SLIDE_INDEX,
  SET_NEXT_SLIDE_INDEX,
  SET_PREV_SLIDE_INDEX,
  FETCH_SLIDES,
  CLEAR_SLIDES,
  SET_AUTO_PLAY,
} from "../actions/Carousel";

export const initialState = {
  currentIndex: 0,
  slides: [],
  autoPlay: false, // false | truu
};

function reducer(state, action) {
  switch (action.type) {
    case SET_CUREENT_SLIDE_INDEX: {
      return {
        ...state,
        currentIndex: action.payload.index,
      };
    }
    case SET_NEXT_SLIDE_INDEX: {
      const length = state.slides.length;
      const current = state.currentIndex;
      const currentIndex = current === length - 1 ? 0 : current + 1;
      return {
        ...state,
        currentIndex,
      };
    }
    case SET_PREV_SLIDE_INDEX: {
      const length = state.slides.length;
      const current = state.currentIndex;
      const currentIndex = current === 0 ? length - 1 : current - 1;
      return {
        ...state,
        currentIndex,
      };
    }
    case SET_AUTO_PLAY: {
      return {
        ...state,
        autoPlay: action.payload.autoPlay,
      };
    }
    case FETCH_SLIDES: {
      return {
        ...state,
        slides: action.payload.slides,
      };
    }
    case CLEAR_SLIDES: {
      return {
        ...state,
        slides: [],
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
