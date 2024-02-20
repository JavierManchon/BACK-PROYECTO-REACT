import { z } from 'zod';

export const createGameSchema = z.object({
    title: z.string({
        required_error: 'Title is required'
    }),
    rating: z.string({
        required_error: 'Rating is required'
    }),
    review: z.string({
        required_error: 'Review must be a string'
    })
});