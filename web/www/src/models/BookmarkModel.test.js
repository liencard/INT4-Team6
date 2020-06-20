import Bookmark from './BookmarkModel';
import RootStore from '../stores';

test('Create a new bookmark', () => {
  const store = new RootStore();
  const bookmark = new Bookmark({ name: 'Test', store: store.bookmarkStore });
  expect(bookmark.name).toBe('Test');
});

test("Can't create a bookmark without a store", () => {
  expect(() => new Bookmark({ name: 'testbookmark' })).toThrow(
    'voorzie een store'
  );
});

test('Store must have a reference to a created bookmark', () => {
  const store = new RootStore();
  expect(store.bookmarkStore.bookmarks.length).toBe(0);
  const bookmark = new Bookmark({
    name: 'testbookmark',
    store: store.bookmarkStore,
  });
  expect(store.bookmarkStore.bookmarks.length).toBe(1);
  expect(store.bookmarkStore.bookmarks[0]).toStrictEqual(bookmark);
});

test('updateFromJson sets the correct properties of the bookmark', () => {
  const store = new RootStore();
  const bookmark = new Bookmark({
    name: 'testbookmark',
    birthdate: '2020',
    store: store.bookmarkStore,
  });
  bookmark.updateFromJson({
    name: 'updated name',
    birthdate: 'updated birthdate',
  });
  expect(bookmark.name).toBe('updated name');
  expect(bookmark.birthdate).toBe('updated birthdate');
});

test('updateFromJson does not overwrite properties not passed in', () => {
  const store = new RootStore();
  const bookmark = new Bookmark({
    name: 'testbookmark',
    birthdate: '2020',
    store: store.bookmarkStore,
  });
  bookmark.updateFromJson({
    birthdate: '2011',
  });
  expect(bookmark.name).toBe('testbookmark');
  expect(bookmark.birthdate).toBe('2011');
  bookmark.updateFromJson({
    name: 'updated name',
  });
  expect(bookmark.name).toBe('updated name');
  expect(bookmark.birthdate).toBe('2011');
});

test('asJson returns an object with the basic properties', () => {
  const store = new RootStore();
  const bookmark = new Bookmark({
    name: 'testbookmark',
    birthdate: 'testdata',
    deathdate: 'testdata',
    user_id: 'testdata',
    ancestor_id: 'testdata',
    store: store.bookmarkStore,
  });
  expect(bookmark.asJson).toMatchObject({
    id: bookmark.id,
    name: 'testbookmark',
    birthdate: 'testdata',
    deathdate: 'testdata',
    user_id: 'testdata',
    ancestor_id: 'testdata',
  });
});