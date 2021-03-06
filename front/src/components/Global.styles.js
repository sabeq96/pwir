import styled, { css, keyframes } from 'styled-components';

const SiteWrapper = styled.div`
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const PageTitle = styled.div`
  padding: 0 0 30px 0;
  font-size: 30px;
  text-align: center;
`;

const ProductWrapper = styled.div`
  margin-top: 20px;
`;

const ProductRow = styled.div`
  padding: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ChooseAgain = styled.div`
  width: 200px;
  margin-top: 30px;
  padding: 8px;
  border: 1px solid black;
  text-align: center;

  &:hover {
    background: #F00;
  }
`;

const RoleWrapper = styled.div`
  width: 300px;
  margin: 0 auto;
`;

const SingleRoleWrapper = styled.div`
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;

  &:before {
    content: '- ';
  }

  &:hover {
    background: red;
  }
`;

const loaderAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${loaderAnimation} 2s linear infinite;
`;

export {
  SiteWrapper,
  PageTitle,
  ProductWrapper,
  ProductRow,
  ChooseAgain,
  RoleWrapper,
  SingleRoleWrapper,
  Loader,
};