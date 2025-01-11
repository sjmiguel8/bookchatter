const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { OpenAI } = require('openai');

dotenv.config();

const app = express();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    initializeDatabase();  // Initialize sample data
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  characters: [{
    name: String,
    description: String,
    personality: String,
    keyQuotes: [String],
    background: String
  }]
});

const Book = mongoose.model('Book', bookSchema);

// Add this after your Book model definition
async function initializeDatabase() {
  try {
    // Check if we already have data
    const existingBooks = await Book.find();
    if (existingBooks.length === 0) {
      // Add sample books and characters
      const books = [
        {
          title: 'Pride and Prejudice',
          author: 'Jane Austen',
          characters: [
            {
              name: 'Elizabeth Bennet',
              description: 'The second of the five Bennet daughters',
              personality: 'Witty, intelligent, independent-minded, spirited',
              background: 'Second daughter of the Bennet family, known for her sharp observations of society and prejudiced first impressions',
              keyQuotes: [
                'It is a truth universally acknowledged...',
                'Till this moment I never knew myself.'
              ]
            },
            {
              name: 'Mr. Darcy',
              description: 'Wealthy aristocrat and master of Pemberley',
              personality: 'Proud, reserved, honorable, initially perceived as arrogant',
              background: 'Wealthy gentleman from an ancient family, owner of Pemberley estate in Derbyshire',
              keyQuotes: [
                'In vain I have struggled. It will not do. My feelings will not be repressed.',
                'I have been a selfish being all my life, in practice, though not in principle.'
              ]
            }
          ]
        },
        {
          title: 'Sherlock Holmes Series',
          author: 'Arthur Conan Doyle',
          characters: [
            {
              name: 'Sherlock Holmes',
              description: 'Brilliant consulting detective',
              personality: 'Analytical, observant, eccentric, brilliant deductive reasoner',
              background: 'Consulting detective in Victorian London, master of deductive reasoning, resides at 221B Baker Street',
              keyQuotes: [
                'Elementary, my dear Watson',
                'When you eliminate the impossible, whatever remains, however improbable, must be the truth'
              ]
            },
            {
              name: 'Dr. John Watson',
              description: 'Army doctor and Holmes\'s loyal friend',
              personality: 'Loyal, practical, intelligent, chronicler of Holmes\'s adventures',
              background: 'Former army doctor who served in Afghanistan, Holmes\'s trusted friend and chronicler',
              keyQuotes: [
                'You know my methods, Holmes',
                'It was worth a wound; it was worth many wounds; to know the depth of loyalty and love which lay behind that cold mask.'
              ]
            }
          ]
        },
        {
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          characters: [
            {
              name: 'Jay Gatsby',
              description: 'Mysterious millionaire with a romantic obsession',
              personality: 'Optimistic, romantic, mysterious, obsessive',
              background: 'Self-made millionaire driven by his love for Daisy Buchanan, known for lavish parties at his mansion',
              keyQuotes: [
                'Old sport!',
                'Can\'t repeat the past? Why of course you can!'
              ]
            },
            {
              name: 'Nick Carraway',
              description: 'The narrator and Gatsby\'s neighbor',
              personality: 'Observant, tolerant, honest, reflective',
              background: 'Yale graduate who moves to New York and becomes entangled in Gatsby\'s world',
              keyQuotes: [
                'Reserving judgments is a matter of infinite hope.',
                'So we beat on, boats against the current, borne back ceaselessly into the past.'
              ]
            }
          ]
        },
        {
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          characters: [
            {
              name: 'Atticus Finch',
              description: 'Respected lawyer and father',
              personality: 'Wise, moral, patient, compassionate',
              background: 'Small-town lawyer and widowed father, defending Tom Robinson in a racially charged trial',
              keyQuotes: [
                'You never really understand a person until you consider things from his point of view... until you climb into his skin and walk around in it.',
                'I wanted you to see what real courage is, instead of getting the idea that courage is a man with a gun in his hand.'
              ]
            },
            {
              name: 'Scout Finch',
              description: 'Young narrator of the story',
              personality: 'Curious, tomboyish, intelligent, honest',
              background: 'Six-year-old daughter of Atticus Finch, learning about life and prejudice in Alabama',
              keyQuotes: [
                'Until I feared I would lose it, I never loved to read. One does not love breathing.',
                'Mockingbirds don\'t do one thing but make music for us to enjoy.'
              ]
            }
          ]
        }
      ];

      await Book.insertMany(books);
      console.log('Sample data initialized');
    }
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { message, context } = req.body;
  
  try {
    // Create a more detailed prompt for the character
    const prompt = `
      You are ${context.name} from ${context.book}.
      Your personality: ${context.personality}
      Your background: ${context.background}
      
      Important rules:
      1. Always stay in character
      2. Respond as if you are actually ${context.name}
      3. Use knowledge and perspectives from ${context.book}
      4. Maintain the character's speaking style and mannerisms
      5. Reference events and relationships from the book when relevant
      
      Respond to this message as your character would: ${message}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: prompt
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    res.json({ 
      response: completion.choices[0].message.content,
      character: context.name
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat' });
  }
});

// Add this new endpoint after your chat endpoint
app.get('/api/characters', async (req, res) => {
  try {
    const books = await Book.find()
    const characters = books.reduce((acc, book) => {
      return acc.concat(book.characters.map(char => ({
        ...char.toObject(),
        book: book.title,
        _id: char._id
      })))
    }, [])
    console.log('Sending characters:', characters) // Debug log
    res.json(characters)
  } catch (error) {
    console.error('Error fetching characters:', error)
    res.status(500).json({ error: 'Failed to fetch characters' })
  }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
