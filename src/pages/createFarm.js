import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Layout from '../layout/header_footer'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CreateFarm() {

  const [noti, setNotification] = useState(false);
  const [notidanger, setNotificationDanger] = useState(false);
  const [notiAlreadyExists, setAlreadyExists] = useState(false);

  const [farmName, setFarmName] = useState('');
  const [createdBy, setcreatedBy] = useState('');
  const [locationLat, setlocationLat] = useState('');
  const [locationLon, setlocationLon] = useState('');
  const history = useHistory();

  const handleNewFarmSubmit = event => {
    event.preventDefault();
    let newFarm = {
      name: farmName,
      createdBy: createdBy,
      locationLat: locationLat,
      locationLon: locationLon,
    }
    fetch(process.env.REACT_APP_API_URL + '/addFarm', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFarm)
    }).then(data => {
      if (data.status === 200) {
        setNotification(true);
      } else if (data.status === 409) {
        setAlreadyExists(true)
      }
      else {
        setNotificationDanger(true)
      }
    });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotification(false);
    history.push(`/`);
  };
  const handleCloseDanger = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotificationDanger(false);
  };

  const handleCloseAlreadyExists = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlreadyExists(false)
  }


  return (
    <Layout title='Create Shrimp Farm'>
      <Snackbar open={noti} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="success">
          Farm Created
                </Alert>
      </Snackbar>
      <Snackbar open={notidanger} autoHideDuration={6000} onClose={handleCloseDanger}>
        <Alert severity="error">
          An error Has occured
                </Alert>
      </Snackbar>
      <Snackbar open={notiAlreadyExists} autoHideDuration={6000} onClose={handleCloseAlreadyExists}>
        <Alert severity="error">
          Farm name already exists
                </Alert>
      </Snackbar>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div style={{ width: '75%', height: 400, backgroundColor: 'grey' }}>

          </div>
        </Grid>
        <Grid item xs={6}>
          <form onSubmit={handleNewFarmSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box width={1}>
                  <TextField required multiline id="newFarm-name" label="Name" placeholder="Write the new farm name" onChange={e => setFarmName(e.target.value)} />
                </Box>
                <Box width={1}>
                  <div style={{ paddingTop: 30, paddingBottom: 10 }}>
                    <label>Location</label>
                  </div>
                  <Grid container justify="space-between">
                    <Grid item xs={6} >
                      <TextField required id="newFarm-latitude" label="Latitude" placeholder="Write the new farm Latitude" onChange={e => setlocationLat(e.target.value)} />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField required id="newFarm-longitude" label="Longitude" placeholder="Write the new farm Longitude" onChange={e => setlocationLon(e.target.value)} />
                    </Grid>
                  </Grid>
                </Box>
                <Box width={1} my={4}>
                  <TextField required multiline id="newFarm-createdBy" label="Created By" placeholder="Write the creator's name" onChange={e => setcreatedBy(e.target.value)} />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={5}>
              <Grid item xs={2}>
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  startIcon={<SaveIcon />}
                  style={{ backgroundColor: '#4caf50', color: 'white' }}
                >
                  Save
                            </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<SaveIcon />}
                  style={{ backgroundColor: 'rgb(225 3 3)', color: 'white' }}
                >
                  Cancel
                            </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default CreateFarm;
