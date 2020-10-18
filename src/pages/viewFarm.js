import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Layout from '../layout/header_footer'
import PondCard from '../components/pondCard'

function Farm({ match }) {
  const [id, setID] = useState('');
  const [farmName, setFarmName] = useState('');
  const [createdBy, setcreatedBy] = useState('');
  const [locationLat, setlocationLat] = useState('');
  const [locationLon, setlocationLon] = useState('');
  // const [active, setActive] = useState(true);
  const [farmSize, setFarmSize] = useState(0);
  const [ponds, setPonds] = useState([])
  useEffect(() => {
    let isMounted = true;
    function getFarmData() {
      fetch(process.env.REACT_APP_API_URL + '/getPonds/' + match.params.id)
        .then(response => response.json())
        .then(data => {
          setID(data._id);
          setFarmName(data.name)
          setcreatedBy(data.createdBy)
          setlocationLat(data.locationLat)
          setlocationLon(data.locationLon)
          // setActive(data.active)
          setPonds(data.ponds)
        });
      fetch(process.env.REACT_APP_API_URL + '/farmSize/' + match.params.id)
        .then(response => response.json())
        .then(data => {
          setFarmSize(data.totalSize)
        });
    }
    if (isMounted) {
      getFarmData();
    }
    return () => { isMounted = false };
    // eslint-disable-next-line
  }, []);

  const pondCardRender = ponds.map((pond, key) => {
    return (
      <Grid key={key} item xs={3}>
        <PondCard name={pond.name} size={pond.size} created={pond.createdAt} shrimp={pond.shrimpLastTimeFeed} id={pond._id} />
      </Grid>
    )
  })

  return (
    <Layout title={farmName + ' Shrimp Farm'}>
      <Grid container spacing={5}>
        <Grid item xs={4} style={{ margin: 'auto' }}>
          <div style={{ width: 200, height: 200, backgroundColor: 'grey', borderRadius: 300, backgroundImage: 'url(https://www.aquaculturealliance.org/wp-content/uploads/2011/07/ROTTMANpic1.jpg)' }}>

          </div>
        </Grid>
        <Grid item xs={8}>
          <div style={{ height: 'auto', backgroundColor: '#ebebeb', padding: 60 }}>
            <Box width={1}>
              <span style={{ fontWeight: 700 }}>Farm Name:</span> {farmName}
            </Box>
            <Box width={1}>
              <span style={{ fontWeight: 700 }}>Created By:</span> {createdBy}
            </Box>
            <Box width={1}>
              <span style={{ fontWeight: 700 }}>Latitude:</span>  {locationLat}
            </Box>
            <Box width={1}>
              <span style={{ fontWeight: 700 }}>Longitude:</span> {locationLon}
            </Box>
            <Box width={1}>
              <span style={{ fontWeight: 700 }}>Total size:</span> {farmSize} ha
                        </Box>
            <Box width={1}>
              <Link to={`/editFarm/${match.params.id}`} style={{ textDecoration: 'none' }}>
                <Button size="medium" color="primary">
                  Edit Farm
                                </Button>
              </Link>
            </Box>
          </div>
        </Grid>
      </Grid>

      <div style={{ paddingTop: '50px', }}>
        <h1>
          Ponds
            </h1>

        <Grid container spacing={3}>
          {pondCardRender}
        </Grid>
      </div>

      <Link to={`/createPond/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <Fab variant="extended" style={{ position: 'fixed', right: 20, }} color="primary" aria-label="add">
          <AddIcon />
                    Add new Pond
                </Fab>
      </Link>
    </Layout>
  );
}

export default Farm;
