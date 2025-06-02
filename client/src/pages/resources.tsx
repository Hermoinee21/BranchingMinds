import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Search, Phone, Heart, Sun, Users, Moon, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";

export default function ResourcesPage() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ["/api/articles"],
  });

  const mythsFacts = [
    {
      myth: "Mental health problems are rare",
      fact: "1 in 4 people experience mental health issues each year",
      category: "prevalence"
    },
    {
      myth: "Therapy is only for 'crazy' people",
      fact: "Therapy helps anyone improve their mental wellness and coping skills",
      category: "treatment"
    },
    {
      myth: "Mental health issues are a sign of weakness",
      fact: "Mental health conditions are medical conditions, not character flaws",
      category: "stigma"
    },
    {
      myth: "Children don't experience mental health problems",
      fact: "Mental health conditions can affect people of all ages, including children",
      category: "age"
    },
    {
      myth: "People with mental health problems can't work",
      fact: "With proper support, people with mental health conditions can be highly productive",
      category: "workplace"
    },
    {
      myth: "Medication is the only treatment for mental health",
      fact: "Treatment includes therapy, lifestyle changes, support groups, and various approaches",
      category: "treatment"
    }
  ];

  const emergencyResources = [
    {
      name: "Crisis Hotline",
      number: "988",
      description: "24/7 Suicide & Crisis Lifeline",
      color: "bg-red-600"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "Free, 24/7 crisis support via text",
      color: "bg-orange-600"
    },
    {
      name: "SAMHSA Helpline",
      number: "1-800-662-4357",
      description: "Treatment referral service",
      color: "bg-blue-600"
    },
    {
      name: "Emergency Services",
      number: "911",
      description: "Immediate emergency assistance",
      color: "bg-purple-600"
    }
  ];

  const selfCareTips = [
    {
      icon: Sun,
      title: "Morning Routine",
      description: "Start each day with intention and mindfulness",
      color: "text-yellow-500"
    },
    {
      icon: Heart,
      title: "Self-Compassion",
      description: "Treat yourself with kindness and understanding",
      color: "text-red-500"
    },
    {
      icon: Users,
      title: "Social Connection",
      description: "Maintain meaningful relationships and support networks",
      color: "text-blue-500"
    },
    {
      icon: Moon,
      title: "Quality Sleep",
      description: "Prioritize 7-9 hours of restorative sleep",
      color: "text-indigo-500"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <Skeleton className="h-32 w-full" />
            <div className="grid lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-96 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">Educational Resource Center</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access evidence-based mental health information, debunk common myths, and find emergency 
            support resources when you need them most.
          </p>
        </div>

        {/* Resource Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Articles Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                Educational Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {articles?.slice(0, 3).map((article: any) => (
                  <Card key={article.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-foreground mb-2">{article.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{article.summary}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{article.readTime} min read</span>
                        <span className="mx-2">•</span>
                        <span>Updated {new Date(article.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button variant="ghost" className="w-full mt-6 text-primary hover:text-primary/80">
                View All Articles →
              </Button>
            </CardContent>
          </Card>

          {/* Myths vs Facts Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                  <Search className="h-6 w-6 text-secondary" />
                </div>
                Myths vs. Facts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mythsFacts.slice(0, 3).map((item, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-start">
                      <XCircle className="h-4 w-4 text-red-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-600 mb-1">MYTH</h4>
                        <p className="text-sm text-foreground">{item.myth}</p>
                      </div>
                    </div>
                    <div className="flex items-start ml-6">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-green-600 mb-1">FACT</h4>
                        <p className="text-sm text-foreground">{item.fact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="ghost" className="w-full mt-6 text-secondary hover:text-secondary/80">
                Learn More Myths & Facts →
              </Button>
            </CardContent>
          </Card>

          {/* Emergency Resources Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Phone className="h-6 w-6 text-red-600" />
                </div>
                Emergency Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyResources.map((resource, index) => (
                  <Card key={index} className={`border-2 ${resource.color.replace('bg-', 'border-')}/20`}>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-foreground mb-2">{resource.name}</h4>
                      <p className="text-lg font-mono text-foreground mb-1">{resource.number}</p>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-foreground text-center">
                  <AlertTriangle className="h-4 w-4 mr-2 inline" />
                  If you're experiencing a mental health emergency, please reach out immediately.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Self-Care Tips */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Daily Mental Health Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {selfCareTips.map((tip, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <tip.icon className={`h-8 w-8 ${tip.color}`} />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Mental Health Conditions Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Understanding Mental Health Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Depression</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn about symptoms, causes, and treatment options for depression.
                  </p>
                  <Badge variant="secondary" className="mt-2">Most Common</Badge>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Anxiety Disorders</h4>
                  <p className="text-sm text-muted-foreground">
                    Understanding different types of anxiety and coping strategies.
                  </p>
                  <Badge variant="secondary" className="mt-2">Treatable</Badge>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Bipolar Disorder</h4>
                  <p className="text-sm text-muted-foreground">
                    Information about mood episodes and management techniques.
                  </p>
                  <Badge variant="secondary" className="mt-2">Manageable</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Support Guide */}
          <Card>
            <CardHeader>
              <CardTitle>When to Seek Professional Help</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                    Consider Professional Help If:
                  </h4>
                  <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                    <li>• Symptoms persist for more than 2 weeks</li>
                    <li>• Daily activities are significantly impacted</li>
                    <li>• You're having thoughts of self-harm</li>
                    <li>• Relationships are suffering</li>
                    <li>• Work or school performance declines</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                    Types of Mental Health Professionals:
                  </h4>
                  <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li>• <strong>Psychiatrists:</strong> Medical doctors who can prescribe medication</li>
                    <li>• <strong>Psychologists:</strong> Provide therapy and psychological testing</li>
                    <li>• <strong>Therapists:</strong> Offer counseling and various therapy approaches</li>
                    <li>• <strong>Social Workers:</strong> Provide support and connect to resources</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Treatment Approaches */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Evidence-Based Treatment Approaches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Psychotherapy</h4>
                <p className="text-sm text-muted-foreground">
                  Talk therapy approaches like CBT, DBT, and psychodynamic therapy
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Support Groups</h4>
                <p className="text-sm text-muted-foreground">
                  Peer support and group therapy for shared experiences
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sun className="h-8 w-8 text-accent" />
                </div>
                <h4 className="font-medium text-foreground mb-2">Lifestyle Medicine</h4>
                <p className="text-sm text-muted-foreground">
                  Exercise, nutrition, mindfulness, and sleep optimization
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
