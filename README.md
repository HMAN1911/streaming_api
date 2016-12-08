# Streaming Api

This is a very primitive demo of how a 'streaming api' could be achieved.

## Installation

`yarn install` or npm `install` after you clone.

You need mongo for my demo, but obviously it can point to any data (or none at all, you could use this as a 'streamifyer') . Run this to import the sample book db:

```
mongoimport -d library -c books ./db.json
```

This is currently only the server-side implementation. Point your websocket to the url of the server and listen for the `news` event.

## Todo

* Bundle up client-side code in a script tag (just like Twitter does with their streaming api!)
* Require a token to subscribe to the stream and/or to post to it

