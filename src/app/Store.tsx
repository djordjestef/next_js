"use client";
import { createContext, useReducer } from "react";

export const MyContext = createContext({});

const initialState: any = {
  posts: [],
  users: [],
};

export function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        posts: action.payload,
      };
  }
}

export const Store = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};
