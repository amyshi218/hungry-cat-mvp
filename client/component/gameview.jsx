import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const background = "https://studioaka.co.uk/wp-content/uploads/2021/01/Layer-4.png"
const Game = styled.div`
  background: url(${background});
  background-size: cover;
  border: 3px solid #820933;
  border-radius: 5%;
  height: 500px;
  width: 90%;
  margin: auto;
`;

const ControlPanel = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 120px 10px;
`;

const CurrentScore = styled.div`
  background: #FBFEFB;
  border: 3px solid #820933;
  border-radius: 5%;
  width: 150px;
  height: 80px;
`;

const Restart =styled.div`

  border: 3px solid #820933;
  width: 120px;
  height: 80px;
`;


//TODO get food to only move around the div
//generate food at different intervals

const GameView = ({cat, start}) => {

  const [score, setScore] = useState(0);


  setInterval(generateFood, 2000);

  const generateFood = () => {

    return (
      <img className="chicken" src="https://i.imgur.com/6oRAfeW.png"></img>
    )
  }

  useEffect(() => {
    setInterval(generateFood, 2000);
  }, [start])

  return (
    <>
      <ControlPanel>
        <CurrentScore>
          <p style={{textAlign: "center", marginBottom: "3px"}}>Current Score</p>
          <h2 style={{textAlign: "center", marginTop: "0px"}}>{score}</h2>
        </CurrentScore>
        <Restart></Restart>
      </ControlPanel>
      <Game>
       {start ? generateFood() : null}

      </Game>
    </>
  )
}

export default GameView;