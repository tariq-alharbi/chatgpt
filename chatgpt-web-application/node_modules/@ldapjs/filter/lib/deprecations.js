'use strict'

const warning = require('process-warning')()

warning.create('LdapjsFilterWarning', 'LDAP_FILTER_DEP_001', 'parse is deprecated. Use the parseString function instead.')

module.exports = warning
