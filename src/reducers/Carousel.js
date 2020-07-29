import {
  SET_CUREENT_SLIDE_INDEX,
  SET_NEXT_SLIDE_INDEX,
  SET_PREV_SLIDE_INDEX,
  TOGGLE_AUTO_SLIDES,
  SET_SLIDES,
  CLEAR_SLIDES,
} from "../actions/Carousel";

export const initialState = {
  slides: [],
  index: 0,
  autoSlides: false,
  autoSlidesIntervalCallback: null,
  autoSlidesIntervalDelay: 5000,
};

function reducer(state, action) {
  console.log("reducer run", state);
  switch (action.type) {
    case SET_CUREENT_SLIDE_INDEX: {
      return {
        ...state,
        index: action.payload.index,
      };
    }
    case SET_NEXT_SLIDE_INDEX: {
      const length = action.payload.length - 1;
      console.log(length, state);
      let index = state.index;
      if (state.index === length) {
        index = -1;
      }
      return {
        ...state,
        index: index + 1,
      };
    }
    case SET_PREV_SLIDE_INDEX: {
      const length = action.payload.length;
      let index = state.index;
      if (index < 1) {
        index = length;
      }
      return {
        ...state,
        index: index - 1,
      };
    }
    case TOGGLE_AUTO_SLIDES: {
      return {
        ...state,
        autoSlides: !state.autoSlides,
        autoSlidesIntervalCallback: action.payload.callback,
        autoSlidesIntervalDelay: action.payload.delay,
      };
    }
    case SET_SLIDES: {
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
