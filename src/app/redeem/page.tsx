
// src/app/redeem/page.tsx
'use client'; // Make this a client component for form handling

import MainLayout from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockRewards } from '@/lib/mock-data';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface Reward {
  id: string;
  title: string;
  pointsRequired: number;
  icon: React.ComponentType<{ className?: string }>;
}

export default function RedeemPage() {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  // In a real app, user's current points would come from a context or API
  const currentUserPoints = 1250; // Example points from mockUserProfile

  const handleRedeem = (reward: Reward) => {
    if (currentUserPoints >= reward.pointsRequired) {
      // Logic to redeem points
      toast({
        title: "Reward Redeemed!",
        description: `You have successfully redeemed ${reward.title}.`,
      });
      // Deduct points, update history, etc.
    } else {
      toast({
        title: "Not enough points",
        description: `You need ${reward.pointsRequired - currentUserPoints} more points to redeem ${reward.title}.`,
        variant: "destructive",
      });
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <section aria-labelledby="redeem-title">
          <h1 id="redeem-title" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Redeem Points
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Use your earned points to redeem exciting rewards! You currently have {currentUserPoints.toLocaleString()} points.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRewards.map((reward) => (
            <Card key={reward.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <reward.icon className="mr-2 h-6 w-6 text-primary" />
                  {reward.title}
                </CardTitle>
                <CardDescription>Requires: {reward.pointsRequired.toLocaleString()} points</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">Claim this reward and enjoy!</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => handleRedeem(reward)}
                  disabled={currentUserPoints < reward.pointsRequired}
                >
                  Redeem ({reward.pointsRequired} pts)
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {mockRewards.length === 0 && (
            <Card>
                <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">No rewards available at the moment. Please check back later!</p>
                </CardContent>
            </Card>
        )}
      </div>
    </MainLayout>
  );
}
