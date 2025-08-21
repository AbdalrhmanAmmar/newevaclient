import api from "../api";
export interface IEngineeringPlan {
  _id?: string;
  name: string;
  phone: string;
  activity: string;
  address: string;
  ownerId?: string;       // رابط ملف أو صورة
  ownershipDoc?: string;  // رابط ملف أو صورة
  createdAt?: Date;
  updatedAt?: Date;
}
// DTO لعملية الإنشاء
export interface CreateEngineeringPlanDto {
  name: string;
  phone: string;
  activity: string;
  address: string;
  ownerId?: File;        // هيكون ملف (صورة/PDF)
  ownershipDoc?: File;   // هيكون ملف (صورة/PDF)
}


// إنشاء طلب جديد
export const createEngineeringPlan = async (data: FormData): Promise<IEngineeringPlan> => {
  try {
    const response = await api.post('/engineeringPlanForm', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// جلب كل الطلبات
export const getEngineeringPlans = async (): Promise<IEngineeringPlan[]> => {
  try {
    const response = await api.get("/engineering-plans");
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "فشل تحميل البيانات.");
  }
};

// جلب طلب واحد
export const getEngineeringPlanById = async (id: string): Promise<IEngineeringPlan> => {
  try {
    const response = await api.get(`/engineering-plans/${id}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "لم يتم العثور على الطلب.");
  }
};

// تحديث طلب
export const updateEngineeringPlan = async (id: string, data: Partial<CreateEngineeringPlanDto>): Promise<IEngineeringPlan> => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    const response = await api.put(`/engineering-plans/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "فشل تحديث الطلب.");
  }
};

// حذف طلب
export const deleteEngineeringPlan = async (id: string): Promise<void> => {
  try {
    await api.delete(`/engineering-plans/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "فشل حذف الطلب.");
  }
};
