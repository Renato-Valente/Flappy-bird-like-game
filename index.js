const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const window_width = 800, window_height = 600;
canvas.width = window_width;
canvas.height = window_height;
var w = false, s = false, a = false, d = false, enter = false, esc = false;
var gameState;
const fundo = document.getElementById('fundo');
var record = 0;


///////////////////////////STATES//////////////////////////////////

var creditos = {
    update(){
        if(esc){
            esc = false;
            gameState = menuPrincipal;
        }

    },
    render(){
        ctx.fillStyle = '#33d6ff'
        ctx.fillRect(0,0,window_width,window_height);
        ctx.font = "40px Georgia";
        ctx.fillStyle = 'black';
        ctx.fillText('CREDITS',window_width/2,150);
        ctx.font = "20px Georgia";
        ctx.fillText('Renatinho Valente',window_width/2,200);

        
    }
}

var tutorial = {
    update(){
        if(esc){
            esc = false;
            gameState = menuPrincipal;
        }

    }, 
    render(){
        ctx.fillStyle = '#33d6ff'
        ctx.fillRect(0,0,window_width,window_height);
        ctx.font = "40px Georgia";
        ctx.fillStyle = 'black';
        ctx.fillText('TUTORIAL',window_width/2,150);
        ctx.font = '20px Georgia';
        ctx.fillText('W : pular/ Cima',window_width/2,250);
        ctx.fillText('S : Baixo',window_width/2,300);
        ctx.fillText('ESC : Pausar/Voltar',window_width/2,350);
    }
}

var menuPrincipal = {
    options:[
        {
            text: 'jogar',
            x: window_width/2,
            y: 200,
            selected: true,
            execute(){
                console.log('opção jogar selecionada');
                gameState = game;
                gameState.createGame();
            }
        },
        {
            text: 'tutorial',
            x: window_width/2,
            y: 250,
            selected: false,
            execute(){
                console.log('opção tutorial selecionada');
                gameState = tutorial;
            }
        },
        {
            text: 'creditos',
            x: window_width/2,
            y: 300,
            selected: false,
            execute(){
                gameState = creditos;
                console.log('opção credito selecionada');
            }
        },
    ],
    update(){
        if(enter){
            enter = false;
            var cont = 0;
            while(cont<this.options.length){
                if(this.options[cont].selected){
                    this.options[cont].execute();
                    break;
                }

                cont++;
            }
        }

        if(w){
            w = false;
            var cont = 0;
            while(cont<this.options.length){
                var item = this.options[cont];
                if(item.selected){
                    item.selected = false;
                    if(cont == 0){
                        cont = this.options.length;
                    }
                    this.options[cont - 1].selected = true;
                    break;
                }
                cont++;
            }
        }

        if(s){
            s = false;
            var cont = 0;

            while(cont<this.options.length){
                if(this.options[cont].selected){
                    this.options[cont].selected = false;
                    if(cont == this.options.length - 1){
                        cont = -1;
                    }
                    this.options[cont + 1].selected = true;
                    break;
                }

                cont++;
            }
        }

       
    },
    render(){
        ctx.fillStyle = '#33d6ff'
        ctx.fillRect(0,0,window_width,window_height);
        ctx.font = '20px Georgia';
        ctx.fillStyle = 'black';
        ctx.fillText('record: ' + record,20,20);

        var cont = 0;
        while(cont<this.options.length){
            var item = this.options[cont];
            if(item.selected){
                ctx.fillStyle = 'red';
                //console.log('oi');
            }
            else{
                ctx.fillStyle = 'black';
            }

            ctx.font = "20px Georgia";
            ctx.fillText(item.text,item.x,item.y);
          
            cont++;
        }
        
    }
}

