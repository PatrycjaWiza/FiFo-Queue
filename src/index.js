import * as localForage from 'localforage';
import { v4 as uuidv4 } from 'uuid';

class Queue {
  #SomeFifoName;
  constructor(SomeFifoName) {
    this.#SomeFifoName = SomeFifoName;
    const id = uuidv4();
    const elementId = `${this.#SomeFifoName}Element-${id}`;
    const getStorage = () => {
      return localForage.getItem(this.#SomeFifoName);
    };
    //fix null value - does not goes through this step
    if (!getStorage(this.#SomeFifoName)) {
      localForage.setItem(this.#SomeFifoName, {
        [`${this.#SomeFifoName}Head`]: elementId,
        [`${elementId}-next`]: '',
        [`${elementId}-prev`]: '',
        [`${elementId}-value`]: elementId,
        [`${this.#SomeFifoName}Tail`]: elementId,
        [`${this.#SomeFifoName}LastIndex`]: id,
      });
    } else {
      const getLastIndex = () => {
        getStorage(this.#SomeFifoName).then(
          res => res[`${this.#SomeFifoName}LastIndex`]
        );
      };
      localForage.setItem(this.#SomeFifoName, {
        ...localForage.getItem(this.#SomeFifoName),
        [`${this.#SomeFifoName}Head`]: elementId,
        [`${elementId}-next`]: '',
        [`${elementId}-prev`]: getLastIndex(),
        [`${elementId}-value`]: elementId,
        [`${this.#SomeFifoName}LastIndex`]: id,
      });
    }
  }
  push_head(element) {
    getStorage(this.#SomeFifoName).then(res => {
      localForage.setItem(this.#SomeFifoName, {
        ...res,
        [`${this.#SomeFifoName}Head`]: element,
      });
    });
  }
  pop_tail() {
    return getStorage(this.#SomeFifoName).then(res => {
      return (
        delete res[`${this.#SomeFifoName}Tail`],
        localForage.setItem(this.#SomeFifoName, res)
      );
    });
  }
  tail() {
    return getStorage(this.#SomeFifoName).then(res =>
      console.log(
        `Tail element ${this.#SomeFifoName}LastIndex: `,
        res[`${this.#SomeFifoName}LastIndex`]
      )
    );
  }
  head() {
    return getStorage(this.#SomeFifoName).then(res =>
      console.log(
        `Head element ${this.#SomeFifoName}Head: `,
        res[`${this.#SomeFifoName}Head`]
      )
    );
  }
}

const fifo = new Queue('SomeFifoName');
