export const initialState = {
  userValue: {
    userName: '',
    phoneNumber: '',
    birthDay: '',
  },
  message: {
    userName: '',
    phoneNumber: '',
    birthDay: '',
  },
  correct: {
    userName: '',
    phoneNumber: '',
    birthDay: '',
  },
};

export const userInfoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_VALUE':
      return {
        ...state,
        userValue: {
          ...state.userValue,
          [action.key]: action.value,
        },
      };

    case 'SET_MESSAGE':
      return {
        ...state,
        message: {
          ...state.message,
          [action.key]: action.value,
        },
      };

    case 'SET_CORRECT':
      return {
        ...state,
        correct: {
          ...state.correct,
          [action.key]: action.value,
        },
      };

    default:
      return state;
  }
};
