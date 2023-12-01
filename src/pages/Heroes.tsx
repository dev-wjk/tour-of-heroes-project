import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../context';
import type { Hero } from '../context';

export default function Heroes() {
  const { state, dispatch } = useContext(Context);
  const [heroName, setHeroName] = useState('');
  const [warnMsg, setWarnMsg] = useState('');

  useEffect(() => {
    dispatch({ type: 'GET_HEROES' });
  }, []);

  const addHero = () => {
    if (!heroName) {
      setWarnMsg('Invalid Hero name');
      return;
    }
    const idx = state.heroes.length - 1;
    const id = state.heroes.length ? state.heroes[idx].id + 1 : 11;
    const name = heroName;
    setHeroName('');

    if (state.heroes.find((h: { name: string }) => h.name === name)) {
      setWarnMsg('Invalid Hero name');
      return;
    }

    dispatch({ type: 'ADD_HERO', payload: { id, name } });
  };

  const deleteHero = (hero: Hero) => {
    dispatch({ type: 'DELETE_HERO', payload: hero });
  };

  return (
    <>
      <h2 className="mb-4">My Heroes</h2>
      <section className="mb-4">
        <label htmlFor="new-hero">
          Hero name:{' '}
          {warnMsg !== '' ? (
            <span className="font-semibold text-rose-500">{warnMsg}</span>
          ) : (
            <span className="font-semibold">{heroName}</span>
          )}
        </label>
        <div className="flex gap-2 max-w-full items-center">
          <input
            className="max-h-8 w-3/4"
            id="new-hero"
            value={heroName}
            placeholder="Enter hero name"
            onChange={(event) => {
              setHeroName(event.target.value);
              setWarnMsg('');
            }}
          />
          <button
            className="min-w-fit px-4 py-2 rounded transition bg-slate-300 hover:bg-slate-400"
            onClick={addHero}>
            Add hero
          </button>
        </div>
      </section>

      <ul className="flex flex-col gap-1">
        {state.heroes.map((hero: Hero, i: number) => (
          <li className="flex justify-between items-center gap-1" key={i}>
            <Link
              className="flex w-full border-b-2 border-transparent transition hover:border-rose-500"
              to={'/detail/' + hero.id}>
              <span className="min-w-[48px]">{hero.id}</span>
              <span className="flex-1 font-semibold">{hero.name}</span>
            </Link>
            <button
              className="flex justify-center items-center bg-slate-300 rounded w-6 h-6 text-center transition hover:bg-slate-400"
              title="delete hero"
              onClick={() => deleteHero(hero)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
