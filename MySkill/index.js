const alexaSDK = require('alexa-sdk');
const awsSDK = require('aws-sdk');
const DynamoDB = new awsSDK.DynamoDB();
// const {promisify} = require('es6-promisify');
// const docClient = new awsSDK.DynamoDB.DocumentClient({region: 'us-east-1'});
// const dbGet = promisify(docClient.get, docClient); //Get query

exports.handler = function(event, context, callback) {
    var alexa = alexaSDK.handler(event, context);

    // alexa.appId = 'amzn1.ask.skill.c177d307-c4a1-4d28-9cce-70097a58a814';
    // alexa.dynamoDBTableName = 'PreOnboard';
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const instructions = `Welcome, to the pre onboarding skill! You can ask about what is due this week, 
                      or about your timeline. Go ahead and say help if you want more example commands. 
                      Or exit if you are done.`;

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

const handlers = {

  /**
   * Triggered when the user says "Alexa, open Pre Onboarding skill.
   */
  'LaunchRequest'() {
    this.emit(':ask', instructions);
  },

  /**
   * Lists full onboarding timeline
   */
  'ListOnboardingTimelineFull'() {
    const all = BeforeStart3060 + BeforeStart2030 + BeforeStart1020 + OneWeekBeforeStart + fridayBefore + firstWeek + ByDay30ofEmployment;
    this.emit(':tell', all);
  },

  /**
   * Tell the user when their starting day is
   */
  'TellMeMyStartingDay'() {
    this.email(":tell", "hai");
    let params = {
        TableName: "PreOnboard",
        Key: {
            "userId": "12345ABC",
            "userName": "Tai Rose"
        }
    };

    //Query DynamoDB data
    DynamoDB.getItem(params, (err, data) => {
        if (err) {
            console.log(err, err.stack);
            console.log("nothing :(");
        } else {
            this.emit(':tell', "Your current start day is " + data.Item.startDay.userId);
        }
    })
  },

  /**
   * Couldn't understand what was being said
   */
  'Unhandled'() {
    console.error('problem', this.event);
    this.emit(':ask', 'An unhandled problem occurred!');
  },

  /**
   * Help intent will just read the instructions again
   */
  'AMAZON.HelpIntent'() {
    const speechOutput = instructions;
    const reprompt = instructions;
    this.emit(':ask', speechOutput, reprompt);
  },

  /**
   * Cancel / Stop intent will exit the skill
   */
  'AMAZON.CancelIntent'() {
    this.emit(':tell', 'Goodbye!');
  },

  'AMAZON.StopIntent'() {
    this.emit(':tell', 'Goodbye!');
  }
};