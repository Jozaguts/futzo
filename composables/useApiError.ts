import { FetchError } from 'ofetch';

const VALIDATION_ERROR_CODE = 422;
const SERVER_ERROR_CODE = 500;
const FORBIDDEN_CODE_ERROR = 403;
const ERRORS_BAG = [VALIDATION_ERROR_CODE, SERVER_ERROR_CODE, FORBIDDEN_CODE_ERROR]

export const useApiError = (error: FetchError) => {

    return {
        code: error.response.status,
        message: error.data.message,
    };
};