import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function PondCard({ name, size, created, shrimp, id }) {

  const classes = useStyles();
  let createdDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(created));

  let shrimpDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date(shrimp))

  const [shrimpDateState, setShrimp] = useState(shrimpDate.toString())


  const feedPond = id => {
    fetch(process.env.REACT_APP_API_URL + '/feedPond/' + id)
      .then(response => response.json())
      .then(data => {
        let newDate = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
          hour: 'numeric',
          minute: 'numeric'
        }).format(new Date(data.date))
        setShrimp(newDate.toString())
      });
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h3" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Size: {size} ha
                </Typography>
        <Typography variant="body2" component="p">
          <span style={{ fontWeight: 900 }}>Created at:</span> {createdDate} <br></br>
          <span style={{ fontWeight: 900 }}>Shrimp fed at:</span> {shrimpDateState}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => { feedPond(id) }} >Feed shrimps</Button>
        <Link to={`/editPond/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <Button size="small" color="primary">Edit</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default PondCard;