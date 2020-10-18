import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';

import Layout from '../layout/header_footer'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CreateFarm({ match }) {

  const [noti, setNotification] = useState(false)
  const [notidanger, setNotificationDanger] = useState(false)

  const [addAnotherPond, setAddAnotherPond] = useState(false);

  const [pondName, setPondName] = useState('');
  const [createdBy, setcreatedBy] = useState('');
  const [pondSize, setSize] = useState('');
  // const history = useHistory();

  const handleNewPondSubmit = event => {
    event.preventDefault();
    let newPond = {
      name: pondName,
      createdBy: createdBy,
      size: pondSize,
      farm: match.params.id
    }
    setAddAnotherPond(true);
    fetch(process.env.REACT_APP_API_URL + '/addPond/' + match.params.id, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPond)
    }).then(data => {
      if (data.status === 200) {
        setNotification(true);
      } else {
        setNotificationDanger(true)
      }
    });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotification(false);
    // history.push(`/farm/${match.params.id}`);
  };
  const handleCloseDanger = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotificationDanger(false);
  };

  const resetInput = () => {
    setPondName('')
    setcreatedBy('')
    setSize('')
  }

  const newPondButton = () => {
    return (
      <Button onClick={() => { resetInput() }}
        variant="contained"
        size="small"
        startIcon={<AddIcon />}
        style={{ backgroundColor: 'green', color: 'white' }}
      >
        Add another pond
      </Button>
    )
  }

  return (
    <Layout title='Create Pond'>
      <Snackbar open={noti} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="success">
          Pond Created
                </Alert>
      </Snackbar>
      <Snackbar open={notidanger} autoHideDuration={6000} onClose={handleCloseDanger}>
        <Alert severity="error">
          An error Has occured
                </Alert>
      </Snackbar>
      <Grid container spacing={3}>
        <Grid item xs={6}>

          <Box width={1}>
            <Link to={`/farm/${match.params.id}`}>
              <Fab variant="extended" style={{ position: 'fixed', right: 80, }} color="primary" aria-label="add">
                <ArrowBackIcon />Go back to farm
                            </Fab>
            </Link>
          </Box>

          <div style={{ width: '75%', height: 400, backgroundColor: 'grey' }}>

          </div>
        </Grid>
        <Grid item xs={6}>
          <form onSubmit={handleNewPondSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box width={1}>
                  <TextField required multiline id="newPond-name" label="Name" value={pondName} placeholder="Write the new pond name" onChange={e => setPondName(e.target.value)} />
                </Box>
                <Box width={1}>
                  <div style={{ paddingTop: 30, paddingBottom: 10 }}>
                    <label>Size</label>
                  </div>
                  <Grid container justify="space-between">
                    <Grid item xs={6} >
                      <Input required type={'number'} id="newPond-size" value={pondSize} label="Size" placeholder="Write the size in hectares" onChange={e => setSize(e.target.value)} />
                    </Grid>
                  </Grid>
                </Box>
                <Box width={1} my={4}>
                  <TextField required multiline id="newPond-createdBy" value={createdBy} label="Created By" placeholder="Write the creator's name" onChange={e => setcreatedBy(e.target.value)} />
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
                <Button onClick={() => { resetInput() }}
                  variant="contained"
                  size="small"
                  startIcon={<CancelIcon />}
                  style={{ backgroundColor: 'rgb(225 3 3)', color: 'white' }}
                >
                  Cancel
                            </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      {addAnotherPond ? newPondButton() : ''}
    </Layout>
  );
}

export default CreateFarm;
