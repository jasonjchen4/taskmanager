'use client';
import { useEffect, useState } from 'react';
import Planner from './planner';
import { getBrowserClient } from '../lib/supabase';
export default function Home() {
  const [userId,setUserId] = useState(''), [ready,setReady] = useState(false), [error,setError] = useState('');
  useEffect(() => {
    try {
      const client = getBrowserClient();
      const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
        setUserId(session?.user.id || ''); setReady(true);
      });
      client.auth.getSession().then(({data,error}) => {
        if(error) setError(error.message);
        setUserId(data.session?.user.id || ''); setReady(true);
      }).catch(e => {setError(e.message);setReady(true);});
      return () => subscription.unsubscribe();
    } catch(e) {setError(e instanceof Error?e.message:'Unable to initialize sign-in.');setReady(true);}
  },[]);
  if (!ready) return <div className="auth-shell"><p>Opening your workspace…</p></div>;
  return <>{error&&<div role="alert" className="error">{error}</div>}<Planner key={userId||'guest'} signedIn={!!userId}/></>;
}
