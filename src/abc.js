const express = require('express'); // Import express correctly

const app = express(); // Create an express application instance

function middleHandler(req, res, next) {
    console.log("execute middleware");
    next();
}

app.use(function (req, res, next) {
    console.log("first middleware");
    next();
});

app.use(function (req, res, next) {
    console.log("second middleware");
    next();
});

// Apply the middleHandler to handle the GET request '/'
app.get('/', middleHandler, function (req, res) {
    console.log("end middleware function");
    res.send("page render finished");
});

app.listen(1337, () => {
    console.log('Server started on port 1337');
});
