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

## Getting files ready for Alexa Skill, and Reading data

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
