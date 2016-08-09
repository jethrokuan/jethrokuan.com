---
layout: post
title: Building "Weight"
---

A while back, Vishnu, Kevan and I decided to build something. It didn't matter what it was -- we knew it would be fun.

## The Big Idea
We called it _weight_ for namesake, and intend to change it later.

Till this date, I remain unclear of the purpose it serves. Here are the few key functionalities it has:

1. It measures weight
2. It pushes the values periodically to the web
3. There's a native app to view the weight

I'm not even going to try to convince you that it's useful.

## The Parts in Brief
The first item we needed was a load cell. Load cells send electric signals of a magnitude proportionate to the force being measured. These are commonly found in weighing scales and pressure sensors.

A typical load cell consists of four strain gauges, arranged in a Wheatstone bridge formation. 

<amp-img width="600" height="400" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Wheatstonebridge_current.svg/300px-Wheatstonebridge_current.svg.png"></amp-img>

Wheatstone bridges are electrical circuit structures, typically used to accurately measure an unknown electrical resistance. However, it can also be used to vary the potential difference between two ends of a circuit, in a way that's independent on the current that passes through it. Slight variations in strain alter the electrical resistance of the circuit. This in turn causes variations in the potential difference across the two ends of the Wheatstone bridge. This potential difference is the electrical signal produced by load cell.

The electrical signal produced by the load cell is typically of the magnitude of millivolts. Fluctuations in this range are insignificant. Thus, we needed an amplifier. Drawing power from a source, an amplifier replicates the input signal shape, and increases its amplitude. The amplifier would make the fluctuations from the load cell measurable from a input reader, like an Arduino.

Last but not least, we needed a WiFi module for connectivity to the web. A generic ESP8266 module would do, so we borrowed one from the office where I worked at.

## Obtaining the parts
Individual electronic parts were costly. Vishnu and I made a trip down to Sim Lim Tower, and returned with absolutely nothing. A load cell cost 30 dollars there, and they didn't sell the cheaper amplifiers we needed. 

Hoping to scavenge the parts from a working product, we bought a weighing scale for 12 dollars.

<amp-img width="600" height="400" src="/assets/images/weighing-scale.jpg"></amp-img>

We tried using the load cells from the weighing scale, but the metallic ends on the load cell were too small. Soldering the load cell onto wires needed skills or equipment that we didn't possess, and we ended up burning the load cells.

Giving up, we bought the load cells and amplifier online.

These are the parts we ended up using:

1. Load Cell - 10kg, Straight Bar
2. Load Cell - 20kg, Straight Bar (Backup)
3. HX711 Amplifier
3. Espresso Lite v1.0 beta (ESP Module)

## Beginning Work
We decided to have a mini-hackathon at my house one Saturday. Kevan arrived first, then Vishnu, an hour later. The heat must've gotten to us, for we spent most of the afternoon lazing around. Work only commenced when the sun begun to set.

The first step was connecting the Espresso to the computer. This was easy -- Vishnu had a lot of experience with the Espresso. Next, we connected the load cell to the amplifier, which was in turn connected to the Espresso. We were then able to read the values from the Espresso. The value was in the tens of thousands, and didn't resemble anything remotely useful. It's time for calibration!

Remember that the electrical signal produced is linear to the amount of force applied on the strain gauge? Callibration was simple.

<p>
\begin{align*}  
\text{value} = \text{gradient} \times \text{weight} + \text{tare_constant}
\end{align*} 
</p>

*Tare_constant* was the initial value read with no weight on the load cell. This way, when not measuring anything, the value read would be 0. Next, we needed to calculate the value of *gradient*. I brought down weight plates weighing 1.25kg each, and placed them on top of the load cell one by one. The idea was obtain a graph with a few points, and calculate the gradient using excel. 

However, the graph resembled a logarithmic equation: some attentuation in the increase in value was observed. We could not calculate a value of *gradient* that would be accurate across all weights.

<amp-img width="600" height="400" src="https://cdn.sparkfun.com/assets/learn_tutorials/3/8/2/img0054.png"></amp-img>

A while had passed before we realized our mistake. We were treating the straight-bar load cell as a regular circular load cell, by placing weight directly on top of it. It operated differently, measuring weight by its deformation. It needed to be fixated onto a surface on one end, and have force applied on the other to measure the amount of force applied trying to "bend" it.

We had no wood to drill the load cell into, nor did we have screws of the correct size, so we had to work with a makeshift structure using scotchtape and some cardboard to prop it up. Hunger, as always, was haunting Vishnu, and we made it quick. The scotchtape could not hold the weight plates, so we tested that it worked with two iPhones. We drove out to Springleaf Prata in celebration, and also in part to satisfy Vishnu's cravings.

