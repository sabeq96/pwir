import styled, { css } from 'styled-components';

const ButtonWrapper = styled.div`
  display: flex;
  width: 90px;
  justify-content: space-between;
`;

const LobbyWaiter = styled.div`
  width: 30px;
  height: 30px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: gray;

  ${(props) => props.iAm && css`
    background: red;
  `}

`;

const Queue = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export {
  ButtonWrapper,
  LobbyWaiter,
  Queue,
};