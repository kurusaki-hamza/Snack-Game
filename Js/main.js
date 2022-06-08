let playerElement = document.querySelector(".player");
let foodElement = document.querySelector(".food");
let screen = document.querySelector(".screen");
let screenWidth = document.querySelector(".screen").offsetWidth;
let screenHeight = document.querySelector(".screen").offsetHeight;
class Item {
    constructor(x,y,player){
        this.x = x;
        this.y = y;
        this.player = player;
    }
};
class Food extends Item {
    constructor(x,y,player){
        super(x,y,player);
        this.applyR()
    }
    applyR(){
        this.player.style.left = this.x+"px";
        this.player.style.top = this.y+"px";
    }
    randomC(){
        let randomX = Math.random()*screenWidth;
        let randomY = Math.random()*screenHeight;
        let n1 = randomX<10?0:-10;
        let n2 = randomY<10?0:-10;
        this.x = Math.ceil((randomX-(randomX%10))+n1);
        this.y = Math.ceil((randomY-(randomY%10))+n2);
        this.applyR();
    }
};
let food = new Food(140,100,foodElement);
class Player extends Item {
    constructor(x,y,player){
        super(x,y,player);
        this.applyR()
    }
    applyR(){
        this.player.style.left = this.x+"px";
        this.player.style.top = this.y+"px";
    }
    move(code){
        if(code==="ArrowLeft" || code==="btn1"){
            if(players[0].x!==0){
                this.x -=10;
                rePositioning12();
            }
        };
        if(code==="ArrowUp" || code==="btn3"){
            if(players[0].y!==0 ){
                this.y -=10;
                rePositioning12();   
            }
        };
        if(code==="ArrowRight" || code==="btn2"){
            if(players[0].x !== (screenWidth-(screenWidth%10))-10){
                this.x +=10;
                rePositioning12();     
            }
        };
        if(code==="ArrowDown" || code==="btn4"){
            if(players[0].y !== (screenHeight-(screenHeight%10))-10){
                this.y +=10;
                rePositioning12();     
            }
        };
        players[0] = player1;
        this.applyR();
    }
};
let ate = 1,players = [],playersXY =[],reversedPlayersXY,hurt=false;
let player1 = new Player(0,0,playerElement);
players.push(player1);
playersXY[0] = player1;
document.addEventListener("keydown",(e)=>{moving(e.key)});
function moving(e){
    for(let i=0;i<players.length;i++){
        playersXY[i] = Object.assign({},players[i]);
    }
    players[0].move(e);
    if(players[0].x===food.x && players[0].y===food.y){
        food.randomC();
        ate+=1;
        players.push({x:playersXY[playersXY.length-1].x,y:playersXY[playersXY.length-1].y,player:document.createElement("div")});
        players[players.length-1].player.className = "player2";
        playersXY.push(players[players.length-1]);
    };
    if(ate>2){
        for(let i=0;i<players.length;i++){
            playersXY[i] = {x:players[i].x,y:players[i].y};
        }
        hurtFn();
        if(hurt){
            sounder("failAudio");
            losingFn("loosing","You loose","loosingBtn");
        }
    }
    if(ate>12){
        sounder("successAudio");
        losingFn("winning","You WIN","winningBtn");
    }
    rerender()
}
function rePositioning12() {
    if(ate>1){
            // 1
            if(playersXY[0].x===playersXY[1].x && playersXY[0].y===playersXY[1].y+10){
                if(players[0].x===players[1].x && players[0].y-20===players[1].y){
                    players[1].x=players[0].x;
                    players[1].y=players[0].y-10;
                    rePositioning34();
                }
                if(players[0].x-10===players[1].x && players[0].y-10===players[1].y){
                    players[1].x=players[0].x-10;
                    players[1].y=players[0].y;
                    rePositioning34();
                }
                if(players[0].x+10===players[1].x && players[0].y-10===players[1].y){
                    players[1].x=players[0].x+10;
                    players[1].y=players[0].y;
                    rePositioning34();
                }
                if(players[0].x===players[1].x && players[0].y===players[1].y){
                    players[0].y = playersXY[0].y;
                    reversedPlayersXY = [...playersXY].reverse();
                    playersXY.reverse();
                    for(let i=0;i<players.length;i++){
                        players[i].x = reversedPlayersXY[i].x;
                        players[i].y = reversedPlayersXY[i].y;
                    }
                    if(players[0].y!==0){
                        let isZero = players.filter((el)=>el.y!==0);
                        if(isZero.length<1){
                            players[0].y = reversedPlayersXY[0].y-10;
                            players[1].x = playersXY[0].x;
                            players[1].y = players[0].y+10;
                            rePositioning34();
                        }
                    }
                };
            };
            // 2
            if(playersXY[0].x===playersXY[1].x+10 && playersXY[0].y===playersXY[1].y){
                if(players[0].x-10===players[1].x && players[0].y-10===players[1].y){
                    players[1].x=players[0].x;
                    players[1].y=players[0].y-10;
                    rePositioning34();
                }
                if(players[0].x===players[1].x && players[0].y===players[1].y){
                    players[0].y = playersXY[0].y;
                    reversedPlayersXY = [...playersXY].reverse();
                    playersXY.reverse();
                    for(let i=0;i<players.length;i++){
                        players[i].x = reversedPlayersXY[i].x;
                        players[i].y = reversedPlayersXY[i].y;
                        if(players[0].x!==0){
                            let isZero = players.filter((el)=>el.x!==0);
                            if(isZero.length<1){
                                players[0].x = reversedPlayersXY[0].x-10;
                                players[1].x = reversedPlayersXY[1].x-10;
                                rePositioning34();
                            }
                        }
                    }
                }
                if(players[0].x-20===players[1].x && players[0].y===players[1].y){
                    players[1].x=players[0].x-10;
                    players[1].y=players[0].y;
                    rePositioning34();
                }
                if(players[0].x-10===players[1].x && players[0].y+10===players[1].y){
                    players[1].x=players[0].x;
                    players[1].y=players[0].y+10;
                    rePositioning34();
                };
            };
            // 3
            if(playersXY[0].x===playersXY[1].x-10 && playersXY[0].y===playersXY[1].y){
                if(players[0].x===players[1].x-10 && players[0].y-10===players[1].y){
                    players[1].x=players[0].x;   
                    players[1].y=players[0].y-10;
                    rePositioning34();
                }
                if(players[0].x+20===players[1].x && players[0].y===players[1].y){
                    players[1].x=players[0].x+10;   
                    players[1].y=players[0].y;
                    rePositioning34();
                }
                if(players[0].x===players[1].x && players[0].y===players[1].y){
                    players[0].y = playersXY[0].y;
                    reversedPlayersXY = [...playersXY].reverse();
                    playersXY.reverse();
                    for(let i=0;i<players.length;i++){
                        players[i].x = reversedPlayersXY[i].x;
                        players[i].y = reversedPlayersXY[i].y;
                        if(players[0].x !== (screenWidth-(screenWidth%10))-10){
                            let isZero = players.filter((el)=>el.x !== (screenWidth-(screenWidth%10))-10);
                            if(isZero.length<1){
                                players[0].x = reversedPlayersXY[0].x+10;
                                players[1].x = reversedPlayersXY[1].x+10;
                                rePositioning34();
                            }
                        }
                    }
                }
                if(players[0].x+10===players[1].x && players[0].y+10===players[1].y){
                    players[1].x=players[0].x;
                    players[1].y=players[0].y+10;
                    rePositioning34();
                };
            };
            // 4
            if(playersXY[0].x===playersXY[1].x && playersXY[0].y+10===playersXY[1].y){
                if(players[0].x===players[1].x && players[0].y===players[1].y){
                    players[0].y = playersXY[0].y;
                    reversedPlayersXY = [...playersXY].reverse();
                    playersXY.reverse();
                    for(let i=0;i<players.length;i++){
                        players[i].x = reversedPlayersXY[i].x;
                        players[i].y = reversedPlayersXY[i].y;
                        if(players[0].y !== (screenHeight-(screenHeight%10))-10){
                            // not only the first y equal zero will prevent first from moving but also if one of players have the value zero so first won't descend
                            let isZero = players.filter((el)=>el.y=== (screenHeight-(screenHeight%10))-10);
                            if(isZero.length<1){
                                players[0].y = reversedPlayersXY[0].y+10;
                                players[1].x = players[0].x;
                                players[1].y = players[0].y-10;
                                rePositioning34();
                            }
                        }
                    }
                }
                if(players[0].x+10===players[1].x && players[0].y+10===players[1].y){
                    players[1].x=players[0].x+10;   
                    players[1].y=players[0].y;
                    rePositioning34();
                }
                if(players[0].x-10===players[1].x && players[0].y+10===players[1].y){
                    players[1].x=players[0].x-10;   
                    players[1].y=players[0].y;
                    rePositioning34();
                }
                if(players[0].x===players[1].x && players[0].y+20===players[1].y){
                    players[1].x=players[0].x;
                    players[1].y=players[0].y+10;
                    rePositioning34();
                };
            };
    }
}
function rePositioning34(){
    if(ate>2){
        for(let i=2;i<ate;i++){
            players[i].x = playersXY[i-1].x;
            players[i].y = playersXY[i-1].y;
        }
    }
}
function rerender(){
    while (document.querySelector(".player2")) {
        screen.removeChild(document.querySelector(".player2"));
    };
    players.forEach((e)=>{
        e.player.style.left = e.x+"px";
        e.player.style.top = e.y+"px";
        screen.append(e.player);
    }) 
}
function hurtFn() {
    for(let i=3;i<players.length;i++){
        if(players[0].x===players[i].x&&players[0].y===players[i].y){
            hurt=true;
        }
    }
}
function losingFn(className,message,btn) {
    while (document.querySelector(".player2")) {
    screen.removeChild(document.querySelector(".player2"));
    };
    player1.x=0;
    player1.y=0;
    players=[player1];
    playersXY = [player1];
    hurt=false;
    ate=1;
    player1.applyR();
    let losing = document.createElement("div");
    losing.className = className;
    let losingH2 = document.createElement("h2");
    losingH2.innerHTML = message;
    let losingBtn = document.createElement("button");
    losingBtn.className = btn;
    losingBtn.innerHTML = "rePlay";
    losing.append(losingH2,losingBtn);
    screen.prepend(losing);
    setTimeout(() => {
        losing.classList.add("visible");
    }, 0);
    let losingBtnElement = document.querySelector(`.${btn}`);
    losingBtnElement.addEventListener("click",()=>{
    losing.classList.remove("visible");
        setTimeout(() => {
            losing.remove()
        }, 600);
    })
}
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
let keysElement = document.querySelector(".keys");
let keysElementDiv = document.querySelector(".keys div");
let offELement = document.querySelector(".off");
let startingELement = document.querySelector(".starting");
let startingBtn = document.querySelector(".stopingBtn");
let checkBox = document.querySelector('[type="checkbox"]');
function starting() {
    keysElement.classList.remove("moved");
    setTimeout(() => {
        keysElementDiv.classList.remove("hide");
    }, 1000);
    setTimeout(() => {
        document.querySelectorAll(".keys div div h3").forEach((el)=>el.className="");
    }, 1800);
    setTimeout(() => {
        document.querySelectorAll(".keys div div").forEach((el)=>el.style.display="none");
    }, 10000);
    setTimeout(() => {
        keysElementDiv.classList.add("hide");
    }, 10000);
    setTimeout(() => {
        keysElement.classList.add("moved");
    }, 12000);
};
starting();
checkBox.addEventListener("click", function(){
    sounder("clickAudio");
    if(checkBox.checked){
        while (document.querySelector(".player2")) {
            screen.removeChild(document.querySelector(".player2"));
        };
        player1.x=0;
        player1.y=0;
        players=[player1];
        playersXY = [player1];
        ate=1;
        player1.applyR();
        offELement.classList.add("hide")
        startingELement.classList.add("visible");
    } else {
        offELement.classList.remove("hide");
        let losing1 = document.querySelector(".loosing");
        let losing2 = document.querySelector(".winning");
        if(losing1){
            losing1.remove();
        }
        if(losing2){
            losing2.remove();
        }
    }
});
startingBtn.addEventListener("click",()=>{
    sounder("clickAudio");
    sounder("startAudio");
    startingELement.classList.remove("visible");
});

let btnRight = document.querySelector(".btn2")
let btnLeft = document.querySelector(".btn1")
let btnUp = document.querySelector(".btn3")
let btnDown = document.querySelector(".btn4")
btnRight.addEventListener("click", function(e){
    sounder("clickAudio");
    moving(e.target.className);
});
btnLeft.addEventListener("click", function(e){
    sounder("clickAudio");
    moving(e.target.className);
});
btnUp.addEventListener("click", function(e){
    sounder("clickAudio");
    moving(e.target.className);
});
btnDown.addEventListener("click", function(e){
    sounder("clickAudio");
    moving(e.target.className);
});
function sounder(theclass){
    soundV = document.querySelector(`.${theclass}`);
    soundV.play();
}
