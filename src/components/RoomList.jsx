import React from 'react'
import Room from './Room'

export default function RoomList({ rooms }) {
  if (rooms.length === 0) {
    return (
      <div className='empty-search' >
        <h3>Unfortunately No Rooms Matched Your Search Parameters</h3>
      </div>);
  }
  return (
    <div>
      <div className='roomslist-center'>
        {rooms.map((room) => (
          <Room key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}
