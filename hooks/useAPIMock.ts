import API from '../utils/api'

const useAPIMock = <I, O>(fn: (params: I) => Promise<O>, result: O) => {
  jest
    .spyOn(API.shared, fn.name as keyof API)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .mockImplementation(() => Promise.resolve(result) as any)
}

export default useAPIMock
