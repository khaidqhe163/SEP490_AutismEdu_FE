import API_CODE from "~/utils/api_code";
import { get, post, put } from "./BaseService";

const listChildren = async (success, error) => {
    await get(API_CODE.API_CHILDREN_LIST, success, error);
};
export const ChildrenManagementAPI = {
    listChildren,
}