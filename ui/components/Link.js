import React from 'react'
import { Link as ReactLink } from 'react-router-dom'
import MUILink from '@material-ui/core/Link'

const Link = props => (
  <MUILink
    {...props}
    component={props => <ReactLink {...props} to={props.href} />}
  />
)

export default Link
