import React, { useContext } from 'react'
import RoomsFilter from './RoomsFilter'
import RoomList from './RoomList'
import { RoomContext } from '../Context'
import Loading from './Loading'


export default function RoomsContainer() {

  const { loading, sortedRooms, rooms } = useContext(RoomContext)
  return (
    loading
      ? <Loading />
      : (
        <div>
          <RoomsFilter rooms={rooms} />
          <RoomList rooms={sortedRooms} />
        </div>
      )
  )
}
