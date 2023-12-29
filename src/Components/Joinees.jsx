import React, { useEffect, useState } from 'react'

const Joinees = ({socket,name}) => {
  const [allUsers, setAllUsers] = useState([])
  useEffect(()=>{
    socket.on("userJoined",(data)=>{
      console.log(data)
      setAllUsers(data)
    })
  },[socket])
  return (
    <div className='joinees'>
    <h3>Users</h3>
    {allUsers.map((el,i)=>{
      return <div key={i}>
        <p>{el.id==socket?.id?`${el.name} (You)`:`${el.name}`}</p>
      </div>
    })}
    </div>
  )
}

export default Joinees