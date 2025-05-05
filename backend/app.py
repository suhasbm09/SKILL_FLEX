from flask import Flask,request,jsonify
from flask_cors import CORS
# from evaluation.t5_model import evaluate_submission
from utils.scoring import evaluate_route
from pymongo import MongoClient
from datetime import datetime
from render_nft import generate_and_pin
from utils.challenge_task import challenge_details
from pytz import timezone

app=Flask(__name__)
CORS(app,origins=['http://localhost:5173'])

client = MongoClient("mongodb+srv://suhaasbm2004:33sqA5fVT7TDFJvp@cluster0.ouqxczd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.PROOF_OF_SKILL 
mints = db.mints 
# mongodb+srv://suhaasbm2004:33sqA5fVT7TDFJvp@cluster0.ouqxczd.mongodb.net/

@app.route('/generate_metadata', methods=['POST'])
def gen_metadata():
    data = request.get_json()
    cid = data["challengeId"]
    score = data["score"]
    wallet = data["wallet"]
    ts = datetime.now(timezone("Asia/Kolkata"))
    detail = challenge_details.get(cid)
    if not detail:
        return jsonify({"error":"Unknown challenge"}),400

    metadata_uri, image_uri = generate_and_pin(detail, score, wallet, ts)
    return jsonify({"metadataUri": metadata_uri, "imageUri": image_uri}), 200

@app.route('/record_mint', methods=['POST'])
def record_mint():
    data = request.get_json()
    record = {
        "wallet":      data["wallet"],
        "metadataUri": data["metadataUri"],
        "mintPubkey":  data["mintPubkey"],
        "signature":   data["signature"],
        "timestamp":   datetime.utcnow()
    }
    mints.insert_one(record)
    return jsonify({"status": "ok"}), 201

@app.route('/history/<wallet>', methods=['GET'])
def get_history(wallet):
    recs = list(mints.find({"wallet": wallet}, {"_id": 0}))
    return jsonify(recs), 200



@app.route('/evaluate',methods=['POST'])
def evaluate():
    data= request.get_json()
    challenge_id=data.get('challengeId')
    submission_text= data.get("submission")

    if not submission_text:
        return jsonify({'error': "No submission provided"}),400
    

    # ideal_response=evaluate_submission(submission_text)

    score= evaluate_route(submission_text,challenge_id)
    if score is None:
        score=0
    passed= score>=85

    result={
        "challengeId":challenge_id,
        "submission":submission_text,
        # "dealResponse": ideal_response,
        "score":score,
        "passed":passed
    }
    return jsonify(result)

if __name__=='__main__':
    app.run(debug=True)