import { jsdom } from 'jsdom';
var $ = require('jquery')(require("jsdom").jsdom().defaultView);

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.$ = $;
global.navigator = global.window.navigator;
// global.Element = { prototype: {} };
