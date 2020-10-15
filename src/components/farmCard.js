import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function FarmCard({ name, size, id }) {
    const [farmSize, setFarmSize] = useState(0);
    fetch('http://localhost:8000/api/farmSize/' + id)
                .then(response => response.json())
                .then(data => {
                    setFarmSize(data.totalSize)
                });
    return (
        <Card style={{ maxWidth: 345 }}>
            <CardActionArea>
                <Link to={`/farm/${id}`} style={{ textDecoration: 'none', color:'black' }}>
                    <CardMedia
                        style={{ height: 140, }}
                        image="https://www.aquaculturealliance.org/wp-content/uploads/2011/07/ROTTMANpic1.jpg"
                        title={name}
                    />
                
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Size: {farmSize} ha
            </Typography>
                </CardContent>
                </Link>
            </CardActionArea>
            <CardActions>
                <Link to={`/editFarm/${id}`} style={{ textDecoration: 'none' }}>
                    <Button size="small" color="primary">
                        Edit Farm
                    </Button>
                </Link>
            </CardActions>
        </Card>

    );
}

export default FarmCard;
