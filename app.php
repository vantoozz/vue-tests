<?php

namespace Example;

require_once __DIR__ . '/vendor/autoload.php';

use Twig_Environment;
use Twig_Loader_Filesystem;
use Whoops\Handler\PrettyPageHandler as Handler;
use Whoops\Run;


$run     = new Run;
$handler = new Handler;

$run->pushHandler($handler);
$run->register();

$loader = new Twig_Loader_Filesystem(__DIR__ . '/templates/');
$twig   = new Twig_Environment($loader);
echo $twig->render('main.twig');
