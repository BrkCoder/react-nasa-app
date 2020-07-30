export const CarouselReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_LOADER':
      return {...state, loading: true};
    case 'HIDE_LOADER':
      return {...state, loading: false};
    case 'CLEAR_SLIDES':
      return {...state, slides: [], loading: false};
    case 'FETCH_SLIDES':
      return {...state, slides: action.payload, loading: false};
    case 'SET_CURRENT_INDEX':
      return {...state, currentIndex: action.payload};
    case 'SET_AUTO_SWITCH':
      return {...state, autoSwitch: action.payload};

    default:
      return state;
  }
};
