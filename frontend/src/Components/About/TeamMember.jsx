import React from "react";
import "./TeamMember.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const TeamMember = ({ member }) => {
  const openLinkInNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="team-member">
        <div className="team-member-img-container">
            <img src={member.image} alt={member.name} className="member-photo" />
        </div>
      <h3>{member.name}</h3>
      <p className="title">{member.title}</p>
      <p className="description">{member.description}</p>
      <div className="social-links-container">
        <div className="social-links">
          <div onClick={() => openLinkInNewTab(member.github)}>
            <FontAwesomeIcon icon={faGithub} />
          </div>
          <div onClick={() => openLinkInNewTab(member.linkedin)}>
            <FontAwesomeIcon icon={faLinkedin} />
          </div>
          <div onClick={() => openLinkInNewTab(`mailto:${member.email}`)}>
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
