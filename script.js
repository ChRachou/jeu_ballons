

/*INITIATIONS VARIABLES*/
var h1 = document.createElement("h1");
var button = document.createElement("button");
var avant_jeu = document.getElementById("avant_jeu");
var jeu = document.getElementById("jeu");
var canvas = document.getElementById("canvasjeu");
var resultat = document.getElementById("resultat");
var ctx = canvas.getContext('2d');

var ballons = [];
var move_ballon = [ ];
var dont_move_ballos = [];
var score = 0; 


/*Fonction init de la page*/
function init() {

    /*Initiations variables*/
    var text = "Frizzy Love";

    text_h1 = document.createTextNode(text);
    var img = document.createElement("img");

    

    img.src = "assets/images/bitmojie_avant_jeu.png";
    img.style.width = "160px";
    img.style.margin = "10px 10px 20px 10px";
    button.type= "text";
    button.textContent = "Jouer !";
    button.className = "bouton";

    button.onclick = function () {
        avant_jeu.className += " add_animation_hide";
        setTimeout(function() {
          avant_jeu.style.display = "none";
        jeu.style.display = "flex";
        transition_jeu()
        //lancement_jeu() 
        },2500)
       
    }

    h1.appendChild(text_h1);
    avant_jeu.appendChild(h1);
    avant_jeu.appendChild(img); 
    avant_jeu.appendChild(button);
    
    /*Disparition des deux autres écrans*/
     jeu.style.display = "none";
     resultat.style.display = "none";

}

/*Fonction de transition avant le jeu*/
function transition_jeu(){

  /*Initialisations variables*/ 
    var p = document.createElement("p"); 
    var div_bottom = document.createElement("div"); 
    var div_top = document.createElement("div");

    var text = "Prêt ?";
    text_p = document.createTextNode(text);
    

    p.style.fontSize = "2em";
    p.style.textAlign = "center";
    p.style.margin =  0; 
    jeu.style.justifyContent = "center";
    div_top.className = "header";
    div_bottom.className = "footer"

   
    /*Animation avant lancement du jeu*/
    setTimeout(function() {

      p.className = "add_animation_hide";
      p.textContent = "Go !";

      setTimeout(function() {
       
        p.style.display = "none"; 
        lancement_jeu();

      },3000)

    },1000)


     p.appendChild(text_p); 
     div_top.appendChild(p);
     jeu.appendChild(div_bottom)
     jeu.insertBefore(div_top, canvas); 
}

/*FOnction qui lance mon jeu*/
function lancement_jeu() {

     /*Initialisations variables*/ 
    var p =  document.createElement("p");
    var div_top = document.querySelector(".header");

    var text = "Score:" + score + "/10";
    text_p = document.createTextNode(text); 

    p.style.fontSize = "1.5em";
    p.style.textAlign = "center";
    p.style.margin = "5px";
    p.className = "score";
    canvas.style.cursor = "pointer";


    p.appendChild(text_p);
    div_top.appendChild(p)
    
    /*Lancement du jeu */
    context_canvas();
     
}
 
function context_canvas(){ 

    /*Si le canvas apparait*/
    if (canvas.getContext) { 

      /*Fonction Create ballons*/
        create_ballons();
         

        /*Au clique sur mes ballons*/
        canvas.addEventListener('click', function(event) {
          
          var x = event.pageX - canvas.offsetLeft,
              y = event.pageY - canvas.offsetTop;

              console.log(x, y);
      
          // Collision entre un ballon et un clique

          var pos = {
            x: event.pageX - canvas.offsetLeft,
            y: event.pageY - canvas.offsetTop 
          };

          ballons.forEach(function(ballon) {

            if (isCollision(pos, ballon)) {

              console.log(ballon);

              /*Si mon ballon est cliqué je change son style*/
              if (ballon.color === "#000000") {

                score++;
                var p = document.querySelector(".score");

                p.textContent = "Score:" + score + "/10"; 

                var grd = ctx.createLinearGradient(0,0,250,50);
                grd.addColorStop(0,"#ED892D");
                grd.addColorStop(1,"white");
                ballon.color = grd; 

              }
             
            }

          });

      }, false);

        move_ballons();
 
      } 

    /*Message qui indique que le canvas n'apparait pas*/  
    else {
        var p =  document.createElement("p");

        var text = "ne s'affiche pas ";
        text_p = document.createTextNode(text);

        p.appendChild(text_p);
        jeu.appendChild(p);
      }

}

/*Fonction qui check le clique*/
function isCollision(point, circle) {
  return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;
}
 
/*Random de la position du x */
function random_x(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
 
/*Fonction Ballon et ses foncitons*/
function Ballon(x, y, radius, color, change_x, change_y) {

   this.x = x;
   this.y = y;
   this.radius = radius;
   this.color = color;
   this.change_x = change_x;
   this.change_y = change_y;

}


Ballon.prototype.draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawBall();
    this.x += this.change_x;
    this.y += this.change_y;
}; 

/*Fonction change position de mon ballon*/
Ballon.prototype.update_position = function() {  
      
    if(this.y < canvas.width) {
        this.y += this.change_y;
    }
    this.drawBall(); 
    

}; 

