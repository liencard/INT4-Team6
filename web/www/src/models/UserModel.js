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
    avatar = undefined,
    email = undefined,
    password = undefined
  }) => {
    this.name = name !== undefined ? name : this.name;
    this.avatar = avatar !== undefined ? avatar : this.avatar;
    this.email = email !== undefined ? email : this.email;
    this.password = password !== undefined ? password : this.password;
  };
}

decorate(User, {
  name: observable,
  avatar: observable,
  email: observable,
  password: observable,
  updateFromJson: action
});

export default User;
