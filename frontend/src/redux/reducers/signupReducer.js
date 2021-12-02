import { GET_FIRST_PAGE_DATA } from "../types";

const initialState = {
  email: "",
  password: "",
  role: "",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FIRST_PAGE_DATA:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        role: action.payload.role,
      };

    default:
      return {
        ...state,
      };
  }
}
