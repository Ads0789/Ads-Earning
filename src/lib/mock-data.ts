import type { Task, UserProfile, EarningEntry, AITask } from '@/types';
import type { LucideIcon } from 'lucide-react'; // Keep this for mockRewards if needed later
import { Gift, DollarSign } from 'lucide-react'; // Keep for mockRewards

export const mockTasks: AITask[] = [
  {
    title: 'Watch a Quick Ad',
    description: 'Watch a short 30-second advertisement video.',
    estimatedCompletionTime: 1,
    payout: 10,
  },
  {
    title: 'Complete Short Survey',
    description: 'Share your opinions in a 5-minute survey about consumer products.',
    estimatedCompletionTime: 5,
    payout: 50,
  },
  {
    title: 'Install New Game App',
    description: 'Download and install our partner\'s new mobile game. Reach level 2.',
    estimatedCompletionTime: 20,
    payout: 150,
  },
  {
    title: 'Sign Up for Newsletter',
    description: 'Subscribe to a weekly newsletter about tech trends.',
    estimatedCompletionTime: 2,
    payout: 25,
  },
  {
    title: 'Daily Check-in',
    description: 'Open the app and check in for today to earn a small reward.',
    estimatedCompletionTime: 1,
    payout: 5,
  },
  {
    title: 'Product Feedback Survey',
    description: 'Provide detailed feedback on a new product concept. Takes about 15 minutes.',
    estimatedCompletionTime: 15,
    payout: 100,
  },
  {
    title: 'Social Media Share',
    description: 'Share our promotional post on your social media profile.',
    estimatedCompletionTime: 3,
    payout: 30,
  },
  {
    title: 'App Usage Challenge',
    description: 'Use a partner app for 3 consecutive days for 10 minutes each day.',
    estimatedCompletionTime: 30, // Total time, implies multiple sessions
    payout: 200,
  },
];

// Function to assign icon names based on keywords in task titles
export const getTaskIcon = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('ad') || lowerTitle.includes('video')) return 'PlayCircle';
  if (lowerTitle.includes('survey') || lowerTitle.includes('feedback')) return 'ListChecks';
  if (lowerTitle.includes('install') || lowerTitle.includes('download') || lowerTitle.includes('game')) return 'Download';
  if (lowerTitle.includes('sign up') || lowerTitle.includes('subscribe')) return 'Users';
  if (lowerTitle.includes('check-in')) return 'CheckSquare';
  return 'DollarSign'; // Default icon name
};


export const mockUserProfile: UserProfile = {
  id: 'user123',
  email: 'user@example.com',
  username: 'TaskMaster101',
  totalEarnings: 1250,
  referralLink: 'https://tasktriumph.app/referral/TaskMaster101'
};

export const mockEarningsHistory: EarningEntry[] = [
  {
    id: 'earn1',
    taskId: 'task001',
    taskTitle: 'Watch a Quick Ad',
    amount: 10,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 'earn2',
    taskId: 'task002',
    taskTitle: 'Complete Short Survey',
    amount: 50,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: 'earn3',
    taskId: 'task003',
    taskTitle: 'Install New Game App',
    amount: 150,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: 'earn4',
    taskId: 'task000', // Referral bonus
    taskTitle: 'Referral Bonus from FriendUser',
    amount: 50,
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  }
];

export const mockRewards = [
  { id: 'reward1', title: '$5 Gift Card (Amazon)', pointsRequired: 5000, icon: Gift },
  { id: 'reward2', title: '$10 PayPal Cash', pointsRequired: 10000, icon: DollarSign },
  { id: 'reward3', title: '$2 Gift Card (Starbucks)', pointsRequired: 2500, icon: Gift },
];
