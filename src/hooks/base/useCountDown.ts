import { ref, computed, onActivated, onDeactivated, onBeforeUnmount } from 'vue'

export type CurrentTime = {
  days: number
  hours: number
  total: number
  minutes: number
  seconds: number
  milliseconds: number
}

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const parseTime = (time: number): CurrentTime => {
  const days = Math.floor(time / DAY)
  const hours = Math.floor((time % DAY) / HOUR)
  const minutes = Math.floor((time % HOUR) / MINUTE)
  const seconds = Math.floor((time % MINUTE) / SECOND)
  const milliseconds = Math.floor(time % SECOND)

  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  }
}

const isSameSecond = (time1: number, time2: number) => {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000)
}

const useCountDown = (options: {
  // 倒计时时长，单位毫秒
  time: number
  onChange?: (current: CurrentTime) => void
  onFinish?: () => void
}) => {
  let rafId: number
  let endTime: number
  let counting: boolean
  let deactivated: boolean

  const remain = ref(options.time)

  const count = computed(() => parseTime(remain.value))

  const getCurrentRemain = () => Math.max(endTime - Date.now(), 0)

  const setRemain = (value: number) => {
    remain.value = value
    options.onChange?.(count.value)

    // 倒计时到0，自动暂停
    if (value === 0) {
      pauseCount()
      options.onFinish?.()
    }
  }

  const tick = () => {
    rafId = requestAnimationFrame(() => {
      if (counting) {
        const remainRemain = getCurrentRemain()
        if (!isSameSecond(remainRemain, remain.value) || remainRemain === 0) {
          setRemain(remainRemain)
        }
        if (remain.value > 0) {
          tick()
        }
      }
    })
  }

  // 开始
  const startCount = () => {
    if (!counting) {
      endTime = Date.now() + remain.value
      counting = true
      tick()
    }
  }

  // 暂停
  const pauseCount = () => {
    counting = false
    cancelAnimationFrame(rafId)
  }

  // 重新开始
  const resetCount = (totalTime: number = options.time) => {
    pauseCount()
    remain.value = totalTime
  }

  onBeforeUnmount(() => {
    resetCount()
  })

  onActivated(() => {
    if (deactivated) {
      counting = true
      deactivated = false
      tick()
    }
  })

  onDeactivated(() => {
    if (counting) {
      pauseCount()
      deactivated = true
    }
  })

  return {
    count,
    startCount,
    pauseCount,
    resetCount,
  }
}

export default useCountDown
