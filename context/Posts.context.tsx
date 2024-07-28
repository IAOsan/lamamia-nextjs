import apiService from '@/services/api.service';
import { IPost, NewPostType, PostIdType } from '@/types/custom.types';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';

interface IContext {
	data: Array<IPost>;
	status: 'loading' | 'error' | 'idle';
	handleAddNewPost: (newPost: NewPostType) => Promise<void>;
	handleRemovePost: (postId: string) => Promise<void>;
}

const PostsContext = createContext<IContext>({
	data: [],
	status: 'idle',
	handleAddNewPost: () => Promise.resolve(),
	handleRemovePost: () => Promise.resolve(),
});

export function usePostsContext() {
	const ctx = useContext(PostsContext);

	if (!ctx) {
		throw new Error(
			`The "usePostsContext" should must be used within "PostsContextProvider"`
		);
	}

	return ctx;
}

interface IProps {
	children: React.ReactNode;
}

function PostsContextProvider({ children }: IProps): JSX.Element {
	const [posts, setPosts] = useState<Array<IPost>>([]);
	const [status, setStatus] = useState<'loading' | 'idle' | 'error'>(
		'loading'
	);
	const { data: session } = useSession();

	useEffect(() => {
		if (!session) return;

		(async () => {
			try {
				const data = await apiService.getPostsByUser(session.user.id, {
					searchParams: {
						fields: 'title,image,createdAt',
						sortBy: 'createdAt',
						order: 'desc',
					},
					cache: 'no-store',
				});

				setPosts(data);
			} catch (error) {
				setStatus('error');
			} finally {
				setStatus('idle');
			}
		})();
	}, [session]);

	async function handleAddNewPost(newPost: NewPostType): Promise<void> {
		const originalPosts = posts;
		const post = {
			...newPost,
			userId: session?.user.id,
		};
		try {
			const data = await apiService.addPost(post);
			if (data) {
				setPosts((prevState) => {
					return [data!, ...prevState];
				});
			}
		} catch (error) {
			setPosts(originalPosts);
		}
	}

	async function handleRemovePost(postId: PostIdType): Promise<void> {
		const originalPosts = posts;
		try {
			await apiService.removeBlogPost(postId);
			setPosts((prevState) => {
				return prevState.filter((p) => String(p.id) !== String(postId));
			});
		} catch (error) {
			setPosts(originalPosts);
		}
	}

	return (
		<PostsContext.Provider
			value={{
				data: posts,
				status,
				handleAddNewPost,
				handleRemovePost,
			}}
		>
			{children}
		</PostsContext.Provider>
	);
}

export default PostsContextProvider;
