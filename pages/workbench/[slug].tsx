import React, { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import WorkbenchLayout from '../../components/workbench/WorkbenchLayout';
import BlueprintEditor from '../../components/workbench/BlueprintEditor';
import AgentOutput from '../../components/workbench/AgentOutput';
import { getAllRecipes } from '../../lib/recipes';
import { Recipe } from '../../lib/cookbook-data';

interface WorkbenchPageProps {
  recipe: Recipe;
}

export default function WorkbenchPage({ recipe }: WorkbenchPageProps) {
  const [blueprint, setBlueprint] = useState(recipe.blueprint);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<Array<{type: string, message: string}>>([]);
  const [result, setResult] = useState<string | null>(null);

  // Reset state when recipe changes
  useEffect(() => {
    setBlueprint(recipe.blueprint);
    setLogs([]);
    setResult(null);
  }, [recipe]);

  const runSimulation = () => {
    setIsRunning(true);
    setLogs([]);
    setResult(null);

    // Generic Simulation Logic
    const steps = [
      { msg: "Initializing Agent Environment...", delay: 500 },
      { msg: "Parsing 'blueprint.md' instructions...", delay: 1000 },
      { msg: `Loading sample data for '${recipe.title}'...`, delay: 1800 },
      { msg: "Analyzing input rows...", delay: 2800 },
      { msg: "Applying blueprint logic to Row 1...", delay: 3800 },
      { msg: "Generating output artifacts...", delay: 5000 },
      { msg: "Validating against constraints...", delay: 6000 },
    ];

    steps.forEach(({ msg, delay }) => {
      setTimeout(() => {
        setLogs(prev => [...prev, { type: 'info', message: msg }]);
      }, delay);
    });

    setTimeout(() => {
      setResult(`[SIMULATION OUTPUT]\n\nAgent successfully processed the input using the rules defined in the blueprint.\n\nGenerated Artifacts:\n- output_v1.md\n- log_file.txt\n\n(Note: This is a simulation. To run this for real, copy the blueprint into Gemini CLI or Claude Code.)`);
      setIsRunning(false);
    }, 7000);
  };

  return (
    <WorkbenchLayout 
      title={recipe.title}
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

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = getAllRecipes();
  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.id },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const recipes = getAllRecipes();
  const recipe = recipes.find((r) => r.id === params?.slug);
  
  if (!recipe) {
    return { notFound: true };
  }

  return {
    props: {
      recipe,
    },
  };
};
