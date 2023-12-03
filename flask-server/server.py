#%%

from resdb_driver import Resdb
from datetime import datetime
from resdb_driver.crypto import generate_keypair
from flask import Flask
app = Flask(__name__)
db_root_url = "http://127.0.0.1:18000"

@app.route("/create_key")
def create_key():  
    return generate_keypair()

@app.route("/create_token")
def create_token(service, signer_public_key, signer_private_key, user_public_key):
    utc_time = datetime.utcnow()

    db = Resdb(db_root_url)

    token_data = {
        "data": {
            "start_time": utc_time,
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

    return fulfilled_token_tx["id"]

if __name__ == "__main__":
    app.run(debug=True)