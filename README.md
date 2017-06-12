Simple application to detect when your internet is offline. 
Would be usefull in cases if you have laggy internet 
connection and whant to check how laggy it is...

Checks if application can access google.com every 8 seconds and if it cannot logs it in log.txt
Provides offline time count in multiples of 8 sec.

Downfall in this version is in case if geegle.com will be down application will consider that network is down..

I will fix this in future to check multiple hosts

To launch application:

    1. type in console: npm install
    2. type in console npm start