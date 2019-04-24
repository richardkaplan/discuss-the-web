//import { Meteor } from 'meteor/meteor'
import { Websites } from '../../collections/Websites'
import { withTracker } from 'meteor/react-meteor-data'
import WebsitePage from '../pages/WebsitePage'

const WebsitePageContainer = withTracker(props => {
  const websiteId = props.match.params.id
  const handle = Meteor.subscribe('websites.one', websiteId)
  const loading = !handle.ready()
  const website = loading ? null : Websites.findOne(websiteId)
  return { website, loading }
})(WebsitePage)

export default WebsitePageContainer
