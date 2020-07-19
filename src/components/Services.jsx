import React, { useState } from 'react'
import Title from './Title'
import { FaHiking, FaCocktail, FaShuttleVan, FaBeer } from 'react-icons/fa'

export default function Services() {

	const [items] = useState({
		services: [
			{
				icon: <FaHiking />,
				title: 'Unlimited Hiking',
				info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, ab.'
			},
			{
				icon: <FaCocktail />,
				title: 'Exquisite Cocktails',
				info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, ab.'
			},
			{
				icon: <FaShuttleVan />,
				title: 'Free Shuttle',
				info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, ab.'
			},
			{
				icon: <FaBeer />,
				title: 'Strongest Beer',
				info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, ab.'
			}
		]
	});
	return (
		<section className='services'>
			<Title title='Services' />
			<div className='services-center'>
				{items.services.map((item, index) => {
					return (
						<article key={index} className='service'>
							<span>{item.icon}</span>
							<h6>{item.title}</h6>
							<p>{item.info}</p>
						</article>
					);
				})}
			</div>
		</section>
	)
}
