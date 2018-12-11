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
  LobbyWaiter,
  Queue,
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
        productList.map((product, key) => (
          <React.Fragment key={key}>
            <ProductRow key={product.name}>
              <div>Product name: {product.name}</div>
              <div>In stock: {product.qt_total}</div>
              <div>Ordered: {product.lobby}</div>
              <div>All waiters: {product.lobby_total.length}</div>
              <ButtonWrapper>
                <button
                  onClick={() => { onCancelProduct(product.name) }}
                  disabled={product.lobby < 0}
                >
                  -
                </button>
                <button
                  onClick={() => { onOrderProduct(product.name) }}
                  disabled={product.lobby > 6}
                >
                  +
                </button>
              </ButtonWrapper>
              <div>Owned: {product.owned}</div>
            </ProductRow>
            <Queue>
              {product.lobby_total.map((iAm, key) => <LobbyWaiter iAm={iAm} key={key}/>)}
            </Queue>
          </React.Fragment>
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