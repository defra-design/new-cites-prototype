'use strict'

/**
 * Minimal GOV.UK-style session validation for prototypes.
 * Use with govukErrorSummary + field errorMessage in templates when you wire them in.
 */

function ensureSessionData (session) {
  if (!session.data) {
    session.data = {}
  }
  return session.data
}

function clearErrors (session) {
  const data = ensureSessionData(session)
  delete data.errors
  delete data.errorList
}

/**
 * @param {import('express').Session} session
 * @param {string} field
 * @param {string} message
 * @param {string} [href]
 */
function addFieldError (session, field, message, href) {
  const data = ensureSessionData(session)
  if (!data.errors) {
    data.errors = {}
  }
  if (!data.errorList) {
    data.errorList = []
  }
  data.errors[field] = message
  data.errorList.push({
    text: message,
    href: href || ('#' + field)
  })
}

function hasErrors (session) {
  const data = ensureSessionData(session)
  return Boolean(data.errorList && data.errorList.length)
}

function isBlank (value) {
  return value == null || String(value).trim() === ''
}

module.exports = {
  ensureSessionData,
  clearErrors,
  addFieldError,
  hasErrors,
  isBlank
}
