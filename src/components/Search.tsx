import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../context';
import type { Hero } from '../context';

export default function Search() {
  const { state, dispatch } = useContext(Context);

  return (
    <div className="mt-8">
      <label htmlFor="search-box">Hero Search</label>
      <input
        className="w-full"
        id="search-box"
        placeholder="Enter hero name"
        onChange={(event) =>
          dispatch({ type: 'SEARCH_HERO', payload: event.target.value })
        }
      />

      {state.search.length > 0 ? (
        <ul className="flex flex-col gap-1 mt-1">
          {state.search.map((hero: Hero, i: number) => (
            <li className="flex justify-between items-center gap-1" key={i}>
              <Link
                className="w-full border-b-2 border-transparent transition hover:border-rose-500"
                to={'/detail/' + hero.id}>
                <span className="flex-1 font-semibold">{hero.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center font-semibold mt-4">not found</div>
      )}
    </div>
  );
}
