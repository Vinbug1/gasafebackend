const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
//   countInStock: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 255,
//   },
//   rating: {
//     type: Number,
//     default: 0,
//   },
//   numReviews: {
//     type: Number,
//     default: 0,
//   },
//   isFeatured: {
//     type: Boolean,
//     default: false,
//   },
//   dateCreated: {
//     type: Date,
//     default: Date.now,
//   },
});

productSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  const { _id: id, ...result } = object;
  return { ...result, id };
});

exports.Product = mongoose.model('Product', productSchema);


// const mongoose = require('mongoose');

// const productSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         default: ''
//     },
//     color: {
//         type: String,
//         required: true
//     },
//     quantity:{
//         type: Number,
//         required: true
//     },
//     price : {
//         type: Number,
//         default:0
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required:true
//     },
//     countInStock: {
//         type: Number,
//         required: true,
//         min: 0,
//         max: 255
//     },
//     rating: {
//         type: Number,
//         default: 0,
//     },
//     numReviews: {
//         type: Number,
//         default: 0,
//     },
//     isFeatured: {
//         type: Boolean,
//         default: false,
//     },
//     dateCreated: {
//         type: Date,
//         default: Date.now,
//     },
// })

// productSchema.method('toJSON', function(){
//     const { __v, ...object } = this.toObject();
//     const { _id:id, ...result } = object;
//     return { ...result, id };
// });


// exports.Product = mongoose.model('Product', productSchema);