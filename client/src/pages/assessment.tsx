import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, ArrowRight, ArrowLeft } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import AssessmentForm from "@/components/assessment-form";

export default function AssessmentPage() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [ageGroup, setAgeGroup] = useState("");
  const [responses, setResponses] = useState({});
  const { toast } = useToast();

  const steps = [
    { id: "age", title: "Age Selection", icon: "👤" },
    { id: "sleep", title: "Sleep Habits", icon: "🛏️" },
    { id: "nutrition", title: "Nutrition & Lifestyle", icon: "🍎" },
    { id: "emotions", title: "Feelings & Emotions", icon: "❤️" },
    { id: "social", title: "Social Behavior", icon: "👥" },
    { id: "cognitive", title: "Cognitive Function", icon: "🧠" },
    { id: "daily", title: "Daily Functioning", icon: "📅" }
  ];

  const createAssessmentMutation = useMutation({
    mutationFn: async (data: any) => {
      // First create user
      const userResponse = await apiRequest("POST", "/api/users", {
        age: parseInt(data.age),
        ageGroup: data.ageGroup
      });
      const user = await userResponse.json();

      // Then create assessment
      const assessmentResponse = await apiRequest("POST", "/api/assessments", {
        userId: user.id,
        responses: data.responses
      });
      return assessmentResponse.json();
    },
    onSuccess: (assessment) => {
      toast({
        title: "Assessment Complete!",
        description: "Your mental health analysis is ready.",
      });
      setLocation(`/results/${assessment.id}`);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to process assessment",
        variant: "destructive",
      });
    }
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!ageGroup) {
      toast({
        title: "Error",
        description: "Please select your age group",
        variant: "destructive",
      });
      return;
    }

    createAssessmentMutation.mutate({
      age: ageGroup.split("-")[0], // Use first number as age
      ageGroup,
      responses
    });
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold text-foreground">Mental Health Assessment</h1>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            Complete our comprehensive assessment powered by Random Forest AI analysis
          </p>
          <Progress value={progress} className="w-full max-w-md mx-auto" />
          <p className="text-sm text-muted-foreground mt-2">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  index === currentStep
                    ? "bg-primary text-primary-foreground"
                    : index < currentStep
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <span className="mr-2">{step.icon}</span>
                {step.title}
              </div>
            ))}
          </div>
        </div>

        {/* Assessment Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl mr-3">{currentStepData.icon}</span>
              {currentStepData.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AssessmentForm
              step={currentStepData.id}
              responses={responses}
              setResponses={setResponses}
              ageGroup={ageGroup}
              setAgeGroup={setAgeGroup}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={createAssessmentMutation.isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {createAssessmentMutation.isPending ? "Analyzing..." : "Complete Assessment"}
              <Brain className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
