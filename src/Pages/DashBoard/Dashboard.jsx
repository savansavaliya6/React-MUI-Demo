// import * as React from{useState} 'react';
// import * as React from { useEffect, useMemo, useState } ;
import React, { useEffect, useMemo, useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import AdbIcon from '@mui/icons-material/Adb';
import Menu from '@mui/material/Menu';
import { MenuItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Pizza from "../../assets/pizza.png";
import Meal from "../../assets/meal.png";
import "./Dashbord.css"
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Messageservice from "../Layout/Messageservice";
import { useLocation } from "react-router-dom";
// import "./styles.css";
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);




export default function Dashboard() {
    const [expanded, setExpanded] = React.useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isFavorite1, setIsFavorite1] = useState(false);
    const [isFavorite2, setIsFavorite2] = useState(false);
    const [dashbordData, setDashbordData] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const { state } = useLocation();

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };
    const iconColorStyle = {
        color: isFavorite ? 'red' : 'grey',
    };
    const handleFavoriteClick1 = () => {
        setIsFavorite1(!isFavorite1);
    };
    const iconColorStyle1 = {
        color: isFavorite1 ? 'red' : 'grey',
    };
    const handleFavoriteClick2 = () => {
        setIsFavorite2(!isFavorite2);
    };
    const iconColorStyle2 = {
        color: isFavorite2 ? 'red' : 'grey',
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian';
    // 'https://www.themealdb.com/api/json/v1/1/categories.php';
    useEffect(() => {
        getDashboard();
    }, []);

    //get request api call

    const getDashboard = () => {
        setLoading(true)
        axios.get(url)
            .then((response) => {
                setDashbordData(response.data.meals);
             
                setLoading(false)

            })
            .catch(error => { console.log('api call fail ') });

    }


    return (
        // <Box sx={{ display: 'flex' }}>
        <>
            <CssBaseline />
            {state?.message && (
                <Messageservice
                    message={state?.message}
                    severity={state?.severity}
                />
            )}

            <Grid container justifyContent="space-evenly" alignItems="stretch" spacing={5} style={{ marginTop: "5%" }} className="cardContainer">
                {loading && <CircularProgress style={{ margin: 'auto', opacity: '1' }} />}
                {dashbordData.map((item, index) => (
                    <Card sx={{ maxWidth: 345 }} className="card">
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    S
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={item.strMeal}
                            subheader="September 14, 2016"
                        />
                        <CardMedia
                            component="img"
                            height="150"
                            className="cardImage"
                            image={item.strMealThumb}
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                occasionally until lightly browned, 6 to 8 minutes.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing >
                            <IconButton aria-label="add to favorites" onClick={handleFavoriteClick}
                                style={iconColorStyle} >
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>

                    
                    </Card>
                ))}

            </Grid>
        </>
    );
}

