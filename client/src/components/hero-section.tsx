import { Link } from "wouter";
import { Brain, ChartLine, UserRound, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface HeroSectionProps {
  selectedAge: string;
  setSelectedAge: (age: string) => void;
}

export default function HeroSection({ selectedAge, setSelectedAge }: HeroSectionProps) {
  const ageGroups = ["13-17", "18-25", "26-40", "40+"];

  const features = [
    { icon: Brain, title: "AI Analysis", description: "Random Forest ML Algorithm", color: "text-cyan-300" },
    { icon: ChartLine, title: "Insights", description: "Personalized Reports", color: "text-cyan-300" },
    { icon: UserRound, title: "Expert Care", description: "Connect with Professionals", color: "text-cyan-300" },
    { icon: Heart, title: "Support", description: "24/7 Resources", color: "text-cyan-300" }
  ];

  return (
    <section className="hero-gradient min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              AI-Powered Mental Health{" "}
              <span className="text-cyan-300">Detection</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Get personalized mental health insights using advanced Random Forest machine learning algorithms. 
              Start your journey to better mental wellness today.
            </p>

            {/* Age Selection */}
            <Card className="glass-effect border-white/20 mb-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">Start Your Assessment</h3>
                <p className="text-primary-foreground/90 mb-4">Select your age group to begin:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {ageGroups.map((age) => (
                    <Button
                      key={age}
                      variant={selectedAge === age ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedAge(age)}
                      className={`${
                        selectedAge === age 
                          ? "bg-white/30 text-white" 
                          : "bg-white/20 hover:bg-white/30 text-white"
                      } transition-all transform hover:scale-105`}
                    >
                      {age}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/assessment">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  Start Assessment
                </Button>
              </Link>
              <Link href="/insights">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:pl-12 animate-fade-in">
            <Card className="glass-effect border-white/20">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="bg-white/20 rounded-2xl p-6 text-center">
                      <feature.icon className={`h-10 w-10 ${feature.color} mb-4 mx-auto`} />
                      <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-primary-foreground/80">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
