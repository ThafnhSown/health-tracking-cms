import React, {useState, useEffect} from 'react';

const index = () => {
    useEffect(()=>{
        fetch(`https://fakestoreapi.com/products`)
            .then(res=>res.json())
            .then(json=>console.log(json))
            console.log("yes")
    },[])

  return (
    <div>
        index
    </div>
  )
}

export default index