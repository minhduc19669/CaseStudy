
    var canvas=document.getElementById('myCanvas');
    var context=canvas.getContext('2d');
    var gameOver=false;
    var isBroken=false;
    var score=0;
    var Racket=function(x,y,width,height,speed){
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.speed=speed;
        this.isMovingleft=false;
        this.isMovingright=false;
        this.drawRacket=function(){
            context.beginPath();
            context.rect(this.x,this.y,this.width,this.height);
            context.fillStyle='black';
            context.fill();
            
            context.closePath();
        };
        this.moveLeft=function(){
            this.x-=this.speed;
        
        }
        this.moveRight=function(){
            this.x+=this.speed;
        }
    };
    var Ball=function(x,y,radius,dx,dy){
        this.x=x;
        this.y=y;
        this.dx=dx;
        this.dy=dy;
        this.radius=radius;
        this.drawBall=function(){
            context.beginPath();
            context.arc(this.x,this.y,this.radius,0,2*Math.PI);
            context.fillStyle ='blue';
            context.shadowBlur = 5;
            context.shadowColor = "white";
            context.fill();
            context.closePath();            
        };
        this.updateLocation=function(){
            this.x+=this.dx;
            this.y+=this.dy;
        };
        this.collision=function(canvas){
            if (this.x<this.radius || this.x>canvas.width-this.radius){
                this.dx = -this.dx;
            }                                            //xử lí bóng chạm vào biên
            if ( this.y<this.radius){
                this.dy = -this.dy;
            }
            //Bóng chạm đáy canvas
        };
        this.over=function(canvas){
            if (this.y> canvas.height-this.radius) {
                gameOver=true;
            }
        }
        //Bóng chạm thanh
        this.handleBallRacket=function(racket) {
        if ( this.x+this.radius>=racket.x &&this.x+this.radius<=racket.x+racket.width &&this.y+this.radius>=racket.y){
                this.dy=-this.dy;
                score+=1;
                document.getElementById('score').innerHTML=score;
            }
        }
    };
    var Brick = function(x,y,width,height,margin,row,col){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.margin=margin;
        this.row=row;
        this.col=col;
        this.drawBrick=function(){
            for(let i=0;i<this.row;i++){
                for(let j=0;j<this.col;j++){
                    context.beginPath();
                    context.rect(this.margin+j*(this.width+this.margin),this.margin+i*(this.height+this.margin),this.width,this.height);
                    context.fillStyle='red';
                    context.fill();
                    context.closePath();
                }
            }
        }
    }
    var racket=new Racket(15,485,100,20,10);
    var ball=new Ball(Math.random()*500,20,15,4,3);
    var brick=new Brick(25,25,70,15,25,4,5);


    // var BrickList=[];
    // for(let i=0;i<brick.row;i++){
    //     for(let j=0;j<brick.col;j++){
    //         BrickList.push({
    //             x:brick.margin+j*(brick.width+brick.margin),
    //             y:brick.margin+i*(brick.height+brick.margin),
    //             isBroken:false
    //         })
    //     }

    // }


    document.addEventListener('keyup',function (event) {
        switch (event.keyCode) {
            case 37:
                racket.isMovingleft=false;
                break;
            case 39:
                racket.isMovingright=false;
                break;
        }
    });
    document.addEventListener('keydown',function (event) {
        switch (event.keyCode) {
            case 37:
                racket.isMovingleft=true;
                break;
            case 39:
                racket.isMovingright=true;
                break;
        }
    });
    function move(){
        if (racket.isMovingleft){
            racket.moveLeft();
        }else if(racket.isMovingright){
            racket.moveRight();
        }
    }
    function main() {
        if(!gameOver){
            context.clearRect(0, 0, canvas.width, canvas.height);
            racket.drawRacket();
            ball.drawBall();
            brick.drawBrick();
            move();
            ball.handleBallRacket(racket);
            ball.updateLocation();
            ball.collision(canvas);
            ball.over(canvas);
            requestAnimationFrame(main);
        }else{
            document.getElementById('score').innerHTML="You Lose! Điểm của bạn : " + score;
        }
    }
    function reloadPage(){
        location.reload();
    }
