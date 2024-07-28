'use client';

import { usePostsContext } from '@/context/Posts.context';
import { NewPostType } from '@/types/custom.types';
import { newPostFormValidation } from '@/utils/validationSchemas';
import { useState } from 'react';
import { ZodError } from 'zod';

type FormErrorType = Partial<NewPostType>;

const formSchema: NewPostType = {
	title: '',
	description: '',
	image: '',
	content: '',
};

function NewPostForm(): JSX.Element {
	const [formData, setFormData] = useState<NewPostType>(formSchema);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<FormErrorType | null>(null);
	const { handleAddNewPost } = usePostsContext();

	async function handleSubmit(
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		e.preventDefault();

		setIsLoading(true);
		setError(null);
		try {
			const parsedData = newPostFormValidation.parse(formData);
			await handleAddNewPost(parsedData);
			setFormData(formSchema);
		} catch (error) {
			if (error instanceof ZodError) {
				const e = error.errors[0];
				setError({
					[e.path[0]]: e.message,
				});
			}
		} finally {
			setIsLoading(false);
		}
	}

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className='form__group'>
				<input
					onChange={handleChange}
					value={formData.title}
					type='text'
					name='title'
					id='titleInput'
					placeholder='Title'
					className='form__control'
				/>
				{error?.title && (
					<small className='c-danger-500'>{error.title}</small>
				)}
			</div>
			<div className='form__group'>
				<input
					onChange={handleChange}
					value={formData.description}
					type='text'
					name='description'
					id='descriptionInput'
					placeholder='Description'
					className='form__control'
				/>
				{error?.description && (
					<small className='c-danger-500'>{error.description}</small>
				)}
			</div>
			<div className='form__group'>
				<input
					onChange={handleChange}
					value={formData.image}
					type='url'
					name='image'
					id='imageInput'
					placeholder='Image'
					className='form__control'
				/>
				{error?.image && (
					<small className='c-danger-500'>{error.image}</small>
				)}
			</div>
			<div className='form__group'>
				<textarea
					onChange={handleChange}
					value={formData.content}
					name='content'
					id='contentInput'
					placeholder='Content'
					className='form__control form__control--textarea'
				></textarea>
				{error?.content && (
					<small className='c-danger-500'>{error.content}</small>
				)}
			</div>
			<button
				data-testid='dashboard-submit-button'
				type='submit'
				className='button button--primary w-100'
				disabled={isLoading}
			>
				{isLoading ? 'ADDING...' : 'ADD'}
			</button>
		</form>
	);
}

export default NewPostForm;
