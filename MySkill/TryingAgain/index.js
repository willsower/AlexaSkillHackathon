const Alexa = require('ask-sdk-core');
const awsSDK = require('aws-sdk');
awsSDK.config.update({region: "us-east-1"});
var db = new awsSDK.DynamoDB();
const tableName = "PreOnboard";
const userID = "12345ABC";

/**
 * Onboarding Timeline 
 *  */ 
const BeforeStart3060 = "30 to 60 days before starting. Start background check and relocation initiation. If you need immigration support, this will start to happen around this time aswell.";
const BeforeStart2030 = "20 to 30 days before starting. 1. Introduce Via email to your manager. 2. Request via MyDocs to confirm your mailing address. 3. Complete Survey to verify mailing address.";
const BeforeStart1020 = "10 to 20 days before, MyDocs will send you important paperwork to complete including your I-9 Verification.";
const OneWeekBeforeStart = "One week before your start day New Hire Orientation information will be shared via email.";
const ByDay30ofEmployment = "By day 30 of employment, you need to obtain a SSN or SIN and US bank account, if needed.";
const fridayBefore = "The Friday before you start, you should receive all IT assets and your security key through UPS or FedEX.";
const firstWeek = "In your first week of employment at amazon. You should have already completed all assigned NHO tasks. Schedule weekly 1 on 1 meetings with your manager. And have completed trainings assigned by your manager in Embark, which is Amazon's onboarding tool.";

/*
* Helper functions
*/

function getUserInfo(userID) {
    let condition = {};
    condition["userId"] = {
        ComparisonOperator: "EQ",
        AttributeValueList:[{S: "12345ABC"}]
    }

    condition["userName"] = {
        ComparisonOperator: "EQ",
        AttributeValueList: [{S: "Tai Rose"}]
    }

    const params = {
        TableName: tableName,
        KeyConditions: condition,
        ProjectionExpression: "startDate"
    }
    db.query(params, (err, data) => {
        if (err) {
            console.log(err, err.stack);
            return 0;
        } 
        console.log(data);
        return data["Item"];
    })
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = "Welcome, to the pre onboarding skill! You can ask about what is due this week, or about your timeline. Go ahead and say help if you want more example commands. Or exit if you are done.";
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const ListOnboardingTimelineFullHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListOnboardingTimelineFull';
    },
    handle(handlerInput) {
        const speakOutput = BeforeStart3060 + BeforeStart2030 + BeforeStart1020 + OneWeekBeforeStart + fridayBefore + firstWeek + ByDay30ofEmployment;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const TellMeMyStartingDayHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TellMeMyStartingDay';
    },
    async handle(handlerInput) {
        const {responseBuilder } = handlerInput;
        let data = getUserInfo(userID);

        const speakOutput = "Your starting day is currently set to " + data.startDay;
        return responseBuilder
        .speak(speakOutput)
        .getResponse();
    }
};
const ManagerHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Manager';       
    },
    async handle(handlerInput) {
        const {responseBuilder } = handlerInput;
        let data = getUserInfo(userID);

        // if (data.managerInfo.managerAssigned == true) {
        //     const speakOutput = "Your manager's name is " + data.ManagerInfo.managerName + " You can reach them though the email " + data.ManagerInfo.managerContact;
        //     return responseBuilder
        //     .speak(speakOutput)
        //     .getResponse();
        // } else {
            const speakOutput = "You currently don't have a manager assigned. Please check back about a month prior to your first day.";
            return responseBuilder
            .speak(speakOutput)
            .getResponse();
        // }
    }
};
const ITGearHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ITGear';       
    },
    async handle(handlerInput) {
        const {responseBuilder } = handlerInput;
        let data = getUserInfo(userID);

        // if (data.ITGear.Shipped == true) {
        //     const speakOutput = "Your IT Gear is currently being shipped. The tracking number is " + data.ITGear.TrackingNumber.S;
        //     return responseBuilder
        //     .speak(speakOutput)
        //     .getResponse();
        // } else {
            const speakOutput = "You currently don't have any IT Gear shipments. Please check again about a week prior to your first day. You should have received your gear on the Friday prior to your start day. If not, contact HR.";
            return responseBuilder
            .speak(speakOutput)
            .getResponse();
        // }
    }
};
const MyHRDocumentsHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HRDocuments';
    },
    handle(handlerInput) {
        const speakOutput = "Your tasks before day one include, complete any surveys sent to you regarding onboarding logistics. Completing your background check, details should be sent to your email. Complete both your I-9 Section 1, and Section 2. You should have also received an email regarding your MyDocs documents that need to be completed. Reach out to asp-offersandonboarding@amazon.com if you have any further questions about your onboarding or documentation.";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const DueDatesHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DueDate';
    },
    handle(handlerInput) {
        const speakOutput = "You can ask me what needs to be done before day 1 at amazon, or ask me your manager's contact information. I can also tell you when you start day is, and details about your documents. How can I help?";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
}
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = "You can ask me what needs to be done before day 1 at amazon, or ask me your manager's contact information. I can also tell you when you start day is, and details about your documents. How can I help?";

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ListOnboardingTimelineFullHandler,
        TellMeMyStartingDayHandler,
        ManagerHandler,
        ITGearHandler,
        MyHRDocumentsHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
