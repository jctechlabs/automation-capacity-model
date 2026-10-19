import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateScenario} from './model.mjs';
const base={volume:500,minutes:8,eligible:60,automatedMinutes:1,reviewShare:20,reviewMinutes:3,overheadHours:2,hourlyCost:25,setupCost:3000,monthlyCost:150};
test('handling, review and maintenance reconcile to released hours',()=>{
  const r=calculateScenario(base);
  assert(Math.abs(r.releasedHours-30)<1e-9);
  assert(Math.abs(r.netMonthlyValue-600)<1e-9);
  assert(Math.abs(r.paybackMonths-5)<1e-9);
  assert.equal(r.afterHours,r.remainingManualHours+r.automatedHandlingHours+r.humanReviewHours+2);
});
test('zero and negative benefit stay visible',()=>{
  const unchanged=calculateScenario({...base,eligible:0,overheadHours:0,monthlyCost:0});
  assert.equal(unchanged.releasedHours,0);assert.equal(unchanged.paybackMonths,null);
  const loss=calculateScenario({...base,automatedMinutes:100});
  assert(loss.releasedHours<0);assert.equal(loss.paybackMonths,null);
});
test('invalid numbers cannot enter a calculation',()=>{
  for(const invalid of [NaN,Infinity,-1,'500',undefined])assert.throws(()=>calculateScenario({...base,volume:invalid}),RangeError);
  assert.throws(()=>calculateScenario({...base,eligible:101}),RangeError);
});
