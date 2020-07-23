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

##Creating DynamoDB on AWS account

(Keep in mind, with our basic implementation of our skill, we are only ‘reading’ data from the DB. So all our mock data can be created inside of our AWS/Isengard account. Then we will just have to connect, our DB to our alexa skill code, and pull the data)

→ Gave it a name (will change for final project)

→ Had userId/EmployeeID (String/Number) for primary key, and used userName (String) as sort key.

→ Create table

(Notice the PreOnboard table, when we click the “Items” tab, automatically has “userID” and “userName” as a column field for our DB.)

_Adding MOCK data to our DB_

→ So DynamoDB doesn’t have “columns". They have "items" and "attributes" for those items. To create an item, just click the + sign and click append, and then choose the type, add the name of your item. As you can see below I added "startDate" as a string, since DynamoDB doesn’t have a Date type, so I’ll store the start date as a string and parse the value using the date() function in code.

→ When adding mock data, I found it easier to code everything using JSON instead of using the “Tree” form. At the top left corner where it says “Tree” and an arrow, you can click that and push “Text” so you can code it. This allows you to code multiple values if need be, may be faster too. (I’ll show an example of this at the bottom of this section)

