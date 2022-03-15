import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import GameView from './gameview.jsx';

const Title = styled.h1`
  font-family: 'Maven Pro', sans-serif;
  color: #FE5F55;
  text-align: center
`;

const LoginParent = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(3, 33%);
  height: 280px;
  width: 100%;
  margin: auto;
`;

const Login = styled.div`
  border: 3px solid #820933;
  margin: auto;
  width: 300px;
  height: 280px;
  border-radius: 5%;
  background-color: #FBFEFB;
  margin-bottom: 100px;
  justify-content: start;
`;

const Formlabel = styled.label`
  font-size: 14px;
  text-align: center;
  margin-left: 80px;
`;

const CatsParent = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(3, 33%);
  height: 50px;
  width: 100%;
  margin: auto;
`;

const CatsSection = styled.div`
  display: flex;
  justify-content: center;
`;

const CatsImg = styled.img`
  object-fit: contain;
  width: 50px;
  max-height: 50px;
  border: 1px solid lightgrey;
  border-radius: 50%;
`;

const StartGameButton = styled.input`
  display: block;
  margin-right: auto;
  margin-left: auto;
  margin-top: 8px;
  padding: 10px;
  width: 100px;
`;

const H3 = styled.h3`
  font-family: 'Maven Pro', sans-serif;
  color: #FE5F55;
  text-align: center
`;

const HighScore = styled.div`
  border: 3px solid #820933;
  margin: auto;
  width: 300px;
  height: 280px;
  border-radius: 5%;
  background-color: #FBFEFB;
  margin-bottom: 100px;
`;

const App = () => {

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [score, setScore] = useState(0);
  const [cat, setCat] = useState('');
  const [start, setStart] = useState(false);
  //array of objects
  const [highScore, setHighScore] = useState([]);


  console.log('cat', cat)
  const addPlayer = () => {
    let newPlayer = {
      name: username,
      email: email,
      score: score
    }
    axios.post('/score', newPlayer)
      .then(() => {
        console.log('Success posting in app')
        setStart(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getHighScore = () => {
    axios.get('/score')
      .then((data) => {
        console.log('high score data', data);
        let sortedScores = data.data.sort((a, b) => b.score - a.score).slice(0, 5)
        setHighScore(sortedScores)
      })
      .catch((err) => {
        console.log('err in getting high score', err);
      })
  }

  console.log('highscore',highScore )

  useEffect(() => {
    getHighScore();
  }, [])

  return (
    <div>
      <Title>
        Hungry Cat
      </Title>
      <LoginParent>
        <img src="https://i.imgur.com/P2CJX21.png" style={{justifySelf: "start"}}></img>
        <Login>
        <form>
          <Formlabel>
            Username
            <div>
              <input type="text" name="name" onChange={ (e) => setUserName(e.target.value) } required={true}/>
            </div>
          </Formlabel>
          <Formlabel>
            Email
            <div>
              <input type="email" name="name" onChange={ (e) => setEmail(e.target.value) } required={true}/>
            </div>
          </Formlabel>
          <H3>Pick your cat</H3>
          <CatsParent>
            <CatsSection>
              <CatsImg src="https://i.imgur.com/6oRAfeW.png" onClick={() => setCat('Orange cat')} />
            </CatsSection>
            <CatsSection>
              <CatsImg src="https://i.imgur.com/wPW1kGS.png" onClick={() => setCat('White cat')} />
            </CatsSection>
            <CatsSection>
              <CatsImg src="https://i.imgur.com/QRKXzxp.png" onClick={() => setCat('Grey cat')} />
            </CatsSection>
          </CatsParent>
          {cat ? <div style={{textAlign : "center"}}>{cat} picked!</div> : null}
          <StartGameButton type="submit" value="Submit" onClick={ (e) =>  { e.preventDefault(); addPlayer(); }}/>
        </form>
        </Login>
        <HighScore>
          <H3> High Score</H3>
          <ol>
            {highScore.map((score, idx) => (
              <li key={idx}>{score.name} <a style={{textAlign: "right"}}>{score.score}</a></li>
            ))}
          </ol>
        </HighScore>
      </LoginParent>

      <GameView cat={cat} start={start}/>


    </div>
  )
}

export default App;