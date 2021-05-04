class ControllersRegister {
    constructor() {
        Object.defineProperties(this, {
            controllers: { value: {} }
        });
    }

    registration(name, instance) {
        if (this.controllers.hasOwnProperty(name)) throw new Error(`Controller ${name} already register!`);
        else {
            Object.defineProperty(this.controllers, name, { value: instance });
            Object.defineProperty(this, name, { get() { return this.controllers[name] } });
        }
    }
}

export default new ControllersRegister();