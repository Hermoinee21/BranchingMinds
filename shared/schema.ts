import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  age: integer("age").notNull(),
  ageGroup: text("age_group").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  responses: json("responses").notNull(),
  conditions: json("conditions").notNull(),
  severity: text("severity").notNull(),
  confidence: integer("confidence").notNull(),
  recommendations: json("recommendations").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export const psychiatrists = pgTable("psychiatrists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  specializations: json("specializations").notNull(),
  experience: integer("experience").notNull(),
  rating: integer("rating").notNull(),
  reviewCount: integer("review_count").notNull(),
  sessionTypes: json("session_types").notNull(),
  pricePerSession: integer("price_per_session").notNull(),
  availableSlots: json("available_slots").notNull(),
  imageUrl: text("image_url"),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  psychiatristId: integer("psychiatrist_id").references(() => psychiatrists.id).notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  sessionType: text("session_type").notNull(),
  notes: text("notes"),
  status: text("status").default("scheduled").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  readTime: integer("read_time").notNull(),
  category: text("category").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  age: true,
  ageGroup: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).pick({
  userId: true,
  responses: true,
  conditions: true,
  severity: true,
  confidence: true,
  recommendations: true,
});

export const insertAppointmentSchema = createInsertSchema(appointments).pick({
  userId: true,
  psychiatristId: true,
  date: true,
  time: true,
  sessionType: true,
  notes: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessments.$inferSelect;
export type Psychiatrist = typeof psychiatrists.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;
export type Article = typeof articles.$inferSelect;

export const questionCategories = [
  'sleep',
  'nutrition', 
  'emotions',
  'social',
  'cognitive',
  'daily'
] as const;

export const conditionTypes = [
  'Depression',
  'Anxiety', 
  'Bipolar Disorder',
  'Eating Disorders',
  'Sleep Disorders'
] as const;

export const severityLevels = [
  'Mild',
  'Moderate', 
  'Severe'
] as const;
