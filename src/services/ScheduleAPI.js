import { del, post, get } from '~/services/BaseService';
import API_CODE from '~/utils/api_code';

const getSchedule = async (success, error, params) => {
    await get(API_CODE.API_GET_SCHEDULE, success, error, params);
};

export const ScheduleAPI = {
    getSchedule,
}