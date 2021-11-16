// On créer la palette =>

// Afin d'être sur que tout les éléments du html soit charger
// Je vais chercher toutes mes div'

window.onload = () => {
    document.querySelectorAll("#palette div").forEach(element => {
        // On mets les couleurs
        element.style.backgroundColor = element.dataset.color;

        // On écoute le clik 
        element.addEventListener("click", () => {
            canvas.setColor(element.dataset.color);
        })
    })

    // On charge le canvas
    let canvas = new Dessin("#feuille");

    // Gérer le clique sur l'outil + 
    document.querySelector("#plus").addEventListener("click", () => {
        canvas.biggerStroke();
    })

    // Gérer le clique sur l'outil -
    document.querySelector("#moins").addEventListener("click", () => {
        canvas.smallStroke();
    })

    // Gérer le clique sur la gomme 
     document.querySelector("#gomme").addEventListener("click", () => {
        canvas.setColor("white");
    })

    // Gérer le clique sur la croix
    document.querySelector("#croix").addEventListener("click", () => {
        canvas.erase();
    })
    document.querySelector("#smile").addEventListener("click", () => {
        canvas.smileStroke();
    })

    // cliquer sur cercle
    document.querySelector("#cercle").addEventListener("click", () =>  {
        canvas.strokeCercle();
    })
    
    function startup() {
        var el = document.getElementsByTagName("canvas")[0];
        el.addEventListener("touchstart", handleStart, false);
        el.addEventListener("touchend", handleEnd, false);
        el.addEventListener("touchcancel", handleCancel, false);
        el.addEventListener("touchleave", handleLeave, false);
        el.addEventListener("touchmove", handleMove, false);
      }
}



