import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Popup from '../components/Popup';
import ProjectsData from '../data/projects.json';
import { Wrapper } from '../globalStyles';
import useOutsideClick from '../helpers/outsideClickPopup';

const ProjectWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 50px;
`;

const ProjectContainer = styled.div`
  flex: 25%;
  max-width: 25%;
  height: 25%;
  padding: 3rem 0.5rem;

  @media screen and (max-width: 960px) {
    flex: 50%;
    max-width: 50%;
  }

  @media screen and (max-width: 600px) {
    flex: 100%;
    max-width: 100%;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  object-fit: contain;
`;

const PopupInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #0a192f;
  margin: auto;
`;

const PopupImage = styled.img`
  width: 100%;
  max-width: 600px;
  object-fit: contain;
`;

const PopupInfo = styled.div`
  width: 100%;
  padding: 20px;
`;

const Title = styled.h1`
  margin-top: 10px;
`;

const Description = styled.p`
  margin: 20px 0;
  color: #ccd6f6;
`;

const PopupLink = styled(Link)`
  text-decoration: none;
  color: #ccd6f6;
  display: inline-block;
  margin-bottom: 20px;
`;

const TagsContainer = styled.span`
  display: flex;
  color: #8892b0;
`;

const TagContainer = styled.span`
  display: flex;
  justify-content: center;
`;

const TagIcon = styled(LocalOfferIcon)`
  margin-right: 3px;
`;

const Text = styled.span`
  margin-right: 10px;
`;

// index = pass project index
// closepopup = function handling close popup
// refFn => function "ref" for outside context click (to close)
const PopupMaker = ({index, closePopup = () => {}, refFn}) => {
  if (index !== null) {
    const project = ProjectsData[index];

    return (
      <Popup style={{ flexDirection: 'column'}} show={true} closeFn={() => closePopup()}>
        <PopupInfoContainer ref={refFn}>
          <PopupImage src={project.image} alt="" />
          <PopupInfo>
            <Title>{project.title} {` (${project.year})`}</Title>
            <Description>{project.description}</Description>
            {project.link && <PopupLink to={project.link}>
              Link to the website...
            </PopupLink>}
            <TagsContainer>
              {project.tags.map((tag, index) => (
                <TagContainer key={index}>
                  <TagIcon />
                  <Text>{tag}</Text>
                </TagContainer>
              ))}
            </TagsContainer>
          </PopupInfo>
        </PopupInfoContainer>
      </Popup>
    )
  }

  return null;
}

const Projects = () => {
  const ref = useRef();
  const [indexProject, setIndexProject] = useState(null);

  useOutsideClick(ref, () => handleClosePopup());

  const handlePopup = (index) => {
    setIndexProject(index)
  }

  const handleClosePopup = () => {
    setIndexProject(null);
  }

  return (
    <Wrapper>
      <PopupMaker
        refFn={ref}
        style={{ display: indexProject !== null ? 'block' : 'none'}}
        index={indexProject}
        closePopup={() => handleClosePopup()}
      />
      <ProjectWrapper> 
        {ProjectsData.map((project, index) => {
          return (
            <ProjectContainer key={index} onClick={() => handlePopup(index)}>
              <ProjectImage src={project.image} alt="" />
            </ProjectContainer>
          )
        })}
      </ProjectWrapper>
    </Wrapper>
  )
}

export default Projects;
