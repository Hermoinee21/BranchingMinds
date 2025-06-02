export interface MLAnalysisRequest {
  responses: {
    sleep?: {
      quality: number;
      duration: number;
      problems: number;
    };
    nutrition?: {
      patterns: number;
      appetite: number;
    };
    emotions?: {
      mood: number;
      anxiety: number;
      hopelessness: number;
    };
    social?: {
      isolation: number;
      relationships: number;
    };
    cognitive?: {
      concentration: number;
      memory: number;
      decisions: number;
    };
    daily?: {
      work: number;
      tasks: number;
      energy: number;
    };
  };
}

export interface MLCondition {
  condition: string;
  probability: number;
  severity: string;
}

export interface MLAnalysisResult {
  conditions: MLCondition[];
  severity: string;
  confidence: number;
  recommendations: string[];
}

export class MLService {
  private static instance: MLService;

  private constructor() {}

  public static getInstance(): MLService {
    if (!MLService.instance) {
      MLService.instance = new MLService();
    }
    return MLService.instance;
  }

  /**
   * Analyze mental health responses using Random Forest algorithm
   */
  async analyzeResponses(request: MLAnalysisRequest): Promise<MLAnalysisResult> {
    try {
      // In a real implementation, this would call the Python ML service
      // For now, we'll simulate the Random Forest analysis
      return this.simulateRandomForestAnalysis(request);
    } catch (error) {
      console.error('ML Analysis failed:', error);
      throw new Error('Failed to analyze mental health responses');
    }
  }

  /**
   * Simulate Random Forest ML analysis
   * In production, this would call the actual Python service
   */
  private simulateRandomForestAnalysis(request: MLAnalysisRequest): MLAnalysisResult {
    const { responses } = request;
    
    // Extract and normalize features
    const features = this.extractFeatures(responses);
    
    // Simulate Random Forest prediction for each condition
    const conditions: MLCondition[] = [];
    
    // Depression analysis
    const depressionScore = this.calculateDepressionScore(features);
    if (depressionScore > 0.3) {
      conditions.push({
        condition: 'Depression',
        probability: depressionScore,
        severity: this.determineSeverity(depressionScore)
      });
    }

    // Anxiety analysis
    const anxietyScore = this.calculateAnxietyScore(features);
    if (anxietyScore > 0.3) {
      conditions.push({
        condition: 'Anxiety',
        probability: anxietyScore,
        severity: this.determineSeverity(anxietyScore)
      });
    }

    // Sleep disorder analysis
    const sleepScore = this.calculateSleepScore(features);
    if (sleepScore > 0.3) {
      conditions.push({
        condition: 'Sleep Disorders',
        probability: sleepScore,
        severity: this.determineSeverity(sleepScore)
      });
    }

    // Eating disorder analysis
    const eatingScore = this.calculateEatingScore(features);
    if (eatingScore > 0.3) {
      conditions.push({
        condition: 'Eating Disorders',
        probability: eatingScore,
        severity: this.determineSeverity(eatingScore)
      });
    }

    // Bipolar disorder analysis
    const bipolarScore = this.calculateBipolarScore(features);
    if (bipolarScore > 0.3) {
      conditions.push({
        condition: 'Bipolar Disorder',
        probability: bipolarScore,
        severity: this.determineSeverity(bipolarScore)
      });
    }

    // If no significant conditions found
    if (conditions.length === 0) {
      conditions.push({
        condition: 'No significant conditions detected',
        probability: 0.1,
        severity: 'Minimal'
      });
    }

    // Calculate overall severity and confidence
    const maxScore = Math.max(...conditions.map(c => c.probability));
    const overallSeverity = this.determineSeverity(maxScore);
    const confidence = Math.min(95, Math.max(75, Math.round(maxScore * 100)));

    // Generate recommendations
    const recommendations = this.generateRecommendations(conditions, overallSeverity);

    return {
      conditions,
      severity: overallSeverity,
      confidence,
      recommendations
    };
  }

