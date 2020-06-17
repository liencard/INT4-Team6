<?php
require_once __DIR__ . '/DAO.php';
class AncestorDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `int4_ancestors`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  // public function getValidationErrors($data) {
  //   $errors = array();
  //   if(!isset($data['user_id'])) {
  //     $errors['user_id'] = "Please fill in a user id";
  //   }
  //   if(!isset($data['ancestor_id'])) {
  //     $errors['ancestor_id'] = "Please fill in a ancestor id";
  //   }
  //   return $errors;
  // }
}