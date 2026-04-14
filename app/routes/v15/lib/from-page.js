'use strict'

/**
 * Shared targets for req.session.data.fromPage across v15 POST handlers.
 * Keep paths relative so Express resolves them under the current /v15/... URL.
 */
const paths = {
  cya: 'check-your-answers',
  manageApplication: 'application',
  manageApplicationNew: 'new-application',
  copy: 'copy-application',
  preSubmission: 'your-applications-pre-submission'
}

/**
 * @param {import('express').Response} res
 * @param {Record<string, unknown>} sessionData req.session.data
 * @param {Record<string, string>} pathByFromPage only include keys this step cares about
 * @param {string} fallbackPath
 * @returns {void}
 */
function redirectFromPage (res, sessionData, pathByFromPage, fallbackPath) {
  const fp = sessionData && sessionData.fromPage
  if (fp != null && Object.prototype.hasOwnProperty.call(pathByFromPage, fp)) {
    const target = pathByFromPage[fp]
    if (target) {
      res.redirect(target)
      return
    }
  }
  res.redirect(fallbackPath)
}

module.exports = {
  paths,
  redirectFromPage
}
