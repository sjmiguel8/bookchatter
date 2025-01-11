import { useState } from 'react'

function Chat({ character }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  
  const handleSend = async () => {
    if (!input.trim()) return
    
    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          context: {
            name: character.name,
            book: character.book,
            personality: character.personality,
            background: character.background,
            keyQuotes: character.keyQuotes,
            description: character.description
          }
        }),
      })
      
      const data = await response.json()
      setMessages([...messages, 
        { type: 'user', content: input },
        { type: 'character', content: data.response, character: character.name }
      ])
      setInput('')
    } catch (error) {
      console.error('Chat error:', error)
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <p>You are now chatting with {character.name} from {character.book}</p>
            <p className="character-intro">{character.description}</p>
            <p className="character-quote">Famous quote: "{character.keyQuotes[0]}"</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.type === 'character' && <div className="character-name">{character.name}:</div>}
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask ${character.name} something...`}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Chat 