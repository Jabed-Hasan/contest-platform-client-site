
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const  DetailsCard = ({ item }) => {
    const { name, image, price, details, attemptCount,_id } = item;
    return (
        <div className="space-x-2">
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={image}
                        alt="Contest image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {details}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button component={Link} to={`/details/${_id}`} size="small" color="primary">
                        Details
                    </Button>
                    <Button size="small" color="primary" style={{ backgroundColor: 'skyblue' }}>
                        Participants: {attemptCount}
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default  DetailsCard;