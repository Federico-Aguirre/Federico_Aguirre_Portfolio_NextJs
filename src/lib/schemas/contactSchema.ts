import { z } from "zod"

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "errorMinName" })
    .max(50, { message: "errorMaxName" })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑäëïöüÄËÏÖÜ\s'-]+$/, { message: "errorInvalidName" }), // Solo letras y espacios
  
  email: z
    .string()
    .trim()
    .email({ message: "errorInvalidEmail" })
    .max(100, { message: "errorMaxEmail" }),
  
  affair: z
    .string()
    .trim()
    .min(3, { message: "errorMinAffair" })
    .max(100, { message: "errorMaxAffair" }),
  
  consultation: z
    .string()
    .trim()
    .min(10, { message: "errorMinMessage" })
    .max(1000, { message: "errorMaxMessage" }),

  // Trampa Honeypot para bots
  hp_company: z.string().max(0, { message: "Bot detected" }).optional(),
  
  // Timestamp de control de velocidad
  formTimestamp: z.number()
})

export type ContactFormData = z.infer<typeof contactSchema>