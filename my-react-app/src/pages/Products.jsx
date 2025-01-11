import { useState, useEffect } from 'react'
import Chat from '../components/Chat'

function Products() {
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [characters, setCharacters] = useState([])
  
  useEffect(() => {
    // Fetch characters from backend
    const fetchCharacters = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/characters')
        const data = await response.json()
        console.log('Fetched characters:', data) // Debug log
        setCharacters(data)
      } catch (error) {
        console.error('Error fetching characters:', error)
      }
    }
    
    fetchCharacters()
  }, [])

  return (
    <div className="products-page">
      <h1 className="page-title">Chat with Book Characters</h1>
      
      {!selectedCharacter ? (
        <div className="character-grid">
          {characters.map(char => (
            <div key={char._id} className="character-select-card" onClick={() => setSelectedCharacter(char)}>
              <div className="character-avatar">
                {char.name === 'Elizabeth Bennet' ? '👒' :
                 char.name === 'Mr. Darcy' ? '🎩' :
                 char.name === 'Sherlock Holmes' ? '🔍' :
                 char.name === 'Dr. John Watson' ? '👨‍⚕️' :
                 char.name === 'Jay Gatsby' ? '🎭' :
                 char.name === 'Nick Carraway' ? '📝' :
                 char.name === 'Atticus Finch' ? '⚖️' :
                 char.name === 'Scout Finch' ? '👧' : '📚'}
              </div>
              <h3>{char.name}</h3>
              <p className="book-title">from {char.book}</p>
              <p className="character-desc">{char.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="chat-section">
          <div className="selected-character-banner">
            <div className="character-avatar">
              {selectedCharacter.name === 'Elizabeth Bennet' ? '👒' :
               selectedCharacter.name === 'Mr. Darcy' ? '🎩' :
               selectedCharacter.name === 'Sherlock Holmes' ? '🔍' :
               selectedCharacter.name === 'Dr. John Watson' ? '👨‍⚕️' :
               selectedCharacter.name === 'Jay Gatsby' ? '🎭' :
               selectedCharacter.name === 'Nick Carraway' ? '📝' :
               selectedCharacter.name === 'Atticus Finch' ? '⚖️' :
               selectedCharacter.name === 'Scout Finch' ? '👧' : '📚'}
            </div>
            <div className="character-info">
              <h3>{selectedCharacter.name}</h3>
              <p>from {selectedCharacter.book}</p>
            </div>
            <button className="change-character" onClick={() => setSelectedCharacter(null)}>
              Change Character
            </button>
          </div>
          <Chat character={selectedCharacter} />
        </div>
      )}
    </div>
  )
}

export default Products 