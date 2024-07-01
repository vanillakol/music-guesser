import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';

function DashBoard() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [score, setScore] = useState(0);

  const getScore = () => {
    if (user) {
      axios.post('http://localhost:8000/getscore', {
        userId: user.id
      }).then(response => {
        console.log(response);
        if (response.data && response.data.score !== undefined) {
          setScore(response.data.score+1);
        }
      }).catch(err => {
        console.error(err);
      });
    }
  };

  useEffect(() => {
    if (user) {
      getScore()
      setScore(score+1)
    } else {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      {!!user && <h2>Hi {user.name}! {'Your high score is ' + score}</h2>}
    </div>
  );
}

export default DashBoard;
