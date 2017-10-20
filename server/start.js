'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const { Campus, Student } = require('../db/models');

const app = express()

const api = require('./api.js')

if (process.env.NODE_ENV !== 'production') {
  // Logging middleware (non-production only)
  app.use(require('volleyball'))
}  

//The code below works because `.use` returns `this` which is `app`. So what we want to return in the `module.exports` is `app`, and we can chain on that declaration because each method invokation returns `app` after mutating based on the middleware functions
module.exports = app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(resolve(__dirname, '..', 'public'))) // Serve static files from ../public
  .use('/api', api) // Serve our api
  //.get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html'))) // Send index.html for any other requests.

  // notice the use of `_` as the first parameter above. This is a pattern for parameters that must exist, but you don't use or reference (or need) in the function body that follows.

if (module === require.main) {
  // Start listening only if we're the main module.

  /* 
    https://nodejs.org/api/modules.html#modules_accessing_the_main_module
      - This (module === require.main) will be true if run via node foo.js, but false if run by require('./foo')
      - If you want to test this, log `require.main` and `module` in this file and also in `api.js`. 
        * Note how `require.main` logs the same thing in both files, because it is always referencing the "main" import, where we starting running in Node 
        * In 'start.js', note how `module` is the same as `require.main` because that is the file we start with in our 'package.json' -- `node server/start.js`
        * In 'api.js', note how `module` (this specific file - i.e. module) is different from `require.main` because this is NOT the file we started in and `require.main` is the file we started in
          ~ To help compare these objects, reference each of their `id` attributes
  */

  const PORT = 1337

  const db = require('../db')
  db.sync({ force : true })
  .then(() => {
    console.log('db synced')
    app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
  })
  .then(() => {
    Campus.bulkCreate([
      { name : 'Mercury', imageURL : 'https://www.nasa.gov/images/content/728304main_messenger_orbit_image20130218_1_full_full.jpg'},
      { name : 'Venus', imageURL : 'https://www.scienceabc.com/wp-content/uploads/2015/06/Venus.jpg'},
      { name : 'Mars', imageURL : 'http://media.serverchimp.com/futurist/wp-content/uploads/2017/07/24170608/futurist_1500941166.jpeg'},
      { name : 'Earth', imageURL : 'https://solarsystem.nasa.gov/images/galleries/618486main_earth_320.jpg'},
      { name : 'Jupiter', imageURL : 'https://www.jpl.nasa.gov/news/press_kits/juno/images/jupiter/jupiter.jpg'},
      { name : 'Saturn', imageURL : 'https://d3jkudlc7u70kh.cloudfront.net/interesting-saturn-facts.jpg'},
      { name : 'Uranus', imageURL : 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg'},
      { name : 'Neptune', imageURL : 'https://vignette.wikia.nocookie.net/spore/images/1/15/Neptune.png/revision/latest?cb=20090222230615'}
    ])
    .then(() => {
      Student.bulkCreate([
        { name : 'Zorp Smorglord', email: 'zsmasterflex117@hotmail.com', campusId: 1},
        { name : 'Morg Zupford', email: 'morg334@hotmail.com', campusId: 1},
        { name : 'Nancy Drugford', email: 'nancyd7@hotmail.com', campusId: 1},
        { name : 'Zandor Drugford', email: 'zandord@hotmail.com', campusId: 1},
        { name : 'Xenon Johnson', email: 'xenon@hotmail.com', campusId: 2},
        { name : 'Carl Tropper', email: 'ctropps@hotmail.com', campusId: 2},
        { name : 'Jurgen Thompson', email: 'jt50@hotmail.com', campusId: 2},
        { name : 'Lucy Sutton', email: 'ls@hotmail.com', campusId: 2},
        { name : 'Jed Mugg', email: 'jm2@hotmail.com', campusId: 3},
        { name : 'Hadassah Hartman', email: 'hh@hotmail.com', campusId: 3},
        { name : 'Mathias Little', email: 'ml@hotmail.com', campusId: 3},
        { name : 'Lia Shelton', email: 'lss@hotmail.com', campusId: 3},
        { name : 'Jonathon Sheppard', email: 'js34@hotmail.com', campusId: 4},
        { name : 'Abdullah Lang', email: 'al90@hotmail.com', campusId: 4},
        { name : 'Gifford Williams', email: 'gw21@hotmail.com', campusId: 4},
        { name : 'Zak Wills', email: 'blackmath@hotmail.com', campusId: 4},
        { name : 'Liz Allocca', email: 'lalala@hotmail.com', campusId: 5},
        { name : 'Gregg Gellson', email: 'ggggg76@hotmail.com', campusId: 5},
        { name : 'Robert Bortles', email: 'rb12@hotmail.com', campusId: 5},        
        { name : 'Derek Carr', email: 'dcarr@hotmail.com', campusId: 6},
        { name : 'Tom Brady', email: 'tubzz@hotmail.com', campusId: 6},
        { name : 'Carson Wentz', email: 'wentzman@hotmail.com', campusId: 6},
        { name : 'Zoop Zang', email: 'zut@hotmail.com', campusId: 6},
        { name : 'Sofija Sutton', email: 'ssut@hotmail.com', campusId: 6},
        { name : 'Dan Randolph', email: 'dran@hotmail.com', campusId: 7},
        { name : 'Thalia Zop', email: 'tha3@hotmail.com', campusId: 7},
        { name : 'Shantell Schmuck', email: 'schmuck@hotmail.com', campusId: 7},
        { name : 'Bethann Rippel', email: 'ripz@hotmail.com', campusId: 7},
        { name : 'Louella Trezza', email: 'trez@hotmail.com', campusId: 8},
        { name : 'Salvador Jaworski', email: 'jawz@hotmail.com', campusId: 8},
        { name : 'Madelene Nusbaum', email: 'danusbomb@hotmail.com', campusId: 8},
        { name : 'Dustin Couture', email: 'couture@hotmail.com', campusId: 8},
      ])
    })
  })
}
