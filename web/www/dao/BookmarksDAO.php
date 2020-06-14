<?php
require_once __DIR__ . '/DAO.php';
class BookmarkDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `int4_bookmarks`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectBookmarksByUser() {
    $sql = "SELECT * FROM `int4_bookmarks` INNER JOIN `int4_ancestors` ON `int4_bookmarks`.`ancestor_id` = `int4_ancestors`.`id`";
    $stmt = $this->pdo->prepare($sql);
    // $stmt->bindValue(':user', $user);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
}
