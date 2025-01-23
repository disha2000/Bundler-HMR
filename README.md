HMR (Hot Module Replacement)
There are 4 files
 - index.html
 - app.js
 - server.js
 - hmr-client

1. index.html
   In this we are adding script tag with src app.js
   
3. server.js
   - We have created server at 1235 port no where on '/' url it will serve index.html and js file as needed
   - Created file watecher which we observe app.js file for any changes
   - Created websocket server at 8080 port no. for communication with all clients which are connected
   - If there are any changes detected through file watcher via websocket will notify to all the client in this case hmr-client

4. hmr-client.js
   - it will connect with websocket on 8080 port number
   - Will listen for a message form web socket server
   - Web server will send the message it detects any changes in the file and the message will contained file name and type. this message will recived by the hmr-client
   - And it will reload or import the file which has changed
