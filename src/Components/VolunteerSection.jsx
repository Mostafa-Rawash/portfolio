import React from "react";

let VolunteerList = [
  {
    startDate: "2021",
    endDate: "2023",
    comName: "ensoulify",
    title: "Software Engineer",
    responsibility: (
      <ul>
        <li>
          • Working part of a team and collaborating with business units
          stakeholders, and technical teams to achieve the project goals.
        </li>
        <li>
          • Using many techs. to customizing, enhancing, and integrating ERPNEXT
          application.
        </li>
      </ul>
    ),
    workedWith: [
      "Frappe",
      "Python",
      "JS",
      "Jinja",
      "SCSS",
      "Tailwind",
      "Flask",
      "MongoDB",
      "Docker",
      "GIT",
    ],
  },
  {
    startDate: "2020",
    endDate: "2021",
    title: "Full stack developer",
    responsibility: (
      <ul>
        <li>
          • Create WordPress Themes and Plugins using MySQL and pure PHP code.
        </li>
        <li>• Assess and troubleshoot site performance and SEO.</li>
      </ul>
    ),
    comName: "BMA – Brand Maker Agency",
    workedWith: ["wordpress", "Elementor", "PHP", "HTML", "CSS", "SCSS"],
  },
];
export default function VolunteerSection() {
  return (
    <div id="Work" className="container mx-auto ">
      <h2 className="text-5xl lg:text-7xl pt-36 w-fit ">Volunteer Experiences</h2>

      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        {VolunteerList.map((work, key) => {
          return (
            <li key={key} className=" p-4 ">
              <div className="timeline-middle ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div
                className={
                  (key % 2
                    ? "timeline-start md:text-end mb-10 "
                    : "timeline-end mb-10") +
                  " p-6 rounded-3xl bg-base-100 shadow-xl bg-theme-cc"
                }
              >
                <div className="font-mono italic">
                  {work.startDate + " - " + work.endDate}
                </div>
                <h2 className="text-2xl font-black text-left ">
                  {work.comName + " - " + work.title}
                </h2>
                {work.responsibility}
                {work.workedWith &&
                  work.workedWith.map((skill, key) => {
                    return (
                      <img
                        src={"/src/assets/Imgs/Skills/" + skill + ".png"}
                        alt={skill + ".png"}
                        className="h-7 inline m-3"
                      />
                    );
                  })}
              </div>
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
}