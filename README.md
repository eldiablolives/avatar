avatar
======

Avatar is a simplistic (client side) no-dependencies HTML5 image cropping library inspired by twitter.

In English: Drag'n'drop an image onto a web page, do the resizing and cropping and it uploads the cropped image to a server of your choice, just like standard file upload, bypassing the need for storing the original image. It is pure javascript, doesn't rely on any libraries.


Caveat emptor
=============

Avatar is bult on HTML5 technologies, it means it won't work in some older version of browsers. I don't have any intention to make Avatar backward compatible with older browsers because from my personal perspective that's a fool's errand and it goes against the principle of Avatar.

If you must support older versions of browsers, it is your responsibility to provide alternatives that support it. I know of a really good "gopher" library.

Getting started
===============

HTML:

&lt;div id="avatar">&lt;/div>

Javascript:

var avatar = new Avatar('avatar', {border: 100, constrain: 350});

constructor:
Avatar(domElementId, properties)

Properties
===========

border: numeric
---------------

Expands into

offsetX: numeric,
offsetY: numeric,
offsetW: numeric,
offsetH: numeric

{border: 100} := { offsetX: 100, offsetY: 100, offsetW: 100, offsetH: 100 }

Border is a shortcut property for lazy people like me, when having equal offset size from each side.

This is important, if you mess it up, the image won't scale correctly.


constrain: numeric
------------------

Expands into

constrainHeight: numeric,
constrainWidth: numeric

{constrain: 100} := { constrainHeight: 100, constrainWidth: 100 }

constrain is the cropped image size, if you use a really large image then the crop will be really large, unless if you constrain it to a size, then we'll resize it to a more palatable (screen resolution) thats quick to transfer


API
===

crop() - just crop it, and gimmie the dataURL

crop(callback) - do the same as crop but call my callback method when finished. Callback signature: function (err, dataUrl)

crop(url, callback) - same as crop(callback) only upload the resulting image to a server

on(callback) - listen to all events, callback signature: function(eventName, data)

on(eventName, callback) - same as on(callback) only fires when specific event is dispatched


events
======

imageAdded - if you drag & drop multiple images, only the first will be considered, others discarded.

cropped - after image is cropped. This is an asynchronous way to get a synchronous response

upload - when upload starts

uploaded - when images is uploaded

error - if there is some sort of error





