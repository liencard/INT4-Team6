import User from './UserModel';
import RootStore from '../stores';

test('Create a new user', () => {
  const store = new RootStore();
  const user = new User({ name: 'Test', store: store.userStore });
  expect(user.name).toBe('Test');
});

test("Can't create a user without a store", () => {
  expect(() => new User({ name: 'testuser' })).toThrow('voorzie een store');
});

test('Store must have a reference to a created user', () => {
  const store = new RootStore();
  expect(store.userStore.users.length).toBe(0);
  const user = new User({
    name: 'testbookmark',
    store: store.userStore,
  });
  expect(store.userStore.users.length).toBe(1);
  expect(store.userStore.users[0]).toStrictEqual(user);
});

test('updateFromJson sets the correct properties of the user', () => {
  const store = new RootStore();
  const user = new User({
    name: 'testuser',
    avatar: 'testavatar',
    store: store.userStore,
  });
  user.updateFromJson({
    name: 'updated name',
    avatar: 'updated avatar',
  });
  expect(user.name).toBe('updated name');
  expect(user.avatar).toBe('updated avatar');
});

test('updateFromJson does not overwrite properties not passed in', () => {
  const store = new RootStore();
  const user = new User({
    name: 'testuser',
    birthdate: '2020',
    store: store.userStore,
  });
  user.updateFromJson({
    avatar: 'updated avatar',
  });
  expect(user.name).toBe('testuser');
  expect(user.avatar).toBe('updated avatar');
  user.updateFromJson({
    name: 'updated name',
  });
  expect(user.name).toBe('updated name');
  expect(user.avatar).toBe('updated avatar');
});
