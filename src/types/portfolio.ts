import { z } from "zod";

export interface Project {
  number: string;
  title: string;
  description: string;
  tech: string;
  image: string;
  url: string;
  year?: string;
  category?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface SkillCategory {
  number: string;
  title: string;
  subtitle: string;
  tools: string[];
}

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
