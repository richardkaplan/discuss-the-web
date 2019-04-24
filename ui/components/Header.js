import React from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

//------------------------------------------------------------------------------

/*
To turn the appbar to white:

import { withStyles } from '@material-ui/core/styles'

const styles = {
  barColor: { backgroundColor: 'white' }
}

<AppBar position="static" color="default" classes={{ colorDefault: props.classes.barColor }}>

export default withStyles(styles)(Header)
*/

//------------------------------------------------------------------------------

const Header = props => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Link to={'/'}>
        <img src="/logo.png" alt="Logo" height="40" />
      </Link>
    </Toolbar>
  </AppBar>
)

export default Header

//------------------------------------------------------------------------------
