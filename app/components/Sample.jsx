import React, { useEffect, useState } from 'react'

const Sample = () => {

const [mes,setmes]=useState("loading")

    useEffect(()=>{
       fetch("http://127.0.0.1:8080/api/home").
       then(res=>res.json()).
       then((r)=>setmes(r.message)
       
       )
    },[])
  return (
    <div>
      <h1> sample page for api data </h1>
      <h1>{mes}</h1>
    </div>
  )
}

export default Sample
