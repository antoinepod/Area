# Project AREA

**The goal of this project :**

The goal of this project is to discover, as a whole, the software platform that you have chosen through the creation of a business application.

To do this, you must implement a software suite that functions similar to that of IFTTT and/or Zapier.

> - An application server to implement all the features listed below.
> - A web client to use the application from your browser by querying the application server.
> - A mobile client to use the application from your phone by querying the application server.

**AREA :**

After subscribing to different services, the authenticated user can create some AREA in order to execute a REAction when an Action is found.

> Example our Area :
> 
> - Youtube / Telegram
> - Action : A received notification from an account we follow
> - REAction : A message is sent on Telegram

# Summary

**- General informations**

**- Folder architecture**

**- Branchs**

**- Services**

**- API**

# General informations

We were in a group of 4 persons to complete the project in 2 months.

We used Node.js, React.js and React native to develop our project.

The compilation is done with Docker :

> docker-compose up --build

# Folder architecture

We have created 3 folders in our github repository :

***server*** which act as the master node of the application. It contains all the logic of the actions and reactions. (The use of Node.js and Express.js)

***web*** which expose a website to interact with the AREA. (The use of React.js)

***mobile*** which expose a mobile application to interact with the AREA. (The use of React Native to be cross-platform)

![image](assets/folderArchitecture.png)

# Branchs

![image](assets/branchs.png)

# Services

**Actions**

***Youtube*** : Trigger every time a video is posted by a specified user.

***Weather*** : 

(1) Trigger every time it starts/stops freezing.

(2) Trigger every time it starts/stops raining.

(3) Trigger every time it is day/night.

(4) Trigger every time when the wind is over 80km/h.

***F1*** : 

(1) Trigger every time new results available.

(2) Trigger every time new qualifying results available.

***NASA*** : Trigger every time a new photo of the day is posted.

**Reactions**

***Telegram*** : The bot sends you a private message.

***Discord*** :

(1) The bot sends you a private message.

(2) The bot sends you a public message in the 'general' channel with your @username.

(3) The bot sends you a public message in the 'general' channel with @everyone.

# API

# Members

Project made by William MALLEVAYS, Antoine PODVIN, Marine POTEAU and Brieuc LAVEUGLE