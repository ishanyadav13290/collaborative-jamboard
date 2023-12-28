import React, { useEffect, useState } from 'react'

const Chats = ({socket,name,id}) => {

  let [msg, setMsg] = useState("")
  let [allMsgs, setAllMsgs] = useState([])
    useEffect(()=>{
      socket.on("receiveMessage",(data)=>{
        console.log(data)
        setAllMsgs(prev=>[...prev,data])
      })
    },[socket])

    function change(e){
      setMsg(e.target.value)
    }

    function sendMessage(){
      socket.emit("sendMessage",{message:msg,name,id:socket.id,room:id})
      setMsg("")
      setAllMsgs(prev=>[...prev,{message:msg,name,id:socket.id}])
    }
  return (
    <div className='chatsSection'>
        <h3>CHATS</h3>
        <div className="chats">
            {allMsgs.map((el,i)=>{
                return <IndividualChats key={i} data={el} socket={socket} />
            })}
        </div>
        <div className='send'>
        <input value={msg} type='text' onChange={change} placeholder='Send Message' />
        <button onClick={sendMessage}>Send</button>
        </div>
    </div>
  )
}


const IndividualChats = ({data,socket}) => {
  return (
    <div className={data.id==socket.id?'individualChats me':'individualChats other'}>
    <p>{data.id==socket.id?"You":data.name}</p>
      <div className='messageText'>{data.message}</div>
    </div>
  )
}


export default Chats