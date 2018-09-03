if(process.env.NODE_ENV === 'production'){
  //este archivo decide entre cada fichero dependiendo del entorno
  // 'production' o 'development' (estando en heroku esto cambia y
  // usa las variables de entorno definidas en heroku)
  module.exports = require('./prod')
}else{
  module.exports = require('./dev')
}