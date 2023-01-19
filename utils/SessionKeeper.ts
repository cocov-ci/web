import Redis from 'ioredis'
import { RedisClient } from 'ioredis/built/connectors/SentinelConnector/types'
import { NextRequest, NextResponse } from 'next/server'
import { uuidv4 } from 'uuid'

type Session = {
  apiToken?: string
  isAdmin?: boolean
}

// TODO: It seems there's no way to enumerate properties/fields of a given type
//       since no information of them are present during runtime. Perhaps this
//       array could be generated during compile time in order to provide us all
//       fields available in a Session-like object? For now we will keep the
//       list here.

const sessionFields = ['apiToken', 'isAdmin']
const redisURL = process.env.COCOV_REDIS_URL
let redisClient: Redis | undefined

if (redisURL) {
  redisClient = new Redis(redisURL)
}

class SessionManager {
  public static async getSession(
    req: NextRequest,
  ): Promise<Session | undefined> {
    if (redisClient) {
      return await this.getRedisSession(req)
    }

    return await this.getCookieSession(req)
  }

  public static async setSession(res: NextResponse, session: Session) {
    if (redisClient) {
      return await this.setRedisSession(res, session)
    }

    return await this.setCookieSession(res, session)
  }

  static async setRedisSession(res: NextResponse, session: Session) {
    const rawData = JSON.stringify(session)
    const id: string = uuidv4()

    await redisClient?.set(`cocov:web:session:${id}`, rawData, 'EX', 86400)

    res.cookies.set('cocov_session', id)
  }

  static async setCookieSession(res: NextResponse, session: Session) {
    sessionFields.forEach(f => {
      res.cookies.set(
        `cocov_session_dev_${f}`,
        (session[f as keyof Session] || '').toString(),
      )
    })
  }

  static async getRedisSession(req: NextRequest): Promise<Session | undefined> {
    const sessionID = req.cookies.get('cocov_session')?.value

    if (!sessionID) {
      return undefined
    }

    const redisSessionKey = `cocov:web:session:${sessionID}`
    const rawRedisSession = await redisClient?.get(redisSessionKey)

    if (!rawRedisSession) {
      return undefined
    }

    let decodedSession

    try {
      decodedSession = JSON.parse(rawRedisSession)
    } catch (ex) {
      await redisClient?.del(redisSessionKey)

      return undefined
    }

    return decodedSession
  }

  static async getCookieSession(
    req: NextRequest,
  ): Promise<Session | undefined> {
    const values: { [key: string]: string | number | boolean | undefined } = {}

    sessionFields.forEach(f => {
      values[f] = req.cookies.get(`cocov_session_dev_${f}`)?.value
    })

    if (
      Object.entries(values)
        .map(e => e[1])
        .some(i => i === undefined)
    ) {
      return undefined
    }

    return values
  }
}
