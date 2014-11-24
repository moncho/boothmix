from flask import Flask, session, url_for, send_file, send_from_directory
from redis import Redis
import voting
import os
app = Flask(__name__, static_url_path='/static')
redis = Redis(host='redis', port=6379)
voting_status = 'open'

@app.route('/vote/cast/<id>/<vote>', methods=['POST', 'GET'])
def vote(id, vote):
    voteIdInRedis = redisId(id)
    if redis.hexists(voteIdInRedis, voting.VOTES):
        redis.hincrby(voteIdInRedis, voting.VOTES, 1)
        redis.hincrby(voteIdInRedis, voting.SUM, vote)
    else:
        redis.hmset(voteIdInRedis, {voting.VOTES: 1, voting.SUM: vote})
    updateIdScore(id)
    return "ok"

@app.route('/vote/top/<amount>')
def top(amount):
    redis.incr('hits')
    return '{"ids": [1,2,3] }'


@app.route('/vote/status/')
def isopen():    
    return votingStatusJSON()

@app.route('/vote/open/')
def open():
    global voting_status
    voting_status = 'open'
    return votingStatusJSON()

@app.route('/vote/close/')
def close():
    global voting_status
    voting_status = 'close'
    return votingStatusJSON()

def votingStatusJSON():    
    global voting_status
    return '{"status": "' + voting_status + '" }'

def redisId(id):
    return "id:" + id
def updateIdScore(id):
    print (calculateScore(id))
    redis.zadd(voting.SCORE, calculateScore(id) ,id)
def calculateScore(id):
    rId = redisId(id)
    votes = int(redis.hget(rId, voting.VOTES))
    sumAmount = int(redis.hget(rId, voting.SUM))
    return "%0.1f" % (sumAmount / votes)



@app.errorhandler(404)
def not_found(error):
    return app.send_static_file('404.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)