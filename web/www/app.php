<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollectorProxy as RouteCollectorProxy;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/dao/AncestorDAO.php';
require __DIR__ . '/dao/UserDAO.php';
require __DIR__ . '/dao/BookmarksDAO.php';

try {
  $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
  $dotenv->load();
} catch (Exception $e) {
}

date_default_timezone_set('UTC');


/**
 * Instantiate App
 *
 * In order for the factory to work you need to ensure you have installed
 * a supported PSR-7 implementation of your choice e.g.: Slim PSR-7 and a supported
 * ServerRequest creator (included with Slim PSR-7)
 */
$app = AppFactory::create();

// Add Routing Middleware
$app->addRoutingMiddleware();

$app->addBodyParsingMiddleware();

/**
 * Add Error Handling Middleware
 *
 * @param bool $displayErrorDetails -> Should be set to false in production
 * @param bool $logErrors -> Parameter is passed to the default ErrorHandler
 * @param bool $logErrorDetails -> Display error details in error log
 * which can be replaced by a callable of your choice.

 * Note: This middleware should be added last. It will not handle any exceptions/errors
 * for middleware added after it.
 */
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

// Define app routes
$app->group('/api', function (RouteCollectorProxy $routeGroup) {

  $routeGroup->group('/ancestors', function (RouteCollectorProxy $routeGroup) {
    $routeGroup->get('', function (Request $request, Response $response) {
      $ancestorDAO = new AncestorDAO();
      $data = $ancestorDAO->selectAll();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
    $routeGroup->get('/{id}', function (Request $request, Response $response, $args) {
      $ancestorDAO = new AncestorDAO();
      $data = $ancestorDAO->selectById($args['id']);
      // 2 mogelijke uitkomsten/routes
      if (empty($data)) { // id bestaat niet
        return $response
              ->withStatus(404);
      }
      $response->getBody()->write(json_encode($data)); // id bestaat wel
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
  });

  $routeGroup->group('/users', function (RouteCollectorProxy $routeGroup) {
    $routeGroup->get('', function (Request $request, Response $response) {
      $userDAO = new UserDAO();
      $data = $userDAO->selectAll();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
  });

    $routeGroup->group('/bookmarks', function (RouteCollectorProxy $routeGroup) {
    // GET BOOKMARKS
    $routeGroup->get('', function (Request $request, Response $response) {
      $bookmarkDAO = new BookmarkDAO();
      $data = $bookmarkDAO->selectBookmarksByUser();
      $response->getBody()->write(json_encode($data));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });

    // ADD BOOKMARKS
    $routeGroup->post('', function (Request $request, Response $response, $args) {
      $bookmarkDAO = new BookmarkDAO();
      $input = $request->getParsedBody();

      $errors = $bookmarkDAO->getValidationErrors($input);
      if (!empty($errors)) {
        $response->getBody()->write(json_encode($errors));
        return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(422);
      }
      $result = $bookmarkDAO->insert($input);
      $response->getBody()->write(json_encode($result));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });

    // DELETE BOOKMARK
    $routeGroup->delete('/{id}', function (Request $request, Response $response, $args) {
      $bookmarkDAO = new BookmarkDAO();
      $data = $bookmarkDAO->selectById($args['id']);
      //$id = $bookmarkDAO->selectById($args['id']);

      if (empty($data)) {
        return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(404);
      }
      $result = $bookmarkDAO->delete($data);
      $response->getBody()->write(json_encode($result));
      return $response
              ->withHeader('Content-Type', 'application/json')
              ->withStatus(200);
    });
  });
});

// send all other routes to our react app
$app->get('[/{params:.*}]', function(Request $request, Response $response) {
  $file = __DIR__ . '/html/build/index.html';
  $response->getBody()->write(file_get_contents($file));
  return $response
              ->withStatus(200);
});

// Run app
$app->run();