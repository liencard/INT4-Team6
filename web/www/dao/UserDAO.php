<?php
require_once __DIR__ . '/DAO.php';
class UserDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `int4_users`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `int4_users` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function getValidationErrors($data) {
    $errors = array();
    if(!isset($data['email'])) {
      $errors['email'] = "Please fill in a email";
    }
    if(!isset($data['password'])) {
      $errors['password'] = "Please fill in a password";
    }
    return $errors;
  }
}
