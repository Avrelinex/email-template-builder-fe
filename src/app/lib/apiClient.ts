import axios, { AxiosInstance, AxiosResponse } from "axios";
import { CreateTemplateDto } from "./dto/CreateTemplate.dto";
import { UpdateTemplateDto } from "./dto/UpdateTemplate.dto";
import { TemplateDto } from "./dto/Template.dto";

export class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;
  //Idk maybe we should pass the url inside of a constructor here instead of hardcoding it
  private static baseURL = "http://localhost:3000";

  private constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      return new ApiClient(this.baseURL);
    }
    return ApiClient.instance;
  }

  public async getTemplates(): Promise<TemplateDto[]> {
    try {
      const response: AxiosResponse<TemplateDto[]> =
        await this.axiosInstance.get(`/templates`);

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch email templates");
    }
  }

  public async getTemplateByID(id: string): Promise<TemplateDto> {
    try {
      const response: AxiosResponse<TemplateDto> = await this.axiosInstance.get(
        `/templates/${id}`
      );

      return response.data;
    } catch (error) {
      throw new Error(`Failed to get email template by id ${id}`);
    }
  }

  public async createTemplate(
    template: CreateTemplateDto
  ): Promise<TemplateDto> {
    try {
      const response: AxiosResponse<TemplateDto> =
        await this.axiosInstance.post(`/templates`, template);

      return response.data;
    } catch (error) {
      throw new Error(`Failed to create new email template`);
    }
  }

  public async updateTemplate(
    id: string,
    template: UpdateTemplateDto
  ): Promise<TemplateDto> {
    try {
      const response: AxiosResponse<TemplateDto> =
        await this.axiosInstance.patch(`/templates/${id}`, template);

      return response.data;
    } catch (error) {
      throw new Error(`Failed to update email template with id ${id} `);
    }
  }

  public async deleteTemplate(id: string): Promise<TemplateDto> {
    try {
      const response: AxiosResponse<TemplateDto> =
        await this.axiosInstance.delete(`/template/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete email template with id ${id}`);
    }
  }
}
