const awsSDK = require('aws-sdk');
var db = new awsSDK.DynamoDB();
const docClient = new awsSDK.DynamoDB.DocumentClient();

var readStartDate = function(e, ctx, callback) {
    // let params = {
    //     TableName: "PreOnboard",
    //     Key: {
    //         "userId": "12345ABC"
    //         // ,
    //         // "userName": "Tai Rose"
    //     }
    // };

    // db.query(params, function(err, data) {
    //     if (err) {
    //         console.log(err, err.stack);
    //     } else {
    //         callback(null, data);
    //     }
    // });

    var scanParams = {
        TableName: 'PreOnboard', 
        Limit: 100
    };
    docClient.scan(scanParams, function(err, data) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, data);
        }
    })
    
};

exports.handler = readStartDate;