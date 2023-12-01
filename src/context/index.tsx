import { createContext, useReducer } from 'react';
import heroDB from '../heroDatabase.json';

type DispatchValue = {
  type: string;
  payload?: any;
};

export type ContextType = {
  state: State;
  dispatch: React.Dispatch<DispatchValue>;
};

export const Context = createContext<ContextType | any>(null);

export type Hero = {
  id: number;
  name: string;
};

type State = {
  heroes: Hero[];
  hero: Hero | null;
  search: Hero[];
  logs: string[];
};

const initialState: State = {
  heroes: heroDB,
  hero: null,
  search: [],
  logs: [],
};

function log(list: string[]): string[] {
  const formatting = (i: number, msg: string) =>
    (i < 9 ? '00' + (i + 1) : i < 99 ? '0' + (i + 1) : i + 1) +
    ' HeroService: [ ' +
    msg +
    ' ]';
  return list.map(
    (msg, i) => (msg = !msg.includes('HeroService') ? formatting(i, msg) : msg)
  );
}

function reducer(state: State, { type, payload }: DispatchValue): State {
  const nextState = { ...state };
  if (type === 'GET_HEROES') {
    nextState.logs = log([...state.logs, 'fetched heroes']);
    state = nextState;
    return state;
  }

  if (type === 'GET_HERO') {
    nextState.hero = nextState.heroes.find((hero) => hero.id === payload)!;
    nextState.logs = log([
      ...state.logs,
      `fetched hero id=${payload} name=${nextState.hero.name}`,
    ]);
    state = nextState;
    return state;
  }

  if (type === 'ADD_HERO') {
    nextState.heroes = [...nextState.heroes, payload];
    nextState.logs = log([
      ...state.logs,
      `added hero id=${payload.id} name=${payload.name}`,
    ]);
    state = nextState;
    return state;
  }

  if (type === 'UPDATE_HERO') {
    const idx = nextState.heroes.findIndex((hero) => hero.id === payload.id);
    nextState.heroes[idx].name = payload.name;
    nextState.hero = nextState.heroes[idx];
    nextState.logs = log([
      ...state.logs,
      `updated hero id=${payload.id} name=${payload.name}`,
    ]);
    state = nextState;
    return state;
  }
  switch (type) {
    case 'DELETE_HERO':
      nextState.heroes = nextState.heroes.filter(
        (hero) => hero.id !== payload.id
      );
      nextState.logs = log([
        ...state.logs,
        `deleted hero id=${payload.id} name=${payload.name}`,
      ]);
      state = nextState;
      return state;
    case 'SEARCH_HERO':
      nextState.search = nextState.heroes.filter((hero) =>
        hero.name.includes(payload)
      );

      if (!payload) {
        nextState.search = [];
      }

      if (payload) {
        nextState.logs = log([
          ...state.logs,
          nextState.search.length
            ? `found heroes matching "${payload}"`
            : `no heroes matching "${payload}"`,
        ]);
      }

      state = nextState;
      return state;
    case 'CLEAR_LOGS':
      nextState.logs = [];
      state = nextState;
      return state;
    default:
      return state;
  }
}

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

function ContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

export default ContextProvider;
