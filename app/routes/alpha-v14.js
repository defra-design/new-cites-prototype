const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const userProfiles = require('../data/user-profiles.js')

/**
 * Helper function to ensure session is populated with defaults.
 * Uses Object.assign to avoid deprecation warnings.
 */
function loadSessionData (req) {
  const sessionDataDefaults = require('../data/session-data-defaults.js')
  req.session.data = Object.assign({}, sessionDataDefaults, req.session.data)
}

// *********** login routes *************

router.get('/login', function (req, res) {
  res.render('login')
})

router.post('/login', function (req, res) {
  const username = req.body['username']
  const password = req.body['password']

  let authenticatedUser = null
  for (const key in userProfiles) {
    if (userProfiles[key].username === username && userProfiles[key].password === password) {
      authenticatedUser = userProfiles[key]
      break
    }
  }

  if (authenticatedUser) {
    req.session.data = {}
    Object.keys(authenticatedUser).forEach(key => {
      if (key !== 'password') {
        req.session.data[key] = authenticatedUser[key]
      }
    })

    const userRole = authenticatedUser['user-role']
    if (userRole === 'cites') {
      res.redirect('/')
    } else {
      res.redirect('v14/represent')
    }
  } else {
    res.render('login', { loginError: true })
  }
})

router.get('/logout', function (req, res) {
  req.session.data = {}
  res.redirect('/v14/login')
})

router.get('/clear-data', function (req, res) {
  req.session.data = {}
  res.redirect('/')
})

router.get('/', function (req, res) {
  res.render('index')
})

router.get('/v14/clear-scan', (req, res) => {
  delete req.session.data['last-scan']
  res.redirect('/v14/cites-capture')
})


router.get('/v14/what-species', async function (req, res) {
  const query = req.query.speciesName
  if (!query) return res.render('v14/what-species.html')

  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=pageimages|extracts|info|pageprops|categories&inprop=url&exintro&explaintext&pithumbsize=600&cllimit=max&format=json&redirects=1`

  try {
    const response = await fetch(searchUrl)
    const data = await response.json()
    
    if (!data.query) {
      return res.render('v14/what-species.html', { 'error': 'Species not found', 'query': query })
    }

    const page = Object.values(data.query.pages)[0]
    
    // --- 1. Extract Scientific Name from Wikidata ---
    const wikidataId = page.pageprops ? page.pageprops.wikibase_item : null
    let scientificName = "Not found"
    if (wikidataId) {
      const wdUrl = `https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${wikidataId}&property=P225&format=json`
      const wdRes = await fetch(wdUrl)
      const wdData = await wdRes.json()
      if (wdData.claims?.P225) {
        scientificName = wdData.claims.P225[0].mainsnak.datavalue.value
      }
    }

    // --- 2. Extract CITES Appendix from Categories ---
    let appendix = "Not determined"
    if (page.categories) {
      // Look for a category title that contains "CITES Appendix"
      const citesCat = page.categories.find(cat => cat.title.includes("CITES Appendix"))
      if (citesCat) {
        // This regex finds "I", "II", or "III" in the category name
        const match = citesCat.title.match(/Appendix (I{1,3})/)
        if (match) {
          appendix = `Appendix ${match[1]}`
        }
      }
    }

    res.render('v14/what-species.html', {
      query: query,
      result: {
        title: page.title,
        scientificName: scientificName,
        image: page.thumbnail ? page.thumbnail.source : null,
        summary: page.extract ? page.extract.split('. ').slice(0, 2).join('. ') + '.' : "Description not found.",
        link: page.fullurl,
        appendix: appendix
      }
    })
  } catch (error) {
    res.render('v14/what-species.html', { 'error': 'API connection failed' })
  }
})



module.exports = router