import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <section className="hero">
          <h1>Welcome to your reading chatbot!</h1>
          <p className="subtitle">Get started with your reading companion</p>
          <button className="cta-button">Try Chatbot</button>
        </section>
        
        <section className="products">
          <h2 className="section-title">Our Products</h2>
          <div className="product-grid">
            <div className="product-card">
              <h3>Reading Assistant</h3>
              <p>AI-powered chatbot to discuss your favorite books</p>
              <button className="product-button">Coming Soon</button>
            </div>
            <div className="product-card">
              <h3>Book Analyzer</h3>
              <p>Deep insights and analysis of any book</p>
              <button className="product-button">Learn More</button>
            </div>
            <div className="product-card">
              <h3>Study Companion</h3>
              <p>Perfect for students and book clubs</p>
              <button className="product-button">Learn More</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App 