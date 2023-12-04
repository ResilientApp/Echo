#%%

from resdb_driver import Resdb
from datetime import datetime
from resdb_driver.crypto import generate_keypair
from flask import Flask, request, jsonify  # Add 'request' import
from flask_cors import CORS
import json


app = Flask(__name__)
CORS(app)
db_root_url = "http://127.0.0.1:18000"
adminkeys = generate_keypair()
@app.route("/test")
def test():  
    return "hello"
@app.route("/create_key")
def create_key():  
    key = generate_keypair()
    print(key)
    key_dict = {
        "private": key[0],
        "public": key[1]
    }
    key_json = json.dumps(key_dict)
    
    return key_json

@app.route("/create_token",methods = ["POST"])
def create_token():

    service, signer_public_key, signer_private_key, user_public_key = request.json['service'], adminkeys[1], adminkeys[0], request.json['user_public_key']
    utc_time = datetime.utcnow()
    utc_time_str = utc_time.isoformat()

    db = Resdb(db_root_url)

    token_data = {
        "data": {
            "start_time": utc_time_str,
            "service" : service,
        },
    }
    prepared_token_tx = db.transactions.prepare(
        operation="CREATE",
        signers=signer_public_key,
        recipients=[([user_public_key], 1)],
        asset=token_data, 
    )
    #%%
    # fulfill the tnx
    fulfilled_token_tx = db.transactions.fulfill(
        prepared_token_tx, private_keys=signer_private_key
    )

    #%%
    db.transactions.send_commit(fulfilled_token_tx)

    response_data = {
        "transaction_id": fulfilled_token_tx["id"],
        "message": "Token created successfully",
    }

    return jsonify(response_data)
@app.route("/retrieve",methods = ["POST"])
def get_nft():
    nft_data = db.transactions.retrieve(txid=key)

    if nft_data:
        return jsonify(nft_data)
    else:
        return jsonify({"error": "NFT not found"}), 404 
if __name__ == "__main__":
    app.run(debug=True)