var game = {
    player:{
        x:0,
        y:0,
        width:50,
        height:50,
        gravidade: 0.5,
        vx:1,
        vy:0,
        pontos:0,
        bird: document.getElementById('bird')

    },

    walls: [
        {
            x: window_width,
            vx: -3,
            y: 200,
            height: 175,
            score:true,
            draw(){
                ctx.fillStyle = '#00e600';
                ctx.fillRect(this.x,0,50,this.y);
                ctx.fillRect(this.x,this.y+this.height,50,window_height);
            },
            replace(){
                this.x = window_width;
                this.y = Math.random()*(window_height-this.height);
                this.score = true;
            },
            check(){
                if(game.player.x+50>this.x && game.player.x<this.x+50){
                    if(game.player.y<this.y || game.player.y>this.y+this.height){
                        console.log('morreu');
                        if(game.player.pontos>record){
                            record = game.player.pontos;
                        }
                        gameState = gameover;
                    }
                    else{
                        if(this.score){
                            game.player.pontos++;
                            this.score = false;
                        }
                    }
                    
                }
            }
            

        },
        {
            x: window_width*(3/2),
            vx: -3,
            y: 300,
            height: 175,
            score: true,
            draw(){
                ctx.fillStyle = '#00e600';
                ctx.fillRect(this.x,0,50,this.y);
                ctx.fillRect(this.x,this.y+this.height,50,window_height);
            },
            replace(){
                this.x = window_width;
                this.y = Math.random()*(window_height-this.height);
                this.score = true;
            },
            check(){
                if(game.player.x+50>this.x && game.player.x<this.x+50){
                    if(game.player.y<this.y || game.player.y>this.y+this.height){
                        console.log('morreu');
                        if(game.player.pontos>record){
                            record = game.player.pontos;
                        }
                        gameState = gameover;
                    }
                    else{
                        if(this.score){
                            game.player.pontos++;
                            this.score = false;
                        }
                    }
                    
                }
            }
        }
    ],
    createGame(){
        this.player.x = 200;
        this.player.y = window_height/2;
        this.player.vy = 0;
        console.log('create game');
        this.player.pontos = 0;
        this.walls[0].x = window_width;
        this.walls[0].score = true;
        this.walls[1].x = window_width*(3/2);
        this.walls[1].score = true;
        
    },
    update(){
        var cont = 0;
        while(cont<this.walls.length){
            this.walls[cont].x+=this.walls[cont].vx;
            if(this.walls[cont].x + 50<0){
                this.walls[cont].replace();
            }
            this.walls[cont].check();
            cont++;
        }
        this.player.y += this.player.vy;
        this.player.vy += this.player.gravidade;
        if(esc){
            esc = false;
            gameState = gamePaused;
        }
        if(w){
            w = false;
            this.player.vy = -10;
        }
    },
    render(){
        ctx.clearRect(0,0,window_width,window_height);
        ctx.drawImage(fundo,0,0);
      
        var cont = 0;
        while(cont<this.walls.length){
            this.walls[cont].draw();
            cont++;
        }
        ctx.font = '10px Georgia';
        ctx.fillStyle = 'black';
        ctx.fillText('pontos: ' + this.player.pontos,20,20);
        //ctx.fillRect(50,50,50,50);
        
        //ctx.fillRect(this.player.x,this.player.y,this.player.width,this.player.height);
        ctx.drawImage(bird,this.player.x,this.player.y,50,50);
        //console.log(this.player.width);
    }
}

