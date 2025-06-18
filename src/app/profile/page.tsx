import MainLayout from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUserProfile } from '@/lib/mock-data';
import AnimatedNumber from '@/components/shared/animated-number';
import { User, Mail, DollarSign, Link as LinkIcon, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  const user = mockUserProfile;

  return (
    <MainLayout>
      <div className="space-y-8">
        <section aria-labelledby="profile-title">
          <h1 id="profile-title" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your Profile
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Manage your account details and view your progress.
          </p>
        </section>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 p-6">
            <Avatar className="h-24 w-24 ring-2 ring-primary ring-offset-2 ring-offset-background">
              <AvatarImage src={`https://placehold.co/100x100.png`} alt={user.username || 'User Avatar'} data-ai-hint="user avatar" />
              <AvatarFallback className="text-3xl">
                {user.username ? user.username.charAt(0).toUpperCase() : <User />}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl font-semibold">{user.username || 'Valued User'}</CardTitle>
              <CardDescription className="text-base text-muted-foreground">{user.email}</CardDescription>
              <Button variant="outline" size="sm" className="mt-3">
                <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>
          </CardHeader>
          
          <Separator />

          <CardContent className="p-6 grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard icon={DollarSign} label="Total Earnings" value={<AnimatedNumber value={user.totalEarnings} className="text-2xl font-bold text-accent-foreground" />} unit="points" />
              <InfoCard icon={LinkIcon} label="Referral Link" value={user.referralLink || 'N/A'} isLink />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Account Information</h3>
              <ul className="space-y-3">
                <ListItem icon={User} label="User ID" value={user.id} />
                <ListItem icon={Mail} label="Email" value={user.email || 'Not set'} />
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

interface InfoCardProps {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode | string;
  unit?: string;
  isLink?: boolean;
}

const InfoCard = ({ icon: Icon, label, value, unit, isLink = false }: InfoCardProps) => (
  <div className="p-4 bg-muted/50 rounded-lg flex items-center space-x-4">
    <div className="p-3 bg-primary/10 rounded-full">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      {isLink && typeof value === 'string' ? (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline truncate block max-w-xs">
          {value}
        </a>
      ) : (
        <div className="text-lg font-semibold text-foreground">
          {value} {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
      )}
    </div>
  </div>
);


interface ListItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

const ListItem = ({ icon: Icon, label, value }: ListItemProps) => (
  <li className="flex items-center">
    <Icon className="h-5 w-5 text-muted-foreground mr-3" />
    <span className="font-medium text-foreground min-w-[100px]">{label}:</span>
    <span className="text-muted-foreground ml-2 truncate">{value}</span>
  </li>
);