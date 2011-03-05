
var redis = require('redis'),
    _ = require('underscore');

var client = redis.createClient();

exports.sync = function(method, model, success, error) {

    if (method == 'read') {
        var list_key = model.list_key;

        console.log(list_key);

        var res = client.lrange(list_key, 0, -1, function(err, replies) {
                success(_(replies).map(function(v) {
                            return JSON.parse(v);
                        }));
            });
        
        return res;
    }

    if (method == 'create' ||
        method == 'update') {
        var list_key = model.list_key;

        client.lpush(list_key, JSON.stringify(model));

        return;       
    }

};