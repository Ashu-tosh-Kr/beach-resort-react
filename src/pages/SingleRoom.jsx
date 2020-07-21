import React, { useContext, useState } from 'react'
import { RoomContext } from '../Context'
import Banner from '../components/Banner';
import StyledHero from '../components/StyledHero';
import { Link } from 'react-router-dom';
import defaultImg from '../images/defaultBcg.jpeg'


export default function SingleRoom(props) {
	const [slug] = useState(props.match.params.slug);
	const { getRoom } = useContext(RoomContext);

	const room = getRoom(slug);

	/*We are not using conditional rendering like FeaturedRooms beacuse we don't want to show loading
	if the page doesn't even exist. Also so so that we can destructure the room object like below*/
	if (!room) {
		return (
			<div className='error' >
				<h3>Page not found</h3>
				<Link to='/' className='btn-primary'>Back To Rooms</Link>
			</div >
		);
	}
	/*wWe are also not using loading in if statement because even if the page doen't exist, loading will
	still become true once the context.js' state loads which we don't want */

	const { name, description, capacity, size, price, breakfast, pets, images, extras, } = room;
	console.log(room);
	return (
		<>
			<StyledHero img={images[0] || defaultImg}>
				<Banner title={`${name} room`}>
					<Link to='/rooms' className='btn-primary' >Back To Rooms</Link>
				</Banner >
			</StyledHero >
			<section className="single-room">
				<div className="single-room-images">
					{images.map((img, i) => (
						<img key={i} src={img} alt={name} />
					))}
				</div>
				<div className="single-room-info">
					<article className="description">
						<h3>Details</h3>
						<p>{description}</p>
					</article>
					<article className='info'>
						<h3>Info</h3>
						<h6>Price : ${price}</h6>
						<h6>Size : {size} SQFT</h6>
						<h6>Max-capacity : {capacity} {capacity === 1 ? 'person' : 'People'}</h6>
						<h6>{pets ? 'Pets Allowed' : 'No Pets Allowed'}</h6>
						<h6>{breakfast && 'Free Breakfast'}</h6>
					</article>
				</div>
			</section>
			<section className="room-extras">
				<h6>Extras</h6>
				<ul className='extras'>
					{extras.map((extra, index) => (
						<li key={index}>- {extra}</li>
					))}
				</ul>
			</section>
		</>

	)
}

