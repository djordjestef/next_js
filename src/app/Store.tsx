"use client";
import { createContext, useReducer } from "react";

export enum ActionType {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  CHANGE_THEME,
}

interface User {
  loading: boolean;
  data: [];
  error: string;
}

interface Theme {
  dark_theme: boolean;
}

interface ContextType {
  theme: Theme;
  users: User;
}

const initialState = {
  theme: {
    dark_theme: false,
  },
  users: {
    loading: true,
    data: [],
    error: "",
  },
};

export const MyContext = createContext<{
  state: ContextType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function reducer(state: any, action: any) {
  switch (action.type) {
    case ActionType.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: {
          loading: false,
          data: action.payload,
          error: "",
        },
      };
    case ActionType.FETCH_USERS_ERROR:
      return {
        ...state,
        users: {
          loading: false,
          data: [],
          error: "Something Went Wrong",
        },
      };
    case ActionType.CHANGE_THEME:
      return {
        ...state,
        theme: {
          dark: !state.theme.dark,
        },
      };
    default: {
      return state;
    }
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
