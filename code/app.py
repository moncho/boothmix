from flask import Flask, session, url_for, send_file, send_from_directory
from redis import Redis
import os
app = Flask(__name__, static_url_path='/static')
redis = Redis(host='redis', port=6379)

@app.route('/vote/cast/<id>', methods=['POST'])
def vote(id):
    redis.incr('id')
    return app.send_static_file('index.html')

@app.route('/vote/top10')
def top10():
    redis.incr('hits')
    return app.send_static_file('index.html')


@app.route('/vote/isopen/')
def isOpen():
    redis.incr('hits')
    return app.send_static_file('index.html')

@app.route('/vote/close/')
def close():
    redis.incr('hits')
    return app.send_static_file('index.html')    


@app.errorhandler(404)
def not_found(error):
    return app.send_static_file('404.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)