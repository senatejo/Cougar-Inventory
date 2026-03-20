interface EventControllerType {
  events: { [key: string]: Array<(args: any) => void> };
  addListener: (eventName: string, listener: (args: any) => void) => void;
  removeListener: (eventName: string, listener: (args: any) => void) => void;
}

const EventController: EventControllerType = {
  events: {},

  addListener(eventName, listener) {
    this.events[eventName] = this.events[eventName] ?? [];
    this.events[eventName].push(listener);
  },

  removeListener(eventName, listener) {
    if (eventName in this.events) {
      const index = this.events[eventName].indexOf(listener);
      if (index > -1) {
        this.events[eventName].splice(index, 1);
      }
      if (this.events[eventName].length === 0) {
        delete this.events[eventName];
      }
    }
  }
};

function invokeEvent(eventName: string, args: any) {
  const listeners = EventController.events[eventName];
  if (!listeners || listeners.length === 0) return;
  listeners.forEach(listener => listener(args));
}

(window as any).invokeEvent = invokeEvent; // <== PENTING: biar bisa diakses dari executeCefWindowFunc

export { EventController, invokeEvent };
