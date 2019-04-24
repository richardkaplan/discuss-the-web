import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/CheckCircleOutlined'
import WarningIcon from '@material-ui/icons/Error'
import Tooltip from '@material-ui/core/Tooltip'
import Badge from '@material-ui/core/Badge'

import { withCounts } from 'dcs-react-router-sync'

//------------------------------------------------------------------------------

const text =
  `This url won't display correctly unless you disable your browser ` +
  `anti-iframe protection. Click the "?" button on the right ` +
  `to know more.`

//------------------------------------------------------------------------------

const Line = props => {
  const { path, website, counts, selected } = props

  const link = props => <Link to={path} {...props} />
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
    <ListItem button component={link} selected={selected}>
      {icon}
      <Badge color="primary" badgeContent={count} invisible={!count}>
        <ListItemText primary={website.url} />
      </Badge>
    </ListItem>
  )
}

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
