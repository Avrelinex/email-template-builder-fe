import axios, { AxiosInstance, AxiosResponse } from "axios";
import { CreateImageDto } from "./dto/image/CreateImage.dto";
import { ImageDto } from "./dto/image/Image.dto";
import { CreateTemplateDto } from "./dto/template/CreateTemplate.dto";
import { TemplateDto } from "./dto/template/Template.dto";
import { UpdateTemplateDto } from "./dto/template/UpdateTemplate.dto";
import { UpdateImageDto } from "./dto/image/UpdateImage.dto";

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

  public async createImage(image: CreateImageDto): Promise<ImageDto> {
    try {
      const formData = new FormData();
      formData.append("image", image.file);

      const response: AxiosResponse<ImageDto> = await this.axiosInstance.post(
        `/images/upload`,
        image.file,
        {
          headers: {
            contentType: "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(`Failed to create new image`);
    }
  }

  public async getImages(): Promise<ImageDto[]> {
    try {
      const response: AxiosResponse<ImageDto[]> =
        await this.axiosInstance.get(`/images`);

      return response.data;
    } catch (error) {
      throw new Error(`Failed to get images`);
    }
  }

  public async getImageById(id: string): Promise<ImageDto> {
    try {
      const response: AxiosResponse<ImageDto> = await this.axiosInstance.get(
        `/images/${id}`
      );

      return response.data;
    } catch (error) {
      throw new Error(`Failed to get image by id ${id}`);
    }
  }
  public async updateImage(
    id: string,
    image: UpdateImageDto
  ): Promise<ImageDto> {
    try {
      const response: AxiosResponse<ImageDto> = await this.axiosInstance.patch(
        `/images/${id}`,
        image
      );

      return response.data;
    } catch (error) {
      throw new Error(`Failed to update image with id ${id} `);
    }
  }

  public async deleteImage(id: string): Promise<ImageDto> {
    try {
      const response: AxiosResponse<ImageDto> = await this.axiosInstance.delete(
        `/images/${id}`
      );

      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete image with id ${id}`);
    }
  }
}
