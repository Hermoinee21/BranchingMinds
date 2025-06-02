import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, Users, Heart, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function UseCaseInsights() {
  const useCases = [
    {
      icon: GraduationCap,
      title: "Students & Academics",
      description: "Mental health support tailored for academic environments and student life challenges.",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      iconColor: "bg-blue-500",
      challenges: [
        {
          title: "Mental Fatigue & Burnout",
          description: "Academic pressure leading to exhaustion and decreased performance"
        },
        {
          title: "Exam Stress & Anxiety", 
          description: "Test anxiety affecting academic performance and well-being"
        },
        {
          title: "Social Isolation",
          description: "Difficulty forming connections and maintaining relationships"
        }
      ],
      assessmentAreas: ["Study Habits", "Social Anxiety", "Time Management", "Academic Pressure"],
      badgeColor: "bg-blue-100 text-blue-700"
    },
    {
      icon: Briefcase,
      title: "Working Professionals",
      description: "Addressing workplace stress, burnout, and work-life balance challenges.",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50",
      iconColor: "bg-purple-500",
      challenges: [
        {
          title: "Workplace Burnout",
          description: "Chronic workplace stress leading to physical and emotional exhaustion"
        },
        {
          title: "Work-Life Imbalance",
          description: "Difficulty maintaining boundaries between work and personal life"
        },
        {
          title: "Job-Related Stress",
          description: "Performance pressure and workplace conflicts affecting mental health"
        }
      ],
      assessmentAreas: ["Work Stress", "Career Satisfaction", "Team Dynamics", "Leadership Pressure"],
      badgeColor: "bg-purple-100 text-purple-700"
    },
    {
      icon: Users,
      title: "Adolescents & Teens",
      description: "Supporting young people through identity development and emotional regulation.",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      iconColor: "bg-green-500",
      challenges: [
        {
          title: "Identity Crisis",
          description: "Struggles with self-identity and finding their place in the world"
        },
        {
          title: "Peer Pressure",
          description: "Social pressures affecting decision-making and self-esteem"
        },
        {
          title: "Emotional Regulation",
          description: "Difficulty managing intense emotions and mood swings"
        }
      ],
      assessmentAreas: ["Body Image", "Social Media Impact", "Family Dynamics", "Future Anxiety"],
      badgeColor: "bg-green-100 text-green-700"
    },
    {
      icon: Heart,
      title: "Elderly Individuals",
      description: "Mental health support addressing loneliness, life transitions, and cognitive changes.",
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
      iconColor: "bg-orange-500",
      challenges: [
        {
          title: "Loneliness & Isolation",
          description: "Social isolation affecting mental and physical well-being"
        },
        {
          title: "Cognitive Decline",
          description: "Memory and cognitive function changes causing distress"
        },
        {
          title: "Emotional Withdrawal",
          description: "Loss of interest in activities and social connections"
        }
      ],
      assessmentAreas: ["Social Connection", "Life Satisfaction", "Health Anxiety", "Purpose & Meaning"],
      badgeColor: "bg-orange-100 text-orange-700"
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Specialized Support for Every Life Stage
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform provides tailored mental health insights and support for different demographics, 
            understanding that mental wellness needs vary across life stages and circumstances.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {useCases.map((useCase, index) => (
            <Card key={index} className={`${useCase.bgColor} border-0`}>
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 ${useCase.iconColor} rounded-xl flex items-center justify-center mr-4`}>
                    <useCase.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">{useCase.title}</h3>
                    <p className="text-muted-foreground mt-1">{useCase.description}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <h4 className="font-medium text-foreground mb-3">Common Challenges:</h4>
                  {useCase.challenges.map((challenge, challengeIndex) => (
                    <div key={challengeIndex} className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-foreground">{challenge.title}</h5>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-card rounded-xl p-4">
                  <h4 className="font-medium text-foreground mb-3">Specialized Assessment Areas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {useCase.assessmentAreas.map((area, areaIndex) => (
                      <Badge key={areaIndex} className={useCase.badgeColor}>
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">78%</div>
              <div className="text-sm text-muted-foreground">Students report stress-related issues</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-secondary mb-2">65%</div>
              <div className="text-sm text-muted-foreground">Professionals experience burnout</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-accent mb-2">42%</div>
              <div className="text-sm text-muted-foreground">Teens struggle with anxiety</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">35%</div>
              <div className="text-sm text-muted-foreground">Elderly feel socially isolated</div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="hero-gradient border-0">
            <CardContent className="p-12 text-white">
              <h3 className="text-3xl font-bold mb-6">
                Ready to Start Your Mental Wellness Journey?
              </h3>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Take our comprehensive assessment tailored to your age group and life circumstances.
              </p>
              <Link href="/assessment">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  Begin Assessment Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
