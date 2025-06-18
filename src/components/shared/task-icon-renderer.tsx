
'use client';

import { PlayCircle, ListChecks, Download, Users, CheckSquare, DollarSign, type LucideProps } from 'lucide-react';
import type { FC } from 'react';

interface TaskIconRendererProps {
  iconName: string;
  className?: string;
}

const iconMap: Record<string, FC<LucideProps>> = {
  PlayCircle,
  ListChecks,
  Download,
  Users,
  CheckSquare,
  DollarSign,
};

const TaskIconRenderer: FC<TaskIconRendererProps> = ({ iconName, className }) => {
  const IconComponent = iconMap[iconName] || DollarSign; // Default to DollarSign if name not found
  return <IconComponent className={className} />;
};

export default TaskIconRenderer;
