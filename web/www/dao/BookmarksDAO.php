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

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `int4_bookmarks` (`id`, `user_id`, `ancestor_id`) VALUES (:id, :user_id, :ancestor_id)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':user_id', $data['user_id']);
      $stmt->bindValue(':ancestor_id', $data['ancestor_id']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function getValidationErrors($data) {
    $errors = array();
    if(!isset($data['user_id'])) {
      $errors['user_id'] = "Please fill in a user id";
    }
    if(!isset($data['ancestor_id'])) {
      $errors['ancestor_id'] = "Please fill in a ancestor id";
    }
    return $errors;
  }
}
