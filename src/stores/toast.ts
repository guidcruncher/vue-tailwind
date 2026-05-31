import { reactive } from "vue"

export const toasts = reactive<{ id: number; message: string; type: string }[]>([])

let id = 0

export const toast = {
  show(message: string, type: string = "info", timeout = 3000) {
    const t = { id: id++, message, type }
    toasts.push(t)

    setTimeout(() => {
      const index = toasts.findIndex((x) => x.id === t.id)
      if (index !== -1) toasts.splice(index, 1)
    }, timeout)
  },

  success(msg: string, timeout?: number) {
    this.show(msg, "success", timeout)
  },

  error(msg: string, timeout?: number) {
    this.show(msg, "error", timeout)
  },

  warning(msg: string, timeout?: number) {
    this.show(msg, "warning", timeout)
  },

  info(msg: string, timeout?: number) {
    this.show(msg, "info", timeout)
  },
}
