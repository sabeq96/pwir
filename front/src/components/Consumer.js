import React from 'react';
import PropTypes from 'prop-types';

import {
  SiteWrapper,
  PageTitle,
  ProductWrapper,
  ProductRow,
  ChooseAgain,
} from './Global.styles';

import {
  ButtonWrapper,
} from './Consumer.styles';

const Consumer = ({
  productList,
  onCancelProduct,
  onOrderProduct,
  onSetRole,
}) => (
  <SiteWrapper>
    <PageTitle>So, you are Consumer !</PageTitle>
    <ProductWrapper>
      {
        productList.map((product) => (
          <ProductRow key={product.name}>
            <div>Product name: {product.name}</div>
            <div>Ordered: {product.lobby}</div>
            <ButtonWrapper>
              {
                product.lobby > 0 ? (
                  <button onClick={() => { onCancelProduct(product.name) }}>-</button>
                ) : null
              }
              <button onClick={() => { onOrderProduct(product.name) }}>+</button>
            </ButtonWrapper>
            <div>Owned: {product.owned}</div>
          </ProductRow>
        ))
      }
    </ProductWrapper>
    <ChooseAgain onClick={() => onSetRole()}> Choose role again </ChooseAgain>
  </SiteWrapper>
  )

Consumer.propTypes = {
  productList: PropTypes.array.isRequired,
  onCancelProduct: PropTypes.func.isRequired,
  onOrderProduct: PropTypes.func.isRequired,
  onSetRole: PropTypes.func.isRequired,
}

export default Consumer;