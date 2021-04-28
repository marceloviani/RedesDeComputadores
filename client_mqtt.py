import paho.mqtt.client as mqtt
import time
import random

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("broker.hivemq.com", 1883, 60)

a1 = 0
a2 = 1
a3 = 0
t = 0

while(1):
    time.sleep(1)
    client.publish('marcelo.com/temperatura',random.randint(-10,60))
    client.publish('marcelo.com/umidade', random.randint(5,40))
    client.publish('marcelo.com/luminosidade',random.randint(0,6000))
    client.publish('marcelo.com/altura',a3)
    client.publish('marcelo.com/segundos',t) 
    a3 = a1+a2
    a1 = a2
    a2 = a3
    if t == 86400:
        t = 0
    t = t+1
    
# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()
