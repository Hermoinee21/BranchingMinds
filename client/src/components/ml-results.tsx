import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, Target, CheckCircle, AlertCircle } from "lucide-react";

interface MLResultsProps {
  conditions: Array<{
    condition: string;
    probability: number;
    severity: string;
  }>;
  overallSeverity: string;
  confidence: number;
  recommendations: string[];
}

export default function MLResults({ 
  conditions, 
  overallSeverity, 
  confidence, 
  recommendations 
}: MLResultsProps) {
  
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

  const getSeverityProgressColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "mild":
        return "bg-green-500";
      case "moderate":
        return "bg-yellow-500";
      case "severe":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          AI-Powered Mental Health Analysis
        </h2>
        <p className="text-lg text-muted-foreground">
          Results generated using Random Forest machine learning algorithm
        </p>
      </div>

      {/* Main Results Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
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
              {conditions.slice(0, 3).map((condition, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <div>
                    <span className="font-medium text-foreground text-sm">
                      {condition.condition}
                    </span>
                    <div className="text-xs text-muted-foreground">
                      {Math.round(condition.probability * 100)}% likelihood
                    </div>
                  </div>
                  <Badge className={getSeverityColor(condition.severity)}>
                    {condition.severity}
                  </Badge>
                </div>
              ))}
            </div>
            
            {conditions.length > 3 && (
              <div className="mt-3 text-center">
                <span className="text-sm text-muted-foreground">
                  +{conditions.length - 3} more condition(s)
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Severity Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                <TrendingUp className="h-6 w-6 text-secondary" />
              </div>
              Severity Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Overall Severity</span>
                  <Badge className={getSeverityColor(overallSeverity)}>
                    {overallSeverity}
                  </Badge>
                </div>
                <Progress 
                  value={
                    overallSeverity.toLowerCase() === "mild" ? 33 :
                    overallSeverity.toLowerCase() === "moderate" ? 66 : 100
                  }
                  className="h-2"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Confidence Level</span>
                  <span className="text-sm font-medium text-green-600">{confidence}%</span>
                </div>
                <Progress value={confidence} className="h-2" />
              </div>
              
              <div className="bg-primary/5 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2 flex items-center">
                  <Brain className="h-4 w-4 mr-2" />
                  Random Forest Analysis
                </h4>
                <p className="text-sm text-muted-foreground">
                  Based on 500+ decision trees analyzing your responses across all assessment categories.
                  This ensemble approach provides robust and reliable predictions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                <Target className="h-6 w-6 text-accent" />
              </div>
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                  Primary Concerns
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  {conditions[0]?.condition || "No significant conditions detected"}
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
                <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-1">
                  Risk Level
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-200">
                  {overallSeverity} severity requiring {
                    overallSeverity.toLowerCase() === "severe" ? "immediate" :
                    overallSeverity.toLowerCase() === "moderate" ? "prompt" : "routine"
                  } attention
                </p>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
                  Prognosis
                </h4>
                <p className="text-sm text-green-700 dark:text-green-200">
                  With proper support and treatment, significant improvement is highly likely
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Condition Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Condition Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {conditions.slice(0, 2).map((condition, index) => (
                <div key={index} className="border-l-4 border-primary/30 pl-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-medium text-foreground">
                      {condition.condition}
                    </h4>
                    <Badge className={getSeverityColor(condition.severity)}>
                      {condition.severity}
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Likelihood</span>
                      <span className="font-medium">{Math.round(condition.probability * 100)}%</span>
                    </div>
                    <Progress value={condition.probability * 100} className="h-2" />
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {condition.condition.includes("Depression") && 
                      "Characterized by persistent feelings of sadness, hopelessness, and loss of interest in activities. Early intervention can significantly improve outcomes."
                    }
                    {condition.condition.includes("Anxiety") &&
                      "Involves excessive worry and fear that can interfere with daily activities. Highly treatable with proper therapeutic approaches."
                    }
                    {condition.condition.includes("Sleep") &&
                      "Sleep disorders can significantly impact mental health and daily functioning. Quality sleep is essential for emotional regulation."
                    }
                    {condition.condition.includes("Eating") &&
                      "Eating disorders involve complex relationships with food and body image. Comprehensive treatment approaches are most effective."
                    }
                    {condition.condition.includes("Bipolar") &&
                      "Characterized by mood episodes ranging from depression to mania. Mood stabilization is key to management."
                    }
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Personalized Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-6">
              {recommendations.slice(0, 6).map((recommendation, index) => (
                <div key={index} className="flex items-start p-3 bg-muted rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{recommendation}</span>
                </div>
              ))}
            </div>
            
            {overallSeverity.toLowerCase() === "severe" && (
              <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">
                      Immediate Action Recommended
                    </h4>
                    <p className="text-sm text-red-700 dark:text-red-200">
                      Your assessment indicates severe symptoms. Please consider seeking immediate 
                      professional mental health support or contact a crisis helpline.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                ML Algorithm Insights
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-200">
                These recommendations are generated by analyzing patterns from thousands of similar cases 
                using Random Forest machine learning, ensuring evidence-based and personalized guidance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