<amp-img width="600" height="400" src="/assets/images/weighing-scale-2.jpg"></amp-img>

## Connecting it to the Web
Back from a tantalizing dinner, we were ready to finish it up. We split the workload -- Vishnu was to resume work on the hardware, and use the ESP8266 module to send data to the web. I was to build the backend server, as well as persist the data sent by Vishnu to a database. Kevan was to get a quick prototype of an Android app working with App Inventor.

Using [Restify] and [LevelDB], I got the backend running quickly. This is a side effect of starting many (unfinished) mini projects. I opened a tunnel to my computer with [ngrok], allowing Vishnu to connect to my server over the Internet.

Vishnu had trouble sending data. My server was receiving POST requests from "weight", but no data was coming through. I went over to take a look.

I was not familiar with Processing, the language used to program the Espresso. My inability to read the code was compounded by the function names Vishnu chose to use, like `ReadLikeABoss` or `ReadLikeASuperBoss`. 

``` C
float readLikeABoss() {
  float cool = (hx711.read() - tareFactor) / calibFactor;
  return (cool / 1000);
}

float readLikeASuperBoss(int repeat) {
  float cool = 0;
  for (int i = 0; i < repeat; i++) {
    cool += (hx711.read() - tareFactor) / calibFactor;
    delay(10);
  }
  return (cool / repeat);
}

float printLikeASuperBoss(int repeat) {
  Serial.println(String(readLikeASuperBoss(repeat)) + " | TareFactor: " + String(tareFactor) + " | CalibFactor: " + String(calibFactor));
}
```

HTTP requests in Processing were (in my opinion) weirdly constructed. Using a library may have helped, but would occupy more space on the limited memory of the Espresso.


``` Processing
String data = "weight="+String(readLikeABoss());
data += "&id=james";
String url = "POST / HTTP/1.1\r\nHost: ";
url += host;
url += "\r\nConnection: close";
url += "\r\nContent-Length: " + String(data.length());
url += "\r\nContent-Type: application/x-www-form-urlencoded\r\n\r\n";
url += data;
client.print(url);
```

Once we corrected the typo in the POST request, we are able to get data transmitted to my server and stored periodically! 

<amp-img width="600" height="400" src="http://www.imagnity.com/wp-content/uploads/2013/03/WebComponent-JSON-Response-ParseResults.png"></amp-img>

# Native Application

Meanwhile, App Inventor gave hell to Kevan. Support for parsing custom JSON was horrible, and writing a parser with code blocks was both exhausting and a waste of time.

He got that working, but we looked to building a native app with Javascript instead. Handling JSON data would be simpler in Javascript. JSON is, after all, Javascript Object Notation. We didn't do much research, and went ahead with [Nativescript], because that's what Vishnu recommended. Alternatives included [React Native] or [Ionic]. In retrospect, I think [React Native] would have been a better choice. Hybrid mobile development has come such a long way since I last touched it two years ago, and I was impressed with how Nativescript easily handled things, until I tried React Native the day after.

Setting up the Android environment was frustrating. Turns out the Android development environment is minimally 3 gigabytes big. I only had 20GB allocated to my root partition (`'/'`) and it was too full to accomodate the Android environment. We installed it on Vishnu's laptop, leaving his laptop with 250mb of space. 

It was already 1am, and Vishnu slowly but surely fell asleep. I say surely, because he was snoring really loudly. Kevan and I soldiered on.

We installed Nativescript and began by playing around with it. We followed some tutorials on fetching things from the web. Nativescript's documentation was occasionally incorrect, and we had to experiment to get things working again.

3 hours later, we were finally able to fetch and display the latest value sent by "weight". It was 4am, and we each had our own agendas the next day, so we decided to head to bed.

Vishnu's incessant snoring kept me from sleeping. After tossing and turning for a while, I got up and resumed work on the application. I created a settings page that enabled fetching of values from a range of time. It also allowed changing the id of the product, as well as the URL it was fetching the data from.

2 hours later... it was [complete](/vid/weight.mp4)!

The dates were messed up earlier (Unix timestamp calculation errors), and our computers had a 8 minute time difference, but everything worked perfectly! I took that video with the excitement of a little boy being given ice-cream. The excitement was quickly smothered by exhaustion, and I went to sleep, overjoyed and overworked.

Building "weight" was fun, and as a first venture into the IoT space, it was smoother than I expected. All in a day's work!

[Restify]:http://restify.com/
[LevelDB]:https://github.com/Level/levelup
[ngrok]:https://ngrok.com/
[Nativescript]:https://nativescript.org
[React Native]:https://facebook.github.io/react-native/
[Ionic]:http://ionicframework.com/
