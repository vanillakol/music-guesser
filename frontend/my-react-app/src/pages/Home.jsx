// src/pages/Home.js

import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';


function Home() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  

  const changeIndex = () => {
    let i = Math.floor(Math.random() * 13)
    gameArrayFunction()
    setIndex(i)
    
    
    
  };

  const scorePost = () => {
    if (!user || !user.id) {
        console.error("User ID is not defined");
        return;
    }
    if (score === undefined || score === null) {
        console.error("Score is not defined");
        return;
    }

    console.log('Posting score:', { userId: user.id, score: score });

    axios.post('http://localhost:8000/scorepost', {
        userId: user.id,
        score: score
    })
    .then(response => {
        console.log(response.data.message);
    })
    .catch(err => {
        console.error(err);
    });
};



  
  

  const [clef, setClef] = useState("Both")
  const [index, setIndex] = useState(1)
  const [score, setScore] = useState(0)
  const [attempt, setAttempt] = useState(0)
  const [gameArray, setGameArray] = useState([''])

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflowY = 'hidden';
    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  useEffect(() => {
    changeIndex()
    gameArrayFunction()
    
  }, []);


  useEffect(()=>{
    gameArrayFunction()
    changeIndex()
  }, [clef])




  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/register');
  };

  

  const gameArrayFunction = () => {
    if(clef == 'Bass'){
      setGameArray(gameArrayBass)
      scorePost()
    }
    if(clef == 'Treble'){
      setGameArray(gameArrayTreble)
      scorePost()
    }
    if(clef == 'Both'){
      const options = [gameArrayBass, gameArrayTreble];
      const random = options[Math.round(Math.random())];
      setGameArray(random);
      scorePost()
    }
  }


  const gameArrayBass = [
    {
      image: "/bass1.png", 
      choices: ["E", "F", "G", "A", "B"], 
      answer: "F", 
      sound: "blank", 
      clef: "Bass"
    }, 
    {
      image: "/bass2.png", 
      choices: ["D", "F", "G", "C", "B"], 
      answer: "G", 
      sound: "blank", 
      clef: "Bass"
    },
    {
      image: "/bass3.png", 
      choices: ["E", "F", "G", "A", "C"], 
      answer: "A", 
      sound: "blank", 
      clef: "Bass"
    },
    {
      image: "/bass4.png", 
      choices: ["B", "F", "G", "A", "C"], 
      answer: "B", 
      sound: "blank", 
      clef: "Bass"
    },
    {
      image: "/bass5.png", 
      choices: ["A", "C", "F", "E", "C"], 
      answer: "C", 
      sound: "blank", 
      clef: "Bass"
    },
    {
      image: "/bass6.png", 
      choices: ["A", "D", "E", "F", "D"], 
      answer: "D", 
      sound: "blank", 
      clef: "Bass"
    },
    {
      image: "/bass7.png", 
      choices: ["C", "D", "E", "F", "G"], 
      answer: "E", 
      sound: "blank", 
      clef: "Bass"
    },
    {
      image: "/bass8.png", 
      choices: ["A", "B", "D", "E", "F"], 
      answer: "F", 
      sound: "blank", 
      clef: "Bass"
    },
    {
      image: "/bass9.png", 
      choices: ["B", "C", "D", "F", "G"], 
      answer: "G", 
      sound: "blank", 
      clef: "Bass"
    },
    {
      image: "/bass10.png", 
      choices: ["A", "B", "C", "E", "F"], 
      answer: "A", 
      sound: "blank", 
      clef: "Bass"
    },
    {
      image: "/bass11.png", 
      choices: ["A", "B", "C", "D", "G"], 
      answer: "B", 
      sound: "blank", 
      clef: "Bass"
    },
    {
      image: "/bass12.png", 
      choices: ["C", "D", "E", "G", "A"], 
      answer: "C", 
      sound: "blank", 
      clef: "Bass"
    },
    {
      image: "/bass13.png", 
      choices: ["A", "C", "D", "F", "G"], 
      answer: "D", 
      sound: "blank", 
      clef: "Bass"
    },
    {
      image: "/bass14.png", 
      choices: ["B", "C", "D", "E", "F"], 
      answer: "E", 
      sound: "blank", 
      clef: "Bass"
    }
  ];

  const gameArrayTreble = [
    {
      image: '/SZ1.png',
      choices: ["C", "G", "F", "D", "A"],
      answer: "D",
      sound: "blank", 
      clef: "Treble"
    },
    {
      image: '/SZ2.png',
      choices: ["E", "F", "G", "A", "B"],
      answer: "E",
      sound: "blank", 
      clef: "Treble"
    },
    {
      image: '/SZ3.png',
      choices: ["C", "D", "E", "F", "G"],
      answer: "F",
      sound: "blank", 
      clef: "Treble"
    },
    {
      image: '/SZ4.png',
      choices: ["A", "B", "C", "D", "G"],
      answer: "G",
      sound: "blank", 
      clef: "Treble"
    },
    {
      image: '/SZ5.png',
      choices: ["B", "C", "D", "A", "F"],
      answer: "A",
      sound: "blank", 
      clef: "Treble"
    },
    {
      image: '/SZ6.png',
      choices: ["C", "D", "B", "F", "G"],
      answer: "B",
      sound: "blank", 
      clef: "Treble"
    },
    {
      image: '/SZ7.png',
      choices: ["A", "B", "C", "D", "E"],
      answer: "C",
      sound: "blank", 
      clef: "Treble"
    },
    {
      image: '/SZ8.png',
      choices: ["B", "C", "D", "E", "F"],
      answer: "D",
      sound: "blank", 
      clef: "Treble"
    },
    {
      image: '/SZ9.png',
      choices: ["A", "B", "C", "D", "E"],
      answer: "E",
      sound: "blank", 
      clef: "Treble"
    },
    {
      image: '/SZ10.png',
      choices: ["C", "D", "E", "F", "G"],
      answer: "F",
      sound: "blank", 
      clef: "Treble"
    },
    {
      image: '/SZ11.png',
      choices: ["G", "A", "B", "C", "D"],
      answer: "G",
      sound: "blank", 
      clef: "Treble"
    },
    {
      image: '/SZ12.png',
      choices: ["A", "B", "C", "D", "E"],
      answer: "A",
      sound: "blank", 
      clef: "Treble"
    },
    {
      image: '/SZ13.png',
      choices: ["A", "C", "B", "E", "F"],
      answer: "B",
      sound: "blank", 
      clef: "Treble"
    },
    {
      image: '/SZ14.png',
      choices: ["C", "D", "E", "F", "G"],
      answer: "C",
      sound: "blank", 
      clef: "Treble"
    },
    {
      image: '/SZ15.png',
      choices: ["C", "E", "D", "G", "A"],
      answer: "D",
      sound: "blank", 
      clef: "Treble"
    }
  ];
  
  const evaluate = (choiceIndex) => {
    if(gameArray[index].choices[choiceIndex] === gameArray[index].answer){
      toast.success('correct')
      setScore(score + 1)
      setAttempt(attempt + 1)
      changeIndex()
      gameArrayFunction()
      scorePost()
    }
    else {
      toast.error('Wrong')
      setAttempt(attempt + 1)
      changeIndex()
      gameArrayFunction()
      scorePost()

    }
  }

 

  return (
    <>
      {!user ? (
        <div className="flex flex-col items-center space-y-10 min-h-screen h-full w-full">
          <h1 className="text-4xl leading-9 sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl text-center font-bold mt-10 max-w-xl">
            Note Identification Game with 
            <div className='max-w-xl bg-primary py-1 mt-4 text-neutral px-8 rounded-lg'>Treble & Bass Clef</div>
          </h1>
          <div className='text-center mr-20 ml-20'>
            Improve your music reading skills with our interactive game. Learn to identify notes quickly and accurately!
          </div>
          <div>
            <button
              type="button"
              className="btn px-5 mr-5 btn-secondary"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              type="button"
              className=" ml-5 btn btn-accent"
              onClick={handleSignupClick}
            >
              Sign-Up
            </button>
          </div>
        </div>
      ) : (
        <>
            <img src={gameArray[index].image} className='h-60'/> 
            <div>        
            <button onClick={() => evaluate(0)} className='btn btn-primary'>{gameArray[index].choices[0]}</button>
              <button onClick={() => evaluate(1)} className='btn btn-primary'>{gameArray[index].choices[1]}</button>
              <button onClick={() => evaluate(2)} className='btn btn-primary'>{gameArray[index].choices[2]}</button>
              <button onClick={() => evaluate(3)} className='btn btn-primary'>{gameArray[index].choices[3]}</button>
              <button onClick={() => evaluate(4)} className='btn btn-primary'>{gameArray[index].choices[4]}</button>
            <button  onClick={()=>{setAttempt(0)
              setScore(0)
            }}  className='btn btn-accent'>reset</button>
            <button onClick={changeIndex} className='btn btn-secondary'>skip</button>
            </div>
            <div>
              <button onClick={()=>setClef('Both')}  className='btn btn-outline'>Treble & Bass</button>
              <button onClick={()=>setClef('Treble')}  className='btn btn-outline'>Treble</button>
              <button  onClick={()=>setClef('Bass')}   className='btn btn-outline'>Bass</button>
            </div>
            {clef + '  '}
        
            {score + "/" + attempt }
            
        </>
      )}
    </>
  );
}

export default Home;
