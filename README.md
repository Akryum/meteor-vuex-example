# Simple meteor app with vuex

A simple meteor project featuring [vue](https://vuejs.org/) as ui layer ([more info](https://github.com/Akryum/meteor-vue-component)), with [state management](https://github.com/Akryum/meteor-vue-component/tree/master/packages/vuex).

## Steps to reproduce

In the console, create the project and add the relevant packages:

    meteor create meteor-vuex-example
    cd ./meteor-vuex-example
    meteor remove blaze-html-templates autopublish insecure
    meteor add static-html check akryum:vue akryum:vue-component akryum:vuex akryum:vue-less
    meteor

All the required npm dependencies will be automatically added to your project's `package.json` and installed with `meteor npm install`.

Replace the `client/main.html` file with:

```html
<head>
  <title>meteor-vuex-example</title>
</head>

<body>
  <app></app>
</body>
```

Replace the `client/main.js` file with:

```javascript
// Libs
import {Meteor} from 'meteor/meteor';
import {Vue} from 'meteor/akryum:vue';

// Main app
import App from '/imports/ui/App.vue';

Meteor.startup(() => {
  new Vue({
    el: 'body',
    replace: false,
    components: {
      App
    }
  });
});
```

Create store modules and add components with `vuex` options ([more info](https://github.com/Akryum/meteor-vue-component/tree/master/packages/vuex#usage)).
