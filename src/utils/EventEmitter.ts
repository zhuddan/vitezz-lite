interface EventRecord {
  [key: string]: (...args: any[]) => any;
}

export class EventEmitter<T extends EventRecord = EventRecord> {
  private handlers: {
    emitKey: keyof T;
    handler: T[keyof T];
    once?: boolean;
  }[] = [];

  getHandlers() {
    return this.handlers;
  }

  emit<K extends keyof T>(emitKey: K, ...args: Parameters<T[K]>) {
    const onceHandlers: T[keyof T][] = [];
    this.handlers.filter(e => e.emitKey === emitKey).forEach(({ handler, once }) => {
      handler(...args);
      if (once) {
        onceHandlers.push(handler);
      }
    });
    onceHandlers.forEach(e => this.off(emitKey, e));
  }

  on<K extends keyof T>(emitKey: K, handler: T[K], once = false) {
    this.handlers.push({ emitKey, handler, once });
  }

  off<K extends keyof T>(emitKey: K, handler: T[K]) {
    const index = this.handlers.findIndex(e => e.emitKey === emitKey && e.handler === handler);
    if (index !== -1) {
      this.handlers.splice(index, 1);
    }
  }

  reset<K extends keyof T>(emitKey?: K) {
    if (emitKey) {
      this.handlers = this.handlers.filter(e => e.emitKey !== emitKey);
    }
    else {
      this.handlers = [];
    }
  }
}

