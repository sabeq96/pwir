import styled, { css, keyframes } from 'styled-components';

const ProductRow = styled.div`
  padding: 15px 0;
`;

const Loader = styled.div`
  display: flex;
  height: 15px;
  width: 150px;
  margin-top: 5px;
  border: 1px solid black;
`;

const progress = keyframes`
  from {
    width: 0%;
  } to {
    background: green;
    width: 100%;
  }
`;

const ProgressBar = styled.div`
  min-height: 100%;
  width: 100%;
  background: red;

  ${(props) => props.isProducing && css`
    animation: ${progress} ${props.time}ms linear;
  `}
`;

export {
  ProductRow,
  Loader,
  ProgressBar,
};