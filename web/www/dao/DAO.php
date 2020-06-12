<?php

class DAO {

  // Properties
  private static $sharedPDO;
  protected $pdo;

  // Constructor
  function __construct() {

    if(empty(self::$sharedPDO)) {

      $dbHost = getenv('PHP_DB_HOST') ?: "int4-mysql";
      $dbName = getenv('PHP_DB_DATABASE') ?: "int4";
      $dbUser = getenv('PHP_DB_USERNAME') ?: "root";
      $dbPass = getenv('PHP_DB_PASSWORD') ?: "devine4life";

      // "mysql:host=" . getenv('PHP_DB_HOST') . ";dbname=" . getenv('PHP_DB_DATABASE'), getenv('PHP_DB_USERNAME'), getenv('PHP_DB_PASSWORD')

      self::$sharedPDO = new PDO("mysql:host=". $dbHost .";dbname=". $dbName, $dbUser, $dbPass);
      self::$sharedPDO->exec("SET CHARACTER SET utf8");
      self::$sharedPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      self::$sharedPDO->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    }

    $this->pdo =& self::$sharedPDO;

  }

  // Methods

}
