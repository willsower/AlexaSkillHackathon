const AWS = require('aws-sdk');
const docClient = new awsSDK.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handle = function(e, ctx, callback) {
    let params = {
        TableName: "PreOnboard",
        Key: {
            "userId": "12345ABC",
            "userName": "Tai Rose"
        }
    };

    //Query DynamoDB data
    docClient.get(params, function(err, data) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    })
}