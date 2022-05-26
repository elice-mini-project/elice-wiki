import { PATCH_WEEK, DISPATCH_WEEK } from "../actions/actionTypes";

export const weekReducer = (state = {}, action) => {
  switch (action.type) {
    case PATCH_WEEK:
      console.log("%c주차별 포스트 패치 완료", "color: #d93d1a;");
      return {
        ...state,
        week: action.week,
        weekMode: action.weekMode,
      };
    case DISPATCH_WEEK:
      console.log("%c주차별 포스트 패치 해제", "color: #d93d1a;");
      return {
        ...state,
        week: action.week,
        weekMode: action.weekMode,
      };
    default:
      return state;
  }
};
