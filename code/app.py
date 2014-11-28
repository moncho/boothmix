from flask import Flask, session, request, jsonify
from flask.ext.autodoc import Autodoc
from redis import Redis
import json
import voting


app = Flask(__name__, static_url_path='/static')
auto = Autodoc(app)
redis = Redis(host='redis', port=6379)
voting_status = 'open'

@app.route('/vote/rate/<id>/<int:rating>/', methods=['POST', 'GET'])
@auto.doc()
def rate(id, rating):
    """rates resource identified by <b>id</b> with the given <b>rating</b>.
    JSON: 
        {"result": "ok" }
    """
    result = "ok"
    httpResult = 200
    if (voting_status == "open" and (rating > 0 and rating <= 10)): 
        idInRedis = redisId(id)
        if redis.hexists(idInRedis, voting.VOTES):
            redis.hincrby(idInRedis, voting.VOTES, 1)
            redis.hincrby(idInRedis, voting.SUM, rating)
        else:
            redis.hmset(idInRedis, {voting.VOTES: 1, voting.SUM: rating})
        updateIdRating(id)        
    else:        
        result = "Rating %s not accepted" % rating
        httpResult = 404        
    return jsonify({"result": result }), httpResult

@app.route('/vote/top/<n>/')
@auto.doc()
def top(n):
    """
    returns a list with the top <b>n</b> elements with the highest rating
    JSON: 
        {"top": [{"id": "3", "rating" : "8.1"},
             {"id": "1", "rating" : "7.5"},
             {"id": "6", "rating" : "7.4"},
             {"id": "8", "rating" : "7.4"}
             ]}'
    """             
    results = redis.zrevrange(voting.RATING, 0, n, "withscores")
        
    return ratingToJSON(results), 200

@app.route('/vote/status/')
@auto.doc()
def isopen():
    """returns the status of the voting process
     JSON:
        {"status": "open" }
        {"status": "close" }
    """
    return votingStatusJSON()

@app.route('/vote/open/')
def open():
    global voting_status
    voting_status = 'open'
    return votingStatusJSON()

@app.route('/vote/close/')
def close():
    app.logger.info("Voting closed from " + getClientIp(request))
    global voting_status
    voting_status = 'close'
    return votingStatusJSON()

@app.route('/vote/4/8/15/16/23/42/')
def flush():
    redis.flushdb()
    return jsonify({"jacob": "black smoke" }), 200    

@app.route('/vote/api/')
def describe_api():
    #return app.send_static_file('api.html')
    return auto.html()

def votingStatusJSON():    
    global voting_status
    return jsonify({"status": voting_status }), 200

def ratingToJSON(ratings):
    json = '{"top":['
    for rating in ratings:
        app.logger.debug(rating)
        json += '{"id" : "%s", "rating" : "%s"},' % (rating[0], rating[1])
    #To remove the last added ','
    if ratings : 
        json = json[:-1]
    json += ']}'
    return json

def redisId(id):
    return "id:" + id

def updateIdRating(id):
    #app.logger.debug(recalculateRating(id))
    redis.zadd(voting.RATING, id, recalculateRating(id))

def recalculateRating(id):
    rId = redisId(id)
    votes = int(redis.hget(rId, voting.VOTES))
    sumAmount = int(redis.hget(rId, voting.SUM))
    return "%0.1f" % (sumAmount / float(votes))

def getClientIp(request):
    ip = ""
    if not request.headers.getlist("X-Forwarded-For"):
        ip = request.remote_addr
    else:
        ip = request.headers.getlist("X-Forwarded-For")[0]
    return ip


@app.errorhandler(404)
def not_found(error):
    return app.send_static_file('404.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)