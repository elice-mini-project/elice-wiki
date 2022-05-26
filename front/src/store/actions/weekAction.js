import { PATCH_WEEK, DISPATCH_WEEK } from "./actionTypes";

export const patchWeek = (week) => {
  return {
    type: PATCH_WEEK,
    week: week,
    weekMode: true,
  };
};

export const dispatchWeek = () => {
  return {
    type: DISPATCH_WEEK,
    week: null,
    weekMode: false,
  };
};
