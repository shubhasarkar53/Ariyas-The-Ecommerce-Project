import React from "react";
import TeamMember from "./TeamMember";
import "./TeamSection.scss";

const teamMembers = [
  {
    name: "Snehargha Saha",
    title: "Planning & Documentation Expert",
    description:
      "Experienced in planning and documentation, ensuring smooth project workflows.",
    image: "https://res.cloudinary.com/dd3sjaumq/image/upload/v1717006816/contributors/oq56obl8_pz6er9.png",
    github: "#",
    linkedin: "https://www.linkedin.com/in/snehargha-saha-9781a5215/",
    email: "sneharghasaha@gmail.com",
  },
  {
    name: "Subhra Sundar Sinha",
    title: "UI/UX Designer & Full stack Developer.",
    description:
      "Expertise in Full stack development to create seamless user experiences.",
    image: "https://res.cloudinary.com/dd3sjaumq/image/upload/v1717006817/contributors/ifkg4y7h_qvvnne.png",
    github: "https://github.com/PavilionRYZ",
    linkedin: "https://www.linkedin.com/in/subhra-sundar-sinha-779538181/",
    email: "subhrasundarsinha21@gmail.com",
  },
  {
    name: "Shubha Sarkar",
    title: "Full Stack Web Developer & Team Lead ",
    description:
      "Leads the team, specializing in both frontend and backend development, planning as well.",
    image: "https://res.cloudinary.com/dd3sjaumq/image/upload/v1717007316/contributors/shubha_silntv.png",
    github: "https://github.com/shubhasarkar53",
    linkedin: "https://www.linkedin.com/in/shubha-sarkar-862588213/",
    email: "sarkarshubha123@gmail.com",
  },
  {
    name: "Sayan Kumar Modak",
    title: "Frontend Designer",
    description:
      "Expert in creating intuitive and responsive user interfaces.",
    image: "https://via.placeholder.com/150",
    github: "#",
    linkedin: "#",
    email: "#",
  },
  {
    name: "Rajesh Mudi",
    title: "Research Specialist",
    description:
      "Specializes in conducting in-depth research into the specific domain.",
    image: "https://res.cloudinary.com/dd3sjaumq/image/upload/v1717005853/contributors/rajesh_o4ynki.webp",
    github: "https://github.com/mudirajesh",
    linkedin: "https://www.linkedin.com/in/rajesh-mudi-29sep2008/",
    email: "rmudi24@gmail.com",
  },
];

const TeamSection = () => {
  return (
    <>
      <section className="team-section-container">
        <section className="team-section">
          <div className="team-header">
            <div className="team-header-img-container">
            <img
              src="https://res.cloudinary.com/dd3sjaumq/image/upload/v1717008143/contributors/teamImg_vcgtbx.jpg"
              alt="Team"
              className="team-photo"
            />
            </div>
            
            <h2>Say Hello to Our Awesome <span className="pentagon">Pentagon</span></h2>
            <p>
              Our team comprises diverse individuals with distinct skills and
              strengths, including creative thinkers and analytical problem
              solvers.
            </p>
          </div>
          <div className="team-members">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>
        </section>
      </section>
    </>
  );
};

export default TeamSection;
