const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// JWT Authentication
const authJwt = require('./helpers/jwt');
app.use(authJwt());

// Static file serving
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
//app.use('/public/productUploads', express.static(__dirname + '/public/productUploads'));

// Error handling
const errorHandler = require('./helpers/error-handler.js');
app.use(errorHandler);

// Routes
const api = process.env.API_URL;
app.use(`${api}/categories`, require('./routes/categories'));
app.use(`${api}/products`, require('./routes/products'));
app.use(`${api}/users`, require('./routes/users'));
app.use(`${api}/orders`, require('./routes/orders'));

// Database Connection
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'gasafe-db',
})
  .then(() => {
    console.log('Database Connection is ready...');
  })
  .catch((error) => {
    console.log(error);
  });

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





// const express = require('express');
// const app = express();
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv/config');
// const authJwt = require('./helpers/jwt');
// const errorHandler = require('./helpers/error-handler.js');

// app.use(cors());
// app.options('*', cors());

// //middleware
// app.use(express.json());
// app.use(morgan('tiny'));
// app.use(authJwt());
// app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
// app.use(errorHandler);

// //Routes
// const categoriesRoutes = require('./routes/categories');
// const productsRoutes = require('./routes/products');
// const usersRoutes = require('./routes/users');
// const ordersRoutes = require('./routes/orders');

// const api = process.env.API_URL;

// app.use(`${api}/categories`, categoriesRoutes);
// app.use(`${api}/products`, productsRoutes);
// app.use(`${api}/users`, usersRoutes);
// app.use(`${api}/orders`, ordersRoutes);

// //Database
// mongoose
//     .connect(process.env.CONNECTION_STRING, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         dbName: 'gasafe-db',
//     })
//     .then(() => {
//         console.log('Database Connection is ready...');
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// //Server
// app.listen(3000, () => {
//     console.log('server is running http://localhost:3000');
// });