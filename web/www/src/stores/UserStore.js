import RestService from '../services/RestService';
import { decorate, observable, action } from 'mobx';
import User from '../models/UserModel';

class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.users = [];
    this.usersService = new RestService('users');
  }

  loadAllUsers = async () => {
    const jsonUsers = await this.usersService.getAll();
    jsonUsers.forEach((json) => this.updateUserFromServer(json));
  };

  loadUser = async (id) => {
    const jsonUser = await this.usersService.getById(id);
    this.updateUserFromServer(jsonUser);
    return this.resolveUser(id);
  };

  addUser = (user) => {
    this.users.push(user);
  };

  updateUserFromServer(json) {
    let user = this.users.find((user) => user.id === json.id);
    if (!user) {
      user = new User({
        id: json.id,
        store: this.rootStore.userStore,
      });
    }
    if (json.isDeleted) {
      this.users.remove(user);
    } else {
      user.updateFromJson(json);
    }
    return user;
  }

  // user ophalen op basis van zijn id + in je Message.js kan je deze functie dan ophalen
  resolveUser = (id) => this.users.find((user) => user.id === id);
}

decorate(UserStore, {
  users: observable,
  addUser: action,
  updateUserFromServer: action,
});

export default UserStore;
