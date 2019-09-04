I was cooking during my holidays, and realized that I couldn't create a timer for both my eggs and my noodles, so I created an app that could do it.


## Table of Contents
This ReadMe is organized as follows (this is a typical README.md) :
1) [Demo](#Demo)
2) [Installation](#installation)
4) [Explanation](#explanation)
9) [Improvements](#improvements)

## Demo
![](DemoMultipleStopwatch.gif)

As you can see, the app allows you to create multiple timers and multiple stopwatches. you can pause them, resume, and delete them. I cannot show it in the GIF, but when the timer reaches its end, it obviously plays a sound.


## Installation

It should be pretty straightforward (even if React Native is not known for the stability of its installations).

```bash
git clone git@github.com:Djazouli/MultipleStopwatch.git
npm install
react-native link
cd ios && pod install
cd .. && react-native run-ios
```

## Explanation

The app contains three screens:
* The main screen, which displays all the current stopwatches and timers, along with two buttons,
allowing you to create new timers and new stopwatches. When clicking one of these button you are redirected to a different screen
(one for each type)

* The screen to create a stopwatch simply asks for the title.

* The screen to create a timer asks for the title and the duration of the timer

All these screens are linked with 'react-native-navigation'
The timer and the stopwatch are simple react component, and their duration is refreshed with a setInterval function.
When the timer reaches a negative value, a sound is played thanks to the library react-native-sound. And then is looped until the timer is deleted.
The sound is loaded when the timer component is created, to avoid race conditions when we try to play it.

## Improvements

* Having a different interval for each timer/stopwatch allow to easily pause them, and have a precise duration. But it may be costly
if there are a lot (hundreds ?) of timers/stopwatches. Thus, it may be interesting to have a main 'setInterval' that refreshes all timers.

* It may have been interesting to have a mother class for both the Timer and the Stopwatch component, because they do have a lot in common, and most of the code is redundant. But on such a small app, I decided to expedite the app, as it is more a one-time think, and it will not be maintained.

* It may be better to load the sound file only once at the beginning of the app, instead of loading it every time you create a timer.
But if we had more sound choices, then it would impact the starting time of the app, and thus I would rather only load the sound one by one, as it is now.

* setInterval is currently poorly managed (in my code) if you put the app in background. It would be great to add an event listener to know when the app is in background, and do something
to keep it running correctly. It would also allow us to display a notification with the list of timers and stopwatches.

