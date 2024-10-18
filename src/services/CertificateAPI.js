import { get, post, put } from "./BaseService";
import API_CODE from '~/utils/api_code';
const changeCertificateStatus = async (endpoint, params, success, error) => {
    await put(API_CODE.API_CERTIFICATE_STATUS + endpoint, params, success, error);
};

export const CertificateAPI = {
    changeCertificateStatus
}