import axios from "~/plugins/axios";
import { initializeService } from "~/services/BaseService";
import { AuthenticationAPI } from "~/services/AuthenticationAPI";
import { UserManagementAPI } from "~/services/UserManagementAPI";
import { ClaimManagementAPI } from "~/services/ClaimManagementAPI";
import { RoleManagementAPI } from "~/services/RoleManagementAPI";
import { TutorManagementAPI } from "~/services/TutorManagementAPI";
import { ChildrenManagementAPI } from "~/services/ChildrenManagementAPI";
import { CurriculumManagementAPI } from "~/services/CurriculumManagement";
import { AvailableTimeManagementAPI } from "~/services/AvailableTimeManagementAPI";
import { TutorRequestAPI } from "~/services/TutorRequestAPI";
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
  ChildrenManagementAPI,
  CurriculumManagementAPI,
  AvailableTimeManagementAPI,
  TutorRequestAPI,
};

export default services;
