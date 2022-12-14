import * as localForage from 'localforage';
import { v4 as uuidv4 } from 'uuid';

class Queue {
  #SomeFifoName;
  constructor(SomeFifoName) {
    this.#SomeFifoName = SomeFifoName;
    const id1 = uuidv4();
    const id2 = uuidv4();
    const id3 = uuidv4();
    const elementId1 = `${this.#SomeFifoName}Element-${id1}`;
    const elementId2 = `${this.#SomeFifoName}Element-${id2}`;
    const elementId3 = `${this.#SomeFifoName}Element-${id3}`;
    localForage
      .getItem(this.#SomeFifoName)
      .then(res => {
        if (res === null) {
          localForage.setItem(this.#SomeFifoName, {
            [`${this.#SomeFifoName}Head`]: '',

            [`${elementId1}-next`]: elementId2,
            [`${elementId1}-prev`]: '',
            [`${elementId1}-value`]: '',

            [`${elementId2}-next`]: '',
            [`${elementId2}-prev`]: '',
            [`${elementId2}-value`]: elementId2,

            [`${elementId3}-next`]: elementId2,
            [`${elementId3}-prev`]: '',
            [`${elementId3}-value`]: '',

            [`${this.#SomeFifoName}Tail`]: elementId3,
            [`${this.#SomeFifoName}LastIndex`]: id3,
          });
        } else {
          console.log(res);
          localForage.setItem(this.#SomeFifoName, { ...res });
        }
      })
      .catch(err => console.log(err));
  }
  push_head(element) {
    localForage.getItem(this.#SomeFifoName).then(res => {
      localForage.setItem(this.#SomeFifoName, {
        ...res,
        [`${this.#SomeFifoName}Head`]: element,
      });
      console.log(
        `The value of the element ${
          this.#SomeFifoName
        }Head have been changed to ${element}`
      );
    });
  }
  pop_tail() {
    return localForage.getItem(this.#SomeFifoName).then(res => {
      return (
        delete res[`${this.#SomeFifoName}Tail`],
        localForage.setItem(this.#SomeFifoName, res)
      );
    });
  }
  tail() {
    localForage
      .getItem(this.#SomeFifoName)
      .then(res => res[`${this.#SomeFifoName}Tail`])
      .catch(err => err);
  }
  head() {
    localForage
      .getItem(this.#SomeFifoName)
      .then(res => res[`${this.#SomeFifoName}Head`])
      .catch(err => err);
  }
}
export const fifo = new Queue('SomeFifoName');
