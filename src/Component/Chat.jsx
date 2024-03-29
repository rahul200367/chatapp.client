import React, { useEffect, useState } from 'react'

 const Chat = ({socket,user,room,showchat}) =>{
    const [currentchat,setchat]  = useState('');
    const [displaychat,setdisplaychat] = useState([]);
    const [broad,setbroad] = useState(null);
    const message = {user , room, currentchat, time:
      new Date(Date.now()).getHours() +
      ":" +
      new Date(Date.now()).getMinutes() ,
    }
    const handelsend = async(e)=>{
        e.preventDefault();
        if(currentchat){
            await socket.emit('sendmessage' ,message );
        }
    }
    useEffect(()=>{
        socket.on('receive' ,(data)=>{
            setdisplaychat((list)=>
                [...list, data]);
                setchat('');
    });
    socket.on('joindbroadcast',(msg)=>{
    setbroad(msg);
    setTimeout(()=>{
setbroad(null)
    },1000);
    })
    },[socket]);
    if(showchat){
  return (
    <div className="chat-window">
    {broad && <div className='broadcas'>{broad}</div>}
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
          {displaychat.map((messageContent) =>{
            return(
              <div className="message" id ={user === messageContent.user ? 'other' :'you'} >
                <div>
                  <div className="message-content">
                  { user === messageContent.user ? <p style={{color:'black'}}>You : </p> : <p style={{color:'black'}}>{messageContent.user} : </p>}
                  <p>{messageContent.currentchat}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                  </div>
                </div>
              </div>)}
          )}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentchat}
          placeholder="Hey..."
          onChange={(event) => {
            setchat(event.target.value);
          }}
        />
        <button onClick={handelsend}>&#9658;</button>
      </div>
    </div>
  )
        }
}
export default Chat;

