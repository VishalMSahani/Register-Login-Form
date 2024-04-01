class ApiError extends Error{
    constructor(
        statusCode,
        message= "Something went Wrong",
        error = [],
        
    ){
        super(message);
        this.statusCode = statusCode;
        this.data = null
        this.error = error;
        this.message = message;
        this.success = false;
     }
}

export {ApiError}