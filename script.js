function getWinner(){
    let max = 0;
    let q = 0;
    let h = 0; 
    for(let feels in mapFeel){
        if(v[q] > max)
            {
                max = v[q];
                vincitore = feels;
            }
        /*
        seleziono la seclta della prima domanda in caso di pareggio
        if(vincitore === "")
            vincitore = mapValue['one'];*/
        q++;
        }
        // seleziono la prima scelta in caso di pareggio 
        if(vincitore === "")
            for(elemento in mapValue)
                    {   
                        if(h === 0)
                            vincitore = mapValue[elemento];
                        h++;
                    }
        unlockAnswer(vincitore);
}
function unlockAnswer(vincitore){
    //credo h1 , p e button nell'html
    const new_title = document.createElement('h1');
    new_title.textContent = RESULTS_MAP[vincitore].title;
    const new_p = document.createElement('p');
    new_p.textContent = RESULTS_MAP[vincitore].contents;
    const new_button = document.createElement('button');
    const container = document.querySelector('#risposta'); 
    container.innerHTML = '';
    container.appendChild(new_title);
    container.appendChild(new_p);
    container.appendChild(new_button);
    new_button.innerHTML='Ricomincia il quiz';
    container.classList.remove('hidden');
    new_button.addEventListener('click',reset);
}
function reset(event){
    event.stopPropagation(); // evito il bubbling
    const container = document.querySelector('#risposta');
    var i = 0;
    const box1 = event.currentTarget; 
    mapValue = {};
    vincitore = "";
    for(const box of boxes)
        {
            box.addEventListener('click',selezione);
            v[i] = 0;
            mapFeel[box.dataset.choiceId] = 0;
            i++;
            box.querySelector('.checkbox').src = "./images/unchecked.png";
            box.classList.remove('checked'); 
            box.classList.remove('unchecked');
        }
    box1.removeEventListener('click',reset);
    container.classList.add('hidden');
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
}
function fine(){
    if(Object.keys(mapValue).length === 3)
        {
            for(let feels in mapFeel)
            {
                for(let elemento in mapValue)
                    {
                        if(mapValue[elemento] === feels)
                            {
                                v[j] = v[j] + 1;
                            }
                    }
                j +=1 ;
            }
            getWinner();
            return true;
        }
}
let j = 0; 
function assignValue(space)
    { 
        //riempio la mappa
        const index = space.dataset.questionId;
        mapValue[index] = space.dataset.choiceId;
        // se fine() ritorna vero, ovvero la dimensione sia = 3 ( numero domande) allora rimuovo gli handler
        if(fine())
            for(const box of boxes)
                box.removeEventListener('click',selezione);                          
    }
function selezione(event){
    /*sfrutto l'evento perchè appena viene scatenato vuol dire che la scelta cambia quindi
    resetto tutte le immagini e al div scelto assegno la classe checked */
    event.stopPropagation(); // evita il bubbling
    const box = event.currentTarget;
    const img = box.querySelector('.checkbox'); 
    const boxes1 = box.parentNode.querySelectorAll(".choice-grid div");
    for(const item of boxes1){
        item.querySelector('.checkbox').src = "./images/unchecked.png";   
        item.classList.remove('checked'); 
        item.classList.add('unchecked');
     }
    assignValue(box);
    img.src = "./images/checked.png"; 
    box.classList.remove("unchecked");
    box.classList.add("checked");
    
   
}
var vincitore = "";
let i= 0;
var v = [];
const mapFeel = {};
var mapValue = {};
const boxes = document.querySelectorAll('.choice-grid div');
for(const box of boxes)
    {
        box.addEventListener('click',selezione);
        v[i] = 0;
        mapFeel[box.dataset.choiceId] = 0;
        i++;
    }
