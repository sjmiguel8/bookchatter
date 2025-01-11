import { useState } from 'react';
import config from '../config';

function DreamAnalysis() {
  const [dream, setDream] = useState('');
  const [analysisType, setAnalysisType] = useState('dream');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${config.apiUrl}/api/analyze-dream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dream,
          analysisType
        }),
      });
      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Error analyzing dream:', error);
      setAnalysis('Sorry, there was an error analyzing your dream. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="dream-analysis-page">
      <h1 className="page-title">Dream Analysis</h1>
      
      <div className="dream-form-container">
        <form onSubmit={handleSubmit} className="dream-form">
          <div className="analysis-type-selector">
            <label>
              <input
                type="radio"
                value="dream"
                checked={analysisType === 'dream'}
                onChange={(e) => setAnalysisType(e.target.value)}
              />
              Dream Interpretation
            </label>
            <label>
              <input
                type="radio"
                value="psycho"
                checked={analysisType === 'psycho'}
                onChange={(e) => setAnalysisType(e.target.value)}
              />
              Psychoanalysis
            </label>
          </div>

          <textarea
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            placeholder="Describe your dream in detail..."
            rows="6"
            required
          />

          <button type="submit" className="analyze-button" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Analyze Dream'}
          </button>
        </form>

        {analysis && (
          <div className="analysis-result">
            <h2>Analysis</h2>
            <p>{analysis}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DreamAnalysis; 