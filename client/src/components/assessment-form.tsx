import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface AssessmentFormProps {
  step: string;
  responses: any;
  setResponses: (responses: any) => void;
  ageGroup: string;
  setAgeGroup: (age: string) => void;
}

export default function AssessmentForm({ 
  step, 
  responses, 
  setResponses, 
  ageGroup, 
  setAgeGroup 
}: AssessmentFormProps) {
  
  const updateResponse = (category: string, field: string, value: any) => {
    setResponses((prev: any) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const ageGroups = ["13-17", "18-25", "26-40", "40+"];

  const renderAgeSelection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Please select your age group:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ageGroups.map((age) => (
            <Button
              key={age}
              variant={ageGroup === age ? "default" : "outline"}
              onClick={() => setAgeGroup(age)}
              className="h-16 text-lg"
            >
              {age}
            </Button>
          ))}
        </div>
      </div>
      <div className="bg-muted rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          Your age group helps us tailor the assessment questions to be most relevant for your life stage and circumstances.
        </p>
      </div>
    </div>
  );

  const renderSleepQuestions = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">How would you rate your overall sleep quality?</Label>
        <RadioGroup
          value={responses.sleep?.quality?.toString() || ""}
          onValueChange={(value) => updateResponse("sleep", "quality", parseInt(value))}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="sleep-quality-0" />
            <Label htmlFor="sleep-quality-0">Very Poor</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="sleep-quality-1" />
            <Label htmlFor="sleep-quality-1">Poor</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="sleep-quality-2" />
            <Label htmlFor="sleep-quality-2">Fair</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="sleep-quality-3" />
            <Label htmlFor="sleep-quality-3">Good</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="sleep-quality-4" />
            <Label htmlFor="sleep-quality-4">Excellent</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium">How many hours of sleep do you typically get per night?</Label>
        <RadioGroup
          value={responses.sleep?.duration?.toString() || ""}
          onValueChange={(value) => updateResponse("sleep", "duration", parseInt(value))}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="sleep-duration-4" />
            <Label htmlFor="sleep-duration-4">Less than 5 hours</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="6" id="sleep-duration-6" />
            <Label htmlFor="sleep-duration-6">5-6 hours</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="7" id="sleep-duration-7" />
            <Label htmlFor="sleep-duration-7">7-8 hours</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="9" id="sleep-duration-9" />
            <Label htmlFor="sleep-duration-9">9+ hours</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium">How often do you have trouble falling or staying asleep?</Label>
        <RadioGroup
          value={responses.sleep?.problems?.toString() || ""}
          onValueChange={(value) => updateResponse("sleep", "problems", parseInt(value))}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="sleep-problems-0" />
            <Label htmlFor="sleep-problems-0">Never</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="sleep-problems-1" />
            <Label htmlFor="sleep-problems-1">Rarely</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="sleep-problems-2" />
            <Label htmlFor="sleep-problems-2">Sometimes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="sleep-problems-3" />
            <Label htmlFor="sleep-problems-3">Often</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="sleep-problems-4" />
            <Label htmlFor="sleep-problems-4">Always</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderNutritionQuestions = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">How would you describe your eating patterns?</Label>
        <RadioGroup
          value={responses.nutrition?.patterns?.toString() || ""}
          onValueChange={(value) => updateResponse("nutrition", "patterns", parseInt(value))}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="nutrition-patterns-0" />
            <Label htmlFor="nutrition-patterns-0">Very irregular, often skip meals</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="nutrition-patterns-1" />
            <Label htmlFor="nutrition-patterns-1">Somewhat irregular</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="nutrition-patterns-2" />
            <Label htmlFor="nutrition-patterns-2">Fairly regular</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="nutrition-patterns-3" />
            <Label htmlFor="nutrition-patterns-3">Very regular, balanced meals</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium">Have you noticed changes in your appetite recently?</Label>
        <RadioGroup
          value={responses.nutrition?.appetite?.toString() || ""}
          onValueChange={(value) => updateResponse("nutrition", "appetite", parseInt(value))}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="nutrition-appetite-0" />
            <Label htmlFor="nutrition-appetite-0">Significant decrease</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="nutrition-appetite-1" />
            <Label htmlFor="nutrition-appetite-1">Slight decrease</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="nutrition-appetite-2" />
            <Label htmlFor="nutrition-appetite-2">No change</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="nutrition-appetite-3" />
            <Label htmlFor="nutrition-appetite-3">Slight increase</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="nutrition-appetite-4" />
            <Label htmlFor="nutrition-appetite-4">Significant increase</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderEmotionsQuestions = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">How would you rate your overall mood in the past two weeks?</Label>
        <RadioGroup
          value={responses.emotions?.mood?.toString() || ""}
          onValueChange={(value) => updateResponse("emotions", "mood", parseInt(value))}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="emotions-mood-0" />
            <Label htmlFor="emotions-mood-0">Very low/depressed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="emotions-mood-1" />
            <Label htmlFor="emotions-mood-1">Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="emotions-mood-2" />
            <Label htmlFor="emotions-mood-2">Neutral</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="emotions-mood-3" />
            <Label htmlFor="emotions-mood-3">Good</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="emotions-mood-4" />
            <Label htmlFor="emotions-mood-4">Very good</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium">How often do you feel anxious or worried?</Label>
        <RadioGroup
          value={responses.emotions?.anxiety?.toString() || ""}
          onValueChange={(value) => updateResponse("emotions", "anxiety", parseInt(value))}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="emotions-anxiety-0" />
            <Label htmlFor="emotions-anxiety-0">Never</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="emotions-anxiety-1" />
            <Label htmlFor="emotions-anxiety-1">Rarely</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="emotions-anxiety-2" />
            <Label htmlFor="emotions-anxiety-2">Sometimes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="emotions-anxiety-3" />
            <Label htmlFor="emotions-anxiety-3">Often</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="emotions-anxiety-4" />
            <Label htmlFor="emotions-anxiety-4">Almost always</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium">How often do you feel hopeless about the future?</Label>
        <RadioGroup
          value={responses.emotions?.hopelessness?.toString() || ""}
          onValueChange={(value) => updateResponse("emotions", "hopelessness", parseInt(value))}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="emotions-hopelessness-0" />
            <Label htmlFor="emotions-hopelessness-0">Never</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="emotions-hopelessness-1" />
            <Label htmlFor="emotions-hopelessness-1">Rarely</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="emotions-hopelessness-2" />
            <Label htmlFor="emotions-hopelessness-2">Sometimes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="emotions-hopelessness-3" />
            <Label htmlFor="emotions-hopelessness-3">Often</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="emotions-hopelessness-4" />
            <Label htmlFor="emotions-hopelessness-4">Almost always</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderSocialQuestions = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">How often do you feel isolated or disconnected from others?</Label>
        <RadioGroup
          value={responses.social?.isolation?.toString() || ""}
          onValueChange={(value) => updateResponse("social", "isolation", parseInt(value))}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="social-isolation-0" />
            <Label htmlFor="social-isolation-0">Never</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="social-isolation-1" />
            <Label htmlFor="social-isolation-1">Rarely</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="social-isolation-2" />
            <Label htmlFor="social-isolation-2">Sometimes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="social-isolation-3" />
            <Label htmlFor="social-isolation-3">Often</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="social-isolation-4" />
            <Label htmlFor="social-isolation-4">Almost always</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium">How would you describe your relationships with family and friends?</Label>
        <RadioGroup
          value={responses.social?.relationships?.toString() || ""}
          onValueChange={(value) => updateResponse("social", "relationships", parseInt(value))}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="social-relationships-0" />
            <Label htmlFor="social-relationships-0">Very strained/conflicted</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="social-relationships-1" />
            <Label htmlFor="social-relationships-1">Somewhat strained</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="social-relationships-2" />
            <Label htmlFor="social-relationships-2">Neutral/stable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="social-relationships-3" />
            <Label htmlFor="social-relationships-3">Good</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="social-relationships-4" />
            <Label htmlFor="social-relationships-4">Very strong/supportive</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderCognitiveQuestions = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">How is your ability to concentrate and focus?</Label>
        <RadioGroup
          value={responses.cognitive?.concentration?.toString() || ""}
          onValueChange={(value) => updateResponse("cognitive", "concentration", parseInt(value))}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="cognitive-concentration-0" />
            <Label htmlFor="cognitive-concentration-0">Very poor</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="cognitive-concentration-1" />
            <Label htmlFor="cognitive-concentration-1">Poor</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="cognitive-concentration-2" />
            <Label htmlFor="cognitive-concentration-2">Fair</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="cognitive-concentration-3" />
            <Label htmlFor="cognitive-concentration-3">Good</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="cognitive-concentration-4" />
            <Label htmlFor="cognitive-concentration-4">Excellent</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium">Do you have trouble with memory or forgetfulness?</Label>
        <RadioGroup
          value={responses.cognitive?.memory?.toString() || ""}
          onValueChange={(value) => updateResponse("cognitive", "memory", parseInt(value))}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="cognitive-memory-0" />
            <Label htmlFor="cognitive-memory-0">No problems</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="cognitive-memory-1" />
            <Label htmlFor="cognitive-memory-1">Minor issues</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="cognitive-memory-2" />
            <Label htmlFor="cognitive-memory-2">Moderate issues</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="cognitive-memory-3" />
            <Label htmlFor="cognitive-memory-3">Significant issues</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="cognitive-memory-4" />
            <Label htmlFor="cognitive-memory-4">Severe problems</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium">How difficult is it for you to make decisions?</Label>
        <RadioGroup
          value={responses.cognitive?.decisions?.toString() || ""}
          onValueChange={(value) => updateResponse("cognitive", "decisions", parseInt(value))}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="cognitive-decisions-0" />
            <Label htmlFor="cognitive-decisions-0">Very difficult</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="cognitive-decisions-1" />
            <Label htmlFor="cognitive-decisions-1">Somewhat difficult</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="cognitive-decisions-2" />
            <Label htmlFor="cognitive-decisions-2">Normal</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="cognitive-decisions-3" />
            <Label htmlFor="cognitive-decisions-3">Easy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="cognitive-decisions-4" />
            <Label htmlFor="cognitive-decisions-4">Very easy</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  const renderDailyQuestions = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">How is your performance at work or school?</Label>
        <RadioGroup
          value={responses.daily?.work?.toString() || ""}
          onValueChange={(value) => updateResponse("daily", "work", parseInt(value))}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="daily-work-0" />
            <Label htmlFor="daily-work-0">Significantly declined</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="daily-work-1" />
            <Label htmlFor="daily-work-1">Somewhat declined</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="daily-work-2" />
            <Label htmlFor="daily-work-2">No change</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="daily-work-3" />
            <Label htmlFor="daily-work-3">Good</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="daily-work-4" />
            <Label htmlFor="daily-work-4">Excellent</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium">How well are you managing daily tasks and responsibilities?</Label>
        <RadioGroup
          value={responses.daily?.tasks?.toString() || ""}
          onValueChange={(value) => updateResponse("daily", "tasks", parseInt(value))}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="daily-tasks-0" />
            <Label htmlFor="daily-tasks-0">Very poorly</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="daily-tasks-1" />
            <Label htmlFor="daily-tasks-1">Poorly</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="daily-tasks-2" />
            <Label htmlFor="daily-tasks-2">Adequately</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="daily-tasks-3" />
            <Label htmlFor="daily-tasks-3">Well</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="daily-tasks-4" />
            <Label htmlFor="daily-tasks-4">Very well</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium">How would you describe your energy levels?</Label>
        <RadioGroup
          value={responses.daily?.energy?.toString() || ""}
          onValueChange={(value) => updateResponse("daily", "energy", parseInt(value))}
          className="mt-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="daily-energy-0" />
            <Label htmlFor="daily-energy-0">Very low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="daily-energy-1" />
            <Label htmlFor="daily-energy-1">Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="daily-energy-2" />
            <Label htmlFor="daily-energy-2">Moderate</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="daily-energy-3" />
            <Label htmlFor="daily-energy-3">High</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="daily-energy-4" />
            <Label htmlFor="daily-energy-4">Very high</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  switch (step) {
    case "age":
      return renderAgeSelection();
    case "sleep":
      return renderSleepQuestions();
    case "nutrition":
      return renderNutritionQuestions();
    case "emotions":
      return renderEmotionsQuestions();
    case "social":
      return renderSocialQuestions();
    case "cognitive":
      return renderCognitiveQuestions();
    case "daily":
      return renderDailyQuestions();
    default:
      return <div>Unknown step</div>;
  }
}
