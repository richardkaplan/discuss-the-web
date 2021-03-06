import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/CheckCircleOutlined'
import WarningIcon from '@material-ui/icons/Error'
import DeleteIcon from '@material-ui/icons/DeleteOutlined' // Close
import Tooltip from '@material-ui/core/Tooltip'
import Badge from '@material-ui/core/Badge'

import { withCounts } from 'dcs-react-router-sync'
import Link from './Link'

import { Websites } from '../../collections/Websites'

//------------------------------------------------------------------------------

const text =
  `This url won't display correctly, unless you disable your browser ` +
  `anti-iframe protection. Click the "?" button on the right ` +
  `to know more.`

//------------------------------------------------------------------------------

// See https://codesandbox.io/s/xo0mmyv2oo
const styles = {
  iconButton: {
    visibility: 'hidden',
    '&:hover': {
      visibility: 'inherit'
    }
  },
  listItemSecondaryAction: {
    '&:hover > $iconButton': {
      visibility: 'inherit'
    }
  }
  /*
  listItem: {
    '&:hover > $listItemSecondaryAction': {
      visibility: 'inherit'
    }
  }
  */
}

//------------------------------------------------------------------------------

const Line = withStyles(styles)(props => {
  const { path, website, counts, selected, classes } = props

  const icon = website.iframeIssue ? (
    <Tooltip title={text} placement="left-start">
      <ListItemIcon>
        <WarningIcon />
      </ListItemIcon>
    </Tooltip>
  ) : (
    <ListItemIcon>
      <CheckIcon />
    </ListItemIcon>
  )
  const count = counts && counts.length && counts[0].count

  return (
    <ListItem selected={selected} className={classes.listItem}>
      {icon}
      <Badge color="primary" badgeContent={count} invisible={!count}>
        <Link href={path}>
          <ListItemText primary={website.url} />
        </Link>
      </Badge>
      <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
        <IconButton
          aria-label="Delete"
          onClick={() => Websites.delete.call({ _id: website._id })}
          className={classes.iconButton}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
})

//------------------------------------------------------------------------------

export default class UrlList extends React.Component {
  static propTypes = {
    websites: PropTypes.array.isRequired
  }

  render() {
    const { websites } = this.props

    const list = websites.map((website, index) => {
      const pathname = `/website/${website._id}`
      const path = pathname + '?dcs-interact-mode=DISCUSS&dcs-show-right=true'
      const LineWithCounts = withCounts(Line, pathname)
      const selected =
        index === 0 && new Date() - new Date(website.createdAt) < 1000
      return (
        <LineWithCounts
          key={website._id}
          path={path}
          website={website}
          selected={selected}
        />
      )
    })

    return <List component="nav">{list}</List>
  }
}

//------------------------------------------------------------------------------
