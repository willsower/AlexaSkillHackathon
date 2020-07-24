const AWS = require('aws-sdk');
// const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
AWS.config.update({region: 'us-east-1'});

exports.handle = function(e, ctx, callback) {
    var db = new AWS.DynamoDB();
    let params = {
        TableName: "PreOnboard",
        Key: {
            "userId": "12345ABC",
            "userName": "Tai Rose"
        }
    };

    //Query DynamoDB data
    db.getItem(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.Item);
        }
    })
    // docClient.get(params, function(err, data) {
    //     if (err) {
    //         callback(err, null);
    //     } else {
    //         callback(null, data);
    //     }
    // })
}