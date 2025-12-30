import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().optional(),
    marketing_consent: z.boolean().optional(),
    profiling_consent: z.boolean().optional()
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export const updateProfileSchema = z.object({
    name: z.string().min(2).optional(),
    phone: z.string().optional(),
    marketing_consent: z.boolean().optional(),
    profiling_consent: z.boolean().optional(),
    password: z.string().min(6).optional()
});

export const createOrderSchema = z.object({
    shippingAddress: z.object({
        name: z.string(),
        address: z.string(),
        city: z.string(),
        zip: z.string(),
        country: z.string()
    })
});

export const productSchema = z.object({
    category_id: z.number().int().optional(),
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().optional(),
    price: z.number().positive(),
    image_url: z.string().url().optional().or(z.literal('')),
    is_sold_out: z.boolean().optional(),
    is_best_seller: z.boolean().optional()
});

export const updateProductSchema = productSchema.partial();
