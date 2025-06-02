import { 
  users, assessments, psychiatrists, appointments, articles,
  type User, type InsertUser, type Assessment, type InsertAssessment,
  type Psychiatrist, type Appointment, type InsertAppointment, type Article
} from "@shared/schema";

export interface IStorage {
  // Users
  createUser(user: InsertUser): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  
  // Assessments
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  getAssessment(id: number): Promise<Assessment | undefined>;
  getAssessmentsByUser(userId: number): Promise<Assessment[]>;
  
  // Psychiatrists
  getAllPsychiatrists(): Promise<Psychiatrist[]>;
  getPsychiatrist(id: number): Promise<Psychiatrist | undefined>;
  getPsychiatristsBySpecialization(specialization: string): Promise<Psychiatrist[]>;
  
  // Appointments
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointmentsByUser(userId: number): Promise<Appointment[]>;
  
  // Articles
  getAllArticles(): Promise<Article[]>;
  getArticlesByCategory(category: string): Promise<Article[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private assessments: Map<number, Assessment>;
  private psychiatrists: Map<number, Psychiatrist>;
  private appointments: Map<number, Appointment>;
  private articles: Map<number, Article>;
  private currentUserId: number;
  private currentAssessmentId: number;
  private currentAppointmentId: number;

  constructor() {
    this.users = new Map();
    this.assessments = new Map();
    this.psychiatrists = new Map();
    this.appointments = new Map();
    this.articles = new Map();
    this.currentUserId = 1;
    this.currentAssessmentId = 1;
    this.currentAppointmentId = 1;
    
    this.initializePsychiatrists();
    this.initializeArticles();
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = this.currentAssessmentId++;
    const assessment: Assessment = {
      ...insertAssessment,
      id,
      completedAt: new Date()
    };
    this.assessments.set(id, assessment);
    return assessment;
  }

  async getAssessment(id: number): Promise<Assessment | undefined> {
    return this.assessments.get(id);
  }

  async getAssessmentsByUser(userId: number): Promise<Assessment[]> {
    return Array.from(this.assessments.values()).filter(
      assessment => assessment.userId === userId
    );
  }

  async getAllPsychiatrists(): Promise<Psychiatrist[]> {
    return Array.from(this.psychiatrists.values());
  }

  async getPsychiatrist(id: number): Promise<Psychiatrist | undefined> {
    return this.psychiatrists.get(id);
  }

  async getPsychiatristsBySpecialization(specialization: string): Promise<Psychiatrist[]> {
    return Array.from(this.psychiatrists.values()).filter(
      psychiatrist => (psychiatrist.specializations as string[]).includes(specialization)
    );
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = this.currentAppointmentId++;
    const appointment: Appointment = {
      ...insertAppointment,
      id,
      status: "scheduled",
      createdAt: new Date()
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async getAppointmentsByUser(userId: number): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      appointment => appointment.userId === userId
    );
  }

  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(
      article => article.category === category
    );
  }

  private initializePsychiatrists() {
    const psychiatrists: Psychiatrist[] = [
      {
        id: 1,
        name: "Dr. Sarah Chen",
        title: "Psychiatrist",
        specializations: ["Depression", "Anxiety", "PTSD"],
        experience: 15,
        rating: 49,
        reviewCount: 127,
        sessionTypes: ["Video Call", "In-Person"],
        pricePerSession: 120,
        availableSlots: ["Tomorrow 2:00 PM", "Friday 10:00 AM"],
        imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
      },
      {
        id: 2,
        name: "Dr. Michael Rodriguez",
        title: "Clinical Psychologist",
        specializations: ["CBT", "Bipolar Disorder", "Eating Disorders"],
        experience: 12,
        rating: 48,
        reviewCount: 93,
        sessionTypes: ["Video Call"],
        pricePerSession: 95,
        availableSlots: ["Today 4:30 PM", "Tomorrow 9:00 AM"],
        imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop"
      },
      {
        id: 3,
        name: "Dr. Emily Johnson",
        title: "Psychiatrist",
        specializations: ["Depression", "Sleep Disorders"],
        experience: 20,
        rating: 47,
        reviewCount: 156,
        sessionTypes: ["Video Call", "Phone Call"],
        pricePerSession: 140,
        availableSlots: ["Friday 10:00 AM", "Monday 3:00 PM"],
        imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"
      }
    ];

    psychiatrists.forEach(psychiatrist => {
      this.psychiatrists.set(psychiatrist.id, psychiatrist);
    });
  }

  private initializeArticles() {
    const articles: Article[] = [
      {
        id: 1,
        title: "Understanding Depression: Signs, Symptoms & Treatment",
        summary: "Learn about the different types of depression and evidence-based treatment approaches.",
        readTime: 8,
        category: "Depression",
        updatedAt: new Date()
      },
      {
        id: 2,
        title: "Anxiety Management: Practical Coping Strategies",
        summary: "Discover effective techniques for managing anxiety in daily life.",
        readTime: 6,
        category: "Anxiety",
        updatedAt: new Date(Date.now() - 86400000) // yesterday
      },
      {
        id: 3,
        title: "Sleep and Mental Health: The Critical Connection",
        summary: "Explore how sleep quality impacts mental wellness and mood regulation.",
        readTime: 5,
        category: "Sleep",
        updatedAt: new Date(Date.now() - 172800000) // 2 days ago
      }
    ];

    articles.forEach(article => {
      this.articles.set(article.id, article);
    });
  }
}

export const storage = new MemStorage();
