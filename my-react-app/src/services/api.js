const API_URL = 'http://localhost:5000/api';

export const chatService = {
  async sendMessage(message, characterId, bookId) {
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          characterId,
          bookId
        }),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  }
}; 