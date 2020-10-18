import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

import Layout from '../layout/header_footer'
import Farm from '../components/farmCard'
function Home() {
  const [apiFarms, getFarms] = useState([])

  useEffect(() => {
    let isMounted = true;
    function getFarmData() {
      fetch(process.env.REACT_APP_API_URL + '/getFarms')
        .then(response => response.json())
        .then(data => {
          getFarms(data)
        });
    }
    if (isMounted) {
      getFarmData();
    }
    return () => { isMounted = false };
    // eslint-disable-next-line
  }, [])

  const farms = apiFarms.map((f, key) => {
    return (
      <Grid key={key} item xs={3}>
        <Farm name={f.name} size={f.totalSize} id={f._id} />
      </Grid>
    )
  });

  return (
    <Layout title="Cargill shrimp farm">
      <Grid container spacing={3}>
        {farms}
      </Grid>
      <Grid container spacing={1}>
        <Grid item xl={12}>
          <Link to={`/createFarm`} style={{ textDecoration: 'none', color: 'black' }}>
            <Fab variant="extended" style={{ position: 'fixed', right: 20, }} color="primary" aria-label="add">
              <AddIcon />
              Add new Farm
            </Fab>
          </Link>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Home;
