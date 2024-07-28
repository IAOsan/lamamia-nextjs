import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './about.styles.module.css';

export const metadata: Metadata = {
	title: 'lamamia | About',
	description:
		'Welcome to our digital corner! We are a passionate team of writers, dreamers and curious people who gather here to share stories, knowledge and experiences',
};

function AboutPage(): React.JSX.Element {
	return (
		<main>
			<div className='container'>
				<div
					data-testid='about-hero'
					className={styles.hero}
				>
					<Image
						src='/images/about.jpeg'
						alt=''
						fill
					/>
					<div className={styles.copy}>
						<p className='h5'>Digital Storytellers</p>
						<p>Handcrafting award winning digital experiences</p>
					</div>
				</div>
				<div className='grid'>
					<div className='col-lg-8 text-justify'>
						<h2 className='h3 mb-16'>Who Are We?</h2>
						<p className='mb-8'>
							Digital agency, where creativity, innovation, and
							cutting-edge technology converge to redefine digital
							experiences.
						</p>
						<p className='mb-8'>
							As a leading digital agency, we are passionate about
							crafting impactful strategies, designing captivating
							visuals, and developing robust solutions that help
							businesses thrive in the digital realm. Our team of
							dedicated professionals is committed to delivering
							exceptional results that exceed our clients&apos;
							expectations.
						</p>
						<p className='mb-8'>
							Our mission is to empower businesses by leveraging the
							power of digital platforms. We believe that every brand has
							a unique story to tell, and our purpose is to help them
							tell it effectively through innovative and strategic
							digital solutions.
						</p>
					</div>
					<div className='col-lg-8'>
						<h2 className='h3 mb-16'>What We Do?</h2>
						<p className='mb-8'>
							We understand that a strong brand identity is the
							foundation of success in the digital landscape. Our team of
							creative strategists excels in developing brand strategies
							that resonate with your target audience. From logo design
							to brand messaging, we craft cohesive and compelling
							narratives that set your brand apart.
						</p>
						<ul className='list list--hyphen mb-16'>
							<li>Creative Illustrations</li>
							<li>Dynamic Websites</li>
							<li>Fast and Handy Mobile Apps</li>
						</ul>
						<Link
							href='/contact'
							className='button button--primary'
						>
							Contact
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}

export default AboutPage;
