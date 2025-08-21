import api from "../api";

export interface ISafetyPlan {
  _id?: string;
  name: string;
  phone: string;
  autocadFile?: string;
  buildingLicense?: string;
  ownerId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const createSafetyPlan = async (data: FormData): Promise<ISafetyPlan> => {
  try {
    const response = await api.post("/safteyPlan", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "فشل إرسال مخطط السلامة");
  }
};

export const getSafetyPlans = async (): Promise<ISafetyPlan[]> => {
  try {
    const response = await api.get("/safety-plans");
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "فشل تحميل مخططات السلامة");
  }
};