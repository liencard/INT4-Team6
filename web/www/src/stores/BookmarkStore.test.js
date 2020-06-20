import Bookmark from '../models/BookmarkModel';
import RootStore from '.';
import BookmarkStore from './BookmarkStore';

test('Create a new BookmarkStore', () => {
  const store = new BookmarkStore();
  expect(store.bookmarks).toBeInstanceOf(Array);
  expect(store.bookmarks.length).toBe(0);
});

test('Find bookmark by the id', () => {
  const store = new BookmarkStore();
  const bookmark = new Bookmark({ name: 'testbookmark', store });
  const id = bookmark.id;
  expect(store.getBookmarkByAncestorid(id)).toBe(bookmark);
});

test('updateBookmarkFromServer returns a new bookmark when json is passed in', () => {
  const store = new RootStore();
  const bookmark = store.bookmarkStore.updateBookmarkFromServer({
    name: 'testbookmark',
  });
  expect(bookmark).toBeInstanceOf(Bookmark);
  expect(bookmark.name).toBe('testbookmark');
});

test('updateBookmarkFromServer updates an existing bookmark', () => {
  const store = new RootStore();
  const bookmark = new Bookmark({
    name: 'testbookmark',
    store: store.bookmarkStore,
  });
  const updateBookmark = store.bookmarkStore.updateBookmarkFromServer({
    id: bookmark.id,
    name: 'testbookmarkupdated',
  });
  expect(updateBookmark.id).toBe(bookmark.id);
  expect(updateBookmark.name).toBe('testbookmarkupdated');
  expect(updateBookmark).toBe(bookmark);
});
