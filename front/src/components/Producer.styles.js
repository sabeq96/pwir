import styled, { css, keyframes } from 'styled-components';

export const ProductRow = styled.div`
  padding: 15px 0;
`;

export const Loader = styled.div`
  height: 10px;
  width: 120px;
  margin-top: 5px;
  border: 1px solid black;
`;

const progress = keyframes`
  from {
    width: 0px;
  } to {
    background: green;
    width: 120px;
  }
`;

export const ProgressBar = styled.div`
  height: 10px;
  width: 120px;
  background: red;

  ${(props) => props.isProducing && css`
    animation: ${progress} ${props.time}ms linear;
  `}
`;