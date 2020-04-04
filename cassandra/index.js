var cassandra = require('cassandra-driver'); 
//Replace Username and Password with your cluster settings
// var authProvider = new cassandra.auth.PlainTextAuthProvider('Username', 'Password');
//Replace PublicIP with the IP addresses of your clusters
var client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'grocery'
});
 
//Execute the queries 
var query = 'SELECT name, price_p_item FROM grocery.fruit_stock WHERE name=? ALLOW FILTERING';
client.execute(query, ['oranges'], (err, result) => {
  (err) ? console.log(err) : console.log('The cost per orange is $' + result.rows[0].price_p_item);
});
