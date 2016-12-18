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

        function winningConditions(event) {
          return (horizontalWin(event) || verticalWin(event) || diagonalWin(event));
        }

        function horizontalWin(event) {
          for(var i=0; i < board.length; i+=3) {
            if(board[i] == playerTurn && board[i+1] == playerTurn && board[i+2] == playerTurn) {
              return true;
            }
            return false;
          }
        }

        function verticalWin(event) {
          for(var i=0; i < board.length-6; i++) {
            if(board[i] == playerTurn && board[i+3] == playerTurn && board[i+6] == playerTurn) {
              return true;
            }
            return false;
          }
        }

        function diagonalWin(event) {
          if(board[0] == playerTurn && board[4] == playerTurn && board[8] == playerTurn) {
            return true;
          }
          if(board[2] == playerTurn && board[4] == playerTurn && board[6] == playerTurn) {
            return true;
          }
          return false;
        }

        function gameDraw(event) {
          for(var i = 0; i < board.length; i++){
            if(board[i] == null){
              return false;
            }
          }
          return true;
        }

        processEvents(history);

        return {
            gameFull:gameFull,
            isOccupied:isOccupied,
            currentPlayer:currentPlayer,
            winningConditions:winningConditions,
            gameDraw:gameDraw,
            processEvents: processEvents
        }
    };
};
