from flask import Flask, jsonify
from textblob import TextBlob
import re

app = Flask(__name__)


def clean_text(text):
    """Clean and preprocess text for sentiment analysis"""
    # Remove special characters and extra whitespace
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    text = ' '.join(text.split())
    return text.lower()


def analyze_sentiment(text):
    """Analyze sentiment using TextBlob"""
    try:
        # Clean the text
        cleaned_text = clean_text(text)

        # Create TextBlob object
        blob = TextBlob(cleaned_text)

        # Get polarity score (-1 to 1)
        polarity = blob.sentiment.polarity

        # Classify sentiment
        if polarity > 0.1:
            sentiment = "positive"
        elif polarity < -0.1:
            sentiment = "negative"
        else:
            sentiment = "neutral"

        return {
            "sentiment": sentiment,
            "polarity": polarity,
            "text": text
        }
    except Exception as e:
        return {
            "sentiment": "neutral",
            "polarity": 0.0,
            "text": text,
            "error": str(e)
        }


@app.route('/')
def home():
    return jsonify({
        "message": "Sentiment Analysis Service",
        "status": "running",
        "endpoints": {
            "analyze": "/analyze/<text>",
            "health": "/health"
        }
    })


@app.route('/analyze/<text>')
def analyze_text(text):
    """Analyze sentiment of provided text"""
    if not text:
        return jsonify({"error": "No text provided"}), 400

    result = analyze_sentiment(text)
    return jsonify(result)


@app.route('/health')
def health_check():
    return jsonify({"status": "healthy", "service": "sentiment-analyzer"})


if __name__ == '__main__':
    print("Starting Sentiment Analysis Service on http://localhost:5050")
    app.run(host='0.0.0.0', port=5050, debug=True)
