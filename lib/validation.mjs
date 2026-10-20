import { z } from 'zod';
export const taskInput = z.object({
 title:z.string().trim().min(1,'Give your task a title.').max(160),
 notes:z.string().max(3000).default(''),
 category:z.string().trim().min(1).max(40).default('Personal'),
 priority:z.enum(['low','medium','high']).default('medium'),
 due:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(s=>{const d=new Date(s+'T12:00:00Z');return !isNaN(d.getTime())&&d.toISOString().slice(0,10)===s;},'Invalid date').nullable().default(null),
 completed:z.boolean().default(false)
}).strict();
export const taskId = z.string().uuid();
