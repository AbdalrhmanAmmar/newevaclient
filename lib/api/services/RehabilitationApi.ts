import api from "../api";

export interface IRehabilitation {
  _id?: string;
  name: string;
  phone: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const createRehabilitation = async (data: {
  name: string;
  phone: string;
  address: string;
}): Promise<IRehabilitation> => {
  try {
    const response = await api.post("/rehabilitationRoutes", data);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "فشل إرسال طلب إعادة التأهيل");
  }
};

export const getRehabilitations = async (): Promise<IRehabilitation[]> => {
  try {
    const response = await api.get("/rehabilitations");
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "فشل تحميل طلبات إعادة التأهيل");
  }
};