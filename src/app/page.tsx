
import { smartTaskBundling, SmartTaskBundlingInput, SmartTaskBundlingOutput } from '@/ai/flows/smart-task-bundling';
import TaskBundleDisplay from '@/components/tasks/task-bundle-display';
import MainLayout from '@/components/layout/main-layout';
import { mockTasks, getTaskIcon } from '@/lib/mock-data';
import type { Task, TaskBundle as UITaskBundle, AITask } from '@/types';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Helper function to map AI tasks to UI tasks, adding IDs and icons
const mapAITasksToUITasks = (aiTasks: AITask[]): Task[] => {
  return aiTasks.map((aiTask, index) => {
    const iconName: string = getTaskIcon(aiTask.title); // Explicitly get the icon name as a string
    const uiTask: Task = { // Construct the Task object explicitly
      id: `task-${index}-${Date.now()}`,
      title: aiTask.title,
      description: aiTask.description,
      rewardAmount: aiTask.payout,
      estimatedCompletionTime: aiTask.estimatedCompletionTime,
      categoryIcon: iconName, // Assign the string icon name
    };
    return uiTask;
  });
};

export default async function TaskDashboardPage() {
  let taskBundlesData: SmartTaskBundlingOutput | null = null;
  let error: string | null = null;

  try {
    const input: SmartTaskBundlingInput = { tasks: mockTasks }; // mockTasks are AITask[]
    taskBundlesData = await smartTaskBundling(input);
  } catch (e) {
    console.error("Error fetching task bundles:", e);
    error = "Failed to load smart task bundles. Please try again later.";
    taskBundlesData = {
      taskBundles: [
        {
          bundleName: "Available Tasks (Fallback)",
          tasks: mockTasks, // These are AITask[]
        },
      ],
    };
  }
  
  const uiBundles: UITaskBundle[] = taskBundlesData?.taskBundles.map(bundle => ({
    bundleName: bundle.bundleName,
    tasks: mapAITasksToUITasks(bundle.tasks), // mapAITasksToUITasks ensures tasks have string categoryIcon
  })) || [];


  return (
    <MainLayout>
      <div className="space-y-8">
        <section aria-labelledby="dashboard-title" className="text-center py-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg shadow">
          <h1 id="dashboard-title" className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Welcome to Your Task Dashboard
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Discover tasks, earn points, and get rewarded!
          </p>
        </section>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {uiBundles.length > 0 ? (
          uiBundles.map((bundle, index) => (
            <TaskBundleDisplay key={bundle.bundleName} bundle={bundle} animationDelay={index * 200} />
          ))
        ) : (
          <Card className="text-center p-10 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">No Tasks Available</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                It seems there are no tasks for you at the moment. Please check back later or explore other sections.
              </p>
              <Button asChild>
                <Link href="/referral">Invite Friends & Earn</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
