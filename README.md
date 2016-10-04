# App Title

[![Build Status](https://travis-ci.org/elishaterada/angular-material-boilerplate.svg?branch=master)](https://travis-ci.org/elishaterada/angular-material-boilerplate)

## Pre-requisite

* Node.js: [Install latest version with n](https://github.com/tj/n)
* Yarn: [Install Yarn](https://yarnpkg.com/en/docs/install)
* Firebase: [Setup Account & Project](https://console.firebase.google.com/)

## Firebase Setup

* Create Firebase project
* Enable Google sign-in
* Update default project name in `.firebaserc`
* Update config data on `firebase.initializeApp(config)` in `public/app.js`
* Review `database.rules.json`

## Developmemt Setup

* Install packages: `yarn`
* Develop: `npm run dev`
* Test: `npm test`

## Firebase Deploy

* Install firebase tool `npm install -g firebase-tools`
* Login `firebase login`
* Deploy `firebase deploy`

## Resources

Links to resources used on this boilerplate

* [Angular 1.5 Component](https://docs.angularjs.org/guide/component)
* [Angular Material](https://material.angularjs.org/latest/)
* [Material Icons](https://material.io/icons/) - List of available font icons
* [Firebase Console](https://console.firebase.google.com/) - Console for Firebase
* [AngularFire](https://github.com/firebase/angularfire/tree/master/docs/guide) - Documentation on AngularJS specific Firebase funcitons
* [UI Router](https://ui-router.github.io/docs/1.0.0-alpha.5/index.html#/api/ui.router.router.$urlRouterProvider) - Router documentation
* [Moment](http://momentjs.com/docs/) - The date time manipulation library
* [Lodash](https://lodash.com/) - Fast and useful JavaScript function libraries
