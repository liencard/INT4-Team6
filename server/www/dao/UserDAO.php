<?php
require_once __DIR__ . '/DAO.php';
class UserDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `users`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `users` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `users` (`id`, `name`, `avatar`) VALUES (:id, :name, :avatar)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':name', $data['name']);
      $stmt->bindValue(':avatar', $data['avatar']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function update($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "UPDATE `users` SET `name` = :name, `avatar` = :avatar WHERE `id` = :id";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':name', $data['name']);
      $stmt->bindValue(':avatar', $data['avatar']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function delete($id) {
    $sql = "DELETE FROM `users` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    return $stmt->execute();
  }

  public function getValidationErrors($data) {
    $errors = array();
    if(!isset($data['name'])) {
      $errors['name'] = "Please fill in a name";
    }
    if(!isset($data['avatar'])) {
      $errors['avatar'] = "Please fill in a avatar";
    }
    return $errors;
  }
}
