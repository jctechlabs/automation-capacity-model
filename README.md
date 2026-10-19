# Automation capacity model — JC TechLabs

Task-level workload arithmetic for a workflow with residual handling, human review and maintenance. This module follows the method in the [Workflow Automation Capacity & Staffing Planner](https://jctechlabs.com/tools/automation-planner/).

```sh
node --test model.test.mjs
```

```js
import { calculateScenario } from './model.mjs';
const result = calculateScenario({
  volume: 500, minutes: 8, eligible: 60, automatedMinutes: 1,
  reviewShare: 20, reviewMinutes: 3, overheadHours: 2,
  hourlyCost: 25, setupCost: 3000, monthlyCost: 150
});
console.log(result.releasedHours); // 30 hours per month
```

Current hours equal task volume multiplied by current minutes, divided by 60. After-hours include tasks remaining manual, residual handling for automated tasks, extra review and maintenance. Released hours equal current hours minus after-hours. Negative results remain visible.

The sample produces about 66.7 current hours, 36.7 after-hours and 30 released hours. With an hourly cost of 25 and monthly running cost of 150, the equivalent monthly capacity value after running costs is 600. These figures illustrate arithmetic, rather than measured savings or client outcomes.

Capacity value is not automatically a cash saving. Use the separate [AI Automation ROI & Payback Calculator](https://jctechlabs.com/tools/ai-automation-roi-calculator/) to model actual cash realization. See [working examples](https://jctechlabs.com/work/), [all planning tools](https://jctechlabs.com/tools/) and the [AI automation guide](https://jctechlabs.com/insights/ai-automation-guide/) from [JC TechLabs](https://jctechlabs.com/).
