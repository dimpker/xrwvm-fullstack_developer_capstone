# Uncomment the imports below before you add the function code
import requests
import os
from dotenv import load_dotenv

load_dotenv()

backend_url = os.getenv(
    'backend_url', default="http://localhost:3030")
sentiment_analyzer_url = os.getenv(
    'sentiment_analyzer_url',
    default="http://localhost:5050/")


def get_request(endpoint, **kwargs):
    params = ""
    if (kwargs):
        for key, value in kwargs.items():
            params = params + key + "=" + value + "&"

    request_url = backend_url + endpoint + "?" + params

    print("GET from {} ".format(request_url))
    try:
        # Call get method of requests library with URL and parameters
        response = requests.get(request_url)
        return response.json()
    except BaseException:
        # If any error occurs
        print("Network exception occurred")
# Add code for get requests to back end


def analyze_review_sentiments(text):
    """
    Analyze sentiment of review text using built-in logic
    """
    try:
        # First try external service if available
        request_url = sentiment_analyzer_url + "analyze/" + text
        print("Analyzing sentiment for: {}".format(text))
        print("Request URL: {}".format(request_url))

        response = requests.get(request_url, timeout=2)
        return response.json()
    except Exception as e:
        print(f"External sentiment service unavailable: {e}")
        # Use built-in sentiment analysis as fallback
        return analyze_sentiment_builtin(text)


def analyze_sentiment_builtin(text):
    """
    Built-in sentiment analysis using keyword matching
    """
    text_lower = text.lower()

    # Positive keywords
    positive_words = [
        'excellent', 'great', 'good', 'amazing', 'wonderful', 'fantastic',
        'awesome', 'love', 'perfect', 'best', 'outstanding', 'superb',
        'brilliant', 'remarkable', 'impressive', 'satisfied', 'happy',
        'pleased', 'recommend', 'quality', 'smooth', 'comfortable'
    ]

    # Negative keywords
    negative_words = [
        'bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'poor',
        'disappointing', 'unsatisfied', 'problem', 'issue', 'broken',
        'defective', 'unreliable', 'waste', 'regret', 'avoid', 'never',
        'useless', 'frustrating', 'annoying', 'expensive', 'overpriced'
    ]

    positive_score = sum(1 for word in positive_words if word in text_lower)
    negative_score = sum(1 for word in negative_words if word in text_lower)

    if positive_score > negative_score:
        sentiment = "positive"
        polarity = min(0.8, 0.3 + (positive_score * 0.1))
    elif negative_score > positive_score:
        sentiment = "negative"
        polarity = max(-0.8, -0.3 - (negative_score * 0.1))
    else:
        sentiment = "neutral"
        polarity = 0.0

    return {
        "sentiment": sentiment,
        "polarity": polarity,
        "text": text,
        "method": "built-in"
    }


def post_review(data_dict):
    request_url = backend_url + "/insert_review"
    try:
        response = requests.post(request_url, json=data_dict)
        print(response.json())
        return response.json()
    except BaseException:
        print("Network exception occurred")
