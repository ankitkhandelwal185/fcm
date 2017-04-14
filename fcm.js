var express = require('express');
var bodyParser = require('body-parser');
var FCM = require('fcm-push');
var app = express();
var port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var admin = require("firebase-admin");


var admin = require("firebase-admin");

var serviceAccount = require("./safito-164419-firebase-adminsdk-ohs9y-d92ad8104b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://safito-164419.firebaseio.com"
});

var serverKey = 'AIzaSyDsZzkAk9ZfH61PMWY8qVeHqMGG00kXbX0';
var fcm = new FCM(serverKey);
app.get('/api/fcm/get', function(request, response){
    response.send("fine!!");
})
app.post('/api/fcm', function( request, response){

    //response.send(request.body.device_token);
    console.log("token "+request.query.device_token);
    // Initialize the default app
    /*var defaultApp = admin.initializeApp(defaultAppConfig);

    console.log(defaultApp.name);  // "[DEFAULT]"*/

    /*// Retrieve services via the defaultApp variable...
    var defaultAuth = defaultApp.auth();
    var defaultDatabase = defaultApp.database();*/

    // These registration tokens come from the client FCM SDKs.
    var registrationTokens = [
      /*"bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...",
      // ...
      "ecupwIfBy1w:APA91bFtuMY7MktgxA3Au_Qx7cKqnf..."*/
      request.query.device_token
      //" fogq1OOS0eM:APA91bFaQfI3zZFCPJ4OUnoJq-uZ8_Lf_P1x4KlDCr60OUzVQyWQvlZpbZWNP2Q55N3YrCO_ngBqTTo_uoQMwSNxN8D1FucQBD-syv6AD7zqoYu1yHT09WCvBxiO19rXUAFhgH7DbJTP"
    ];

    // See the "Defining the message payload" section below for details
    // on how to define a message payload.
    var payload = {
  notification: {
    title: "Hey Buddy!!!!",
    body: "Please, help me "
  },
  data: {
    stock: "GOOd",
    open: "829.62",
    close: "635.67"
  }
};

    // Send a message to the devices corresponding to the provided
    // registration tokens.
    admin.messaging().sendToDevice(registrationTokens, payload)
      .then(function(response) {
        // See the MessagingDevicesResponse reference documentation for
        // the contents of response.
        console.log("Successfully sent message:", response);
      })
      .catch(function(error) {
        console.log("Error sending message:", error);
      });

});

    app.listen(port, function(){
    console.log('listening at port '+port);
});