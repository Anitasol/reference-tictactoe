
module.exports = function(injected){
    var TictactoeState = injected('TictactoeState');

    return function(history){

        var gameState = TictactoeState(history);

        return {
            executeCommand: function(cmd, eventHandler){

                var cmdHandlers = {
                    "CreateGame": function (cmd) {
                        eventHandler([{
                            gameId: cmd.gameId,
                            type: "GameCreated",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'X'
                        }]);

                    },
                    "JoinGame": function (cmd) {
                        if(gameState.gameFull()){
                            eventHandler( [{
                                gameId: cmd.gameId,
                                type: "FullGameJoinAttempted",
                                user: cmd.user,
                                name: cmd.name,
                                timeStamp: cmd.timeStamp
                            }]);
                            return;
                        }

                        eventHandler([{
                            gameId: cmd.gameId,
                            type: "GameJoined",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side:'O'
                        }]);
                    },
                    "PlaceMove": function(cmd){

                      if(!gameState.currentPlayer(cmd.side)){
                        eventHandler([{
                            gameId: cmd.gameId,
                            type: "NotYourMove",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side: cmd.side
                        }]);
                        return;
                      }

                      if(gameState.isOccupied(cmd.placeAt)){
                          eventHandler([{
                              gameId: cmd.gameId,
                              type: "IllegalMove",
                              user: cmd.user,
                              name: cmd.name,
                              timeStamp: cmd.timeStamp,
                              side: cmd.side
                        }]);
                        return;
                      }

                      var event = [{
                          gameId: cmd.gameId,
                          type: "MovePlaced",
                          user: cmd.user,
                          name: cmd.name,
                          timeStamp: cmd.timeStamp,
                          placeAt: cmd.placeAt,
                          side: cmd.side
                      }];
                      gameState.processEvents(event);

                      if(gameState.winningConditions(cmd)){
                          event.push({
                            gameId: cmd.gameId,
                            type: "GameWon",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            //side: cmd.side
                          });
                          return;
                      }
                      //eventHandler(event);
                    }
                };

                if(!cmdHandlers[cmd.type]){
                    throw new Error("I do not handle command of type " + cmd.type)
                }
                cmdHandlers[cmd.type](cmd);
            }
        }
    }
};
