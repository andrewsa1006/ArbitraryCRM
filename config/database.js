if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI: 
  'mongodb+srv://andy:andy@neurotronicscrm-prod-k8r6x.mongodb.net/test?retryWrites=true&w=majority'}
} else {
  module.exports = {mongoURI: 'mongodb://localhost/CRM-dev'}
}