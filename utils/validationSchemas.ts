import { z } from 'zod';

const name = z
	.string()
	.trim()
	.min(1, 'Please, fill this field')
	.min(4, 'The name must be at least 4 characters');

const email = z
	.string()
	.trim()
	.min(1, 'Please, fill this field')
	.email('The email is not valid');

const password = z
	.string()
	.trim()
	.min(1, 'Please, fill this field')
	.min(8, 'The password must have at least 8 characters');

export const contactFormValidation = z.object({
	name,
	email,
	message: z.string(),
});

export const loginFormValidation = z.object({
	email,
	password,
});

export const registerFormValidation = z.object({
	username: name,
	email,
	password,
});

export const newPostFormValidation = z.object({
	title: z.string().trim().min(1, 'Please, fill this field'),
	description: z.string().trim().min(1, 'Please, fill this field'),
	image: z.string().trim().min(1, 'Please, fill this field'),
	content: z.string().trim().min(1, 'Please, fill this field'),
});
