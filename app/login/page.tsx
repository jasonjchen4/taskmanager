'use client';
import { useState, type FormEvent } from 'react';
import { getBrowserClient } from '../../lib/supabase';
import { Check, ArrowRight } from 'lucide-react';
export default function Login() {
 const [mode,setMode]=useState<'signin'|'signup'>('signin'),[email,setEmail]=useState(''),[password,setPassword]=useState('');
 const [busy,setBusy]=useState(false),[error,setError]=useState(''),[message,setMessage]=useState('');
 async function submit(e:FormEvent) {
  e.preventDefault();setBusy(true);setError('');setMessage('');
  try {
   const auth=getBrowserClient().auth;
   if(mode==='signup') {
    const {data,error}=await auth.signUp({email,password,options:{emailRedirectTo:window.location.origin+'/'}});
    if(error)throw error;
    if(data.session){window.location.assign('/');return;}
    setMessage('Check your email for a confirmation link. After confirming, return here and sign in.');
   } else {
    const {error}=await auth.signInWithPassword({email,password});if(error)throw error;
    window.location.assign('/');
   }
  } catch(e) {setError(e instanceof Error?e.message:'Unable to sign in. Please try again.');}
  finally {setBusy(false);}
 }
 return <main className="auth-shell"><div className="auth-card"><a href="/" className="brand"><span className="brand-icon"><Check size={21}/></span>taskmanager<span className="brand-dot">.</span></a><span className="eyebrow">A LITTLE MORE HEADSPACE</span><h1>{mode==='signin'?'Welcome back.':'Make room for more.'}</h1><p>{mode==='signin'?'Sign in to your private task list.':'Create an account for your classes, projects, and everyday tasks.'}</p><div className="auth-tabs"><button className={mode==='signin'?'active':''} disabled={busy} onClick={()=>{setMode('signin');setError('');setMessage('');}}>Sign in</button><button className={mode==='signup'?'active':''} disabled={busy} onClick={()=>{setMode('signup');setError('');setMessage('');}}>Create account</button></div><form onSubmit={submit}><label>Email<input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Password<input required type="password" minLength={mode==='signup'?8:1} autoComplete={mode==='signup'?'new-password':'current-password'} value={password} onChange={e=>setPassword(e.target.value)}/></label>{mode==='signup'&&<small>Use at least 8 characters.</small>}{error&&<div className="error" role="alert">{error}</div>}{message&&<div className="auth-message" role="status">{message}</div>}<button className="primary" disabled={busy}>{busy?'Please wait…':mode==='signin'?'Sign in':'Create account'}<ArrowRight size={16}/></button></form><a className="back-home" href="/">Back to Taskmanager</a></div></main>;
}
