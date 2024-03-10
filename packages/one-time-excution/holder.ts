export class Holder<T = undefined, E = any> {
  promise: Promise<T>;
  resolve: (value?: T) => void;
  reject: (error?: E) => void;

  constructor() {
    this.hold();
  }
  hold() {
    this.promise = new Promise((resolve, reject) =>
      Object.assign(this, { reject, resolve }),
    );
  }
}
