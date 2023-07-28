'use client'

import { BoxSelect } from 'lucide-react'
import React, { useEffect } from 'react'

import FixedContent from 'app/common/FixedContent'
import Text from 'app/common/Text'
import { useErrorBanner } from 'hooks/useBanner'
import API, { useAPI } from 'utils/api'

import Alert from '../../../../common/Alert'
import Sidebar from '../Sidebar'

import styles from './Cache.module.scss'
import Item, { ItemLoading } from './Item'
import SizeInfoBar from './SizeInfoBar'

interface CacheParams {
  params: { repositoryName: string; commitSha: string }
}

const Cache = ({ params: { repositoryName } }: CacheParams) => {
  const { showBanner } = useErrorBanner()
  const {
    result: cacheList,
    loading: cacheListLoading,
    refresh: cacheListRefresh,
    error: cacheListError,
  } = useAPI(API.shared.repositoryCacheList, { repositoryName })

  useEffect(() => {
    if (cacheListError) {
      showBanner({
        children: `Failed requesting the repository cache list. Please try again.`,
        autoClose: false,
      })
    }
  }, [cacheListError])

  return (
    <FixedContent>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Sidebar
            defaultSelectedItem="Cache"
            repositoryName={repositoryName}
          />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.header}>
            <Text className={styles.title} variant="title">
              Cache
            </Text>
            <Text className={styles.description} variant="description">
              Caching allows plugins to store and restore dependencies and tools
              in order to make checks finish quicker. The list below contains
              all cache artifacts stored for this specific repository. Notice
              however, that cache items may be automatically removed based on
              this instance’s policies. In case Cocov deems necessary to remove
              a cache item, items least accessed will be removed first.
            </Text>
          </div>
          {cacheListLoading &&
            new Array(3).fill(0).map(i => {
              return (
                <div className={styles.item} key={i}>
                  <ItemLoading />
                </div>
              )
            })}
          {!cacheListLoading && cacheList?.enabled && (
            <SizeInfoBar
              enabled={true}
              limit={cacheList?.storage_limit}
              loading={cacheListLoading}
              refetch={cacheListRefresh}
              used={cacheList?.storage_used}
            />
          )}
          {!cacheListLoading && !cacheList?.enabled && (
            <div className={styles.disabledNotice}>
              <Alert
                description="This instance does not have a cache server enabled."
                icon={BoxSelect}
                title="Cache Disabled"
              />
            </div>
          )}
          {!cacheListLoading && (
            <div className={styles.items}>
              {cacheList?.artifacts?.map(artifact => (
                <Item
                  key={artifact.id}
                  refetch={cacheListRefresh}
                  repositoryName={repositoryName}
                  {...artifact}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </FixedContent>
  )
}

export default Cache
