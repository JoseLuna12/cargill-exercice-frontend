import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom'

import '../App.css';

function headerFooter(props) {
  return (
    <div className="App">
      <header className="App-header">
        <AppBar position="static" style={{ background: '#4CAF50', height:'60px' }}>
          <Toolbar variant="regular" >
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Link to={`/`} style={{ textDecoration: 'none', color:'white' }}>
            <HomeIcon  />
            </Link>
          </IconButton>
            <Typography variant="h6" align="center" style={{flexGrow: 1,textAlign: 'center',}} color="inherit">{props.title}</Typography>
          </Toolbar>
        </AppBar>
        <div style={{paddingTop: 30, paddingLeft:50, paddingRight:50}}>
        {props.children}
        </div>
      </header>
    </div>
  );
}

export default headerFooter;