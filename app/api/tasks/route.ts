import { createClient } from '@supabase/supabase-js';
import { taskInput, taskId } from '../../../lib/validation.mjs';
export const dynamic='force-dynamic';
const reply=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
const columns='id,title,notes,category,priority,due,completed,createdAt:created_at';
async function handle(req:Request,method:string) {
 try {
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if(!url||!key)return reply({error:'Database configuration is missing. Add the Supabase environment variables and redeploy.'},503);
  const authorization=req.headers.get('authorization');
  if(!authorization?.startsWith('Bearer '))return reply({error:'Sign in to access your tasks.'},401);
  const token=authorization.slice(7);
  const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{headers:{Authorization:authorization}}});
  const {data:{user},error:authError}=await db.auth.getUser(token);
  if(authError||!user)return reply({error:'Your session expired. Please sign in again.'},401);
  if(method==='GET') {
   const {data,error}=await db.from('tasks').select(columns).eq('user_id',user.id).order('created_at',{ascending:false});
   if(error)throw error;return reply(data);
  }
  const raw=await req.text();if(raw.length>16000)return reply({error:'Task is too large.'},413);
  let body;try{body=JSON.parse(raw);}catch{return reply({error:'Invalid JSON.'},400);}
  if(!body||typeof body!=='object'||Array.isArray(body))return reply({error:'Expected a task object.'},400);
  if(method==='POST'){
   const parsed=taskInput.safeParse(body);if(!parsed.success)return reply({error:parsed.error.issues[0].message},400);
   const {data,error}=await db.from('tasks').insert({...parsed.data,user_id:user.id}).select(columns).single();
   if(error)throw error;return reply(data,201);
  }
  const id=taskId.safeParse(body.id);if(!id.success)return reply({error:'Invalid task ID.'},400);
  if(method==='DELETE'){
   const {data,error}=await db.from('tasks').delete().eq('id',id.data).eq('user_id',user.id).select('id');
   if(error)throw error;return data.length?reply({ok:true}):reply({error:'Task not found.'},404);
  }
  const {id:ignored,...updates}=body;
  const parsed=taskInput.partial().safeParse(updates);if(!parsed.success)return reply({error:parsed.error.issues[0].message},400);
  if(!Object.keys(parsed.data).length)return reply({error:'No changes provided.'},400);
  const {data,error}=await db.from('tasks').update(parsed.data).eq('id',id.data).eq('user_id',user.id).select(columns).maybeSingle();
  if(error)throw error;return data?reply(data):reply({error:'Task not found.'},404);
 }catch(e){
  console.error('Task request failed',e);
  const code=typeof e==='object'&&e!==null&&'code'in e?e.code:null;
  return reply({error:code==='PGRST205'||code==='42P01'?'The tasks table is not set up yet. Run supabase/schema.sql in the Supabase SQL Editor.':'Could not access your tasks. Please try again.'},500);
 }
}
export const GET=(r:Request)=>handle(r,'GET');
export const POST=(r:Request)=>handle(r,'POST');
export const PATCH=(r:Request)=>handle(r,'PATCH');
export const DELETE=(r:Request)=>handle(r,'DELETE');
