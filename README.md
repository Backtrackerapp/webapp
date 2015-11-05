# Backtracker technical documentation

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.11.1.

The frontend mainly exists out of AngularJS, Underscore and jQuery. To produce the interactive, custom styled map, LeafLet and MapBox is used.

The backend,which is written in Ruby on Rails, is not included in this repo but should contain sufficient code to add features to the frontend.

Every custom written code is found in the `app` folder:
   - styles folder contain the SASS styles. If you write SASS, it will be automatically build to CSS on save / build / serve.
   - views folder contains all the HTML views.
   - scripts folder contains the angular controllers, services and directives. If you don`t know what a directive is, have a quick look [here](https://docs.angularjs.org/guide/directive).
   - `app.js` file is the start of the appliction. It contains the routing information, factory setup and dependency info for the angular app.

   - above are the first version notes. I will leave them here for legacy reasons.
    - the project has changed much, ng-controller will not be found in the HTML. Instead I have opted to use directives to combine html and javascript. This has resulted in more readable HTML and better organized file system (in my opinion).
    - the angular-mapbox source code has been edited to extend functionality.

## Prerequisites

- You need Ruby installed. On Mac, this comes pre-installeed. For windows, get it [here](http://rubyinstaller.org/).
- You need compass. do this via the command line: `gem update --system` and then `gem install compass`
- you need Node JS, **make sure it is version  v0.10.33**. Get is [here](http://nodejs.org/dist/v0.10.33/). I noticed the newest version of NodeJs doesn`t quite
  complete the build process as it should.
- you need Grunt (v0.4.5 if possible) via http://gruntjs.com/

## Installing the project

- Clone a copy of the repo to your desktop. The private repo to clone [is here](]https://github.com/qipcreative/backtracker-frontend). You`ll need to ask Joseph Robertson for access (joe@qipcreative.com).
- In the command line, navigate to the root of the project with the `cd` command.
- in the command line do:
	- `npm install`
	- if you get errors saying a certain file should be moved away, use `npm clear cache`

## Local development

To test changes you made to the application, use the `grunt server --force` command (assuming you`re in the root of the project).

## Build (update on production)

Building the application will also move everything to production, so use with care!.

In the command line:

 - `cd` to the projeect root
 - use `grunt build`

## Things you should be aware of

If you are testing features and you block a person, you can`t unblock him/her, so use with care.

## Test credentials

Facebook test account:

email: lisa_cxfxaer_jones@tfbnw.net

password: test

You can log in with your own facebook account as well.

## Contacts

 - CEO & founder: Henry Latham (Henry@backtrackerapp.co.uk)
 - Main developer: Joseph Robertson (joe@qipcreative.com). Only contact him for small things as he is not supporting the project anymore.
 - Bugfixer, secondary developer: Maarten Belmans (hello@maartenbelmans.com)