var gameover = {
    options:[
        {
            text:'Voltar para o menu',
            x: window_width*(1/3),
            y: window_height/2 - (100),
            selected: false,
            execute(){
                gameState = menuPrincipal;
            }
        },
        {
            text: 'jogar Novamente',
            x: window_width*(1/3),
            y: window_height/2 - (150),
            selected: true,
            execute(){
                game.createGame();
                gameState = game;
            }
            
        }
    ],
    update(){
        if(w){
            w = false;
            var cont = 0;
            while(cont<this.options.length){
                if(this.options[cont].selected){
                    this.options[cont].selected = false;
                    if(cont == 0){
                        cont = this.options.length;
                    }
                    this.options[cont - 1].selected = true;
                    break;
                }
                cont++;
            }

        }

        if(s){
            s = false;
            var cont = 0;
            while(cont<this.options.length){
                if(this.options[cont].selected){
                    this.options[cont].selected = false;
                    if(cont == this.options.length-1){
                        cont = -1;
                    }
                    this.options[cont+1].selected = true;
                    break;
                }
                cont++;
            }
        }

        if(enter){
            enter = false;
            var cont = 0;
            while(cont<this.options.length){
                if(this.options[cont].selected){
                    this.options[cont].execute();
                    break;
                }
                cont++;
            }
        }
    },
    render(){
        game.render();
        ctx.font = '50px Georgia';
        ctx.fillStyle = 'black';
        ctx.fillText('Voce perdeu',window_width*(1/3),window_height/2);
        ctx.font = '40px Georgia';
        ctx.fillText('Pontos: ' + game.player.pontos,window_width*(1/3),(window_height/2)+50);
        ctx.fillText('Record: ' + record,window_width*(1/3),(window_height/2)+100);

        var cont = 0;
        while(cont<this.options.length){
            if(this.options[cont].selected){
                ctx.fillStyle = 'red';
            }
            else{
                ctx.fillStyle  ='black';
            }
            ctx.font = '30px Georgia';
            ctx.fillText(this.options[cont].text,this.options[cont].x,this.options[cont].y);
            cont++;
        }
    }
}

var gamePaused = {
    options:[
        {
            text: 'retomar',
            x: window_width*(1/3),
            y: 250,
            selected:true,
            execute(){
                console.log('opçao retomar selecionada');
                gameState = game;
            }
        },
            {
                text: 'voltar ao menu',
                x: window_width * (1/4),
                y: 300,
                selected: false,
                execute(){
                    console.log('opção voltar ao menu selecionada');
                    gameState = menuPrincipal;
                }
            }
        
    ],

    update(){
        if(w){
            w = false;
            var cont = 0;
            while(cont<this.options.length){
                if(this.options[cont].selected){
                    this.options[cont].selected = false;
                    if(cont == 0){
                        cont = this.options.length;
                    }
                    this.options[cont - 1].selected = true;
                    break;
                }

                cont++;
            }
        }

        if(s){
            s = false;
            var cont = 0;
            while(cont<this.options.length){
                if(this.options[cont].selected){
                    this.options[cont].selected = false;
                    if(cont == this.options.length - 1){
                        cont = -1;
                    }
                    this.options[cont + 1].selected = true;
                    break;
                }

                cont++;
            }
        }

        if(enter){
            enter = false;
            var cont = 0;
            while(cont<this.options.length){
                if(this.options[cont].selected){
                    this.options[cont].execute();
                    break;
                }
                cont++;
            }
        }
    },
    render(){
        ctx.fillStyle = '#33d6ff'
        ctx.fillRect(0,0,window_width,window_height);
        ctx.font = "40px Georgia";
        ctx.fillStyle = 'black';
        ctx.fillText('JOGO PAUSADO',window_width*(1/3),200);

        var cont = 0;
        while(cont<this.options.length){
            if(this.options[cont].selected){
                ctx.fillStyle = 'red';
            }
            else{
                ctx.fillStyle = 'black';
            }
            ctx.font = '20px Georgia';
            ctx.fillText(this.options[cont].text,this.options[cont].x,this.options[cont].y);
            cont++;
        }
    }
}
/////////////////////////////////MAIN//////////////////////////////
gameState = menuPrincipal;
function main(){

    gameState.update();
    gameState.render();

    requestAnimationFrame(main);
}

addEventListener('keydown',function(e){
    if(e.keyCode == 87){
        w = true;
    }
    if(e.keyCode == 83){
        s = true;
    }
    if(e.keyCode == 65){
        a = true;
    }
    if(e.keyCode == 68){
        d = true;
    }
    if(e.keyCode == 13){
        enter = true;
    }
    if(e.keyCode == 27){
        esc = true;
    }
})

addEventListener('keyup',function(e){
    if(e.keyCode == 87){
        w = false;
    }
    if(e.keyCode == 83){
        s = false;
    }
    if(e.keyCode == 65){
        a = false;
    }
    if(e.keyCode == 68){
        d = false;
    }
    if(e.keyCode == 13){
        enter = false;
    }
    if(e.keyCode == 27){
        esc = false;
    }
})
