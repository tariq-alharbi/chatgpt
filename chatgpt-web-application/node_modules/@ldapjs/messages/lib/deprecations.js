'use strict'

const warning = require('process-warning')()
const clazz = 'LdapjsMessageWarning'

warning.create(clazz, 'LDAP_MESSAGE_DEP_001', 'messageID is deprecated. Use messageId instead.')

warning.create(clazz, 'LDAP_MESSAGE_DEP_002', 'The .json property is deprecated. Use .pojo instead.')

warning.create(clazz, 'LDAP_MESSAGE_DEP_003', 'abandonID is deprecated. Use abandonId instead.')

warning.create(clazz, 'LDAP_MESSAGE_DEP_004', 'errorMessage is deprecated. Use diagnosticMessage instead.')

module.exports = warning
