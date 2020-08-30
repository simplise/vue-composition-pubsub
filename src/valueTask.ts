import { ref, Ref, UnwrapRef, watch } from '@vue/composition-api'
// https://medium.com/javascript-in-plain-english/handling-asynchrony-in-vue-3-composition-api-part-1-managing-async-state-e993842ebf8f

export interface IValueTask<T>{
  state : Ref<UnwrapRef<T>>
  result : Promise<Ref<UnwrapRef<T>>>
  taskStatus : Ref<taskState>
  refresh(asyncState:Promise<T>) : Promise<Ref<UnwrapRef<T>>>
}

enum taskState {
  running,
  completed,
  faulted
}

export function valueTask<T> (
  defaultValue: T,
  asyncState?: Promise<T>
) : IValueTask<T> {
  //
  const state = ref(defaultValue)
  //
  const taskStatus = ref(taskState.running)
  //
  const refresh = (asyncState?: Promise<T>) : Promise<Ref<UnwrapRef<T>>> => {
    return new Promise<Ref<UnwrapRef<T>>>((resolve, reject) => {
      if (asyncState) {
        asyncState.then(
          (value) => {
            state.value = <UnwrapRef<T>>value
            taskStatus.value = taskState.completed
            resolve(state)
          },
          (reason) => {
            taskStatus.value = taskState.faulted
            reject(reason)
          })
      } else {
        resolve(state)
      }
    })
  }
  //
  const result = refresh(asyncState)

  return {
    state,
    result,
    taskStatus,
    refresh
  }
}

export function computedValueTask<T, K> (source : IValueTask<K>, defaultValue: T, asyncState: (value : K) => Promise<T>) {
  //
  const state = ref(defaultValue)
  //
  const taskStatus = ref(taskState.running)
  //
  const refresh = (asyncState: (value : K) => Promise<T>) : Promise<Ref<UnwrapRef<T>>> => {
    return new Promise<Ref<UnwrapRef<T>>>((resolve, reject) => {
      source.result.then((sourceValue) => {
        asyncState(<K>sourceValue.value).then(
          (value) => {
            state.value = <UnwrapRef<T>>value
            taskStatus.value = taskState.completed
            resolve(state)
          },
          (reason) => {
            taskStatus.value = taskState.faulted
            reject(reason)
          })
      })
    })
  }
  //
  const result = refresh(asyncState)
  watch(source.state, (value) => {
    if (taskStatus.value === taskState.completed) {
      refresh(asyncState)
    }
  })
  return {
    state,
    result,
    taskStatus,
    refresh
  }
}
