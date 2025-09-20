import {useState} from "react"
import {io} from 'socket.io-client'
import {useEffect} from "react";
const socket=io('http://localhost:3000')

function App() {
  const [chatActive,setChatActive]=useState(false);
  const [username,setUsername]=useState('');
  const [messages,setMessages]=useState([]);
  const [newMessage,setNewMessage]=useState('');
  useEffect(()=>{
    socket.on('received-message',(message)=>{
      setMessages([...messages,message])
    })
  })

  const handleSubmit=(e)=>{
     e.preventDefault();
     const messageData={
    message:newMessage,
    user:username,
    time:new Date(Date.now()).getHours()+':'+new Date(Date.now()).getMinutes(),

 
  }
  
  if(!newMessage){
    alert("Message cannot be empty");
      return;
  }
    socket.emit('send-message',messageData);
  setNewMessage('');
  }
  

  return (
  <div className='w-screen h-screen bg-gray-900 text-white flex flex-col justify-center items-center'>
    {chatActive ? (
      <div className='w-full h-full flex flex-col'>
        <div className="bg-gray-800 rounded-t-md">
          <h1 className="text-white py-2 px-4">My Chat</h1>
        </div>

        <div className="flex-grow overflow-y-scroll custom-scrollbar">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-center ${username === message.user ? 'justify-end' : 'justify-start'} my-2 mx-8`}
            >
              <div
                className={`${
                  username === message.user ? 'hidden' : 'bg-blue-500'
                } text-white rounded-full h-8 w-8 flex items-center justify-center mr-2`}
              >
                {message.user.charAt(0).toUpperCase()}
              </div>

              <div
                className={`${
                  username === message.user ? 'bg-gray-700' : 'bg-blue-700'
                } text-xs rounded-lg p-2 text-white`}
              >
                <span className="font-bold">{message.user}</span>
                <p>{message.message}</p>
                <p className="text-xs text-gray-400">{message.time}</p>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 bg-gray-800 rounded-b-md flex"
        >
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow border-2 rounded-md outline-none px-3 py-2 bg-gray-700 text-white"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold ml-3"
          >
            Send
          </button>
        </form>
      </div>
    ) : (
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Enter your Username"
          className="border-2 rounded-sm px-3 py-2 outline-none bg-gray-700 text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="button"
          className={`bg-blue-500 text-white px-4 py-2 rounded-md font-bold ${
            !username && 'opacity-50 cursor-not-allowed'
          }`}
          onClick={() => username && setChatActive(true)}
        >
          Start Chat
        </button>
      </div>
    )}
  </div>
);
}

export default App
