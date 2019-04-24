//import { Meteor } from 'meteor/meteor'
import { Websites } from '../../collections/Websites'
import { withTracker } from 'meteor/react-meteor-data'
import HomePage from '../pages/HomePage.js'

const HomePageContainer = withTracker(() => {
  const handle = Meteor.subscribe('websites.all')
  const loading = !handle.ready()
  const websites = loading
    ? []
    : Websites.find({}, { sort: { createdAt: -1 } }).fetch()
  return { websites, loading }
})(HomePage)

export default HomePageContainer
