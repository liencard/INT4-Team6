import RestService from '../services/RestService';
import { decorate, observable, action } from 'mobx';
import Bookmark from '../models/BookmarkModel';

class BookmarkStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.bookmarks = [];
    this.bookmarksService = new RestService('bookmarks');
  }

  loadAllBookmarks = async () => {
    const jsonBookmarks = await this.bookmarksService.getAll();
    jsonBookmarks.forEach((json) => this.updateBookmarkFromServer(json));
  };

  createBookmark = async (bookmark) => {
    const json = await this.bookmarksService.create(bookmark);
    this.updateBookmarkFromServer(json);
  };

  deleteBookmark = async (bookmark) => {
    const json = await this.bookmarksService.delete(bookmark);
    this.updateBookmarkFromServer(json);
  };

  addBookmark = (bookmark) => {
    this.bookmarks.push(bookmark);
  };

  updateBookmarkFromServer(json) {
    let bookmark = this.bookmarks.find((bookmark) => bookmark.id === json.id);
    if (!bookmark) {
      bookmark = new Bookmark({
        id: json.id,
        store: this.rootStore.bookmarkStore,
      });
    }
    if (json.isDeleted) {
      this.bookmarks.remove(bookmark);
    } else {
      bookmark.updateFromJson(json);
    }
    return bookmark;
  }
}

decorate(BookmarkStore, {
  bookmarks: observable,
  addBookmark: action,
  updateBookmarkFromServer: action,
});

export default BookmarkStore;
