#Yakusoku

##What's that ?

Yakusoku is a simple open source project to show how simple it is to have a realtime appointments system. It uses different components :

- [**Orchestrate**](http://orchestrate.io/) for storing the data
- [**Pusher**](http://pusher.com/) for sending in realtime the new appointments across all the browsers
- [**CLNDR.js**](http://kylestetz.github.io/CLNDR/) for generating the calendar (I copy the UI of their website too)

##How to get started

- Clone the repository http://github.com/yrezgui/yakusoku
- Execute this command from the cloned repository folder: ``npm install``
- Create an account Orchestrate
- Create an account Pusher
- Set these environment variables:
  - PUSHER_APPID
  - PUSHER_KEY
  - PUSHER_SECRET
  - ORCHESTRATE_TOKEN
  - PORT (port of the NodeJS server)
- And finally: node web.js

##Demo

Have a look there : http://yakusoku.herokuapp.com/
