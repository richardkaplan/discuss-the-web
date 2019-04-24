import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header'

import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import { inIFrame } from 'dcs-client'

//------------------------------------------------------------------------------

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  body: {
    width: '100%',
    maxWidth: '1024px',
    margin: '30px auto',
    textAlign: 'center'
  },
  iframe: {
    flex: '1 0 0',
    border: 'none'
  }
}

//------------------------------------------------------------------------------

class WebsitePage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    website: PropTypes.object,
    loading: PropTypes.bool.isRequired
  }

  render() {
    const { classes, website, loading } = this.props

    const header = inIFrame() ? '' : <Header />

    const body = loading ? (
      <div className={classes.body}>
        <CircularProgress />
      </div>
    ) : (
      <iframe src={website.url} className={classes.iframe} />
    )

    return (
      <div className={classes.container}>
        {header}
        {body}
      </div>
    )
  }
}

export default withStyles(styles)(WebsitePage)

//------------------------------------------------------------------------------
