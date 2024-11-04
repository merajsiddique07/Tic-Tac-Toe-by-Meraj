let music = new Audio("contents/music.mp3");
let audioTurn = new Audio("contents/ting.mp3");
let gameover = new Audio("contents/gameover.mp3");
let isgameover = false;

//music

const audioToggleIcon = document.getElementById('audioToggleIcon');
const backgroundMusic = document.getElementById('backgroundMusic');

const allAudioElements = document.querySelectorAll('audio');

let isMuted = false;

backgroundMusic.play();
function toggleAudio() {
    isMuted = !isMuted; 
    
    allAudioElements.forEach(audio => {
        audio.muted = isMuted;
    });

    audioToggleIcon.textContent = isMuted ? '🔇' : '🔊';
}
audioToggleIcon.addEventListener('click', toggleAudio);


const score={
  Xwon: 0,
  Owon: 0,
  count:0
}

  const urlParams = new URLSearchParams(window.location.search);
    const myValue = urlParams.get("myValue");
    let turn = myValue;

    if(turn === "X"){
    document.getElementsByClassName('info')[0].innerText =
   turn;
    }
    else{
      document.getElementsByClassName('info')[0].innerText =turn;
    }

const changeTurn = ()=>{
  return turn === "X"?"O":"X"
}
const checkWin =()=>{
  let boxText = document.getElementsByClassName('boxText');
  let wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  wins.forEach(e =>{
    if((boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[2]].innerText === boxText[e[1]].innerText) && (boxText[e[0]].innerText !== '')){
    document.querySelector('.info').innerText = boxText[e[0]].innerText + " Won";
      if(boxText[e[0]].innerText === "X"){
        score.Xwon += 1;
        document.querySelector(".h1").textContent = score.Xwon;

        setTimeout(() => showPopup(`🎉 Player X Wins! 🎉`), 100);
      }
      else{
        score.Owon += 1; 
         document.querySelector(".h3").textContent = score.Owon;
        setTimeout(() => showPopup(`🎉 Player O Wins! 🎉`), 100);
      }
      isgameover = true;
    }

  })
}

let boxes = document.getElementsByClassName('box');

Array.from(boxes).forEach(element =>{
  let boxText = element.querySelector('.boxText');
  element.addEventListener('click', ()=>{
    if(boxText.innerText === ''){
      boxText.innerText = turn;
      score.count++;
     turn = changeTurn();
      audioTurn.play();
      checkWin();
        
       if(!isgameover){
          if(score.count === 9){
        setTimeout(() => showGameOver('😵 Game Over 😵'), 100);
      }
       document.getElementsByClassName('info')[0].innerText =turn;
    }
    }
  })
})

reset.addEventListener('click', ()=>{
  let boxText = document.querySelectorAll('.boxText');
  Array.from(boxText).forEach(element =>{
    element.innerText = "";
  })
  turn = myValue;
  isgameover = false;
   document.getElementsByClassName('info')[0].innerText =turn;
   closePopup();
   score.count =0;
})

   function showPopup(message) {
    
        const popup = document.getElementById('popup');
        const overlay = document.getElementById('overlay');
        const popupMessage = document.getElementById('popupMessage');
        new Audio("contents/won.mp3").play();
        popupMessage.textContent = message;
        popup.classList.add('show');    
        overlay.classList.add('show');
    }

    function closePopup() {
        const popup = document.getElementById('popup');
        const overlay = document.getElementById('overlay');
        popup.classList.remove('show');
        overlay.classList.remove('show');
    }

    function showGameOver(gameOverMsg) {
    
        const popup = document.getElementById('popup');
        const overlay = document.getElementById('overlay');
        new Audio("contents/gameover.mp3").play();
        popupMessage.textContent = gameOverMsg;
        popup.classList.add('show');    
        overlay.classList.add('show');
    }
    