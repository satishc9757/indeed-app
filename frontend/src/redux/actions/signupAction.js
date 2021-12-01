import { GET_FIRST_PAGE_DATA } from "../types";

const getFirstPageData = (payload) => {
  return {
    type: GET_FIRST_PAGE_DATA,
    payload,
  };
};

export default getFirstPageData;
