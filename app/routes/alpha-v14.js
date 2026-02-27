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

// *********** AI extraction routes *************

router.post('/v14/extract-description', async function (req, res) {
  const imageData = req.body.image
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not found in .env' })
  }

  try {
    // Switched to the more standard model name for v1beta
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: "Analyze this specimen for a CITES permit. Provide a concise physical description (species, markings, condition) under 100 words." },
            { inlineData: { mimeType: "image/jpeg", data: imageData } }
          ]
        }]
      })
    })

    const result = await response.json()

    if (result.candidates && result.candidates[0] && result.candidates[0].content) {
      const extractedText = result.candidates[0].content.parts[0].text
      res.json({ description: extractedText })
    } else {
      // Log the full error to help us if it fails again
      console.error('Gemini API Error details:', JSON.stringify(result))
      res.status(500).json({ error: 'AI could not generate a description.' })
    }
  } catch (error) {
    console.error('AI Extraction Error:', error)
    res.status(500).json({ error: 'Failed to connect to AI service' })
  }
})

router.get('/animal-profile', async function (req, res) {
  const query = req.query.animalName

  // If the user hasn't searched for anything yet, just show the page
  if (!query) {
    return res.render('/v14/animal-profile')
  }

  // Wikipedia Search API URL
  const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=pageimages|info&inprop=url&pithumbsize=600&format=json&redirects=1`

  try {
    const response = await fetch(url)
    const data = await response.json()
    
    if (!data.query) {
      // If no results found
      res.render('/v14/animal-profile', { 
        'error': 'No species found for "' + query + '"',
        'query': query 
      })
    } else {
      const page = Object.values(data.query.pages)[0]
      const result = {
        title: page.title,
        image: page.thumbnail ? page.thumbnail.source : null,
        link: page.fullurl
      }
      res.render('/v14/animal-profile', { 
        'result': result,
        'query': query 
      })
    }
  } catch (error) {
    res.render('/v14/animal-profile', { 'error': 'Could not connect to Wikipedia.', 'query': query })
  }
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
    let appendix = "Not listed"
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