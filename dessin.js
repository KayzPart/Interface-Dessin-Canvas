// On récupère la feuille 
class Dessin{
    constructor(canvas){
        // Il nous faut stocker différentes informations
        // On utilise la propriété draw qui nous permets de détecter si la personne est entrain dessiner
        this.draw = false;

        //  Les coordonnées de la zone ou l'on se trouve sur l'action précédente (exemple pour relier les trait)
        // This fait référence à un objet auquel il appartient *
        this.prevX = 0;
        this.prevY = 0;

        // Element qui à été choisi
        this.canvas = document.querySelector(canvas);
        console.log(this.canvas);
        // Dans des canvas il y des contexte donc =>
        this.ctx = this.canvas.getContext("2d");
        // Initialiser les couleurs et les tailles de traits
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;

        // Gérer les événements sur la canvas
        /*
        Le click, le mouvement de la souris, quand on sort du cadre ...
        */

        // Sur je click/bouton appuyer (mousedown)
        this.canvas.addEventListener("mousedown", (e) => {
            //On récupère l'évement et on lui dit, on dessine
            this.draw = true;

            // Si je dessine je vais stocker les coordonées de départ
            //Voir le tuto des signature de la même chaîne

            this.prevX = (e.clientX - this.canvas.offsetLeft) * 400 / this.canvas.clientWidth;
            this.prevY = (e.clientY - this.canvas.offsetTop) * 400 / this.canvas.clientHeight;

        })
        // Deuxième écoute d'évènement quand je déplace la souris
        this.canvas.addEventListener("mousemove", (e) => {
            //On vérifie si on dessine
            if(this.draw){
                // Si on dessine on récupère l'emplacement auquel se trouve la souris au moment de la déplacer 
                let currX = (e.clientX - this.canvas.offsetLeft) * 400 / this.canvas.clientWidth;
                let currY = (e.clientY - this.canvas.offsetTop) * 400 / this.canvas.clientHeight;

                // Pouvoir dessiner a partir des coordonées
                this.dessine(this.prevX, this.prevY, currX, currY);

                // On stocke les nouvelles coordonées 
                this.prevX = currX;
                this.prevY = currY;
            }
        })
        // Les évènement qui peuvent nous faire arrêter de dessiner 
        this.canvas.addEventListener("mouseup", () => {
            this.draw = false; 
        })
        // Quand je sort du cadre
        this.canvas.addEventListener("mouseout", () => {
            this.draw = false; 
        })



    }
    dessine(depX, depY, destX, destY){
        // Signaler qu'on commence le dessin
        this.ctx.beginPath();
        //Placer son stylo
        this.ctx.moveTo(depX, depY);
        // Je dessine une ligne à partir du point de départ vers la destination 
        this.ctx.lineTo(destX, destY);
        // Je ferme le chemin
        this.ctx.closePath();
        this.ctx.stroke();
    }

    // Pouvoir changer de couleur
    setColor(color){
        this.ctx.strokeStyle = color;
    }

    // Outil + 
    biggerStroke(){
        this.ctx.lineWidth++;
        
        
    }

    // Outil -
    smallStroke(){
        this.ctx.lineWidth = (this.ctx.lineWidth > 1)? this.ctx.lineWidth - 1 : 1
    }

    // Outil croix
    erase(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    // Smile
    smileStroke(){
        if(this.canvas.getContext){
            let ctx = this.canvas.getContext("2d");

            this.ctx.beginPath();
            //Cercle intérieur
            this.ctx.arc(75,75,50,0, Math.PI * 2, true); 
            this.ctx.moveTo(110,75);
            // Bouche sens horaires
            this.ctx.arc(75,75,35,0, Math.PI, false); 
            this.ctx.moveTo(65,65);
            // Oeil gauche
            this.ctx.arc(60,65,5,0, Math.PI * 2, true); 
            this.ctx.moveTo(95,65);
            // Oeil droit
            this.ctx.arc(90,65,5,0, Math.PI * 2, true);
            this.ctx.stroke();
        }
    }

    strokeCercle(){
        this.ctx.beginPath();
        this.ctx.lineCap ="round";
        this.ctx.moveTo(20,80);
        this.ctx.moveTo(depX, depY);
        this.ctx.lineTo(180,80);
        this.ctx.lineTo(destX, destY);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    

  
}


/* Comment utiliser this ? 
=>

- Dans une méthode il fait référence à l'objet propriétaire
- Seul, il fait référence à l'objet global
- Dans une fonction, il fait référence à l'objet global
- Dans une fonction, en mode strict this est undefined
- Dans un événement il fait référence à l'élément qui à reçu l'événement
- Avec les méthodes call() et apply(), this peut faire référence à n'importe quel objet  
*/