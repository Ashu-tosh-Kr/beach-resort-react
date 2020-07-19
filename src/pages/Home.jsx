import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import Services from '../components/Services'
import FeaturedRooms from '../components/FeaturedRooms'

export default function Home() {
	return (
		<>
			<Hero>
				<Banner
					title="luxury hotel rooms"
					subtitle="delux rooms in a budget"
				>
					<Link to="/rooms" className="btn-primary">
						Our Rooms
					</Link>
				</Banner>
			</Hero>
			<Services />
			<FeaturedRooms />
		</>
	);
}

