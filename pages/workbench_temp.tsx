import React, { useState } from 'react';
import WorkbenchLayout from '../components/workbench/WorkbenchLayout';
import BlueprintEditor from '../components/workbench/BlueprintEditor';
import AgentOutput from '../components/workbench/AgentOutput';

const INITIAL_BLUEPRINT = `---
role: Sales Copywriter
objective: Recover abandoned carts with high-converting SMS.
---

# Instructions
You are an expert at "Nudge Marketing".
For each customer in the list:

1. Analyze the product price.
   - If > $100: Use the "Investment" angle.
   - If < $100: Use the "Quick Win" angle.

2. Write a short SMS (<160 chars).
   - Must include the [Customer_Name].
   - Must end with "Link: [Cart_URL]".
`;

export default function WorkbenchPage() {
  const [blueprint, setBlueprint] = useState(INITIAL_BLUEPRINT);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<Array<{type: string, message: string}>>([]);
  const [result, setResult] = useState<string | null>(null);

  const runSimulation = () => {
    setIsRunning(true);
    setLogs([]);
    setResult(null);

    // Simulated "Chain of Thought"
    const steps = [
      { msg: "Reading 'blueprint.md'...", delay: 500 },
      { msg: "Loading 'abandoned_carts.csv' (3 rows found)...", delay: 1200 },
      { msg: "Row 1: John Doe ($120). Price > $100. Applying 'Investment' angle.", delay: 2500 },
      { msg: "Drafting SMS for John...", delay: 3500 },
      { msg: "Row 2: Jane Smith ($85). Price < $100. Applying 'Quick Win' angle.", delay: 4500 },
      { msg: "Drafting SMS for Jane...", delay: 5500 },
      { msg: "Batch complete. Generating output file.", delay: 6500 },
    ];

    steps.forEach(({ msg, delay }) => {
      setTimeout(() => {
        setLogs(prev => [...prev, { type: 'info', message: msg }]);
      }, delay);
    });

    setTimeout(() => {
      setResult(`Customer: John Doe
SMS: "Hey John, the Leather Bag is an investment in your style. Don't let it slip away. Link: store.com/cart/123"

Customer: Jane Smith
SMS: "Hi Jane! You're one click away from enjoying your Ceramic Vase. Grab it now! Link: store.com/cart/456"`);
      setIsRunning(false);
    }, 7000);
  };

  return (
    <WorkbenchLayout 
      title="Abandoned Cart Recovery" 
      onRun={runSimulation}
      isRunning={isRunning}
    >
      <div className="flex w-full h-full">
        {/* Left: Input / Blueprint */}
        <div className="w-1/2 border-r border-gray-200">
          <BlueprintEditor content={blueprint} onChange={setBlueprint} />
        </div>

        {/* Right: Output / Agent */}
        <div className="w-1/2">
          <AgentOutput logs={logs} result={result} />
        </div>
      </div>
    </WorkbenchLayout>
  );
}
