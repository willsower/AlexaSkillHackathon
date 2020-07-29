# AlexaSkillHackathon

##### Project by: Timothy Bui, Alec Jenab, Muhammad Raza, Taichen Rose, and Robert Zhang

Link to get DB connection: https://developer.amazon.com/en-US/docs/alexa/hosted-skills/alexa-hosted-skills-personal-aws.html

Project Details

Must haves:

* HR documents/Onboarding tracking tool
* Timeline checking

Nice to have: 

* Have alexa explain what jobs entail

Ideas:

* connect with team manager/mentor based off preferences
* being able to talk to manager/mentor prior to day 1, and having a clear/more of a choice idea on the team you’d be performing on
* if an intern has a preference but cannot be placed on a related team it can connect the intern with the team prior to Day 1 and have them shadow some of that team’s work
* Having alexa send links to your email regarding onboarding


Must Intents to have coding: 

* Onboarding (what stuff should we have done)
* 

Notes:

* Alexa was made for small tasks
* Use mock data !
* Link to first webinar recording: https://register.gotowebinar.com/recording/1820250702161716492




*Basic Tasks:*

“Alexa open {pre-onboarding} skill”

→ “{name} what (documents) are due this week?”

→ “{name} Tell me the progress of my background check”

→ “Track my IT shipments”

→ if first time opening skill “When is your start date”

“Help”

## Creating DynamoDB on AWS account

(Keep in mind, with our basic implementation of our skill, we are only ‘reading’ data from the DB. So all our mock data can be created inside of our AWS/Isengard account. Then we will just have to connect, our DB to our alexa skill code, and pull the data)

→ Gave it a name (will change for final project)

→ Had userId/EmployeeID (String/Number) for primary key, and used userName (String) as sort key.

→ Create table

(Notice the PreOnboard table, when we click the “Items” tab, automatically has “userID” and “userName” as a column field for our DB.)

_Adding MOCK data to our DB_

→ So DynamoDB doesn’t have “columns". They have "items" and "attributes" for those items. To create an item, just click the + sign and click append, and then choose the type, add the name of your item. As you can see below I added "startDate" as a string, since DynamoDB doesn’t have a Date type, so I’ll store the start date as a string and parse the value using the date() function in code.

→ When adding mock data, I found it easier to code everything using JSON instead of using the “Tree” form. At the top left corner where it says “Tree” and an arrow, you can click that and push “Text” so you can code it. This allows you to code multiple values if need be, may be faster too. (I’ll show an example of this at the bottom of this section)

→ I was thinking a better way to store information in the DB instead of making a bunch of “items/columns” is using secondary indexes. You can read about this halfway through these white pages. https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html

→ So instead of having i9Section1Competion, i9Section2Completed, and more document completion columns we could do this as shown below.

````
{
  "ManagerInfo": {
    "ManagerAssigned": true,
    "ManagerName": "John Doe", 
    "ManagerEmail: "jdoe@amazon.com"
  },
  "HRDocumentInfo": {
    "i9Section1": {
      "Completed": true,
      "Details": "You must complete Section 1 of the Form I-9 prior to your first day. You will receive an email from i9 Advantage (amazon-i9@i9advantage.com) with a link, PIN, and instructions to log into their system. Please check your junk mail folder if you do not see the email from i9Advantage. If you have not received the e-mail within 24 hours of receiving this welcome email, or experience any other difficulties completing your I-9, please contact i9advantagesupport@amazon.com.",
      "DueDate": "06/14/2020"
    },
    "i9Section2": {
      "Completed": false,
      "Details": "Before the end of your third day, it is mandatory for Section 2 of the Form I-9 to also be completed. Further instructions are provided below under What to Expect on Your Virtual First Day.",
      "DueDate": "06/18/2020"
    }
  },
  "InternationalIntern": false,
  "ITGear": {
    "Shipped": true,
    "TrackingNumber": "1234ThisIsTotallyATrackingNumber"
  },
  "startDate": "06/15/2020",
  "userId": "12345ABC",
  "userName": "Tai Rose"
}
````

## Getting files ready for Alexa Skill

-> Need to get Node.js and npm installed. Will be using the node_modules SDK kit for alexa and AWS. Download Node.js from here https://nodejs.org/en/

-> Go to IDE, and create a folder. Get into your folder and type the following commands. 

-> To test if you correctly downloaded Node.js and npm, type these commands in the terminal
````
node -v

npm -v
````
-> These commands are to find the versions if installed on your computer correctly. 

-> If both come up with a version, then go ahead and initialize npm by typing the following into your terminal

````
npm init
````
-> Go ahead and click the enter key until everything is finished. Now that you've answered all the npm questions, use the following command to download the AWS SDK kit.

