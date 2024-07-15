import React from 'react'

export default function Project(props) {
  return (
    <div className="card card-side bg-theme-cc  shadow-xl my-14 overflow-hidden ">
      <div className="card-body w-full lg:w-2/4">
        <h2 className="card-title text-xl text-theme-tc hover:text-theme-a  font-bold"
        >
          <label htmlFor={props.project.name.split(' ')[0] + "-drawer"}>
            {props.project.name}
          </label>
        </h2>
        <div className="card-actions justify-start">
          {props.project.badges.map((badge, key) => {
            return (
              <div className="" key={key}>
                <p className='text-xs'>
                  <img src={"/src/assets/Imgs/Skills/" + badge + ".png"} className='w-7 ' alt={badge+".png"} /> {props.name}
                </p>
              </div>
            )
          })}
        </div>
      </div>
      {props.project.img && <figure className='lg:w-2/4' ><img src={props.project.img} alt={props.project.img} className='h-full'/></figure>}
      {/* Drawer Section */}
      <div className="drawer z-50 absolute">
        <input id={props.project.name.split(' ')[0] + "-drawer"} type="checkbox" className="drawer-toggle" />
        <div className="drawer-side text-theme-tc">
          <label
            htmlFor={props.project.name.split(' ')[0] + "-drawer"}
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu p-4  min-h-full bg-theme-cc  text-base-content w-10/12 md:w-6/12 lg:w-6/12 xl:5/12">
            {/* Images section */}
            {props.project.img && <div className="mockup-browser border bg-base-300 shadow-md w-full">
              <div className="mockup-browser-toolbar">
                <div className="input text-center">Just scroll to see all Creativity</div>
              </div>

              <div className="h-96 carousel carousel-vertical rounded-box w-full text-center ">
                <div className="carousel-item self-center " >
                  <img className='' src={props.project.img} alt={props.project.img} />
                </div>
                {props.project.gallary && props.project.gallary.map((img, key) => {
                  return (
                    <div className="carousel-item" key={key}>
                      <img src={"/src/assets/Imgs/Projects/" + img + ".png"}  alt={img + ".png"}/>
                    </div>
                  )
                })}
              </div>
            </div>}
            {/* Icons Section */}
            <div className=" flex justify-around  flex-row card-actions justify-start bg-slate-100 rounded-3xl shadow-xl  w-full">

              {props.project.badges.map((badge, key) => {
                return (
                  <div className="py-4 p-3 z-50" key={key}>
                    <img src={"/src/assets/Imgs/Skills/" + badge + ".png" } alt={badge + ".png"}  className='w-7  ' /> {props.name}
                  </div>
                )
              })}
            </div>
            {/* Title section */}
            <div className='py-12 flex justify-between w-full'>
              <h2 className='text-3xl  font-bold text-theme-tc'>{props.project.name}</h2>
              {props.project.gitUrl && <a href={props.project.gitUrl} target='_blank' className='text-md flex text-theme-lc hover:text-theme-a ' >let's see Github repo<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
              </a>}
            </div>
            {/* Description Section  */}
            <div className='w-full'>
              <ol className='w-full list-decimal text-theme-tc'>
                {props.project.des && props.project.des.map((desc, key) => {
                  return (
                    <li className='w-full'>
                      {desc.main}
                      <ul className='w-full list-disc menu  	'>
                        {desc.sub && desc.sub.map((sub, subkey) => {
                          return (
                            <li key={subkey} className='w-full whitespace-break-spaces'>
                             <a>
                               {sub}
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}
