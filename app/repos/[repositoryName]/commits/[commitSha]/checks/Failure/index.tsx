import { LucideXOctagon } from 'lucide-react'

import CodeBlock from 'app/common/CodeBlock'
import { ChecksFailureReason } from 'utils/api/request_response_types'

import styles from './Failure.module.scss'

export interface FailureProps {
  reason: ChecksFailureReason
  details?: string
}

const messages: { [key in ChecksFailureReason]: () => JSX.Element } = {
  commit_fetch_failed: () => (
    <>
      <h1>Failed to fetch commit</h1>
      <p>
        Cocov could not fetch the commit for those changes from the upstream
        repository. This may be caused by a number of factors, such as delays in
        GitHub webhook deliveries when the commit or branch has been removed. If
        the problem persists, contact your Cocov administrator. More information
        is available on the application’s logs.
      </p>
    </>
  ),
  manifest_root_must_be_mapping: () => (
    <>
      <h1>Invalid Manifest: Root should be a mapping</h1>
      <p>
        Cocov determined that the manifest file (also known as{' '}
        <code>.cocov.yaml</code>) contained within this commit is invalid, and
        could not be processed. Your manifest must contain a version field,
        which is used to determine how to interpret its contents. More
        information regarding the manifest file’s format can be found on{' '}
        <a href="#" target="_blank">
          Cocov’s documentation
        </a>
        .
      </p>
    </>
  ),
  manifest_missing_version: () => (
    <>
      <h1>Invalid Manifest: Missing version field</h1>
      <p>
        Cocov determined that the manifest file (also known as{' '}
        <code>.cocov.yaml</code>) contained within this commit is invalid, and
        could not be processed. Your manifest must contain a version field,
        which is used to determine how to interpret its contents. More
        information regarding the manifest file’s format can be found on{' '}
        <a href="#" target="_blank">
          Cocov’s documentation
        </a>
        .
      </p>
    </>
  ),
  manifest_version_type_mismatch: () => (
    <>
      <h1>Invalid Manifest: Version must be a string</h1>
      <p>
        Cocov determined that the manifest file (also known as{' '}
        <code>.cocov.yaml</code>) contained within this commit is invalid, and
        could not be processed. The version key of your manifest must be a
        string, but Cocov found something else. More information regarding the
        manifest file’s format can be found on{' '}
        <a href="#" target="_blank">
          Cocov’s documentation
        </a>
        .
      </p>
    </>
  ),
  manifest_version_unsupported: () => (
    <>
      <h1>Invalid Manifest: Unsupported manifest version</h1>
      <p>
        Cocov determined that the manifest file (also known as{' '}
        <code>.cocov.yaml</code>) contained within this commit is invalid, and
        could not be processed. The version declared by the manifest is either
        too old or too new, and cannot be used with this Cocov instance. More
        information regarding the manifest file’s format can be found on{' '}
        <a href="#" target="_blank">
          Cocov’s documentation
        </a>
        .
      </p>
    </>
  ),
  manifest_unknown_secret: () => (
    <>
      <h1>Invalid Manifest: Unknown Secret</h1>
      <p>
        Cocov determined that the manifest file (also known as{' '}
        <code>.cocov.yaml</code>) contained within this commit is invalid, and
        could not be processed. The manifest refers to a secret variable that
        could not be found on the organization or repository list of available
        secrets. Check the spelling and whether the secret exists.
      </p>
    </>
  ),
  manifest_duplicated_mount_destination: () => (
    <>
      <h1>Invalid Manifest: Duplicated mount destination</h1>
      <p>
        Cocov determined that the manifest file (also known as{' '}
        <code>.cocov.yaml</code>) contained within this commit is invalid, and
        could not be processed. Make sure all mount destinations are unique.
      </p>
    </>
  ),
  manifest_invalid_mount_source: () => (
    <>
      <h1>Invalid Manifest: Invalid mount source</h1>
      <p>
        Cocov determined that the manifest file (also known as{' '}
        <code>.cocov.yaml</code>) contained within this commit is invalid, and
        could not be processed. Currently, only secret mounts are supported.
        More information regarding the manifest file’s format can be found on{' '}
        <a href="#" target="_blank">
          Cocov’s documentation
        </a>
        .
      </p>
    </>
  ),
  manifest_invalid_or_missing_data: () => (
    <>
      <h1>Invalid Manifest: Invalid or Missing Data in Configuration</h1>
      <p>
        Cocov determined that the manifest file (also known as{' '}
        <code>.cocov.yaml</code>) contained within this commit is invalid, and
        could not be processed due to inconsistencies and/or invalid data. Below
        you can find more information about what is incorrect, and you may also
        refer to{' '}
        <a href="#" target="_blank">
          Cocov’s documentation
        </a>{' '}
        for information regarding the manifest file’s format.
      </p>
    </>
  ),
}

const Failure = ({ details, reason }: FailureProps) => {
  const component = messages[reason]

  return (
    <div className={styles.base}>
      <div className={styles.icon}>
        <LucideXOctagon size={19} />
      </div>
      <div className={styles.body}>
        <div className={styles.text}>{component()}</div>
        {details && <CodeBlock plainText={details} />}
      </div>
    </div>
  )
}

export default Failure
