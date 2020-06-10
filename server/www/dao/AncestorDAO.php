<?php
require_once __DIR__ . '/DAO.php';
class AncestorDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `int4_ancestors`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
}
