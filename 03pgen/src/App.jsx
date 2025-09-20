import { useEffect, useState,useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRef } from 'react';

function App() {
  const [length,setLength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");
//password generator component-password generatn ka logic
//useCallback used for memoization jitna remember kr skta hai krle.can be used w/o useCallback
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])
//clipboard me copy krne wla component
  const copyPasswordToClipboard=useCallback(()=>{
    // user to acha lge and pta lge kya select hora hai use lie we added this
     passwordRef.current?.select()
     passwordRef.current?.setSelectionRange(0,4)
    //window ka use krke password copies to clipboard
    window.navigator.clipboard.writeText(password);
  },[password])
// use ref hoook used coz muje refernece dena hai password ka ..kisi bhi element ka ref dekr we can manipulate that element
// yhaa hume password to maipulate ya game khelna tha password ke sath to did that
  const passwordRef=useRef(null);
// use effect hook call hoga initialyy jab humara page load hoga sabse pehle call hoga hum first
// hme page khulte hi password chaiye tha to we used this and iske ander passwordgenerator call krdia
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='bg-gray-700 h-100 text-center '>
        <h1 className='text-white  m-5 p-5 text-bold'>Password generator</h1>
        <input type="text" placeholder='password' ref={passwordRef} value={password} readOnly className='bg-white p-4 m-3' />
        <button className=' text-white bg-blue-600 ' onClick={copyPasswordToClipboard}>copy</button>

        <div>
          <input type="range" value={length} min={6} max={100} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
          <label htmlFor=""className='text-white'>Length:{length}</label>
        </div>

        <div className='text-white-900'>
          <input type="checkbox" checked={numberAllowed} id='numberInput' onChange={ (e)=>{
            setNumberAllowed(e.target.checked);
          }}/>
          <label htmlFor="numberInput" className='text-white'>Number</label>
        </div>

        <div>
          <input type="checkbox" checked={charAllowed} id='characterInput' onChange={ (e)=>{
            setCharAllowed(e.target.checked);
          }}/>
          <label htmlFor="characterInput" className='text-white'>Character</label>
        </div>
      </div>
      
      
    </>
  )
}

export default App
