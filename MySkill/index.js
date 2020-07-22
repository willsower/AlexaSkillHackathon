const alexaSDK = require('alexa-sdk');
const awsSDK = require('aws-sdk');
const promisify = require('es6-promisify');

const appId = 'amzn1.ask.skill.c177d307-c4a1-4d28-9cce-70097a58a814'; // Get this Skill ID on the page of all your alexa skills under the name of the skill
const myTable = 'PreOnboard';
const docClient = new awsSDK.DynamoDB.DocumentClient();

// convert callback style functions to promises
const dbScan = promisify(docClient.scan, docClient);
const dbGet = promisify(docClient.get, docClient);

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
   * Lists all saved recipes for the current user. The user can filter by quick or long recipes.
   * Slots: GetRecipeQuickOrLong
   */
  'GetAllRecipesIntent'() {
    const { userId } = this.event.session.user;
    const { slots } = this.event.request.intent;
    let output;

    // prompt for slot data if needed
    if (!slots.GetRecipeQuickOrLong.value) {
      const slotToElicit = 'GetRecipeQuickOrLong';
      const speechOutput = 'Would you like a quick or long recipe or do you not care?';
      const repromptSpeech = 'Would you like a quick or long recipe or do you not care?';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }

    const isQuick = slots.GetRecipeQuickOrLong.value.toLowerCase() === 'quick';
    const isLong = slots.GetRecipeQuickOrLong.value.toLowerCase() === 'long';
    const dynamoParams = {
      TableName: myTable
    };

    if (isQuick || isLong) {
      dynamoParams.FilterExpression = 'UserId = :user_id AND IsQuick = :is_quick';
      dynamoParams.ExpressionAttributeValues = { ':user_id': userId, ':is_quick': isQuick };
      output = `The following ${isQuick ? 'quick' : 'long'} recipes were found: <break strength="x-strong" />`;
    }
    else {
      dynamoParams.FilterExpression = 'UserId = :user_id';
      dynamoParams.ExpressionAttributeValues = { ':user_id': userId };
      output = 'The following recipes were found: <break strength="x-strong" />';
    }

    // query DynamoDB
    dbScan(dynamoParams)
      .then(data => {
        console.log('Read table succeeded!', data);

        if (data.Items && data.Items.length) {
          data.Items.forEach(item => { output += `${item.Name}<break strength="x-strong" />`; });
        }
        else {
          output = 'No recipes found!';
        }

        console.log('output', output);

        this.emit(':tell', output);
      })
      .catch(err => {
        console.error(err);
      });
  },

  /**
   * Reads the full info of the selected recipe.
   * Slots: RecipeName
   */
  'GetRecipeIntent'() {
    const { slots } = this.event.request.intent;

    // prompt for slot data if needed
    if (!slots.RecipeName.value) {
      const slotToElicit = 'RecipeName';
      const speechOutput = 'What is the name of the recipe?';
      const repromptSpeech = 'Please tell me the name of the recipe';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }

    const { userId } = this.event.session.user;
    const recipeName = slots.RecipeName.value;
    const dynamoParams = {
      TableName: myTable,
      Key: {
        Name: recipeName,
        UserId: userId
      }
    };

    console.log('Attempting to read data');

    // query DynamoDB
    dbGet(dynamoParams)
      .then(data => {
        console.log('Get item succeeded', data);

        const recipe = data.Item;

        if (recipe) {
          this.emit(':tell', `Recipe ${recipeName} is located in ${recipe.Location} and it
                        is a ${recipe.IsQuick ? 'Quick' : 'Long'} recipe to make.`);
        }
        else {
          this.emit(':tell', `Recipe ${recipeName} not found!`);
        }
      })
      .catch(err => console.error(err));
  },

  'Unhandled'() {
    console.error('problem', this.event);
    this.emit(':ask', 'An unhandled problem occurred!');
  },

  'AMAZON.HelpIntent'() {
    const speechOutput = instructions;
    const reprompt = instructions;
    this.emit(':ask', speechOutput, reprompt);
  },

  'AMAZON.CancelIntent'() {
    this.emit(':tell', 'Goodbye!');
  },

  'AMAZON.StopIntent'() {
    this.emit(':tell', 'Goodbye!');
  }
};

exports.handler = function handler(event, context) {
  const alexa = alexaSDK.handler(event, context);
  alexa.APP_ID = appId;
  alexa.registerHandlers(handlers);
  alexa.execute();
};