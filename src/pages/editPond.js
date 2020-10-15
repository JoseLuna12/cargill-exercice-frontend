import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Layout from '../layout/header_footer'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function EditPond({ match }) {

    const [noti, setNotification] = useState(false)
    const [notidanger, setNotificationDanger] = useState(false)

    const [farmId, setFarmId] = useState('');
    const [pondName, setPondName] = useState('');
    const [createdBy, setcreatedBy] = useState('');
    const [pondSize, setSize] = useState('');
    const [active, setActive] = useState(true)
    const history = useHistory();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    useEffect(() => {
        let isMounted = true;
        function getPondData() {
            fetch('http://localhost:8000/api/getPond/' + match.params.id)
                .then(response => response.json())
                .then(data => {
                    setPondName(data.name)
                    setcreatedBy(data.createdBy)
                    setActive(data.active)
                    setSize(data.size)
                    setFarmId(data.farm)
                });
        }
        if (isMounted) {
            getPondData();
        }
        return () => { isMounted = false };
        // eslint-disable-next-line
    }, [])

    const handleNewPondSubmit = event => {
        event.preventDefault();
        let editPond = {
            name: pondName,
            size: pondSize,
            active
        }
        fetch('http://localhost:8000/api/updatePond/' + match.params.id, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editPond)
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
        history.push(`/farm/${farmId}`);
    };
    const handleCloseDanger = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotificationDanger(false);
    };

    const deletePond = (id) => {
        fetch('http://localhost:8000/api/deletePond/' + id, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: ''
        }).then(data => {
            if (data.status === 200) {
                history.push(`/farm/${farmId}`);
            } else {
                setNotificationDanger(true)
            }
        }).catch((e) => {
            console.log(e)
            setNotificationDanger(true)
        });
    }

    return (
        <Layout title='Edit Pond '>
            <div>
                <Dialog
                    open={open}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this Pond?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            once you erase it you wont be able to undo this
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={() => { deletePond(match.params.id) }} color="secondary" autoFocus>
                            Delete
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Snackbar open={noti} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity="success">
                    Pond Updated
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
                                    <TextField required multiline id="newPond-name" value={pondName} label="Name" placeholder="Write the new pond name" onChange={e => setPondName(e.target.value)} />
                                </Box>
                                <Box width={1}>
                                    <div style={{ paddingTop: 30, paddingBottom: 10 }}>
                                        <label>Size</label>
                                    </div>
                                    <Grid container justify="space-between">
                                        <Grid item xs={6} >
                                            <TextField required type={'number'} id="newPond-size" value={pondSize} label="Size" placeholder="Write the size in hectares" onChange={e => setSize(e.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box width={1} my={4}>
                                    <TextField required multiline id="newPond-createdBy" value={createdBy} label="Created By" disabled placeholder="Write the creator's name" onChange={e => setcreatedBy(e.target.value)} />
                                </Box>
                                <Grid item xs={12}>
                                    <label> Active </label>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                style={{ color: 'green' }}
                                                checked={active}
                                                onChange={e => setActive(e.target.checked)}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                            />
                                        }
                                        label="Active"
                                    />

                                </Grid>
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
                                    onClick={() => { handleClickOpen() }}
                                    variant="contained"
                                    size="small"
                                    startIcon={<DeleteIcon />}
                                    style={{ backgroundColor: 'rgb(225 3 3)', color: 'white' }}
                                >
                                    Delete
                            </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default EditPond;
