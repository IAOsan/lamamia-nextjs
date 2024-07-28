import ContactForm from '@/components/contact/ContactForm.component';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
	title: 'lamamia | Contact',
	description:
		"Do you have questions, comments or just want to say hello? We're here to listen! Use the contact form or find our social media channels to connect with us",
};

function ContactPage() {
	return (
		<main>
			<div className='container'>
				<h1 className='h2 text-center mb-32'>{"Let's"} Keep in Touch</h1>
				<div className='grid'>
					<div className='col-lg-8'>
						<Image
							src='/images/contact.svg'
							alt=''
							width={600}
							height={600}
						/>
					</div>
					<div className='col-lg-8'>
						<ContactForm />
					</div>
				</div>
			</div>
		</main>
	);
}

export default ContactPage;
