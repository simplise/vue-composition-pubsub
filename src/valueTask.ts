import { ref , Ref , UnwrapRef } from '@vue/composition-api'
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

export function valueTask<T>  (
  defaultValue: T,
  asyncState?: Promise<T>
) : IValueTask<T>
{
  const state = ref(defaultValue)
  const taskStatus = ref(taskState.running)
  // const result = new Promise<Ref<UnwrapRef<T>>>((resolve,reject) => {
  //   if(asyncState)
  //   {
  //     asyncState.then(
  //       (value) => {  
  //         state.value = <UnwrapRef<T>>value
  //         taskStatus.value = taskState.completed
  //         resolve(state)
  //       } , 
  //       (reason) => {
  //         taskStatus.value = taskState.faulted
  //         reject(reason)
  //       })
  //   }
  //   else
  //   {
  //     resolve(state)
  //   }
  // })
  const refresh = (asyncState?: Promise<T>) : Promise<Ref<UnwrapRef<T>>> => {
   return new Promise<Ref<UnwrapRef<T>>>((resolve,reject) => {
      if(asyncState)
      {
        asyncState.then(
          (value) => {  
            state.value = <UnwrapRef<T>>value
            taskStatus.value = taskState.completed
            resolve(state)
          } , 
          (reason) => {
            taskStatus.value = taskState.faulted
            reject(reason)
          })
      }
      else
      {
        resolve(state)
      }
    }) 
  }
  const result = refresh(asyncState)
  return { 
    state, 
    result,
    taskStatus,
    refresh
   }
}