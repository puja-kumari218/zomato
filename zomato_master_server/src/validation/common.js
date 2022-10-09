import joi from "joi";

export const validateId = (id) =>{
    const schema = joi.object({
        _id : joi.string().required()
    });
    return schema.validateAsync(id);
};

export const validateCategory = (category) => {
    const Schema = joi.object({
      category : joi.string().required()
    });

    return Schema.validateAsync(category);
};