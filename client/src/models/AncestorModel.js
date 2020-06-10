// import { decorate, observable } from "mobx";
import { v4 } from "uuid";

class Ancestor {
  constructor({ id = v4(), store, ...json }) {
    this.id = id;
    if (!store) {
      throw new Error('voorzie een store');
    }
    this.store = store;
    this.updateFromJson(json);
    this.store.addAncestor(this);
  }

  updateFromJson = ({ name = undefined, coordinates = undefined}) => {
    this.name = (name !== undefined) ? name : this.name;
    this.coordinates = (coordinates !== undefined) ? coordinates : this.coordinates;
  };
}

// decorate(Ancestor, {
//   name: observable,
//   coordinates: observable
// });


export default Ancestor;