  private extractFeatures(responses: any): number[] {
    const features: number[] = [];
    
    // Sleep features
    const sleep = responses.sleep || {};
    features.push(
      (sleep.quality || 2) / 4,
      (sleep.duration || 7) / 12,
      (sleep.problems || 1) / 4
    );
    
    // Nutrition features
    const nutrition = responses.nutrition || {};
    features.push(
      (nutrition.patterns || 2) / 4,
      (nutrition.appetite || 2) / 4
    );
    
    // Emotional features
    const emotions = responses.emotions || {};
    features.push(
      (emotions.mood || 2) / 4,
      (emotions.anxiety || 1) / 4,
      (emotions.hopelessness || 1) / 4
    );
    
    // Social features
    const social = responses.social || {};
    features.push(
      (social.isolation || 1) / 4,
      (social.relationships || 2) / 4
    );
    
    // Cognitive features
    const cognitive = responses.cognitive || {};
    features.push(
      (cognitive.concentration || 2) / 4,
      (cognitive.memory || 1) / 4,
      (cognitive.decisions || 2) / 4
    );
    
    // Daily functioning features
    const daily = responses.daily || {};
    features.push(
      (daily.work || 2) / 4,
      (daily.tasks || 2) / 4,
      (daily.energy || 2) / 4
    );
    
    return features;
  }

  private calculateDepressionScore(features: number[]): number {
    // Simulate Random Forest for depression
    // Focus on mood, hopelessness, energy, and daily functioning
    const moodWeight = 0.3;
    const hopelessnessWeight = 0.25;
    const energyWeight = 0.2;
    const dailyFunctionWeight = 0.25;
    
    const score = 
      (1 - features[5]) * moodWeight +  // Inverted mood (low mood = high depression)
      features[7] * hopelessnessWeight + // Hopelessness
      (1 - features[15]) * energyWeight + // Inverted energy
      (1 - features[13]) * dailyFunctionWeight; // Inverted daily function
    
    return Math.min(0.95, Math.max(0, score + (Math.random() * 0.1 - 0.05)));
  }

  private calculateAnxietyScore(features: number[]): number {
    // Simulate Random Forest for anxiety
    // Focus on anxiety levels, sleep problems, and concentration
    const anxietyWeight = 0.4;
    const sleepProblemsWeight = 0.25;
    const concentrationWeight = 0.2;
    const socialWeight = 0.15;
    
    const score = 
      features[6] * anxietyWeight + // Anxiety level
      features[2] * sleepProblemsWeight + // Sleep problems
      (1 - features[10]) * concentrationWeight + // Inverted concentration
      features[8] * socialWeight; // Social isolation
    
    return Math.min(0.95, Math.max(0, score + (Math.random() * 0.1 - 0.05)));
  }

  private calculateSleepScore(features: number[]): number {
    // Focus on sleep-related features
    const qualityWeight = 0.4;
    const problemsWeight = 0.35;
    const energyWeight = 0.25;
    
    const score = 
      (1 - features[0]) * qualityWeight + // Inverted sleep quality
      features[2] * problemsWeight + // Sleep problems
      (1 - features[15]) * energyWeight; // Inverted energy
    
    return Math.min(0.95, Math.max(0, score + (Math.random() * 0.1 - 0.05)));
  }

  private calculateEatingScore(features: number[]): number {
    // Focus on nutrition and eating patterns
    const patternsWeight = 0.5;
    const appetiteWeight = 0.3;
    const moodWeight = 0.2;
    
    const score = 
      (1 - features[3]) * patternsWeight + // Inverted eating patterns
      Math.abs(features[4] - 0.5) * 2 * appetiteWeight + // Appetite changes (any direction)
      (1 - features[5]) * moodWeight; // Mood impact
    
    return Math.min(0.95, Math.max(0, score + (Math.random() * 0.1 - 0.05)));
  }

  private calculateBipolarScore(features: number[]): number {
    // Focus on mood variability and energy changes
    const moodWeight = 0.3;
    const energyWeight = 0.25;
    const sleepWeight = 0.25;
    const decisionWeight = 0.2;
    
    const score = 
      features[5] * moodWeight + // Mood (can be high or low)
      Math.abs(features[15] - 0.5) * 2 * energyWeight + // Energy variability
      features[2] * sleepWeight + // Sleep problems
      (1 - features[12]) * decisionWeight; // Decision difficulties
    
    return Math.min(0.95, Math.max(0, score + (Math.random() * 0.1 - 0.05)));
  }

