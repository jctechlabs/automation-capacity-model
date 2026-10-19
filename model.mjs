export function calculateScenario(input){
  const limits={volume:[0,1e7],minutes:[0,1e4],eligible:[0,100],automatedMinutes:[0,1e4],reviewShare:[0,100],reviewMinutes:[0,1e4],overheadHours:[0,1e5],hourlyCost:[0,1e6],setupCost:[0,1e9],monthlyCost:[0,1e9]};
  for(const [key,[min,max]] of Object.entries(limits)){
    if(typeof input[key]!=='number'||!Number.isFinite(input[key])||input[key]<min||input[key]>max)throw new RangeError('Check '+key+'.');
  }
  const eligibleTasks=input.volume*input.eligible/100;
  const baselineHours=input.volume*input.minutes/60;
  const remainingManualHours=(input.volume-eligibleTasks)*input.minutes/60;
  const automatedHandlingHours=eligibleTasks*input.automatedMinutes/60;
  const humanReviewHours=eligibleTasks*input.reviewShare/100*input.reviewMinutes/60;
  const afterHours=remainingManualHours+automatedHandlingHours+humanReviewHours+input.overheadHours;
  const releasedHours=baselineHours-afterHours;
  const capacityValue=releasedHours*input.hourlyCost;
  const netMonthlyValue=capacityValue-input.monthlyCost;
  return {eligibleTasks,baselineHours,remainingManualHours,automatedHandlingHours,humanReviewHours,afterHours,releasedHours,capacityValue,netMonthlyValue,paybackMonths:netMonthlyValue>0?input.setupCost/netMonthlyValue:null};
}
