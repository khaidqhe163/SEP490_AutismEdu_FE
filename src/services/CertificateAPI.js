const { default: API_CODE } = require("~/utils/api_code");
const { get } = require("./BaseService");

const changeCertificateStatus = async (endpoint, success, error, params) => {
    await get(API_CODE.API_CERTIFICATE_STATUS + endpoint, success, error, params);
};

export const CertificateAPI = {
    changeCertificateStatus
}