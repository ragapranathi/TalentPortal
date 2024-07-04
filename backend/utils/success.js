export const createSuccess=(statuscode, message, data) => {
    const successObj = {
        status: statuscode,
        message: message,
        data: data,
    };
    return successObj;

};