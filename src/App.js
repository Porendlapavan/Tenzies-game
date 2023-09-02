import React from 'react'
// import AOS from 'aos';
import 'aos/dist/aos.css';
import Die from './components/Die';
import {nanoid} from "nanoid"
import Confetti from 'react-confetti';

export default function App(){
  const [dice, setdice]=React.useState(allnewDice())
  const { width, height } = useWindowSize()
  function useWindowSize(){
    return{
      width :window.innerWidth,
      height :window.innerHeight
    }
  }
  
  function allnewDice(){
    const newDice=[];

    for(let i=0;i<10;i++){
      newDice.push({ value : Math.floor((Math.random()) * 6)+1 ,
      isHeld : false,
      id :nanoid()
      })
    }

    return newDice;
  } 

  function RollDice(){
    if(!tenzies){
      setdice(olddice => olddice.map(die=>{
      return die.isHeld ? die :{
        ...die,value : Math.floor((Math.random()) * 6)+1 
      }
    }))
    }else{
      setdice(allnewDice())
      settenzies(false)
    }
  }

  function HoldDice(id){
    setdice(olddice => olddice.map(die => {
      return die.id === id ?
        {...die, isHeld : !die.isHeld} : die
    }))
  }

  const diceElements=dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} id={die.id} HoldDice={()=>HoldDice(die.id)}/>)

  const [tenzies, settenzies] =React.useState(false);
  React.useEffect(() =>
  {
    const allheld=dice.every(die=> die.isHeld)
    const firstvalue =dice[0].value;
    const samevalue=dice.every(die => (die.value===firstvalue))
    if(samevalue && allheld){
      settenzies(true)
    }
  },[dice])

  return (   
    
    <main className='bg-[#f5f5f5] p-5 h-[400px] max-w-[800px] rounded-[5px] flex flex-col justify-center items-center text-center'>
      <h1 className='font-bold p-2'>Tenzies</h1> 
      <p className='p-2 mb-5'>Roll until all dice are same. Click each die to freeze it at its current value between rolls</p>
      <div className='grid grid-cols-5 gap-5'>
        {diceElements}
      </div>
      <button  onClick={RollDice}  className='rounded-lg text-center text-white m-8 px-5 py-1 bg-[#5035ff] active:shadow-inset'>{tenzies?"New Game":"Roll"}</button>
      {tenzies && <p>You Won!</p>}
      {tenzies && <Confetti
      width={width}
      height={height}
    />}
  
    </main> 
  )
}