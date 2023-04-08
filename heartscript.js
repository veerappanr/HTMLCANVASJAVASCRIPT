window.onload=(function(){
    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext("2d");
    var cw=canvas.width;
    var ch=canvas.height;
    var fontsize=12;
    var fontface='verdana';
    var lineHeigt=parseInt(fontsize*1.286);
    var text='HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS, HEART LOVE JOY HAPPNESS. LOVE LOVE LOVE LOVE LOVE LOVE LOVE ME LOVE';
    var words=text.split(' ');
    var wordWidths=[];
    ctx.font=fontsize+'px '+fontface;
    for(var i=0;i<words.length;i++){ wordWidths.push(ctx.measureText(words[i]).width);}
    var spaceWidth=ctx.measureText(' ').width;
    var wordIndex=0;
    var data=[];
    
    // demo Heart
    // The shape can be ANY opaque drawing format -- even an Image

    ctx.scale(3,3);
    ctx.beginPath();
    ctx.moveTo(75,40);
    ctx.bezierCurveTo(75,37,70,25,50,25);
    ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
    ctx.bezierCurveTo(20,80,40,102,75,120);
    ctx.bezierCurveTo(110,102,130,80,130,62.5);
    ctx.bezierCurveTo(130,62.5,130,25,100,25);
    ctx.bezierCurveTo(85,25,75,37,75,40);
    ctx.fillStyle='green';
    ctx.fill();
    ctx.setTransform(1,0,0,1,0,0);

    // fill heart with text
    ctx.fillStyle='white';
    var imgDataData=ctx.getImageData(0,0,cw,ch).data;
    for(var i=0;i<imgDataData.length;i+=4){
        data.push(imgDataData[i+3]);
    }
    placeWords();

    // draw words sequentially into next available block of available opaque pixels

    function placeWords(){
        var sx=0;
        var sy=0;
        var y=0;
        var wordIndex=0;
        ctx.textBaseline='top';
        while(y<ch && wordIndex<words.length){
            sx=0;
            sy=y;
            var startingIndex=wordIndex;
            while(sx<cw && wordIndex<words.length){
                var x=getRect(sx,sy,lineHeigt);
                var available=x-sx;
                var spacer=spaceWidth; // spacer=0 to have no left margin
                var w=spacer+wordWidths[wordIndex];
                while(available>=w){
                    ctx.fillText(words[wordIndex],spacer+sx,sy);
                    sx+=w;
                    available-=w;
                    spacer=spaceWidth;
                    wordIndex++;
                    w=spacer+wordWidths[wordIndex];
                }
                sx=x+1;
            }
            y=(wordIndex>startingIndex)?y+lineHeigt:y+1;
        }
    }

    // find a rectangular block of opaque pixels
    function getRect(sx,sy,height){
        var x=sx;
        var y=sy;
        var ok=true;
        while(ok){
            if(data[y*cw+x]<250){ok=false;}
            y++;
            if(y>=sy+height){
                y=sy;
                x++;
                if(x>=cw){ok=false;}
            }
        }
        return(x);
    }
}) //end $(function(){});
