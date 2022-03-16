import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import chicken from '../../public/images/chicken.png';
import cheese from '../../public/images/cheese.png';
import fish from '../../public/images/fish.png';
import can from '../../public/images/can.png';
import bone from '../../public/images/bone.png';
import orangecat from '../../public/images/orangecat.png';
import whitecat from '../../public/images/whitecat.png';
import greycat from '../../public/images/greycat.png';
import orangecatcursor from '../../public/images/orangecatcursor.png';
import whitecatcursor from '../../public/images/whitecatcursor.png';
import greycatcursor from '../../public/images/greycatcursor.png';

const background = "https://studioaka.co.uk/wp-content/uploads/2021/01/Layer-4.png"
const Game = styled.div`
  background: url(${background});
  background-size: cover;
  border: 1px solid #820933;
  border-radius: 5%;
  height: 550px;
  width: 100%;
  margin: auto;
`;

const ControlPanel = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 120px 10px;
`;

const CurrentScore = styled.div`
  background: #FBFEFB;
  border: 1px solid #820933;
  border-radius: 5%;
  width: 150px;
  height: 80px;
`;

const Timer =styled.div`
  background: #FBFEFB;
  border: 1px solid #820933;
  border-radius: 5%;
  width: 120px;
  height: 80px;
`;


const Food = styled.img`
  position: relative;
  width: 150px;
  height: 150px;
`;

//TODO get food to only move around the div
//generate food at different intervals - kind of happening but in batches of four


const GameView = ({cat, start, setStart, getHighScore, setHighScore, username, email}) => {

  const [score, setScore] = useState(0);
  const [play, setPlay] = useState(false)

  const [cursorCat, setCursorCat] = useState(`url(${orangecatcursor}), grab`)

  const setCursor = () => {
    if (cat === 'Orange cat') {
      setCursorCat(`url(${orangecatcursor}), grab`)
    }
     else if (cat === 'White cat' ) {
      setCursorCat(`url(${whitecatcursor}), grab`)
    } else if (cat === 'Grey cat' ) {
      setCursorCat(`url(${greycatcursor}), grab`)
    }
  }

  useEffect(() => {
    setCursor();
  }, [cat])

  useEffect(() => {
    document.getElementById("game").style.cursor = cursorCat;
  }, [cursorCat])


  const incrementScore = () => {
    let newScore = score + 1;
    setScore(newScore)
  }

  const locationH = () => Math.random() * 450
  const locationW = () => Math.random() * 550
  const food = [chicken, cheese, fish, can];
  const generateFood = () => (
    start ?
    <Food className="food" src={food[Math.floor(Math.random() * food.length)]} style={{top: locationH(), left: locationW()}} onClick={  incrementScore}/>
    : null
  )

  const time = () => {
    let timeleft = 30;
    setPlay(false)
    let downloadTimer = setInterval(() => {
      timeleft--;
      document.getElementById("countdown").textContent = timeleft;
      if (timeleft === 0) {
        setStart(false);
        clearInterval(downloadTimer);
      }
    }, 1000);
  }

  const updateScoreBoard = () => {
    let updatePlayerScore = {
      username: username,
      email: email,
      score: score
    }
    axios.post('/score', updatePlayerScore)
    .then(() => {
      console.log('Success posting in app');
      getHighScore()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(()=> {
    setPlay(start)
    updateScoreBoard()
  }, [start])

  return (
    <>
      <ControlPanel>
        <CurrentScore>
          <p style={{textAlign: "center", marginBottom: "3px"}}>Current Score</p>
          <h2 style={{textAlign: "center", marginTop: "0px"}}>{score}</h2>
        </CurrentScore>
        <Timer>
          {play ? time() : null}
          <p style={{textAlign: "center", marginBottom: "2px"}}>Time Left</p>
          <h1 id="countdown" style={{textAlign: "center", marginTop: "0px"}}>30</h1>

        </Timer>
      </ControlPanel>


      <Game id="game" >
       {/* { start ? setInterval(() => generateFood(), 2000) :  null} */}

       {generateFood()}
       {generateFood()}
       {generateFood()}
       {generateFood()}

      </Game>



    </>
  )
}

export default GameView;

// `url(${avatar})`