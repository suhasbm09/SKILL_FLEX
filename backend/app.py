from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
from pytz import timezone

from utils.scoring import evaluate_route
from render_nft import generate_and_pin
from utils.challenge_task import challenge_details

app = Flask(__name__)
CORS(app, origins=['http://localhost:5173'])

# MongoDB connection
client = MongoClient("mongodb+srv://suhaasbm2004:33sqA5fVT7TDFJvp@cluster0.ouqxczd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.PROOF_OF_SKILL
mints = db.mints

# Route: Evaluate submission
@app.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.get_json()
    challenge_id = data.get('challengeId')
    submission_text = data.get("submission")

    if not submission_text:
        return jsonify({'error': "No submission provided"}), 400

    score = evaluate_route(submission_text, challenge_id) or 0
    passed = score >= 85

    return jsonify({
        "challengeId": challenge_id,
        "submission": submission_text,
        "score": score,
        "passed": passed
    }), 200

# Route: Generate metadata and NFT image
@app.route('/generate_metadata', methods=['POST'])
def gen_metadata():
    data = request.get_json()
    cid = data.get("challengeId")
    score = data.get("score")
    wallet = data.get("wallet")

    if not all([cid, score, wallet]):
        return jsonify({"error": "Missing one or more required fields"}), 400

    detail = challenge_details.get(cid)
    if not detail:
        return jsonify({"error": "Unknown challenge"}), 400

    timestamp = datetime.now(timezone("Asia/Kolkata"))
    metadata_uri, image_uri = generate_and_pin(detail, score, wallet, timestamp)

    return jsonify({
        "metadataUri": metadata_uri,
        "imageUri": image_uri
    }), 200

# Route: Record mint details in MongoDB
@app.route('/record_mint', methods=['POST'])
def record_mint():
    data = request.get_json()
    required_fields = ["wallet", "metadataUri", "mintPubkey", "signature", "challengeId", "score"]

    if not all(k in data for k in required_fields):
        return jsonify({"error": "Missing required mint fields"}), 400

    mints.insert_one({
        "wallet":      data["wallet"],
        "metadataUri": data["metadataUri"],
        "mintPubkey":  data["mintPubkey"],
        "signature":   data["signature"],
        "challengeId": data["challengeId"],
        "score":       data["score"],
        "timestamp":   datetime.now(timezone("Asia/Kolkata"))
    })

    return jsonify({"status": "ok"}), 201

# Route: Get mint history for wallet
@app.route('/history/<wallet>', methods=['GET'])
def get_history(wallet):
    recs = list(mints.find({"wallet": wallet}, {"_id": 0}))
    return jsonify(recs), 200

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
