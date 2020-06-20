import User from '../models/UserModel';
import RootStore from '.';
import UserStore from './UserStore';

test('Create a new UserStore', () => {
  const store = new UserStore();
  expect(store.users).toBeInstanceOf(Array);
  expect(store.users.length).toBe(0);
});

test('Find user by the id', () => {
  const store = new UserStore();
  const user = new User({ name: 'testuser', store });
  const id = user.id;
  expect(store.resolveUser(id)).toBe(user);
});

test('updateUserFromServer returns a new user when json is passed in', () => {
  const store = new RootStore();
  const user = store.userStore.updateUserFromServer({
    name: 'testuser',
  });
  expect(user).toBeInstanceOf(User);
  expect(user.name).toBe('testuser');
});

test('updateUserFromServer updates an existing user', () => {
  const store = new RootStore();
  const user = new User({
    name: 'testuser',
    store: store.userStore,
  });
  const updateUser = store.userStore.updateUserFromServer({
    id: user.id,
    name: 'testuserupdated',
  });
  expect(updateUser.id).toBe(user.id);
  expect(updateUser.name).toBe('testuserupdated');
  expect(updateUser).toBe(user);
});
