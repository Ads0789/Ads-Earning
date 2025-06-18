import type { Task } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Clock, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import TaskIconRenderer from '@/components/shared/task-icon-renderer';

interface TaskCardProps {
  task: Task;
  onCompleteTask: (taskId: string) => void;
}

const TaskCard = ({ task, onCompleteTask }: TaskCardProps) => {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold leading-tight flex items-center">
            {task.categoryIcon && <TaskIconRenderer iconName={task.categoryIcon} className="mr-2 h-5 w-5 text-primary" />}
            {task.title}
          </CardTitle>
          <Badge variant="outline" className="whitespace-nowrap bg-accent/20 border-accent text-accent-foreground">
            <Coins className="mr-1.5 h-3.5 w-3.5" /> {task.rewardAmount} pts
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground pt-1 line-clamp-2">{task.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="mr-1.5 h-4 w-4" />
          <span>Est. {task.estimatedCompletionTime} min</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onCompleteTask(task.id)} 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          aria-label={`Complete task: ${task.title}`}
        >
          <Zap className="mr-2 h-4 w-4" />
          Start Task
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
