// import { decorate, observable } from "mobx";
//import { v4 } from 'uuid';
import { decorate, observable, action } from 'mobx';

class User {
  constructor({ id, store, ...json }) {
    this.id = id;
    if (!store) {
      throw new Error('voorzie een store');
    }
    this.store = store;
    this.updateFromJson(json);
    this.store.addUser(this);
  }

  updateFromJson = ({
    name = undefined,
    avatar = undefined
  }) => {
    this.name = name !== undefined ? name : this.name;
    this.avatar = avatar !== undefined ? avatar : this.avatar;

  };
}

decorate(User, {
  name: observable,
  avatar: observable,
  updateFromJson: action
});

export default User;
