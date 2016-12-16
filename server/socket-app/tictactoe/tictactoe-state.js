var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var gamefull=false;
        var board = [];
        //console.debug("History", history);

        function processEvent(event) {
            if(event.type==="GameJoined"){
                gamefull=true;
            }
            if(event.type==="MovePlaced") {
              board = ['X'];
            }
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        function gameFull(){
            return gamefull;
        }

        function Board(){
            return board;
        }

        processEvents(history);

        return {
            gameFull:gameFull,
            Board:Board,
            processEvents: processEvents
        }
    };
};
