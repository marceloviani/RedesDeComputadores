var hostname = "broker.hivemq.com";
var port = 8000;
var clientId = "sotnasMARConiluarELOinaiv";
clientId += new Date().getUTCMilliseconds();;
var username = "marcelo.com";
var password = "Redes2021";
var subscription1 = "marcelo.com/temperatura";
var subscription2 = "marcelo.com/umidade";
var subscription3 = "marcelo.com/altura";
var subscription4 = "marcelo.com/luminosidade";
var subscription5 = "marcelo.com/segundos";

mqttClient = new Paho.MQTT.Client(hostname, port, clientId);
mqttClient.onMessageArrived =  MessageArrived;
mqttClient.onConnectionLost = ConnectionLost;
Connect();

/*Initiates a connection to the MQTT broker*/
function Connect(){
	mqttClient.connect({
		onSuccess: Connected,
		onFailure: ConnectionFailed,
		keepAliveInterval: 10,
		userName: username,
		//useSSL: true,
		password: password	
	});
}

/*Callback for successful MQTT connection */
function Connected() {
  console.log("Connected");
  mqttClient.subscribe(subscription1);
  mqttClient.subscribe(subscription2);
  mqttClient.subscribe(subscription3);
  mqttClient.subscribe(subscription4);
  mqttClient.subscribe(subscription5);

}

/*Callback for failed connection*/
function ConnectionFailed(res) {
	console.log("Connect failed:" + res.errorMessage);
}

/*Callback for lost connection*/
function ConnectionLost(res) {
  if (res.errorCode != 0) {
	console.log("Connection lost:" + res.errorMessage);
	Connect();
  }
}

/*Callback for incoming message processing */
function MessageArrived(message) {
	console.log(message.destinationName +" : " + message.payloadString);
    var topic = message.destinationName.split("/");
    document.getElementById(topic[1]).innerHTML = message.payloadString;
}