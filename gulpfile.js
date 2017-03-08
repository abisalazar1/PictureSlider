const elixir = require('laravel-elixir');


elixir(function (mix) {
    mix.sass('app.scss');
    mix.webpack('app.js');
});