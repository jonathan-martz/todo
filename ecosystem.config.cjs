module.exports = {
    apps: [
      {
        name: 'NuxtTodo',
        port: '4090',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs'
      }
    ]
  }