from flask import Flask, session, url_for
from redis import Redis
import os
app = Flask(__name__, static_url_path='/public/')
redis = Redis(host='redis', port=6379)

@app.route('/')
def home():
    redis.incr('hits')
    return send_from_directory('/public', 'index.html')

@app.errorhandler(404)
def not_found(error):
    return send_from_directory('/public', '404.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)