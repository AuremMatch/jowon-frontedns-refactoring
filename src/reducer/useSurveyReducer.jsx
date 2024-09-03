// reducer.js

export const initialState = {
  responses: {
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
  },
  questions: [],
  isLoading: true,
  error: null,
  isTeam: false,
  teamMembers: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_RESPONSES":
      return {
        ...state,
        responses: {
          ...state.responses,
          [action.payload.name]: action.payload.value,
        },
      };
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
        isLoading: false,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case "TOGGLE_TEAM_MODE":
      return {
        ...state,
        isTeam: action.payload,
      };
    case "ADD_TEAM_MEMBER":
      return {
        ...state,
        teamMembers: [...state.teamMembers, ""],
      };
    case "UPDATE_TEAM_MEMBER":
      const updatedMembers = [...state.teamMembers];
      updatedMembers[action.payload.index] = action.payload.value;
      return {
        ...state,
        teamMembers: updatedMembers,
      };
    case "REMOVE_TEAM_MEMBER":
      return {
        ...state,
        teamMembers: state.teamMembers.filter(
          (_, idx) => idx !== action.payload
        ),
      };
    default:
      return state;
  }
};
