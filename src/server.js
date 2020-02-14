import server from './app.js';

server.listen(process.env.PORT || 3000, function(){
    console.log('server running on port 3000');
});


