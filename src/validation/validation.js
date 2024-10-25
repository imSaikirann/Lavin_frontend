import { z } from 'zod';

export const formSchema = z.object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pinCode: z.string().length(6, "Pin Code must be 6 digits").regex(/^\d+$/, "Pin Code must be numeric"),
    country: z.string().min(1, "Country is required"),
    phone: z.string().length(10, "Phone number must be 10 digits").regex(/^\d+$/, "Phone number must be numeric"),
});