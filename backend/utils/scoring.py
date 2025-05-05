import requests
import re
from .challenge_task import challenge_details

OPENROUTER_API_KEY="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"
OPENROUTER_ENDPOINT="https://openrouter.ai/api/v1/chat/completions"

SYSTEM_PROMPT = """

    You are a senior software engineering architect and educator with 20+ years of experience across data structures & algorithms, NoSQL databases, cloud deployments (AWS ECS), and containerization (Docker & Compose). 
    For each submission you receive:
      1. Rigorously check correctness (does it satisfy at least one of the two listed tasks).
      2. Rigorously check performance (big-O requirements, best practices).
      3. Check code quality or design (readability, maintainability, idiomatic usage).
      4. Assign an integer score from 0 to 100.
          • 100 means the solution is truly optimal, production-ready, follows industry best practices, and fully meets one of the tasks.
          • Scores in the 85-99 range mean it works and meets requirements but could be improved in performance, edge cases, or style.
          • Scores below 85 indicate missing correctness, performance, or significant style issues.

    Reply only in this format 'Score: <number>'.
    Also remember you are strict evaluator and see answer perfect alignment with task needed.

"""

def evaluate_route(submission_text, challenge_id):
    detail = challenge_details.get(challenge_id)
    if detail:
        prompt = (
            f"Challenge: {detail['name']} ({detail['symbol']})\n"
            "Tasks (complete any one):\n"
            f"1. {detail['tasks'][0]}\n"
            f"2. {detail['tasks'][1]}\n"
            f"Student Answer: {submission_text}"
        )
    else:
        prompt = f"Evaluate the answer: {submission_text}"


    headers={
        "Authorization":f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type":"application/json"
    }

    data={
        "model":"mistralai/mistral-7b-instruct:free",
        "messages":[
            {"role":"system","content":SYSTEM_PROMPT},
            {"role":"user","content":prompt}

        ]
    }

    print("==== Starting Evaluation Request ====")
    print("Submission Text:", prompt)

    response = requests.post(OPENROUTER_ENDPOINT, headers=headers, json=data)
    print("Response Status Code:", response.status_code)

    print("Raw Response:", response.text)


    score = None
    if response.status_code == 200:
        result = response.json()
        content = result["choices"][0]["message"]["content"]
        print("OpenRouter Raw Content:", content)

        match = re.search(r"score\s*[:\-]?\s*(\d.{1,3})", content, re.IGNORECASE)
        if match:
            score = float(match.group(1))
            print("Extracted Score:", score)
        else:
            print("Score extraction failed")
            score=0
    else:
        print("Request failed:", response.status_code, response.text)
        score =0

    return score

    