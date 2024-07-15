import React from "react";
import Skill from "./SkillBadge";
const PersonalData = {
  name: "Mostafa M. Rawash",
  location: "name",
  Job: "FULL STACK DEVELOPER",
  summary:
    "I am actively seeking an opportunity where I can apply and enhance my knowledge, training, and skills within a respected and high-level professional organization. I am drawn to a rewarding and creative atmosphere that enables me to make a meaningful impact on the organization's success.",
  image: "/src/assets/Imgs/MyImg/MyHeadPic.png",
};
import personalImage from "/src/assets/Imgs/MyImg/MyHeadPic.png"
const CVPages = [
  "/src/assets/Imgs/CV/1.webp",
  "/src/assets/Imgs/CV/2.webp",
  "/src/assets/Imgs/CV/3.webp",
];
let Skills = [
  {
    name: "",
    icon: "scss.png",
    color: "bg-base-100",
    top: "20%",
    left: "15%"
  },
  {
    name: "Creative",
    color: "bg-base-100",
    top: "10%",
    left: "30%"
  }, {
    name: "",
    icon: "tailwind.png",
    color: "bg-base-100",
    top: "0%",
    left: "15%"
  }, {
    name: "",
    icon: "js.png",
    color: "bg-base-100",
    top: "10%",
    left: "70%"
  }, {
    name: "",
    icon: "jquery.png",
    color: "bg-base-100",
    top: "20%",
    left: "85%"
  }, {
    name: "",
    icon: "Node.js.png",
    color: "bg-base-100",
    top: "0%",
    left: "85%"
  }, {
    name: "",
    icon: "mongoDB.png",
    color: "bg-base-100",
    top: "70%",
    left: "70%"
  },
]
export default function HeroSection() {
  return (
    <div className="hero container mx-auto min-h-screen ">
      <div className="flex flex-col-reverse lg:flex-row">
        <div className="lg:flex-1 content-center" >
          <h2 className="text-2xl textleft text-theme-tc ">{PersonalData.Job}</h2>
          <h1 className="text-5xl lg:text-7xl font-bold text-theme-tc ">{PersonalData.name}</h1>
          <p className="py-6 text-lg  text-theme-tc">{PersonalData.summary}</p>
          <label
            htmlFor="CV-drawer"
            className="btn bg-theme-cc w-5/12  rounded-full text-theme-tc font-semibold text-md md:text-lg px-5 hover:bg-opacity-90  border-0 "
          >
            ❤️
            See my CV
          </label>
        </div>
        <div className="lg:flex-1 relative">
          <div className=" w-2/4   pt-0 lg:pt-10 m-auto card bg-theme-cc shadow-xl items-center my-10 lg:mb-0">
            <img src={personalImage} alt={personalImage} className="mask mask-circle   shadow-3xl  shadow-black " />

            <div className=" badge bg-theme-p w-max text-lg font-semibold p-5 relative -top-10 text-white" >Software Engineer</div>

            <div className="card-body items-center p-0 lg:pb-10">
              <h2 className="card-title text-base lg:text-2xl font-extrabold w-max">{PersonalData.name}</h2>
              <p>Egypt</p>
            </div>
          </div>
          {/* <div className="skills absolute w-full h-full top-0">
            {Skills.map((skill , key)=>{
              return(
                <Skill name={skill.name} icon={skill.icon} color={skill.color} top={skill.top} left={skill.left} />
              )
            })}
          </div> */}

        </div>

      </div>

      <div className="drawer z-50">
        <input id="CV-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label
            htmlFor="CV-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4  min-h-full bg-base-200 text-base-content w-10/12 md:w-6/12 lg:w-6/12 xl:5/12 carousel carousel-vertical rounded-box">
           <li>
              {CVPages.map((image) => {
                return (
                  <div className="carousel-item h-full">
                    <img src={image} alt={"CV-" + image} />
                  </div>
                );
              })}
              </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
