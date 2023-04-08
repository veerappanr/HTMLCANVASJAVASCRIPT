window.onload=(function(){
    var canvas = document.getElementById('canvas');
    var cts = canvas.getContext("2d");
    cts.font = "34px serif";
    cts.textAlign = "center";
    cts.textBaseline = "middle";
    cts.fillStyle = "#FFF";
    cts.fillText("Hello World", 150, 100);
    })