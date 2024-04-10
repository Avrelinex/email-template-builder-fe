import axios, { AxiosInstance, AxiosResponse } from "axios";
import { CreateTemplateDto } from "./dto/CreateTemplate.dto";
import { UpdateTemplateDto } from "./dto/UpdateTemplate.dto";
import { TemplateDto } from "./dto/Template.dto";

export interface ImageResponse {
  id: string;
  displayName: string;
}

export class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;
  private static baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  private constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  static getInstance(): ApiClient {
    if (!this.baseURL) {
      throw new Error("Base URL is not set");
    }

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

  public async getTemplateById(id: string): Promise<TemplateDto> {
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
        await this.axiosInstance.delete(`/templates/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete email template with id ${id}`);
    }
  }

  public async getImages(): Promise<ImageResponse[]> {
    try {
      const response: AxiosResponse<ImageResponse[]> =
        await this.axiosInstance.get(`/images`);

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch images");
    }
  }
}
