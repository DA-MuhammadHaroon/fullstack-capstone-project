// sentiment/index.js
const natural = require('natural');

const analyzer = new natural.SentimentAnalyzer(
  'English',
  natural.PorterStemmer,
  'afinn'
);

const tokenizer = new natural.WordTokenizer();

/**
 * Analyze sentiment of a comment/review text
 * @param {string} text - The comment text
 * @returns {object} - { score, comparative, verdict }
 */
function analyzeSentiment(text) {
  if (!text || typeof text !== 'string') {
    return { score: 0, comparative: 0, verdict: 'neutral' };
  }

  const tokens = tokenizer.tokenize(text.toLowerCase());
  const score = analyzer.getSentiment(tokens);
  const comparative = score / tokens.length;

  let verdict = 'neutral';
  if (comparative > 0.1) verdict = 'positive';
  else if (comparative < -0.1) verdict = 'negative';

  return { score, comparative, verdict };
}

module.exports = { analyzeSentiment };