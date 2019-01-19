[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-icon.svg)](https://angular.io/) [![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg)](https://electronjs.org/)

# Introduction

Bandwagon VPS controller PC client build on Electron + Angular

## Getting Started

Clone this repository locally :

``` bash
git clone git@github.com:zgm4z/bandwagon-controller.git
```

Install dependencies with npm :

``` bash
npm install
```

If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

``` bash
npm install -g @angular/cli
```
run:
```bash
npm run start
```

## ScreenShot

![index](screenshot/index.png)

![state](screenshot/detail.png)

![](screenshot/state.png)

## feature

- [x] status controll
- [x] statistic with graph
- [x] reset root password
- [x] reinstall os
- [x] migrate  dc
- [ ] snapshot
- [ ] backup
- [ ] shell
- [ ] ovz vps statistic support
