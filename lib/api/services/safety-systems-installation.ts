import api from "../api";

export interface ISafetySystemsInstallation {
  _id?: string;
  name: string;
  phone: string;
  safetyPlanFile?: string; // مسار الملف بعد الرفع
  createdAt?: Date;
  updatedAt?: Date;
}

// ========== Create ==========
export const createSafetySystemsInstallation = async (data: {
  name: string;
  phone: string;
  safetyPlanFile?: File; // الملف نفسه
}): Promise<ISafetySystemsInstallation> => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);

    if (data.safetyPlanFile) {
      formData.append("safetyPlanFile", data.safetyPlanFile);
    }

    const response = await api.post("/SafetySystemsInstallation", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "فشل إرسال طلب تركيب أنظمة السلامة"
    );
  }
};

// ========== Get All ==========
export const getSafetySystemsInstallations = async (): Promise<ISafetySystemsInstallation[]> => {
  try {
    const response = await api.get("/safety-systems-installation");
    return response.data.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "فشل تحميل طلبات تركيب أنظمة السلامة"
    );
  }
};
