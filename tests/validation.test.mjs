import test from 'node:test';
import assert from 'node:assert/strict';
import { taskInput } from '../lib/validation.mjs';
test('rejects invalid calendar dates and accepts leap day',()=>{assert.equal(taskInput.safeParse({title:'A',due:'2026-02-30'}).success,false);assert.equal(taskInput.safeParse({title:'A',due:'2028-02-29'}).success,true);});
test('ownership cannot be supplied by a client',()=>{assert.equal(taskInput.safeParse({title:'A',user_id:'another-user'}).success,false);assert.equal(taskInput.partial().safeParse({user_id:'another-user'}).success,false);});
test('partial completion update preserves unrelated fields',()=>{assert.deepEqual(taskInput.partial().parse({completed:true}),{completed:true});});
test('whitespace and oversized task input are rejected',()=>{assert.equal(taskInput.safeParse({title:'   '}).success,false);assert.equal(taskInput.safeParse({title:'a'.repeat(161)}).success,false);assert.equal(taskInput.safeParse({title:'A',priority:'urgent'}).success,false);});
