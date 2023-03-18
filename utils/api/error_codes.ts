// Code generated by script/gen-error-types. DO NOT EDIT
// Changes WILL BE OVERWRITTEN when the script is run again.

enum ErrorCode {
  UnknownError = 'UNKNOWN_ERROR',
  NotFound = 'not_found',
  ReportMissingData = 'report.missing_data',
  ReportMissingCommitSha = 'report.missing_commit_sha',
  ChecksMissingPluginName = 'checks.missing_plugin_name',
  ChecksMissingStatus = 'checks.missing_status',
  ChecksInvalidStatus = 'checks.invalid_status',
  ChecksMissingErrorOutput = 'checks.missing_error_output',
  ChecksCannotReRunWhileRunning = 'checks.cannot_re_run_while_running',
  PrivateKeysMissingName = 'private_keys.missing_name',
  PrivateKeysMissingKey = 'private_keys.missing_key',
  PrivateKeysInvalidKey = 'private_keys.invalid_key',
  PrivateKeysNameTaken = 'private_keys.name_taken',
  SecretsMissingName = 'secrets.missing_name',
  SecretsMissingData = 'secrets.missing_data',
  SecretsNameTaken = 'secrets.name_taken',
  SecretsInvalidAuthorization = 'secrets.invalid_authorization',
  SecretsInvalidName = 'secrets.invalid_name',
  IssuesJsonRequired = 'issues.json_required',
  IssuesValidationError = 'issues.validation_error',
  IssuesInvalidIgnoreMode = 'issues.invalid_ignore_mode',
  RepositoriesAlreadyExists = 'repositories.already_exists',
  RepositoriesNotOnGithub = 'repositories.not_on_github',
  RepositoriesMissingFromDate = 'repositories.missing_from_date',
  RepositoriesMissingToDate = 'repositories.missing_to_date',
  RepositoriesInvalidFromDate = 'repositories.invalid_from_date',
  RepositoriesInvalidToDate = 'repositories.invalid_to_date',
  RepositoriesStatsRangeTooLarge = 'repositories.stats_range_too_large',
  AuthNoAuthorization = 'auth.no_authorization',
  AuthInvalidToken = 'auth.invalid_token',
  AuthForbidden = 'auth.forbidden',
  SessionNoRedirect = 'session.no_redirect',
  SessionBadRedirectUri = 'session.bad_redirect_uri',
  SessionNoExchangeToken = 'session.no_exchange_token',
  SessionNoState = 'session.no_state',
  SessionNoCode = 'session.no_code',
  SessionInvalidExchangeTokenOrState = 'session.invalid_exchange_token_or_state',
  SessionCannotExchange = 'session.cannot_exchange',
  SessionNotAnOrgMember = 'session.not_an_org_member',
  SessionOutsideCollaboratorNotAllowed = 'session.outside_collaborator_not_allowed',
}

const errorFromString = (path: string): ErrorCode => {
  return (Object.values(ErrorCode) as string[]).includes(path)
    ? (path as ErrorCode)
    : ErrorCode.UnknownError
}

export default ErrorCode
export { errorFromString }
