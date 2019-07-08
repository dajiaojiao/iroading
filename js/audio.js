var player;
window.ispringPresentationConnector = {};
window.ispringPresentationConnector.register = function (player) {
    var presentation = player.presentation();
    var uid = presentation.uniqueId();
    console.log(player)
};

