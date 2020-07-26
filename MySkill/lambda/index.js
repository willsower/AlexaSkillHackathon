const awsSDK = require('aws-sdk');
var db = new awsSDK.DynamoDB();
const docClient = new awsSDK.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    try {
        var request = event.request;
        if (request.type == 'TellMeMyStartingDay') {
            readStartDate(event, context, callback);
        } else {
            throw("Unknown intent");
        }

    } catch (e) {
        context.fail("Exception " + e);
    }
}

/* 
* Reads start date in dynamoDB
*/
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
};

