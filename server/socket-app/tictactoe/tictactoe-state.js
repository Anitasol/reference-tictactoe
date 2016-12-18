var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var gamefull=false;
        var board = new Array(9);
        var playerTurn = 'X';

        function processEvent(event) {
            if(event.type==="GameJoined"){
                gamefull=true;
            }
            if(event.type==="MovePlaced") {
              board[event.placeAt] = event.side;
              switchPlayer();
            }

        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull(){
            return gamefull;
        }

        function switchPlayer(){

            if(playerTurn == 'X'){
              playerTurn = 'O';
            }
            else {
              playerTurn = 'X';
            }
        }

        function isOccupied(placeAt) {
            return board[placeAt] != null;
        }

        function currentPlayer(side) {
          if(side == playerTurn){
            return true;
          }
          return false;
        }

        processEvents(history);

        return {
            gameFull:gameFull,
            switchPlayer:switchPlayer,
            isOccupied:isOccupied,
            currentPlayer:currentPlayer,
            processEvents: processEvents
        }
    };
};
