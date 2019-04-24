import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Header from '../components/Header'
import UrlList from '../components/UrlList'
import AddWebsiteDialog from '../components/AddWebsiteDialog'

import { withStyles } from '@material-ui/core/styles'
import InfoIcon from '@material-ui/icons/ContactSupportOutlined'
import Fab from '@material-ui/core/Fab'
import CircularProgress from '@material-ui/core/CircularProgress'

import { inIFrame } from 'dcs-client'

//------------------------------------------------------------------------------

const styles = {
  list: { marginTop: '10px' },
  info: { float: 'right', marginRight: '10px' },
  body: {
    width: '100%',
    maxWidth: '1024px',
    margin: '30px auto',
    textAlign: 'center'
  }
}

//------------------------------------------------------------------------------

const InfoLink = props => (
  <Link
    to="?dcs-trigger-id=info&dcs-interact-mode=COMMENT&dcs-show-right=true&dcs-redirect=true"
    {...props}
  />
)

const InfoButton = props => (
  <Fab
    color="default"
    aria-label="Info"
    className={props.classes.info}
    size="small"
    component={InfoLink}
  >
    <InfoIcon />
  </Fab>
)

//------------------------------------------------------------------------------

class HomePage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    websites: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  }

  render() {
    const { classes, loading, websites } = this.props

    const header = inIFrame() ? '' : <Header />

    const body = loading ? (
      <CircularProgress />
    ) : (
      <React.Fragment>
        <InfoButton classes={classes} />
        <AddWebsiteDialog />
        <div className={classes.list}>
          <UrlList websites={websites} />
        </div>
      </React.Fragment>
    )

    return (
      <React.Fragment>
        {header}
        <div className={classes.body}>{body}</div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(HomePage)

//------------------------------------------------------------------------------
