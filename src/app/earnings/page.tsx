
import MainLayout from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockUserProfile, mockEarningsHistory } from '@/lib/mock-data';
import AnimatedNumber from '@/components/shared/animated-number';
import { DollarSign, CalendarDays, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function EarningsPage() {
  const user = mockUserProfile;
  const earnings = mockEarningsHistory;

  return (
    <MainLayout>
      <div className="space-y-8">
        <section aria-labelledby="earnings-title">
          <h1 id="earnings-title" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your Earnings
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Track your points and see how much you've earned.
          </p>
        </section>

        <Card className="shadow-lg bg-gradient-to-br from-primary/80 to-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <DollarSign className="mr-3 h-8 w-8" />
              Total Points Earned
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold">
              <AnimatedNumber value={user.totalEarnings} duration={1500} />
            </p>
            <p className="mt-1 text-sm opacity-80">Keep up the great work!</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Earnings History</CardTitle>
            <CardDescription>A detailed log of all your earned points.</CardDescription>
          </CardHeader>
          <CardContent>
            {earnings.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px] hidden sm:table-cell">Status</TableHead>
                      <TableHead>Task / Source</TableHead>
                      <TableHead className="text-right">Points</TableHead>
                      <TableHead className="text-right hidden md:table-cell">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {earnings.map((entry) => (
                      <TableRow key={entry.id} className="hover:bg-muted/50">
                        <TableCell className="hidden sm:table-cell">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </TableCell>
                        <TableCell className="font-medium">
                          {entry.taskTitle}
                          <div className="text-xs text-muted-foreground md:hidden">
                            {format(entry.date, 'MMM d, yyyy')}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
                            +{entry.amount}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right hidden md:table-cell">
                          <div className="flex items-center justify-end text-muted-foreground">
                            <CalendarDays className="mr-1.5 h-4 w-4" />
                            {format(entry.date, 'PPp')}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6">You haven't earned any points yet. Start completing tasks to see your history here!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
