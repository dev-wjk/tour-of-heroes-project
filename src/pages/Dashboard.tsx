import { useContext, useEffect } from 'react';
import { Context } from '../context';
import { Link } from 'react-router-dom';
import type { ContextType } from '../context';
import Search from '../components/Search';

export default function Dashboard() {
  const { state, dispatch } = useContext<ContextType>(Context);
  useEffect(() => {
    dispatch({ type: 'GET_HEROES' });
    return () => {
      dispatch({ type: 'SEARCH_HERO', payload: '' });
    };
  }, []);
  return (
    <>
      {state.heroes.length > 0 && (
        <>
          <h2 className="text-center mb-4">Top heroes</h2>
          <div className="flex flex-col gap-4">
            {state.heroes
              .filter((_, i) => i < 4)
              .map((hero, i) => (
                <Link
                  className="w-full p-4 bg-slate-300 text-center rounded transition hover:bg-slate-400"
                  to={'/detail/' + hero.id}
                  key={i}>
                  {hero.name}
                </Link>
              ))}
          </div>
        </>
      )}

      <Search />
    </>
  );
}
