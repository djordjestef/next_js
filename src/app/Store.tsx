"use client";
import { createContext, useReducer } from "react";

export enum ActionType {
  CHANGE_THEME,
}

interface Theme {
  dark_theme: boolean;
}

interface ContextType {
  theme: Theme;
}

const initialState = {
  theme: {
    dark_theme:
      localStorage.getItem("dark_theme") === null
        ? false
        : JSON.parse(localStorage.getItem("dark_theme")),
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
    case ActionType.CHANGE_THEME:
      return {
        ...state,
        theme: {
          dark_theme: !state.theme.dark_theme,
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
