import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle, AlertCircle, Calendar, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResultsPage() {
  const [, params] = useRoute("/results/:id");
  const assessmentId = params?.id;

  const { data: assessment, isLoading } = useQuery({
    queryKey: [`/api/assessments/${assessmentId}`],
    enabled: !!assessmentId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <Skeleton className="h-32 w-full" />
            <div className="grid lg:grid-cols-3 gap-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen bg-muted/30 py-8 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Assessment Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The assessment you're looking for could not be found.
            </p>
            <Link href="/assessment">
              <Button>Take New Assessment</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const conditions = assessment.conditions as Array<{
    condition: string;
    probability: number;
    severity: string;
  }>;

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "mild":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "severe":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-4xl font-bold text-foreground">Your Mental Health Analysis</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Powered by Random Forest machine learning algorithm
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Condition Detection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                Condition Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {conditions.map((condition, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium text-sm">{condition.condition}</span>
                    <Badge className={getSeverityColor(condition.severity)}>
                      {condition.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Severity Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                  <CheckCircle className="h-6 w-6 text-secondary" />
                </div>
                Severity Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Overall Severity</span>
                    <span className="text-sm font-medium">{assessment.severity}</span>
                  </div>
                  <Progress 
                    value={assessment.confidence} 
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Confidence Level</span>
                    <span className="text-sm font-medium">{assessment.confidence}%</span>
                  </div>
                  <Progress 
                    value={assessment.confidence} 
                    className="h-2"
                  />
                </div>
                <div className="bg-primary/5 rounded-lg p-4">
                  <h4 className="font-medium text-foreground mb-2">Random Forest Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Based on 500+ decision trees analyzing your responses across all assessment categories.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/doctors">
                  <Button className="w-full justify-between">
                    Find a Psychiatrist
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/resources">
                  <Button variant="outline" className="w-full justify-between">
                    Educational Resources
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-between">
                  Download Report
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Condition Details */}
          <Card>
            <CardHeader>
              <CardTitle>Understanding Your Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {conditions.slice(0, 2).map((condition, index) => (
                  <div key={index} className="border-l-4 border-primary/30 pl-4">
                    <h4 className="text-lg font-medium text-foreground mb-3 flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-3 ${
                        condition.severity === 'Mild' ? 'bg-green-500' :
                        condition.severity === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></span>
                      {condition.severity} {condition.condition}
                    </h4>
                    <p className="text-muted-foreground mb-4">
                      {condition.condition.includes('Depression') && 
                        "Depression is a common mental health condition characterized by persistent feelings of sadness, hopelessness, and loss of interest in activities."
                      }
                      {condition.condition.includes('Anxiety') &&
                        "Anxiety involves excessive worry and fear that can interfere with daily activities. Your assessment shows symptoms that can be managed with proper techniques."
                      }
                      {condition.condition.includes('Sleep') &&
                        "Sleep disorders can significantly impact mental health and daily functioning. Quality sleep is essential for emotional regulation and cognitive performance."
                      }
                    </p>
                    <div className="bg-muted rounded-lg p-3">
                      <span className="text-sm font-medium text-foreground">
                        Confidence: {Math.round(condition.probability * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(assessment.recommendations as string[]).map((recommendation, index) => (
                  <div key={index} className="flex items-start p-3 bg-muted rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{recommendation}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Professional Support Recommended
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-200 mb-3">
                  Based on your assessment results, we recommend connecting with a mental health professional 
                  for personalized treatment and support.
                </p>
                <Link href="/doctors">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Find Mental Health Professionals
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment">
              <Button variant="outline" size="lg">
                Take Another Assessment
              </Button>
            </Link>
            <Link href="/insights">
              <Button size="lg">
                View Mental Health Insights
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
