# Contacts-app

- Client - Angular 4 Web app
- Server - C# .NET Core Web API (Visual Studio 2017)
- Cordova - Hybrid app (Android)

## Pre-requisites

### Client

Angular CLI: Installed `npm install -g @angular/cli`

Node.js: Installed (https://nodejs.org)

### Cordova

Cordova CLI: Installed -> `npm install -g cordova`


Web app build -> `ng build --environment=local --base-href . --output-path=../cordova/www`

Or execute `build_android.bat`

### Server

Visual Studio 2017: Installed

Open Solution and Run server (`http://localhost:60829/api`)

## Run
```
Using Web API
ng serve

Using Local Storage:
ng serve --environment=local

App runs at `http://localhost:4200/`
```
The app will automatically reload if you change any of the source files.

## Cordova Hybrid app
```
Client build
ng build --environment=local --output-path=../cordova/www

Run on Android device
cordova run android
```
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
