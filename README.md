avatar
======

simple library to crop avatar image on a client and pass it on to a server.

I grew frustrated with cropping images and although there are many wonderful libraries out there, they just didn't cut it for me so I did my own.

What avatar does:

* loads up a dropped image
* resizses and crops it (inspired by twitter's avatar)
* then uploads crop-only to a server, don't really care about a master image

how does it work?

have a look at the html code, I made it purposely sterile, boring and simple.

questions?

ask

Getting started
===============

HTML:

<div id="avatar"></div>

Javascript:

var avatar = new Avatar('avatar', {border: 100, constrain: 350});

constructor:
Avatar(domElementId, properties)

Properties
===========

border: num

or

offsetX: num,
offsetY: num,
offsetW: num,
offsetH: num

{border: 100} := { offsetX: 100, offsetY: 100, offsetW: 100, offsetH: 100 }

constrain: num

or

constrainHeight: num,
constrainWidth: num

{constrain: 100} := { constrainHeight: 100, constrainWidth: 100 }


what's all that?
================

offset is the border size, the image shows under border

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

imageAdded

multipleImagesAdded - avatar will process only the first image but you'll get the notification

cropped

upload

uploadEnd





