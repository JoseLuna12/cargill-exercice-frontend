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

function CreateFarm({match}) {

    const [noti, setNotification] = useState(false)
    const [notidanger, setNotificationDanger] = useState(false)

    const [pondName, setPondName] = useState('');
    const [createdBy, setcreatedBy] = useState('');
    const [pondSize, setSize] = useState('');
    const history = useHistory();

    const handleNewPondSubmit = event => {
        event.preventDefault();
        let newPond = {
            name: pondName,
            createdBy: createdBy,
            size: pondSize,
            farm: match.params.id
        }
        fetch('http://localhost:8000/api/addPond/'+ match.params.id, {
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
        history.push(`/farm/${match.params.id}`);
    };
    const handleCloseDanger = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotificationDanger(false);
    };

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
                    <div style={{ width: '75%', height: 400, backgroundColor: 'grey' }}>

                    </div>
                </Grid>
                <Grid item xs={6}>
                    <form onSubmit={handleNewPondSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Box width={1}>
                                    <TextField required multiline id="newPond-name" label="Name" placeholder="Write the new pond name" onChange={e => setPondName(e.target.value)} />
                                </Box>
                                <Box width={1}>
                                    <div style={{ paddingTop: 30, paddingBottom: 10 }}>
                                        <label>Size</label>
                                    </div>
                                    <Grid container justify="space-between">
                                        <Grid item xs={6} >
                                            <TextField required type={'number'} id="newPond-size" label="Size" placeholder="Write the size in hectares" onChange={e => setSize(e.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box width={1} my={4}>
                                    <TextField required multiline id="newPond-createdBy" label="Created By" placeholder="Write the creator's name" onChange={e => setcreatedBy(e.target.value)} />
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
