# Проект Mesto фронтенд + бэкенд

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
Install ESLint either locally or globally. (Note that locally, per project, is strongly preferred)

$ npm install eslint --save-dev
If you installed ESLint globally, you have to install React plugin globally too. Otherwise, install it locally.

$ npm install eslint-plugin-react --save-dev
Configuration
Use our preset to get reasonable defaults:

  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ]
If you are using the new JSX transform from React 17, extend react/jsx-runtime in your eslint config (add "plugin:react/jsx-runtime" to "extends") to disable the relevant rules.

You should also specify settings that will be shared across all the plugin rules. (More about eslint shared settings)

{
  "settings": {
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use,
                                         // default to "createReactClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "fragment": "Fragment",  // Fragment to use (may be a property of <pragma>), default to "Fragment"
      "version": "detect", // React version. "detect" automatically picks the version you have installed.
                           // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                           // default to latest and warns if missing
                           // It will default to "detect" in the future
      "flowVersion": "0.53" // Flow version
    },
    "propWrapperFunctions": [
        // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
        "forbidExtraProps",
        {"property": "freeze", "object": "Object"},
        {"property": "myFavoriteWrapper"},
        // for rules that check exact prop wrappers
        {"property": "forbidExtraProps", "exact": true}
    ],
    "componentWrapperFunctions": [
        // The name of any function used to wrap components, e.g. Mobx `observer` function. If this isn't set, components wrapped by these functions will be skipped.
        "observer", // `property`
        {"property": "styled"}, // `object` is optional
        {"property": "observer", "object": "Mobx"},
        {"property": "observer", "object": "<pragma>"} // sets `object` to whatever value `settings.react.pragma` is set to
    ],
    "formComponents": [
      // Components used as alternatives to <form> for forms, eg. <Form endpoint={ url } />
      "CustomForm",
      {"name": "Form", "formAttribute": "endpoint"}
    ]
    "linkComponents": [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      {"name": "Link", "linkAttribute": "to"}
    ]
  }
}
If you do not use a preset you will need to specify individual rules and add extra configuration.

Add "react" to the plugins section.

{
  "plugins": [
    "react"
  ]
}
Enable JSX support.

With ESLint 2+

{
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
Enable the rules that you would like to use.

  "rules": {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  }
