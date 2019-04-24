import React from 'react'

import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

//------------------------------------------------------------------------------

const styles = {
  body: {
    width: '100%',
    maxWidth: '1024px',
    margin: '30px auto',
    textAlign: 'center'
  },
  text: {}
}

//------------------------------------------------------------------------------

class NotFound extends React.Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.body}>
        <Typography variant="h4" color="inherit" className={classes.text}>
          Page Not Found
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(NotFound)

//------------------------------------------------------------------------------
