import { Link, Outlet } from 'react-router-dom';
import ContextProvider from './context';
import Message from './components/Message';

function App() {
  const linkStyle =
    'px-4 py-2 rounded bg-slate-300 transition hover:bg-slate-400';
  return (
    <ContextProvider>
      <div className="container mx-auto p-8">
        <h1 className="mb-4">Tour of heroes</h1>
        <nav className="flex gap-4 pb-4 mb-8 border-b-2 border-rose-500">
          <Link className={linkStyle} to={'/dashboard'}>
            Dashboard
          </Link>
          <Link className={linkStyle} to={'/heroes'}>
            Heroes
          </Link>
        </nav>
        <Outlet />
        <Message />
      </div>
    </ContextProvider>
  );
}

export default App;
