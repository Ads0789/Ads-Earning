'use client';

import MainLayout from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockUserProfile } from '@/lib/mock-data';
import { Users, Gift, Copy, Share2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast"; // Ensure you have this hook

// Client component to handle copy functionality
const ReferralClientContent = () => {
  const user = mockUserProfile;

  const copyToClipboard = () => {
    if (user.referralLink) {
      navigator.clipboard.writeText(user.referralLink)
        .then(() => {
          toast({ title: "Copied!", description: "Referral link copied to clipboard." });
        })
        .catch(err => {
          console.error("Failed to copy: ", err);
          toast({ title: "Error", description: "Failed to copy link.", variant: "destructive" });
        });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Gift className="mr-3 h-7 w-7 text-primary" />
            Invite Friends, Earn Rewards!
          </CardTitle>
          <CardDescription>
            Share your unique referral link and earn <strong>50 points</strong> for every friend who signs up and completes their first task. Your friend will also get 50 bonus points!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="referralLink" className="block text-sm font-medium text-foreground mb-1">
              Your Unique Referral Link:
            </label>
            <div className="flex space-x-2">
              <Input id="referralLink" type="text" value={user.referralLink || ''} readOnly className="bg-muted/30" />
              <Button onClick={copyToClipboard} variant="outline" aria-label="Copy referral link">
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
            </div>
          </div>
          <Button className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
            <Share2 className="mr-2 h-4 w-4" /> Share Now
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Users className="mr-3 h-6 w-6 text-primary" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Share your personal referral link with friends.</li>
            <li>Your friend signs up using your link.</li>
            <li>Once your friend completes their first task, you both receive 50 bonus points!</li>
            <li>Track your referral earnings in your Earnings History.</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};


export default function ReferralPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <section aria-labelledby="referral-title">
          <h1 id="referral-title" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Referral Program
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Spread the word about TaskTriumph and earn together.
          </p>
        </section>
        <ReferralClientContent />
      </div>
    </MainLayout>
  );
}
