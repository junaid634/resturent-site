const joi = require("joi");
module.exports.serverschema = joi.object({
title: joi.string().required(),
description: joi.string().required(),
image: joi.string().allow("",null),
price: joi.number().required(),
location: joi.string().required(),
country: joi.string().required(),
onwer: joi.required(),

});
module.exports.reviewschema = joi.object({
    review: joi.object({
        rat: joi.number().required().min(1).max(5),
        content: joi.string().required(),
        rOwner: joi.required(),
    }).required(),
});