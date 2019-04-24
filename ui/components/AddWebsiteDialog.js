import React from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import CircularProgress from '@material-ui/core/CircularProgress'

import { Websites } from '../../collections/Websites'

export default class AddWebsiteDialog extends React.Component {
  initialState = {
    open: false,
    error: null,
    url: '',
    loading: false
  }

  state = this.initialState

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleCancel = () => {
    this.setState(this.initialState)
  }

  handleAdd = () => {
    this.setState({ loading: true })
    Websites.addUrl.call({ url: this.state.url }, (err, res) => {
      this.setState({ loading: false })
      if (err) {
        let error = err.toString()
        if (err.message === 'Url is required') {
          // Simple-Schema validation error
          error = 'URL is required'
        } else if (err.message === 'Url must be a valid URL') {
          // Simple-Schema validation error
          error = 'URL format is invalid'
        } else if (err.error === 'Load Error') {
          // HTTP.call error
          error = 'Website not found'
        } else if (err.error === 'IFrame Blocked') {
          // HTTP.call error
          error = 'This website cannot be rendered in an iframe'
        }
        this.setState({ error })
      } else {
        this.setState(this.initialState)
      }
    })
  }

  handleChange = e => {
    this.setState({ url: e.target.value })
  }

  // https://github.com/mui-org/material-ui/issues/5393#issuecomment-304707345
  catchEnter = e => {
    if (e.key === 'Enter') {
      this.handleAdd()
      e.preventDefault()
    }
  }

  render() {
    const buttons = this.state.loading ? (
      <DialogActions>
        <CircularProgress size={20} style={{ margin: '8px' }} />
      </DialogActions>
    ) : (
      <DialogActions>
        <Button onClick={this.handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    )
    return (
      <div>
        <Fab
          color="primary"
          variant="extended"
          aria-label="Add URL"
          onClick={this.handleClickOpen}
        >
          <AddIcon />
          Add Website
        </Fab>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Website</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the URL of the website you want to discuss.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="url"
              label="URL"
              type="text"
              fullWidth
              onChange={this.handleChange}
              helperText={this.state.error}
              error={!!this.state.error}
              onKeyPress={this.catchEnter}
            />
          </DialogContent>
          {buttons}
        </Dialog>
      </div>
    )
  }
}
