import requests
import re
from .challenge_task import challenge_details

OPENROUTER_API_KEY = "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"
OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions"

SYSTEM_PROMPT = """
You are a senior software engineering architect and educator with 20+ years of experience across data structures & algorithms, NoSQL databases, cloud deployments (AWS ECS), and containerization (Docker & Compose). 

For each submission you receive:
  1. Rigorously check correctness (does it satisfy at least one of the two listed tasks).
  2. Rigorously check performance (big-O requirements, best practices).
  3. Check code quality or design (readability, maintainability, idiomatic usage).
  4. Assign an integer score from 0 to 100.
     • 100 = optimal, production-ready, industry-standard, fully meets task.
     • 85–99 = works and meets requirements but has minor performance or style issues.
     • Below 85 = fails in correctness, performance, or significant style issues.

Reply only in this format: Score: <number>
Be a strict evaluator and ensure the answer aligns perfectly with the task.
"""

def evaluate_route(submission_text, challenge_id):
    challenge = challenge_details.get(challenge_id)
    
    if challenge:
        prompt = (
            f"Challenge: {challenge['name']} ({challenge['symbol']})\n"
            "Tasks (complete any one):\n"
            f"1. {challenge['tasks'][0]}\n"
            f"2. {challenge['tasks'][1]}\n"
            f"Student Answer: {submission_text}"
        )
    else:
        prompt = f"Evaluate the answer: {submission_text}"

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "mistralai/mistral-7b-instruct:free",
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ]
    }

    print("==== Starting Evaluation Request ====")
    print("Prompt:\n", prompt)

    response = requests.post(OPENROUTER_ENDPOINT, headers=headers, json=payload)
    print("Response Status:", response.status_code)
    print("Raw Response:", response.text)

    score = 0
    if response.status_code == 200:
        try:
            content = response.json()["choices"][0]["message"]["content"]
            print("OpenRouter Response Content:", content)
            match = re.search(r"score\s*[:\-]?\s*(\d{1,3})", content, re.IGNORECASE)
            if match:
                score = float(match.group(1))
                print("Extracted Score:", score)
            else:
                print("❌ Score not found in response.")
        except Exception as e:
            print("❌ Error parsing response:", str(e))
    else:
        print("❌ Request failed:", response.status_code)

    return score
