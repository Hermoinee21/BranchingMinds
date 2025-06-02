import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardCharts from "@/components/dashboard-charts";

export default function InsightsPage() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["/api/analytics/dashboard"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <Skeleton className="h-32 w-full" />
            <div className="grid md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-80 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-muted/30 py-8 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Unable to Load Analytics</h2>
            <p className="text-muted-foreground">
              Please try refreshing the page or contact support if the issue persists.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-6">Mental Health Insights Dashboard</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore comprehensive mental health data trends and statistics powered by real-world datasets 
            to better understand mental health patterns across different demographics.
          </p>
        </div>

        {/* Dashboard Controls */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Age Group</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="13-17">13-17</SelectItem>
                    <SelectItem value="18-25">18-25</SelectItem>
                    <SelectItem value="26-40">26-40</SelectItem>
                    <SelectItem value="40+">40+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Condition</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Conditions</SelectItem>
                    <SelectItem value="depression">Depression</SelectItem>
                    <SelectItem value="anxiety">Anxiety</SelectItem>
                    <SelectItem value="bipolar">Bipolar Disorder</SelectItem>
                    <SelectItem value="eating">Eating Disorders</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Severity</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="mild">Mild</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="severe">Severe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Time Period</label>
                <Select defaultValue="12months">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12months">Last 12 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="1month">Last Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-primary/5">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{analytics.populationWithConditions}%</div>
              <div className="text-muted-foreground">Population with Mental Health Conditions</div>
            </CardContent>
          </Card>
          <Card className="bg-secondary/5">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-secondary mb-2">{analytics.earlyDetectionRate}%</div>
              <div className="text-muted-foreground">Early Detection Success Rate</div>
            </CardContent>
          </Card>
          <Card className="bg-accent/5">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">{analytics.improvementRate}%</div>
              <div className="text-muted-foreground">Improvement with Treatment</div>
            </CardContent>
          </Card>
          <Card className="bg-green-100 dark:bg-green-900">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">
                {analytics.totalAssessments.toLocaleString()}+
              </div>
              <div className="text-muted-foreground">Assessments Completed</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <DashboardCharts analytics={analytics} />
      </div>
    </div>
  );
}
