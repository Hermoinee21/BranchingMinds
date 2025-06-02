#!/usr/bin/env python3
import sys
import json
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')

def analyze_mental_health(responses):
    """
    Random Forest ML analysis for mental health condition detection
    """
    
    # Extract features from responses
    features = extract_features(responses)
    
    # Initialize Random Forest models for different conditions
    models = initialize_models()
    
    # Predict conditions and severity
    results = {
        'conditions': [],
        'severity': 'Mild',
        'confidence': 0,
        'recommendations': []
    }
    
    # Analyze each condition
    conditions_detected = []
    severity_scores = []
    
    for condition, model in models.items():
        probability = model.predict_proba([features])[0][1]  # Probability of having condition
        
        if probability > 0.3:  # Threshold for condition detection
            conditions_detected.append({
                'condition': condition,
                'probability': float(probability),
                'severity': determine_severity(probability)
            })
            severity_scores.append(probability)
    
    if conditions_detected:
        results['conditions'] = conditions_detected
        
        # Overall severity based on highest probability
        max_severity_score = max(severity_scores)
        results['severity'] = determine_severity(max_severity_score)
        results['confidence'] = int(max_severity_score * 100)
        
        # Generate recommendations
        results['recommendations'] = generate_recommendations(conditions_detected, results['severity'])
    else:
        results['conditions'] = [{'condition': 'No significant conditions detected', 'probability': 0.1, 'severity': 'Minimal'}]
        results['confidence'] = 85
        results['recommendations'] = generate_wellness_recommendations()
    
    return results

def extract_features(responses):
    """
    Extract numerical features from assessment responses
    """
    features = []
    
    # Sleep features (0-4 scale)
    sleep_quality = responses.get('sleep', {}).get('quality', 2)
    sleep_duration = responses.get('sleep', {}).get('duration', 7)
    sleep_problems = responses.get('sleep', {}).get('problems', 1)
    
    features.extend([sleep_quality, sleep_duration/10, sleep_problems])
    
    # Nutrition features (0-4 scale)
    eating_patterns = responses.get('nutrition', {}).get('patterns', 2)
    appetite_changes = responses.get('nutrition', {}).get('appetite', 1)
    
    features.extend([eating_patterns, appetite_changes])
    
    # Emotional features (0-4 scale)
    mood_rating = responses.get('emotions', {}).get('mood', 2)
    anxiety_level = responses.get('emotions', {}).get('anxiety', 1)
    hopelessness = responses.get('emotions', {}).get('hopelessness', 1)
    
    features.extend([mood_rating, anxiety_level, hopelessness])
    
    # Social features (0-4 scale)
    social_isolation = responses.get('social', {}).get('isolation', 1)
    relationship_issues = responses.get('social', {}).get('relationships', 1)
    
    features.extend([social_isolation, relationship_issues])
    
    # Cognitive features (0-4 scale)
    concentration = responses.get('cognitive', {}).get('concentration', 2)
    memory_issues = responses.get('cognitive', {}).get('memory', 1)
    decision_making = responses.get('cognitive', {}).get('decisions', 2)
    
    features.extend([concentration, memory_issues, decision_making])
    
    # Daily functioning features (0-4 scale)
    work_performance = responses.get('daily', {}).get('work', 2)
    daily_tasks = responses.get('daily', {}).get('tasks', 2)
    energy_level = responses.get('daily', {}).get('energy', 2)
    
    features.extend([work_performance, daily_tasks, energy_level])
    
    return features

