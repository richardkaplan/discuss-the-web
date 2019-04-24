import { ValidatedMethod } from 'meteor/mdg:validated-method'
import SimpleSchema from 'simpl-schema'
import { HTTP } from 'meteor/http'

//------------------------------------------------------------------------------

const URL2 = typeof URL !== 'undefined' ? URL : require('url').URL

//------------------------------------------------------------------------------

export const Websites = new Mongo.Collection('urls')

//------------------------------------------------------------------------------

Websites.schema = new SimpleSchema({
  url: SimpleSchema.RegEx.Url,
  iframeIssue: Boolean,
  createdAt: { type: Date, autoValue: createdAtAutoValue }
})

Websites.attachSchema(Websites.schema)

//------------------------------------------------------------------------------

// Create a new link. Returns the link key.
Websites.addUrl = new ValidatedMethod({
  name: 'Websites.addUrl',

  validate: Websites.schema.pick('url').validator({ clean: true }),

  /**
   * @param { Object } args
   * @param { string } args.url
   */
  run: async function({ url }) {
    // Convert to lowercase and remove hash
    url = new URL2(url).href.split('#')[0]

    // Case url is already there
    const found = Websites.findOne({ url }, { fields: { id: 1 } })
    if (found) {
      return found.id
    }

    if (Meteor.isClient) {
      return
    }

    this.unblock()

    // Check url access
    let res
    try {
      res = HTTP.call('HEAD', url)
    } catch (e) {
      throw new Meteor.Error('Load Error')
    }

    // Check that the url can be loaded in an iframe
    const frameHeader = res.headers['x-frame-options'] || ''
    const iframeIssue = ['deny', 'sameorigin'].includes(
      frameHeader.toLocaleLowerCase()
    )

    // Convert to lowercase and remove hash
    return Websites.insert({ url, iframeIssue })
  }
})

//------------------------------------------------------------------------------

// Force value to be current date (on server) upon insert
// and prevent updates thereafter.
// See https://github.com/aldeed/meteor-collection2
function createdAtAutoValue() {
  if (this.isInsert) {
    return new Date()
  } else if (this.isUpsert) {
    return { $setOnInsert: new Date() }
  } else {
    this.unset()
  }
}

//------------------------------------------------------------------------------

if (Meteor.isServer) {
  //Websites.remove({})

  Meteor.publish('websites.all', function() {
    return Websites.find({})
  })

  Meteor.publish('websites.one', function(websiteId) {
    return Websites.find(websiteId)
  })
}

//------------------------------------------------------------------------------
