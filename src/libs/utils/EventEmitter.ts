import { useEffect } from 'react'

/**
 * A simplify version of https://github.com/primus/eventemitter3
 */
const listenersMap: { [id: string]: Array<(...params: any[]) => void> } = {}

function addListener(eventName: string, listener: (...params: any[]) => void) {
  listenersMap[eventName] = listenersMap[eventName] || []
  listenersMap[eventName].push(listener)
}

function removeListener(
  eventName: string,
  listener: (...params: any[]) => void
) {
  let lis = listenersMap[eventName]
  if (!lis) return

  for (let i = lis.length - 1; i >= 0; i--) {
    if (lis[i] === listener) {
      lis.splice(i, 1)
      break
    }
  }
}

function notify<T = any>(eventName: string, ...params: T[]) {
  let listeners = listenersMap[eventName]
  if (!listeners) return false
  listeners.forEach(fnc => {
    fnc(...params)
  })
  return true
}

function useEventListener<T extends (...params: any) => void>(
  event: string,
  listener: T,
  deps: ReadonlyArray<any>
) {
  useEffect(() => {
    addListener(event, listener)
    return () => {
      removeListener(event, listener)
    }
  }, deps)
}

export function makeEventNotifier<P>(name: string) {
  return {
    name: name,
    notify: (param?: P) => {
      notify(name, param)
    },
    useEventListener: (
      listener: (param: P) => void,
      deps: ReadonlyArray<any>
    ) => useEventListener(name, listener, deps)
  }
}
