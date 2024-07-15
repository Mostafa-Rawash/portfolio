import React from 'react'

export default function Skill(props) {
  return (
    <div className={" border-0 badge " + props.color + " h-14 gap-2 p-6 shadow-2xl absolute "} style={{ top: props.top, left: props.left, transform: "translate(-50% , -50%)" }}>
     {props.icon &&<img src={"/src/assets/Imgs/Skills/"+  props.icon} className='w-10' />}  <p className='text-lg font-medium'>{props.name} </p>
    </div>

  )
}
