//------------------------------------------------------------------------------

import React from 'react'
import { Router, Route, Switch } from 'react-router'
import history from 'history'

// route components
import HomePageContainer from '../../ui/containers/HomePageContainer'
import WebsitePageContainer from '../../ui/containers/WebsitePageContainer'
import NotFound from '../../ui/pages/NotFound'

import CssBaseline from '@material-ui/core/CssBaseline'

import { comToPlugin, inIFrame } from 'dcs-client'
import { SimpleRouteMatcher } from 'meteor/sylque:dcs-simple-route-matcher'
import { runReactRouterSync } from 'dcs-react-router-sync'

import websiteJSON from '../../public/dcs-website.json'

//------------------------------------------------------------------------------

const browserHistory = history.createBrowserHistory()

//------------------------------------------------------------------------------

// Patch for this terrible React Router bug:
// https://github.com/ReactTraining/history/issues/470
const prevHistoryPush = browserHistory.push
browserHistory.push = (path, state = {}) => {
  // Case pathname is of the form '?p1=true'
  if (!path.startsWith('/')) {
    path = '/' + path
  }
  const loc = browserHistory.location
  const lastPath = loc.pathname + loc.search + loc.hash
  if (path !== lastPath) {
    prevHistoryPush(path, state)
  }
}

//------------------------------------------------------------------------------

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <CssBaseline />
    <Switch>
      <Route exact path="/" component={HomePageContainer} />
      <Route exact path="/website/:id" component={WebsitePageContainer} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

//------------------------------------------------------------------------------

if (inIFrame()) {
  comToPlugin.connect({
    discourseOrigin: '*',
    timeout: 10000,
    onTimeout: () => console.log('Could not connect to the Docuss plugin')
  })
}

const routeMatcher = new SimpleRouteMatcher({
  homePageName: websiteJSON.dynamicPages.homePageName,
  pageNamePrefix: websiteJSON.dynamicPages.namePrefix,
  maxPageNameLength: websiteJSON.dcsTag.maxPageNameLength
})

export const routerSync = runReactRouterSync({ browserHistory, routeMatcher })

//------------------------------------------------------------------------------
