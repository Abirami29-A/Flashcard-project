let flashcards = [

{
    question: "What is HTML?",
    answer: "Hyper Text Markup Language",
    category: "HTML",
    favorite: false
},
{
    question: "What is CSS?",
    answer: "Cascading Style Sheets",
    category: "CSS",
    favorite: false
},
{
    question: "What is JavaScript?",
    answer: "Programming language for web development",
    category: "JavaScript",
    favorite: false
},
{
    question: "What is DOM?",
    answer: "Document Object Model",
    category: "JavaScript",
    favorite: false
},
{
    question: "What is Flexbox?",
    answer: "A one-dimensional CSS layout system",
    category: "CSS",
    favorite: false
},
{
    question: "What is CSS Grid?",
    answer: "A two-dimensional CSS layout system",
    category: "CSS",
    favorite: false
},
{
    question: "What is Bootstrap?",
    answer: "A popular CSS framework",
    category: "Programming",
    favorite: false
},
{
    question: "What is React?",
    answer: "A JavaScript library for building user interfaces",
    category: "Programming",
    favorite: false
},
{
    question: "What is API?",
    answer: "Application Programming Interface",
    category: "Programming",
    favorite: false
},
{
    question: "What is JSON?",
    answer: "JavaScript Object Notation",
    category: "Programming",
    favorite: false
},
{
    question: "What is a Variable?",
    answer: "A container used to store data",
    category: "Programming",
    favorite: false
},
{
    question: "What is a Function?",
    answer: "A reusable block of code",
    category: "Programming",
    favorite: false
},
{
    question: "What is an Array?",
    answer: "A collection of multiple values",
    category: "Programming",
    favorite: false
},
{
    question: "What is a Loop?",
    answer: "A statement used to repeat code",
    category: "Programming",
    favorite: false
},
{
    question: "What is Local Storage?",
    answer: "Browser storage that saves data permanently",
    category: "JavaScript",
    favorite: false
},
{
    question: "What is Session Storage?",
    answer: "Temporary browser storage",
    category: "JavaScript",
    favorite: false
},
{
    question: "What is Cyber Security?",
    answer: "Protection of systems and networks from attacks",
    category: "Cyber Security",
    favorite: false
},
{
    question: "What is a Firewall?",
    answer: "A network security protection system",
    category: "Cyber Security",
    favorite: false
},
{
    question: "What is SQL Injection?",
    answer: "A database attack technique",
    category: "Cyber Security",
    favorite: false
},
{
    question: "What is Phishing?",
    answer: "A cyber attack using fake messages or websites",
    category: "Cyber Security",
    favorite: false
}

];
let current = 0;
let score = 0;
let seconds = 0;

function displayCard(){

    if(!flashcards.length) return;

    document.getElementById("question").innerHTML =
        flashcards[current].question;

    document.getElementById("answer").innerHTML =
        flashcards[current].answer;

    document.getElementById("answer").style.display =
        "none";

    document.getElementById("answerBtn").innerHTML =
        "Show Answer";

    document.getElementById("category").innerHTML =
        flashcards[current].category;

    document.getElementById("cardCounter").innerHTML =
        `Card ${current+1}/${flashcards.length}`;

    document.getElementById("totalCards").innerHTML =
        flashcards.length;

    document.getElementById("progressFill").style.width =
        ((current+1)/flashcards.length)*100 + "%";

    updateStats();
}

document.getElementById("answerBtn")
.addEventListener("click",function(){

    let answer =
        document.getElementById("answer");

    if(answer.style.display==="block"){
        answer.style.display="none";
        this.innerHTML="Show Answer";
    }
    else{
        answer.style.display="block";
        this.innerHTML="Hide Answer";
    }
});

function nextCard(){

    if(current < flashcards.length-1){

        current++;
        score++;

        document.getElementById("score")
        .innerHTML=score;

        document.getElementById("completed")
        .innerHTML=score;

        displayCard();
    }
}

function prevCard(){

    if(current>0){
        current--;
        displayCard();
    }
}

function addCard(){

    let q =
    document.getElementById("newQuestion").value;

    let a =
    document.getElementById("newAnswer").value;

    let c =
    document.getElementById("newCategory").value;

    if(q===""||a===""){
        alert("Enter Question & Answer");
        return;
    }

    flashcards.push({
        question:q,
        answer:a,
        category:c,
        favorite:false
    });

    displayCard();
}

function editCard(){

    let q =
    document.getElementById("newQuestion").value;

    let a =
    document.getElementById("newAnswer").value;

    let c =
    document.getElementById("newCategory").value;

    flashcards[current].question=q;
    flashcards[current].answer=a;
    flashcards[current].category=c;

    displayCard();
}

function deleteCard(){

    if(flashcards.length===1){
        alert("Cannot delete");
        return;
    }

    flashcards.splice(current,1);

    if(current>=flashcards.length)
        current=flashcards.length-1;

    displayCard();
}

function favoriteCard(){

    flashcards[current].favorite =
    !flashcards[current].favorite;

    updateStats();
}

function updateStats(){

    let fav =
    flashcards.filter(
        x=>x.favorite
    ).length;

    document.getElementById("favoriteCount")
    .innerHTML=fav;

    document.getElementById("fav")
    .innerHTML=fav;

    document.getElementById("accuracy")
    .innerHTML=
    Math.round(
        (score||1)/flashcards.length*100
    )+"%";
}

function speakCard(){

    speechSynthesis.cancel();

    let speech =
    new SpeechSynthesisUtterance(
        "Question. " +
        flashcards[current].question +
        ". Answer. " +
        flashcards[current].answer
    );

    speech.lang="en-US";
    speech.rate=0.9;

    speechSynthesis.speak(speech);
}

document.getElementById("search")
.addEventListener("keyup",function(){

    let found =
    flashcards.findIndex(
        x=>x.question
        .toLowerCase()
        .includes(this.value.toLowerCase())
    );

    if(found!=-1){
        current=found;
        displayCard();
    }
});

document.getElementById("themeBtn")
.onclick=function(){
    document.body.classList.toggle("dark");
};

document.getElementById("shuffleBtn")
.onclick=function(){

    flashcards.sort(
        ()=>Math.random()-0.5
    );

    current=0;

    displayCard();
};

setInterval(()=>{

    seconds++;

    let min =
    Math.floor(seconds/60);

    let sec =
    seconds%60;

    document.getElementById("timer")
    .innerHTML=
    `${min}:${sec<10?"0"+sec:sec}`;

},1000);

displayCard();
updateStats();