import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chat from './components/Chat'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Products from './pages/Products'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <section className="hero">
                  <h1>Chat with Your Favorite Book Characters!</h1>
                  <p className="subtitle">Have meaningful conversations with AI-powered characters from literature</p>
                  <Link to="/products">
                    <button className="cta-button">Start Chatting</button>
                  </Link>
                </section>
                
                <section className="products">
                  <h2 className="section-title">Meet Your Literary Companions</h2>
                  <div className="product-grid">
                    <div className="product-card character-card">
                      <div className="character-avatar">📚</div>
                      <h3>Character Chat</h3>
                      <p>Talk to AI characters who embody the personality, knowledge, and experiences from your favorite books</p>
                      <Link to="/products">
                        <button className="product-button">Chat Now</button>
                      </Link>
                    </div>
                    <div className="product-card character-card">
                      <div className="character-avatar">🤖</div>
                      <h3>Book Analysis</h3>
                      <p>Get deep insights and analysis about the book's themes, plot, and characters</p>
                      <button className="product-button">Analyze</button>
                    </div>
                    <div className="product-card character-card">
                      <div className="character-avatar">📖</div>
                      <h3>Reading Guide</h3>
                      <p>Interactive study guides and discussion prompts from the character's perspective</p>
                      <button className="product-button">Explore</button>
                    </div>
                  </div>
                </section>

                <section className="how-it-works">
                  <h2 className="section-title">How It Works</h2>
                  <div className="steps-grid">
                    <div className="step-card">
                      <div className="step-number">1</div>
                      <h3>Choose a Book</h3>
                      <p>Select from our library of analyzed books or input your own</p>
                    </div>
                    <div className="step-card">
                      <div className="step-number">2</div>
                      <h3>Select a Character</h3>
                      <p>Pick the character you want to chat with</p>
                    </div>
                    <div className="step-card">
                      <div className="step-number">3</div>
                      <h3>Start Chatting</h3>
                      <p>Engage in meaningful conversations based on the character's perspective</p>
                    </div>
                  </div>
                </section>
              </>
            } />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App 