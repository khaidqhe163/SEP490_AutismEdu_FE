import axios from "~/plugins/axios";
import { initializeService } from "~/services/BaseService";
import { AuthenticationAPI } from "~/services/AuthenticationAPI";
import { UserManagementAPI } from "~/services/UserManagementAPI";
import { ClaimManagementAPI } from "~/services/ClaimManagementAPI";
import { RoleManagementAPI } from "~/services/RoleManagementAPI";
import { TutorManagementAPI } from "~/services/TutorManagementAPI";
import { CurriculumManagementAPI } from "~/services/CurriculumManagement";
import { AvailableTimeManagementAPI } from "~/services/AvailableTimeManagementAPI";

// Initialize the BaseService with the axios instance and API prefix
(function () {
  initializeService(axios, "/api");
})();

const services = {
  AuthenticationAPI,
  UserManagementAPI,
  ClaimManagementAPI,
  RoleManagementAPI,
  TutorManagementAPI,
  CurriculumManagementAPI,
  AvailableTimeManagementAPI,
};

export default services;
