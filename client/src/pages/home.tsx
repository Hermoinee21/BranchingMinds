import { useState } from "react";
import { Link } from "wouter";
import { Brain, ChartLine, UserRound, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/hero-section";
import UseCaseInsights from "@/components/use-case-insights";

export default function HomePage() {
  const [selectedAge, setSelectedAge] = useState<string>("");

  const features = [
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Random Forest ML Algorithm",
      color: "text-primary"
    },
    {
      icon: ChartLine,
      title: "Insights",
      description: "Personalized Reports",
      color: "text-accent"
    },
    {
      icon: UserRound,
      title: "Expert Care",
      description: "Connect with Professionals",
      color: "text-secondary"
    },
    {
      icon: Heart,
      title: "Support",
      description: "24/7 Resources",
      color: "text-pink-500"
    }
  ];

  const assessmentSections = [
    {
      icon: "🛏️",
      title: "Sleep Habits",
      description: "Quality, duration, and patterns of sleep affecting mental wellness",
      color: "border-primary"
    },
    {
      icon: "🍎",
      title: "Nutrition & Lifestyle",
      description: "Eating patterns, physical activity, and lifestyle factors",
      color: "border-secondary"
    },
    {
      icon: "❤️",
      title: "Feelings & Emotions",
      description: "Emotional regulation, mood patterns, and psychological state",
      color: "border-accent"
    },
    {
      icon: "👥",
      title: "Social Behavior",
      description: "Interpersonal relationships and social interaction patterns",
      color: "border-green-500"
    },
    {
      icon: "🧠",
      title: "Cognitive Function",
      description: "Memory, concentration, decision-making abilities",
      color: "border-yellow-500"
    },
    {
      icon: "📅",
      title: "Daily Functioning",
      description: "Work performance, daily tasks, and routine management",
      color: "border-red-500"
    }
  ];

  const ageGroups = ["13-17", "18-25", "26-40", "40+"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection selectedAge={selectedAge} setSelectedAge={setSelectedAge} />

      {/* Assessment Preview Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Comprehensive Mental Health Assessment
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered assessment analyzes multiple aspects of your mental health using Random Forest 
              machine learning to provide accurate insights and personalized recommendations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {assessmentSections.map((section, index) => (
              <Card key={index} className={`assessment-card border-l-4 ${section.color}`}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-4">{section.icon}</span>
                    <h3 className="text-xl font-semibold text-foreground">{section.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{section.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sample Question */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
              Sample Assessment Question
            </h3>
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-lg font-medium text-foreground mb-4">
                    How often have you felt down, depressed, or hopeless in the past two weeks?
                  </h4>
                  <div className="space-y-3">
                    {["Not at all", "Several days", "More than half the days", "Nearly every day"].map((option, index) => (
                      <label key={index} className="flex items-center p-3 rounded-lg border-2 border-border hover:border-primary/30 cursor-pointer transition-colors">
                        <input type="radio" name="sample" className="mr-3 text-primary" />
                        <span className="text-foreground">{option}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Case Insights */}
      <UseCaseInsights />

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="hero-gradient rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your Mental Wellness Journey?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Take our comprehensive assessment tailored to your age group and life circumstances.
            </p>
            <Link href="/assessment">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Begin Assessment Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