/*Fonction dessine mon ballon*/
Ballon.prototype.drawBall = function() {
      ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
} ;
  
/*Fonction qui crée les dix ballons*/
function create_ballons() {

    for (let index = 0; index < 10; index++) {

        var balle = new Ballon (random_x(194),0, 15, "#000000", 0, 2 );  
        ballons.push(balle)

        }   

}
 

/*Fonction qui fait bouger mes ballons*/
function move_ballons() {

  /*Initiations variables */
  var index_ballon = 0;
  var limit_height = 100;

  var stop_move_ballon = setInterval(move_ballon, 40);
 
  /*Fonction bouge mes ballons*/
  function move_ballon() {

    /*Stop fonction au dernier ballon*/
    if(index_ballon === 9 && ballons[index_ballon].y === 330 ) {

      console.log("je vais m'arreter")
      clearInterval( stop_move_ballon)

      /*Affiche le resultat*/
      jeu.style.display = "none"; 
      resultat.style.display = "flex";

      resultat_final();
    }

    else {

      /*Nettoie mon canvas à chaque mouvement*/
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /*Check la position de mon ballon*/
      if(check_limite(ballons[index_ballon], limit_height))
      {
       
        /*bouge mon ballon*/
        change_position_ballons(index_ballon);
        
      }else{

        change_position_ballons(index_ballon);

        if(index_ballon < 9 ) {
          index_ballon++;
        }

      }
    }
 
  }
}

/*Fonction qui annonce le resultat final du jeu*/
function resultat_final() {

  /*Initialisation variables*/ 
  var p = document.createElement("p");
  var img = document.createElement("img");
  var p_twitter = document.createElement("p");
  var div = document.createElement("div");
  var lien_twitter = document.createElement("a");

  
  var text_twitter =  "Partager mon score:";


   
  /*Je change l'image en fonction du resultat*/
  if (score > 7 ){
    img.src = "assets/images/bitmojie_top.png";
    var text = "Félicitation vous avez attrapé " + score + " ballons !!";
  };
  if (score > 4 && score < 8 ){
    img.src = "assets/images/bitmojie_moyen.png"
    var text = "Vous avez attrapé " + score + " ballons !!";
  };
  if (score < 5 ){
    img.src = "assets/images/bitmojie_nul.png";
    var text = "Vous avez attrapé " + score + " ballons. Vous ferez mieux la prochaine fois...";
  };

  var text_p = document.createTextNode(text);
  var text_p_twitter = document.createTextNode(text_twitter); 



  img.style.width = "130px";
  img.style.margin = "10px 10px 10px 10px"; 
  img.className = "show_resultat";
  div.style.display = "flex"; 
  p.className = "texte show_resultat";
  p_twitter.style.fontSize =  "14px";
  p_twitter.style.textAlign = "center";
  lien_twitter.href =  "https://twitter.com/share?ref_src=twsrc%5Etfw";
  lien_twitter.className = "bouton_twitter" ; 
  lien_twitter.text = "Twitter";
  lien_twitter.target = '_blank';
  h1.textContent = "Frizzy Love";
  
  p.appendChild(text_p);
  p_twitter.appendChild(text_p_twitter);
  div.appendChild(p_twitter);
  div.appendChild(lien_twitter);
  resultat.appendChild(h1);
  resultat.appendChild(img);
  resultat.appendChild(p);
  resultat.appendChild(div)

}

/* Déplacement des ballons*/
function change_position_ballons(index_ballon) {

  if(index_ballon === 0 ){
    ballons[index_ballon].update_position();
  }

  if(index_ballon === 1 ){
    ballons[0].update_position();
    ballons[index_ballon].update_position();
  }

  if(index_ballon === 2 ){
    ballons[0].update_position();
    ballons[1].update_position();
    ballons[index_ballon].update_position();
  }

  if(index_ballon === 3 ){
    ballons[0].update_position();
    ballons[1].update_position();
    ballons[2].update_position();
    ballons[index_ballon].update_position();
  }

  if(index_ballon === 4 ){
    ballons[1].update_position();
    ballons[2].update_position();
    ballons[3].update_position();
    ballons[index_ballon].update_position();
  }

  if(index_ballon === 5 ){
    ballons[2].update_position();
    ballons[3].update_position();
    ballons[4].update_position();
    ballons[index_ballon].update_position();
  }

  if(index_ballon === 6 ){
    ballons[3].update_position();
    ballons[4].update_position();
    ballons[5].update_position();
    ballons[index_ballon].update_position();
  }

  if(index_ballon === 7 ){
    ballons[4].update_position();
    ballons[5].update_position();
    ballons[6].update_position();
    ballons[index_ballon].update_position();
  }

  if(index_ballon === 8 ){
    ballons[5].update_position();
    ballons[6].update_position();
    ballons[7].update_position();
    ballons[index_ballon].update_position();
  }

  if(index_ballon === 9 ){
    ballons[6].update_position();
    ballons[7].update_position();
    ballons[8].update_position();
    ballons[index_ballon].update_position();
  }

}

function check_limite(ballon, height) {
     
    return ballon.y !== height;
  
}

init();
 