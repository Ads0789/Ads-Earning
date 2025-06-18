
'use client';

import type { TaskBundle, Task } from '@/types';
import TaskCard from './task-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from 'react';

interface TaskBundleDisplayProps {
  bundle: TaskBundle;
  animationDelay?: number;
}

const TaskBundleDisplay = ({ bundle, animationDelay = 0 }: TaskBundleDisplayProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), animationDelay);
    return () => clearTimeout(timer);
  }, [animationDelay]);

  const handleCompleteTask = (taskId: string) => {
    const completedTask = bundle.tasks.find(t => t.id === taskId);
    toast({
      title: "Task Started!",
      description: `You've started "${completedTask?.title}". Good luck!`,
      variant: "default",
    });
    // In a real app, this would trigger task completion logic.
  };

  if (!isVisible) {
    return null; // Or a skeleton loader
  }
  
  return (
    <div className="mb-8 fade-in-up" style={{ animationDelay: `${animationDelay}ms` }}>
      <Accordion type="single" collapsible defaultValue={`item-${bundle.bundleName.replace(/\s+/g, '-')}`} className="w-full">
        <AccordionItem value={`item-${bundle.bundleName.replace(/\s+/g, '-')}`} className="border rounded-lg shadow-sm overflow-hidden">
          <AccordionTrigger className="px-6 py-4 bg-card hover:bg-muted/50 transition-colors">
            <h2 className="text-2xl font-semibold text-primary">{bundle.bundleName}</h2>
          </AccordionTrigger>
          <AccordionContent className="p-4 md:p-6 bg-background">
            {bundle.tasks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {bundle.tasks.map((task, index) => (
                  <div key={task.id} className="fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <TaskCard task={task} onCompleteTask={handleCompleteTask} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No tasks available in this bundle right now. Check back later!</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TaskBundleDisplay;
