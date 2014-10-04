/**
 * Author: Mengyi Gong
 * js file 
 * Otc 5 2014
 **/

$(document).ready(function() {
    //set up default counter 15 secs
    var countDown = 15;
    var result = 0;
    var firstClick;
    var resetFlag;
    var counter; 
    var totalCount = 16;
    //Square field to contain 4*4. If need a bigger one, a for loop should be use to create the field
    var squareField =
    [
        [ 1, 1, 1, 1 ],
        [ 1, 1, 1, 1 ],
        [ 1, 1, 1, 1 ],
        [ 1, 1, 1, 1 ]
    ];

    // first time make the field with the color square
    initfield();
    //handle the mouse move
    $("#square").mousemove(function (e) {
        if(!resetFlag){
            handlemousemove(e);
        }
    });
    // Attach a mouse click event listener
    $("#square").click(function(e) {
        if(!resetFlag){
            if(firstClick == true){
                counter=setInterval(timer, 1000);
            }
             firstClick = false;
            // e will give us absolute x, y so we need to calculate relative to canvas position
            var pos = $("#square").position();
            var ox = e.pageX - pos.left;
            var oy = e.pageY - pos.top;
            // Check which fields we need to flip
            var yField = Math.floor(oy / 80);
            var xField = Math.floor(ox / 80);
            // to check the field, if the field is x turn it to 0 so that to turn off
            squareField[yField][xField] = 0;
            fieldClicked();
        }else{
            initfield();
        }
    });
    
    /**
     * check if the brower fit for canvas and initialize the canvas and global variables
     */
    function initfield() {
        resetFlag = false;
        firstClick = true;
        countDown=15;
        document.getElementById("timer").innerHTML=countDown + " secs";
        // Retrieve the canvas
        var canvas = document.getElementById("square");
        // to check if the browser supports canvas
        if (!canvas.getContext){
            alert("This demo requires a browser that supports the <canvas> element.");
            return;
        } else {//Browser supports canvas
            clear();
            // get the context to draw on
            var ctx = canvas.getContext("2d");
            //set all the value in squareField array default to 1
            for(var i = 0; i < squareField.length; i++) { // Rows
                for (var j = 0; j < squareField[i].length; j++) { // Columns
                    squareField[i][j] = 1;
                    //set up a color
                    ctx.fillStyle = "#FF00FF";
                    // Start drawing
                    ctx.beginPath();
                    //rect（x, y, width, height）
                    ctx.rect(j * 78 + 5,i * 78 + 5,75,75);
                    //fill the square with the color
                    ctx.fill();
                }
            }
        }
    }
    /**
     * get the mouse position on the canvas and change it to the index of the 2D array
     */
    function handlemousemove(e){
        // e will give us absolute x, y so we need to calculate relative to canvas position
        var pos = $("#square").position();
        var ox = e.pageX - pos.left;
        var oy = e.pageY - pos.top;
        // Check which fields we need to flip
        var yField = Math.floor(oy / 80);
        var xField = Math.floor(ox / 80);
        colorTheField(yField, xField);
    }
    
    /**
     * change the color of the square the mouse move on
     */
    function colorTheField(x, y){
        // Retrieve the canvas
        var canvas = document.getElementById("square");
        // to check if the browser supports canvas
        if (!canvas.getContext){
            alert("This demo requires a browser that supports the <canvas> element.");
            return;
        } else {
            clear();
            // get the context to draw on
            var ctx = canvas.getContext("2d");
            // create the field
            var allsquareoff = true;
            
            for(var i = 0; i < squareField.length; i++) { // Rows
                for (var j = 0; j < squareField[i].length; j++) { // Columns
                    // Check if we need to fill the border
                    if(squareField[i][j] == 1) {
                        if(i==x && j==y){ //if the mouse is on
                            ctx.fillStyle = "#FFFF00"; //yellow color
                        }else{
                            ctx.fillStyle = "#FF00FF";
                        }
                        // Start drawing
                        ctx.beginPath();
                        //rect（x, y, width, height）
                        ctx.rect(j * 78 + 5,i * 78 + 5,75,75);
                        ctx.fill();
                        // Since we need to fill this field, not all the suqare are off
                        allsquareoff = false;
                    }   
                }
            }
        }
    }
    
    function fieldClicked(x,y) {
        // Retrieve the canvas
        var canvas = document.getElementById("square");
        // to check if the browser supports canvas
        if (!canvas.getContext){
            alert("This demo requires a browser that supports the <canvas> element.");
            return;
        } else {
            clear();
            var allsquareoff = true;
            // get the context to draw on
            var ctx = canvas.getContext("2d");
            // create the field
            for(var i = 0; i < squareField.length; i++) { // Rows
                for (var j = 0; j < squareField[i].length; j++) { // Columns
                    // Check if we need to fill the border
                    if(squareField[i][j] == 1) {
                        ctx.fillStyle = "#FF00FF";
                        ctx.beginPath();
                        ctx.rect(j * 78 + 5,i * 78 + 5,75,75);
                        ctx.fill();
                        // Since we need to fill this field, not all the suqare are off
                        allsquareoff = false;
                    }
                }
            }
            // Check if all the lights are off
            if(allsquareoff) {
                clearInterval(counter);
                feedback(15 - countDown);
            }
        }
    }
    
    
    /*
    * Clears the canvas
    */
    function clear() {
        var canvas = document.getElementById("square");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 320, 320);
    }
    /**
     * reset all the data
     */
    function reset(){
        result = 0;
        countDown = 15;   

    }
   
    /**
     * counter down timer
     */
    function timer(){
        countDown=countDown-1;
        if (countDown < 0 ){
          clearInterval(counter);
          feedback(1);
          return;
        }
        document.getElementById("timer").innerHTML=countDown + " secs";
    }
    
    /**
     * give player the result
     */
    function feedback(result){
        clear();
        var c = document.getElementById("square");
        var ctx=c.getContext("2d");
        ctx.font="30px Verdana";
        // Create gradient
        var gradient=ctx.createLinearGradient(0,0,c.width,0);
        gradient.addColorStop("1.0","white");
        // Fill with gradient
        ctx.fillStyle=gradient;
        if(result == 1){
            ctx.fillText("     OUTTA TIME!",10,90); 
        }else{
           ctx.fillText(" DONE in " + result + " sec!",10,90); 
        }
        ctx.font="20px Georgia";
        var gradient2=ctx.createLinearGradient(0,0,c.width,0);
        gradient2.addColorStop("1.0","magenta");
        ctx.fillStyle=gradient2;
        ctx.fillText("click to Restart",120,200);
        resetFlag = true;
    }
});

