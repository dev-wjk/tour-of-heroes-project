import { useContext, useEffect, useState } from 'react';
import { Context } from '../context';

export default function Message() {
  const { state, dispatch } = useContext(Context);
  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => {
    setLogs(() => [...state.logs].reverse());
  }, [state.logs.length]);
  return (
    <>
      {state.logs.length > 0 && (
        <div className="mt-32">
          <div className="flex gap-4 justify-between items-center mb-4 pb-1 border-b-2 border-rose-500">
            <h2>Messages</h2>
            <button
              className="px-4 py-2 bg-slate-300 rounded transition hover:bg-slate-400"
              onClick={() => dispatch({ type: 'CLEAR_LOGS' })}>
              Clear messages
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {logs.map((log: string, i: number) => (
              <p className="leading-tight break-all" key={i}>
                {log}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
