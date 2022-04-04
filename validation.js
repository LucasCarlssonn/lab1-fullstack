const joi = require("@hapi/joi");


// Validates the format of the registration
const validateUser = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        age: joi.number().required()
    });
    return schema.validate(data);
};


module.exports = {validateUser};