def initialize_models():
    """
    Initialize pre-trained Random Forest models for each condition
    Note: In production, these would be loaded from saved model files
    """
    models = {}
    
    # Generate mock training data and train models
    np.random.seed(42)
    
    conditions = ['Depression', 'Anxiety', 'Bipolar Disorder', 'Eating Disorders', 'Sleep Disorders']
    
    for condition in conditions:
        # Create mock training data (in production, use real training data)
        X_train = np.random.rand(1000, 15)  # 15 features
        
        # Create labels based on condition-specific patterns
        if condition == 'Depression':
            y_train = (X_train[:, 5] + X_train[:, 6] + X_train[:, 7] > 1.8).astype(int)
        elif condition == 'Anxiety':
            y_train = (X_train[:, 6] + X_train[:, 8] + X_train[:, 9] > 1.5).astype(int)
        elif condition == 'Bipolar Disorder':
            y_train = (X_train[:, 5] + X_train[:, 14] > 1.2).astype(int)
        elif condition == 'Eating Disorders':
            y_train = (X_train[:, 3] + X_train[:, 4] > 1.0).astype(int)
        else:  # Sleep Disorders
            y_train = (X_train[:, 0] + X_train[:, 1] + X_train[:, 2] > 1.5).astype(int)
        
        # Train Random Forest model
        model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            random_state=42,
            class_weight='balanced'
        )
        model.fit(X_train, y_train)
        models[condition] = model
    
    return models

def determine_severity(probability):
    """
    Determine severity level based on probability score
    """
    if probability < 0.4:
        return 'Mild'
    elif probability < 0.7:
        return 'Moderate'
    else:
        return 'Severe'

def generate_recommendations(conditions, severity):
    """
    Generate personalized recommendations based on detected conditions
    """
    recommendations = []
    
    condition_names = [c['condition'] for c in conditions]
    
    if 'Depression' in condition_names:
        recommendations.extend([
            'Establish a consistent daily routine',
            'Engage in regular physical activity',
            'Practice mindfulness meditation 10-15 minutes daily',
            'Consider cognitive behavioral therapy (CBT)'
        ])
    
    if 'Anxiety' in condition_names:
        recommendations.extend([
            'Practice deep breathing exercises',
            'Try progressive muscle relaxation',
            'Limit caffeine intake',
            'Consider exposure therapy for specific fears'
        ])
    
    if 'Sleep Disorders' in condition_names:
        recommendations.extend([
            'Maintain consistent sleep schedule',
            'Create a relaxing bedtime routine',
            'Avoid screens 1 hour before bed',
            'Consider sleep hygiene consultation'
        ])
    
    if 'Eating Disorders' in condition_names:
        recommendations.extend([
            'Work with a registered dietitian',
            'Practice mindful eating techniques',
            'Avoid restrictive dieting',
            'Consider family-based therapy'
        ])
    
    if 'Bipolar Disorder' in condition_names:
        recommendations.extend([
            'Maintain mood tracking journal',
            'Establish regular sleep patterns',
            'Consider mood stabilizing medications',
            'Engage in psychoeducation programs'
        ])
    
    # Add severity-specific recommendations
    if severity == 'Severe':
        recommendations.insert(0, 'Seek immediate professional mental health support')
        recommendations.insert(1, 'Consider intensive outpatient programs')
    elif severity == 'Moderate':
        recommendations.insert(0, 'Schedule appointment with mental health professional')
    
    return recommendations[:6]  # Limit to 6 recommendations

def generate_wellness_recommendations():
    """
    Generate general wellness recommendations when no conditions detected
    """
    return [
        'Maintain regular exercise routine',
        'Practice stress management techniques',
        'Ensure adequate sleep (7-9 hours)',
        'Build strong social connections',
        'Engage in hobbies and meaningful activities',
        'Consider periodic mental health check-ins'
    ]

if __name__ == "__main__":
    try:
        # Get responses from command line argument
        responses_json = sys.argv[1]
        responses = json.loads(responses_json)
        
        # Analyze mental health
        results = analyze_mental_health(responses)
        
        # Output results as JSON
        print(json.dumps(results))
        
    except Exception as e:
        error_result = {
            'conditions': [{'condition': 'Analysis Error', 'probability': 0, 'severity': 'Unknown'}],
            'severity': 'Unknown',
            'confidence': 0,
            'recommendations': ['Please try the assessment again or contact support']
        }
        print(json.dumps(error_result))
        sys.exit(1)
