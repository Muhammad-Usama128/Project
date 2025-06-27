import requests
import time
from fake_useragent import UserAgent
from bs4 import BeautifulSoup

url = "https://news.google.com/search?q=tech%20news&hl=en-PK&gl=PK&ceid=PK%3Aen"
session = requests.Session()

headers = {
    "User-Agent": UserAgent().random,
    'Accept-language': 'en-US,en;q=0.9',
    'Accept-encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Referer': 'https://www.google.com/',
}

time.sleep(2)  # Sleep to avoid hitting the server too quickly
r = session.get(url, headers=headers)

# with open("product_card.html", "w", encoding="utf-8") as f:
#     f.write(str(r.text))
data = r.text
soup = BeautifulSoup(data, 'html.parser')

# Extracting news titles and links
matched_tags = soup.find_all('a', class_='DY5T1d', limit=2)
results = []
for tag in matched_tags:
    text = tag.get_text(strip=True)
    href = tag.get('href')
    if href and href.startswith('./'):
        href = 'https://news.google.com' + href[1:]
    results.append((text, href))



API_KEY = "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"  # from OpenRouter
API_URL = "https://openrouter.ai/api/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

data = {
    "model": "deepseek/deepseek-chat:free",
    "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Write a short, SEO-optimized blog post (100–150 words) summarizing this tech news in an engaging tone. Include a catchy headline. Here are the news items:" + results[0][0] + "And its link is " + results[0][1] + ". then make for other item " + results[1][0] + " And its link is" + results[1][1] + ".Please make it a json code with properties Title, Link, Date (make a random date and different for both), Content and Status (Added)."}
    ],
    "stream": False
}

response = requests.post(API_URL, headers=headers, json=data)
response.raise_for_status()
articles = response.json()["choices"][0]["message"]["content"]
return [{"json": item} for item in articles]