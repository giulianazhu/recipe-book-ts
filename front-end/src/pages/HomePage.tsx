import styled, { keyframes } from "styled-components";
import { FlexBox } from "../styles/BaseStyledComponents/FlexBox";
import { NavLink } from "react-router-dom";

const gradient = keyframes` 
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

const pulse = keyframes`
  0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.05);
	}
	100% {
		transform: scale(1);
	}
`;

const Landing = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.8)
    ),
    url("lily-banse--YHSwy6uqvk-unsplash.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  animation: ${gradient} 70s linear alternate infinite;
  text-align: center;
`;

const Content = styled(FlexBox)`
  height: 50%;
  flex-direction: column;
  align-items: center;
  gap: 3em;
`;

const Title = styled.h1`
  color: var(--color-brown-200);
`;

const Description = styled.span`
  color: var(--color-brown-400);
`;

const HomeButton = styled(NavLink)`
  font-size: 1.7rem;
  padding: 0.8em 2.5em;
  border: 1px solid var(--color-brown-100);
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  color: var(--color-brown-200);
  animation: ${pulse} 2.5s ease-in-out infinite;
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    animation: none;
  }
`;

export interface HomePageProps {}

export default function HomePage() {
  return (
    <Landing>
      <Content>
        <FlexBox $direction="column" $items="center">
          <Title>Recipe Book</Title>
          <Description>
            Discover Recipes Around The World And Enjoy the Journey
          </Description>
        </FlexBox>
        <HomeButton to="/search">Explore</HomeButton>
      </Content>
    </Landing>
  );
}
