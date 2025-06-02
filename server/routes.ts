import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertAssessmentSchema, insertAppointmentSchema } from "@shared/schema";
import { spawn } from "child_process";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Users
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Assessments with ML Analysis
  app.post("/api/assessments", async (req, res) => {
    try {
      const { userId, responses } = req.body;
      
      // Call Python ML service for analysis
      const mlResults = await callMLService(responses);
      
      const assessmentData = insertAssessmentSchema.parse({
        userId,
        responses,
        conditions: mlResults.conditions,
        severity: mlResults.severity,
        confidence: mlResults.confidence,
        recommendations: mlResults.recommendations
      });
      
      const assessment = await storage.createAssessment(assessmentData);
      res.json(assessment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/assessments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const assessment = await storage.getAssessment(id);
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }
      res.json(assessment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/users/:userId/assessments", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const assessments = await storage.getAssessmentsByUser(userId);
      res.json(assessments);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Psychiatrists
  app.get("/api/psychiatrists", async (req, res) => {
    try {
      const { specialization } = req.query;
      let psychiatrists;
      
      if (specialization) {
        psychiatrists = await storage.getPsychiatristsBySpecialization(specialization as string);
      } else {
        psychiatrists = await storage.getAllPsychiatrists();
      }
      
      res.json(psychiatrists);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/psychiatrists/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const psychiatrist = await storage.getPsychiatrist(id);
      if (!psychiatrist) {
        return res.status(404).json({ message: "Psychiatrist not found" });
      }
      res.json(psychiatrist);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Appointments
  app.post("/api/appointments", async (req, res) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(appointmentData);
      res.json(appointment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/users/:userId/appointments", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const appointments = await storage.getAppointmentsByUser(userId);
      res.json(appointments);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Articles
  app.get("/api/articles", async (req, res) => {
    try {
      const { category } = req.query;
      let articles;
      
      if (category) {
        articles = await storage.getArticlesByCategory(category as string);
      } else {
        articles = await storage.getAllArticles();
      }
      
      res.json(articles);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Dashboard analytics
  app.get("/api/analytics/dashboard", async (req, res) => {
    try {
      // Return mock analytics data for dashboard
      const analytics = {
        totalAssessments: 15000,
        populationWithConditions: 24.7,
        earlyDetectionRate: 68,
        improvementRate: 42,
        ageDistribution: {
          labels: ['13-17', '18-25', '26-40', '40+'],
          datasets: [
            { label: 'Depression', data: [12, 19, 15, 8], backgroundColor: '#6366F1' },
            { label: 'Anxiety', data: [15, 22, 18, 12], backgroundColor: '#8B5CF6' },
            { label: 'Bipolar', data: [3, 5, 7, 4], backgroundColor: '#06B6D4' }
          ]
        },
        conditionPrevalence: {
          labels: ['Depression', 'Anxiety', 'Bipolar Disorder', 'Eating Disorders', 'Other'],
          data: [30, 25, 15, 12, 18],
          backgroundColor: ['#6366F1', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B']
        },
        severityDistribution: {
          labels: ['Mild', 'Moderate', 'Severe'],
          data: [45, 35, 20],
          backgroundColor: ['#10B981', '#F59E0B', '#EF4444']
        },
        monthlyTrends: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          data: [65, 75, 80, 88, 92, 98, 105, 112, 118, 125, 132, 140]
        }
      };
      
      res.json(analytics);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// ML Service Integration
async function callMLService(responses: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', [
      path.join(import.meta.dirname, 'ml-api.py'),
      JSON.stringify(responses)
    ]);

    let result = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          const mlResults = JSON.parse(result);
          resolve(mlResults);
        } catch (e) {
          reject(new Error('Failed to parse ML results'));
        }
      } else {
        reject(new Error(`ML service failed: ${error}`));
      }
    });
  });
}
