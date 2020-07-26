const awsSDK = require('aws-sdk');
var db = new awsSDK.DynamoDB();

var readStartDate = function(e, ctx, callback) {
    let params = {
        TableName: "PreOnboard",
        Key: {
            "userId": "12345ABC",
            "userName": "Tai Rose"
        }
    };

    db.query(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            callback(null, data);
        }
    });
};