/*=======================================================================
  This model is still setup for the old version of orders
  i didn't bother editing it because orders are now shown on a
  static way in dashboard.
  if you ever edit it set it up to the the new moovobrain options
  =======================================================================*/


const mongoose = require('mongoose');
const validator = require('validator').default;
const orderSchema = new mongoose.Schema({
    mode: {
        type: String,
        enum: ['voice', 'brain'],
        default: 'voice'
    },
    status: {
        type: String,
        default: 'submitted',
        enum: ['submitted', 'pending', 'rejected', 'validated', 'pre-ordered']
    },
    pricePurchase: {
        type: Number,
        default: 0
    },
    priceShipping: {
        type: Number,
        default: 0
    },
    priceTaxes: {
        type: Number,
        default: 0
    },
    priceTotal: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 1
    },
    paymentSlipURL: {
        type: String,
        default: null
    },
//  Wheelchair
    steeringSystem: {
        type: Boolean,
        default: true
    },
    headset: {
        type: Boolean,
        default: true
    },
    wheelchair: {
        type: Boolean,
        default: true
    },
    mobileApp: {
        type: Boolean,
        default: true
    },
//  Safety
    obstacleDetection: {
        type: Boolean,
        default: true
    },
    camera: {
        type: Boolean
    },
    gps: {
        type: Boolean
    },
    notifications: {
        type: Boolean
    },
    sms: {
        type: Boolean
    },
//  Accessories
    securityBelt: {
        type: Boolean,
        default: true
    },
    headrest: {
        type: Boolean
    },
    mirror: {
        type: Boolean
    },
    table: {
        type: Boolean
    },
    rearCamera: {
        type: Boolean
    },
// Services
    trainingSession: {
        type: Boolean
    },
    trainingHours: {
        type: String | Number
    },
    control: {
        type: Boolean
    },
    controlYears: {
        type: String | Number
    },
    controlYearsAdded: {
        type: Number
    },
    demo: {
        type: Boolean,
        default: true
    },
//  Client Nature , individual or organisation
    clientNature: {
        type: String,
        lowercase: true,
        trim: true,
        enum: ['individual', 'organisation']
    },
//  Individuals form
    iName: {
        type: String,
        trim: true
    },
    iEmail: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value) && value !== '') {
                throw new Error('Email is not valid!')
            }
        }
    },
    iBirthday: {
        type: Date
    },
    iAddress: {
        type: String,
        trim: true
    },
    iZipCode: {
        type: Number
    },
    iPhone: {
        type: Number
    },
    iHandicap: {
        type: String,
        default: 'Not specified',
        trim: true
    },
//  Organisation form
    oName: {
        type: String,
        trim: true
    },
    oType: {
        type: String,
        trim: true
    },
    oSector: {
        type: String,
        trim: true
    },
    oRegistrationNumber: {
        type: String,
        trim: true
    },
    oResponsibleName: {
        type: String,
        trim: true
    },
    oHandicap: {
        type: String,
        trim: true
    },
    oAddress: {
        type: String,
        trim: true
    },
    oZipCode: {
        type: Number
    },
    oPhone: {
        type: Number
    },
    oEmail: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value) && value !== '') {
                throw new Error('Email is not valid!')
            }
        }
    }
}, {timestamps: true});

orderSchema.methods.toJSON = function () {
    const orderObject = this.toObject();
    orderObject.id = orderObject._id;
    delete orderObject._id;
    delete orderObject.__v;
    for (const property in orderObject) {
        if (!orderObject[property] || orderObject[property].length === 0) {
            delete orderObject[property];
        }
    }
    return orderObject;
}

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
