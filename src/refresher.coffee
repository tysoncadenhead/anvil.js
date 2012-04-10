# ## SocketServer ##
# Class to manage client notifications via socket.io
class SocketServer
  
  constructor: ( app ) ->
    _.bindAll( this )
    @clients = []
    @io = require( "socket.io" ).listen(app)
    @io.set "log level", 1
    # When a "connection" event occurs, call _@addClient_
    @io.sockets.on "connection", @addClient

  # ## addClient ##
  # Adds a new client to be notified upon change to watched files
  # ### Args:
  # * _socket {Object}_: Socket object that is generated by a socket.io 
  #   connection event.
  addClient: ( socket ) ->
    @clients.push socket
    socket.on "end", @removeClient
    socket.on "disconnect", @removeClient
    log.onEvent "client connected"

  removeClient: ( socket ) ->
    index = @clients.indexOf socket
    @clients.splice i, 1
    log.onEvent "client connected"

  refreshClients: ->
    log.onEvent "Refreshing hooked clients"
    notifyClients "refresh"

  # ## notifyClients ##
  # Send a "refresh" message to all connected clients.
  notifyClients: ( msg ) ->
    for client in @clients
      client.emit msg, {}