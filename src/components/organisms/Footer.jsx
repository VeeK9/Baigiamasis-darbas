import styled from "styled-components";
import ListItem from "../UI/ListItem";

const StyledFooter = styled.footer`
  height: 200px;
  width: 100%;
  background-color: #f3f3f3;
  position: relative;
  bottom: -200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  > ul {
    list-style-type: none;
    display: flex;
    gap: 10px;
    > li {
      font-size: 1.5rem;
      a {
        color: black;
      }
    }
  }
`

const Footer = () => {

  const socials = [{
    url: "https://www.strava.com",
    icon: ['bi', ' bi-strava']
  },{
    url: "https://www.facebook.com",
    icon: ['bi', ' bi-facebook']
  },{
    url: "https://www.instagram.com",
    icon: ['bi', ' bi-instagram']
  },{
    url: "https://www.twitter.com",
    icon: ['bi', ' bi-twitter-x']
  },{
    url: "https://www.youtube.com",
    icon: ['bi', ' bi-youtube']
  }];

  return (
    <StyledFooter>
      <ul>
        {
          socials.map((social, idx) => 
            <ListItem 
              key={idx}
              social={social}
            />
          )
        }
      </ul>
      <p>Copyright © 2024 Stride Buddies. All rights reserved. Violators will be prosecuted.</p>
    </StyledFooter>
  );
}
 
export default Footer;