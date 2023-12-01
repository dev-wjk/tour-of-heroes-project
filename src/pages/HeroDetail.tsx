import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../context';
import type { Hero } from '../context';

export default function HeroDetail() {
  const id = parseInt(useParams().id!);
  const { state, dispatch } = useContext(Context);
  const [name, setName] = useState(
    state.heroes.find((hero: Hero) => hero.id === id).name
  );

  useEffect(() => {
    dispatch({ type: 'GET_HERO', payload: id });
  }, []);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const save = () => {
    dispatch({ type: 'UPDATE_HERO', payload: { id, name } });
  };

  const gridStyle = 'grid grid-cols-2 gap-x-4 min-h-[32px] items-center';
  const buttonStyle = 'py-2 rounded bg-slate-300 transition hover:bg-slate-400';

  return (
    <>
      {state.hero && (
        <>
          <h2 className="mb-4">{name.toUpperCase()} Details</h2>
          <ul className="flex flex-col gap-1 mb-8">
            <li className={gridStyle}>
              <span className="border-b-2 border-rose-500">id</span>
              <span>{id}</span>
            </li>
            <li className={gridStyle}>
              <label className="border-b-2 border-rose-500" htmlFor="hero-name">
                Hero name
              </label>
              <input
                className="px-1"
                id="hero-name"
                placeholder="Hero name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </li>
          </ul>
          <section className={gridStyle}>
            <button className={buttonStyle} onClick={goBack}>
              go back
            </button>
            <button className={buttonStyle} onClick={save}>
              save
            </button>
          </section>
        </>
      )}
    </>
  );
}
