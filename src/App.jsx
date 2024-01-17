import io from 'socket.io-client';
import {useEffect, useState} from 'react'
import Chat from './Component/Chat';
function App() {
  const socket = io.connect('http://localhost:3000');
  const [user, setuser] = useState('');
  const [room,setroom] = useState('');
  const [showchat,setshowchat] = useState(false);
const handeljoinchat = (e)=>{
  e.preventDefault();
  if(user && room){
    const data ={user:user , room:room};
    socket.emit('join_u',data );
    setshowchat(true);
  }
}
  return (
    <div className='App'>
    {!showchat &&
     <div className="joinChatContainer">
      <h3>Join A chat</h3>
    <input type="text"  placeholder="enter user name" value={user} onChange={(e)=>{setuser(e.target.value)}}/>
    <input type="text" placeholder="Room id" value={room} onChange={(e)=>{setroom(e.target.value)}} />
    <button onClick={handeljoinchat}> join a room</button>
   </div> 
    }
    <Chat socket={socket} room ={room} user= {user} showchat={showchat}/>
    </div>
  )
}

export default App
