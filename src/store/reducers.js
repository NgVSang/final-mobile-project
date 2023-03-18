import { INCREMENT, SAVE_HISTORY, DELETE_ALL_HISTORY, DELETE_HISTORY,LOGIN } from './actions';

export const initialState = {
  user:{},
  token:""
};

export function appReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload
      }
    case INCREMENT:
      return {
        ...state,
        // count: state.count + action.payload,
      };
    case SAVE_HISTORY:
      return {
        ...state,
        history: [...state.history, {
          id: state.recentId,
          input: action.payload.input,
          action: action.payload.action,
          result: action.payload.result,
        }],
        recentId: state.recentId + 1,
      };
    case DELETE_HISTORY:
      return {
        ...state,
        history: state.history.filter((h)=>h != action.payload)
      };
    case DELETE_ALL_HISTORY:
      return {
        ...state,
        history:[],
        recentId: 1,
      };
    default:
      return state;
  }
}
