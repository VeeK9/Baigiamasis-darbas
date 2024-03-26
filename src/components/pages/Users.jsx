import { useContext } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";
import SmallUser from "../organisms/SmallUser";

const StyledSection = styled.section`
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  > * {
    max-width: 950px;
  }
  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }
`

const Users = () => {

  const {users} = useContext(UsersContext);

  return (
    <StyledSection>
      <h1>All users</h1>
      <div>
        {
          users ?
          users.map(user =>
            <SmallUser 
              key={user.id}
              user={user}
            />
          )
          : null
        }
      </div>
    </StyledSection>
  );
}
 
export default Users;