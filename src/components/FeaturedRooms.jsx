import React, { useContext } from 'react'
import Title from './Title'
import { RoomContext } from '../Context'
import Loading from './Loading';
import Room from './Room';

export default function FeaturedRooms() {

  const { loading, featuredRooms: rooms } = useContext(RoomContext);
  
  return (
    <section className='featured-rooms'>
      <Title title='Featured Rooms' />
      <div className='featured-rooms-center'>
        {loading ? <Loading /> : rooms.map(room => (
          <Room key={room.id} room={room} />
        ))} 
      </div>
    </section>
  )
}
