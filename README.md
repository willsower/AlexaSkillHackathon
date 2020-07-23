# AlexaSkillHackathon
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

[Image: Screen Shot 2020-07-21 at 2.11.04 PM.png]


*Basic Tasks:*

“Alexa open {pre-onboarding} skill”
→ “{name} what (documents) are due this week?”
→ “{name} Tell me the progress of my background check”
→ “Track my IT shipments”
→ if first time opening skill “When is your start date”
“Help”

*_Creating DynamoDB (DynamoDB on our AWS Isengard accounts)_*

(Keep in mind, with our basic implementation of our skill, we are only ‘reading’ data from the DB. So all our mock data can be created inside of our AWS/Isengard account. Then we will just have to connect, our DB to our alexa skill code, and pull the data)
→ Gave it a name (will change for final project)
→ Had userId/EmployeeID (String/Number) for primary key, and used userName (String) as sort key.
→ Create table
[Image: Screen Shot 2020-07-21 at 12.34.12 PM.png]

(Notice the PreOnboard table, when we click the “Items” tab, automatically has “userID” and “userName” as a column field for our DB.)
[Image: Screen Shot 2020-07-21 at 12.38.34 PM.png]_Adding MOCK data to our DB_
→ So DynamoDB doesn’t have “columns". They have "items" and "attributes" for those items. To create an item, just click the + sign and click append, and then choose the type, add the name of your item. As you can see below I added "startDate" as a string, since DynamoDB doesn’t have a Date type, so I’ll store the start date as a string and parse the value using the date() function in code.
→ When adding mock data, I found it easier to code everything using JSON instead of using the “Tree” form. At the top left corner where it says “Tree” and an arrow, you can click that and push “Text” so you can code it. This allows you to code multiple values if need be, may be faster too. (I’ll show an example of this at the bottom of this section)
[Image: Screen Shot 2020-07-21 at 12.44.54 PM.png]
→ Here is an example of a single piece of data in the table.
[Image: Screen Shot 2020-07-21 at 12.55.36 PM.png]
→ I can edit this table value if I need to. I click on the square radio button next to it, and go to actions then click edit. I can add/delete/update data or add more items.
[Image: Screen Shot 2020-07-21 at 12.57.58 PM.png]
→ I was thinking a better way to store information in the DB instead of making a bunch of “items/columns” is using secondary indexes. You can read about this halfway through these white pages. 
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html
→ So instead of having i9Section1Competion, i9Section2Completed, and more document completion columns we could do this as shown below.
[Image: Screen Shot 2020-07-21 at 1.13.17 PM.png]
→ Updated version 
Note: The only updated backend thing that HR would need to do is update the boolean values for completion and add the tracking number. Of course there are more HR Documents, but these were the only ones that came to mind currently. 
[Image: Screen Shot 2020-07-21 at 1.14.08 PM.png]
If someone wants to copy and paste, update what I did into THEIR DB, here is my code: 
{
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

_Getting files ready for Alexa Skill, and Reading data_

→ Creating a place to work with my skill. Starting over from the beginning. I created a directory called “MySkill” and made a new file called “index.js”. Opened the terminal and got to where my script currently is in the directory. Need to download Node.js and npm. I went here https://nodejs.org/en/ to do this. This is because we need to add the AWS SDK since we are connecting to DynamoDB. 

[Image: Screen Shot 2020-07-21 at 1.22.07 PM.png]

→ Downloaded what I needed so when I check the version on my terminal it will pop up. You can see when I did node -v and npm -v at first it said command not found. When I did it again at the end they had the versions

[Image: Screen Shot 2020-07-21 at 1.26.54 PM.png]

→ Type npm init into your terminal. Just hit enter for everything, then when it hits “Is this OK? (yes)” you can type yes or just enter. As shown below

[Image: Screen Shot 2020-07-21 at 1.32.48 PM.png]

→ Now that you’ve answered all npm questions you can use this command. “npm i alexa-sdk aws-sdk es6-promisify —save“ Doing that command will download the AWS SDK kit

[Image: Screen Shot 2020-07-21 at 1.33.04 PM.png]

→ Inside your index.js file, here is the link to my github. I’ve been updating info as I go. You can copy and paste the index.js into your file. https://github.com/willsower/AlexaSkillHackathon/tree/master/MySkill

_Create Alexa Skill and add our files_

→ Go to Alexa Developer console, login/create account. Click create skill.

→ Type in skill name. Under where it says “Choose a model to add to your skill” click Custom. Since we won’t be using a template. 

→ Under “Choose a method to host your skill’s backend resources” click the Alexa-Hosted(Node.js) version. Click create skill

→ After you clicked create skill, it will lead you to the template of your skill. You don’t need a template since we already made one. I know we could directly upload out template via github, which I already had a directory for, but I couldn’t figure that one out. So I just clicked the Hello World Skill, and deleted the unnecesary files, and added in my own after I created it. Also went to the Intents and deleted Hello intent since we didn’t need that one. (Reason I didn’t do upload via github was because I needed a skill.js or skill.json file in my first level of the github directory, but I didn’t know the content and didn’t want to waste time researching into it.)

→ Well I’m going to start adding intents due to my skill. We will test each one to make sure it works. (Note for this, add an intent, add the utterances, then test. Don’t add ALL intents and then test, because if you do that, you don’t know if they are ALL broken, or if one is broken). First intent I’m going to add will be “ListOnboardingTimelineFull'”.  Which is this line below. I'm just adding all statements that need to be done to the “all” variable, then will have alexa say it.

[Image: Screen Shot 2020-07-22 at 10.02.52 AM.png]

→ To add this to my skill. I go to the “Build” tab, then click “Interaction Model”, and then go to “Intents). Click Add Intent. Name the intent the same name as the function name in the code. If you want to change the name, change both, this will help with figuring out which intent corresponds with each function. 

[Image: Screen Shot 2020-07-22 at 10.17.55 AM.png]

→ Here I just named it the full “ListOnboardingTimelineFull” and will click the blue button next to it “Create Custom Intent” which will lead me to a new window. We will be able to add sample utterances that might be used to invoke this intent.  Here are a few examples. I’m sure we can go in more depth. I created what is known as a “slot” using the curly braces around ask. This means I will go to {ask} and explain what those slot words could mean. (Make sure to save the model every now and then at the top of the screen)

[Image: Screen Shot 2020-07-22 at 10.23.40 AM.png]

→ To create slot types, I wanted to customize my own. I clicked on the “Slot Types” tab on the left bar, and clicked “Add Slot Type” I created the name called “asking” for my ask slot. I added utterances that could possibly be added as shown below. The slot utterances can be changed to the actual intent value.

[Image: Screen Shot 2020-07-22 at 10.33.24 AM.png]

→ Time to test! Click “Build Model” at the top. I get an error. It seems to be yelling at me because in my intent I had pre - onboarding, and it doesn’t like the dash. I’ll delete that and then build again. (Build often to find mistakes, similar to compiling in regular coding). Build successful, it’ll take a few seconds to truly finish everything. Then I’ll go to the “Test” tab. I typed in “Alexa open pre onboarding skill” then I typed in “tell me my timeline” which invoked my function and read everything.

[Image: Screen Shot 2020-07-23 at 10.51.24 AM.png]

→ The simplest version works! No database is needed since it should just print what I need. Now to make things more interesting...


_Use DynamoDB to read data_

→ Going to add a “Tell me my starting day” invocation to my index.js file. This will HAVE to pull data from my database. 
→ To do this. I will be using lambda on AWS and use IAM to allow user to read data from the table. IAM must be used because we don’t want ‘anyone’ to read the information.