  private determineSeverity(probability: number): string {
    if (probability < 0.4) return 'Mild';
    if (probability < 0.7) return 'Moderate';
    return 'Severe';
  }

  private generateRecommendations(conditions: MLCondition[], severity: string): string[] {
    const recommendations: string[] = [];
    const conditionNames = conditions.map(c => c.condition);
    
    // Severity-specific recommendations
    if (severity === 'Severe') {
      recommendations.push('Seek immediate professional mental health support');
      recommendations.push('Consider intensive outpatient programs');
    } else if (severity === 'Moderate') {
      recommendations.push('Schedule appointment with mental health professional');
    }
    
    // Condition-specific recommendations
    if (conditionNames.some(name => name.includes('Depression'))) {
      recommendations.push('Establish a consistent daily routine');
      recommendations.push('Engage in regular physical activity');
      recommendations.push('Practice mindfulness meditation 10-15 minutes daily');
    }
    
    if (conditionNames.some(name => name.includes('Anxiety'))) {
      recommendations.push('Practice deep breathing exercises');
      recommendations.push('Try progressive muscle relaxation techniques');
      recommendations.push('Limit caffeine intake');
    }
    
    if (conditionNames.some(name => name.includes('Sleep'))) {
      recommendations.push('Maintain consistent sleep schedule');
      recommendations.push('Create a relaxing bedtime routine');
      recommendations.push('Avoid screens 1 hour before bed');
    }
    
    if (conditionNames.some(name => name.includes('Eating'))) {
      recommendations.push('Work with a registered dietitian');
      recommendations.push('Practice mindful eating techniques');
      recommendations.push('Consider family-based therapy');
    }
    
    if (conditionNames.some(name => name.includes('Bipolar'))) {
      recommendations.push('Maintain mood tracking journal');
      recommendations.push('Establish regular sleep patterns');
      recommendations.push('Consider mood stabilizing medications');
    }
    
    // General wellness recommendations
    if (conditionNames.some(name => name.includes('No significant'))) {
      recommendations.push('Maintain regular exercise routine');
      recommendations.push('Practice stress management techniques');
      recommendations.push('Ensure adequate sleep (7-9 hours)');
      recommendations.push('Build strong social connections');
    }
    
    return recommendations.slice(0, 6); // Limit to 6 recommendations
  }

  /**
   * Get feature importance for Random Forest model explanation
   */
  getFeatureImportance(): { [key: string]: number } {
    return {
      'mood_rating': 0.15,
      'anxiety_level': 0.13,
      'sleep_quality': 0.12,
      'energy_level': 0.11,
      'daily_functioning': 0.10,
      'concentration': 0.09,
      'social_isolation': 0.08,
      'sleep_problems': 0.07,
      'hopelessness': 0.06,
      'eating_patterns': 0.05,
      'appetite_changes': 0.04
    };
  }

  /**
   * Validate assessment responses
   */
  validateResponses(responses: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Check required sections
    const requiredSections = ['sleep', 'nutrition', 'emotions', 'social', 'cognitive', 'daily'];
    for (const section of requiredSections) {
      if (!responses[section]) {
        errors.push(`Missing ${section} responses`);
      }
    }
    
    // Validate value ranges
    const validateRange = (value: any, min: number, max: number, field: string) => {
      if (typeof value !== 'number' || value < min || value > max) {
        errors.push(`Invalid value for ${field}: must be between ${min} and ${max}`);
      }
    };
    
    if (responses.sleep) {
      validateRange(responses.sleep.quality, 0, 4, 'sleep.quality');
      validateRange(responses.sleep.duration, 0, 24, 'sleep.duration');
      validateRange(responses.sleep.problems, 0, 4, 'sleep.problems');
    }
    
    // Add more validation as needed...
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export const mlService = MLService.getInstance();
