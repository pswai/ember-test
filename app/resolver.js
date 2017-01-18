import Ember from 'ember';

// Get everything except *.html (for index.html)
const context = require.context('.', true, /^((?!html$).)*$/);

function resolveOther(parsedName) {
  const variations = [
    `./${parsedName.type}s/${parsedName.fullNameWithoutType}`,
    `./${parsedName.type}s/${parsedName.fullNameWithoutType}.js`,
    `./${parsedName.type}s/${parsedName.fullNameWithoutType}.hbs`
  ];

  for (let i = 0; i < variations.length; ++i) {
    const name = variations[i];
    if (context.keys().indexOf(name) > -1) {
      const module = context(name);

      return module.default || module;
    }
  }
}

export default Ember.DefaultResolver.extend({
  parseName(fullName) {
    const [type, name] = fullName.split(':');

    return {
      fullName: fullName,
      type: type,
      fullNameWithoutType: name,
      name: name,
      root: Ember.get(this, 'namespace'),
      resolveMethodName: 'resolve' + Ember.String.classify(type)
    };
  },

  resolveRouter(parsedName) {
    if (parsedName.fullName === 'router:main') {
      if (context.keys().indexOf('./router') > -1) {
        return context('./router').default;
      }
    }
  },

  resolveTemplate: resolveOther,
  resolveOther
});
