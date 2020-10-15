import React from 'react';
import logo from '../logo.svg';

import Layout from '../layout/header_footer'

function Test({match}) {
  return (
    <Layout>
      <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is a test {match.params.id}
        </p>
    </Layout>
  );
}

export default Test;
