const awsSDK = require('aws-sdk');
var db = new awsSDK.DynamoDB();
const docClient = new awsSDK.DynamoDB.DocumentClient();

var readStartDate = function(e, ctx, callback) {
    condition = {};

    condition["userId"] = {
        ComparisonOperator: "EQ",
        AttributeValueList:[{S: "12345ABC"}]
    }

    condition["userName"] = {
        ComparisonOperator: "EQ",
        AttributeValueList: [{S: "Tai Rose"}]
    }

    let params = {
        TableName: "PreOnboard",
        KeyConditions: condition,
        ProjectionExpression: "startDate"
    };

    db.query(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            callback(null, data["Item"]);
        }
    });

    // var params = {
    //     TableName: 'PreOnboard', 
    //     Key: {
    //         "userId": "12345ABC",
    //         "userName": "Tai Rose"
    //     }
    // };

    // docClient.query(params, function(err, data) {
    //     if (err) {
    //         callback(err, null);
    //     } else {
    //         callback(null, data);
    //     }
    // })
    
};

exports.handler = readStartDate;