export interface Task {
  id: string;
  title: string;
  description: string;
  rewardAmount: number; // in points or virtual currency
  estimatedCompletionTime: number; // in minutes
  categoryIcon: string; // Lucide icon component NAME
}

export interface AITask {
  title: string;
  description: string;
  estimatedCompletionTime: number;
  payout: number;
}

export interface TaskBundle {
  bundleName: string;
  tasks: Task[];
}

export interface UserProfile {
  id: string;
  email: string | null;
  username?: string | null;
  totalEarnings: number;
  referralLink?: string;
}

export interface EarningEntry {
  id: string;
  taskId: string;
  taskTitle: string;
  amount: number;
  date: Date;
}