````
npm i alexa-sdk aws-sdk es6-promisify —save
````
-> Create an index.js file to your current directory. Go ahead and paste the contents of what's in my index.js file to yours. I update it regularly.

## Create Alexa Skill and Add Our Files

-> Go to Alexa Developer console, login/create account, then click create skill 

-> Type skill name, click the Custom button under "choose a model to add to your skill"

-> Under "Choose a method to host yoru skill's backend resources" click the Alexa-Hosted (node.js). Click create skill

-> Go ahead and just choose the "Hello World Skill" template. We will be deleting most of the stuff it makes for us here.

-> Go to Invocation Tab on the left side, and change the Skill Invocation Name. Whatever you put here will be the thing you say "Alexa open up \____ skill"

-> Click on Intents, and delete the HelloSkill or HelloWorld Intent, since we don't need that" Every once in awhile, go up and click "Save Model". You will want to "Build Model" right before you want to test your code.

-> Click the Code tab at the top of the nav bar.

-> Here is where we will import our code that we got in our IDE previously. In your index.js file. Delete everything and add the index.js you have.

-> Add the package.json file that you have, and add the package-lock.json file that you have too.

-> In my folder I have 4 files. index.js, package-lock.json, package.json, and util.js. You want to save when you make changes and deploy right before you test. 

-> If we ran our code right now, and we said alexa open up our skill, it wouldn't do anything. Lets get alexa to tell us the full pre onboarding schedule. 

-> Notice in our index.js, we have a bunch of constants that are holding all the lines of data, and if we look at our ListOnboardingTimelineFull function, it will repeat all of that information. 

-> We have the code down to do it, but now we need to map what we say to alexa, to execute that line of code. 

-> Go to Build -> Interaction Model -> Intents -> Add Intent -> Name it ListOnboardingTimelineFull (The name of the intent should be the same name as the function in index.js) Then click create custom intent.

-> Once you create it, you will be directed to a Sample Utterances page. There you want to type out a bunch of sample/possible utterances the user might invoke that function. This is what I have. 

````
Tell me the timeline before my first day
What is everythign I need to do for onboarding
What is everything I need to do for pre onboarding
{ask} onboarding timeline
What do I need to accomplish before day one
````

-> Of course I could add a bunch more, but notice how I'm using what is known as a 'slot' on the 4th line. {ask}. To work with this, Go to Intents -> Slot Types. 

-> Add Slot Type -> name it asking -> Next -> Then you can add all slot values that could possibly be used. I added the following 
````
tell me about the
can you tell me what
give me the
what is the
tell me the
````

-> These are all possible words that could be used in the 4th utterance that would replace {ask} "tell me about the...onboarding timeline". 

-> Click Build Model, then go to Code then go to Code tab and click Deploy

-> Go to Test tab, then go and type Alexa open up the /_____ skill. 

-> Say "Alexa tell me about my onboarding timeline" Alexa will repeat all of the infos.

## Connecting to DynamoDB

-> Now to make things more interesting. I want to ask Alexa when my starting day is. So first I'll go to my Intents, add the TellMeMyStartingDay, then add all possible utterances (use slots if you want) to invoke this. Unlike before, we are pulling this data from dynamoDB, it's not in our local script that alexa can read from. So we will have to use lambda to help us grab our data from alexa.

-> We need to make an IAM role to allow the user to read data from the database. We don't want EVERYONE to be able to access this database. Go to IAM click on Roles, click Create Role, click Lambda, then select the DynamoDBReadOnlyAccess permission. This is because we don't want to give the user full access. We don't want them to change, update, delete, create anything. Only read what is already there. Click Next to Tags. Click next again, add a name to your role. I called mine "ReadOnlyAccessDB." THen click Create Role. 

-> Go to finder and find the directory you are holding all files. Click on index.js, package.json, package-lock.json, and node_modules file, then compress them to a zip file. You will use this for a lambda function.

-> Go to lambda on AWS service portal. Click Create Function. Name your function, I'll just name it 'preonboarding' for now. 

-> Click on the 'Choose or create an execution role' button next to permissions. We will add our IAM role that we created for lambda to read only from dynamoDB. Click on use an existing role. Add the role that we created prior. Then click Create Function. 

-> Scroll down to where you see the Function Code window. Click on the Actions button in the right corner of the window and click Upload a .zip file. Upload the file we just created.

-> Go back to Alexa Developer and go to the Code portion. Click deploy, this will get your lambda function up and running. Then lets go to test and see if it will print out the startDate.

-> Used https://developer.amazon.com/en-US/docs/alexa/hosted-skills/alexa-hosted-skills-personal-aws.html to connect my Alexa-lambda skill to a role.
