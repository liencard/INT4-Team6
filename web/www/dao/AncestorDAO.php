<?php
require_once __DIR__ . '/DAO.php';
class AncestorDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `int4_ancestors`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  // public function selectAll() {
  //   $sql = "SELECT `int4_ancestors`.`id`, `int4_ancestors`.`user_id`, `int4_ancestors`.`name`, `int4_ancestors`.`coordinates`, `int4_ancestors`.`birthdate`, `int4_ancestors`.`deathdate`,
  //   `int4_ancestors`.`intro`, `int4_ancestors`.`place`
  //     FROM `int4_ancestors`
  //     LEFT JOIN `int4_ancestors_relatives` 
  //     ON `int4_ancestors`.`id` = `int4_ancestors_relatives`.`ancestor_id`";
  //   $stmt = $this->pdo->prepare($sql);
  //   $stmt->execute();
  //   return $stmt->fetchAll(PDO::FETCH_ASSOC);
  // }

  public function selectById($id) {
    $sql = "SELECT * FROM `int4_ancestors` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }
 
}