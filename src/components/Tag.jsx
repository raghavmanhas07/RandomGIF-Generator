import React from 'react'
import Spinner from './Spinner';
import { useState, useEffect } from 'react';
const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
const Tag = () => {
  const [tag, setTag] = useState('car')
  const [gif, setGif] = useState('');
  const [loading, setLoading] = useState('false')

  async function fetchData() {
    setLoading(true);
    try {
      const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch Tag GIF');
      }
      const data = await response.json();
      const imageSource = data.data.images.downsized_large.url;
      setGif(imageSource);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  useEffect(() => {
    fetchData();
  })


  function clickHandler() {
    console.log('clicked');
    fetchData();
  }
  function changeHandler(event){
    setTag(event.target.value)
  }

  return (
    <div className='w-1/2 bg-blue-500 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px]'>
      <h1 className='mt-[15px] text-2xl underline uppercase font-bold'>Random {tag} Gif</h1>
    {
      loading? (<Spinner/>) : (<img src={gif} width="450" alt='nil' />)
    }

    <input className='w-10/12 text-lg rounded-lg mb-[3px] text-center' onChange={changeHandler} value={tag}/>
      

      <button onClick={clickHandler} className='w-10/12 bg-yellow-200 py-2 text-lg rounded-lg mb-[20px]'>Generate</button>
    </div>
  )
}

export default Tag
