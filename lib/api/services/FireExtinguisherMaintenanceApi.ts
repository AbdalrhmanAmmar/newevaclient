import api from "../api"
// تعريف أنواع البيانات
export interface IFireExtinguisherItem {
  type: string;
  weight: string;
  count: string;
  serviceType: string;
}

export interface IFireExtinguisherMaintenance {
  id?: string;
  fullName: string;
  phone: string;
  extinguishers: IFireExtinguisherItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFireExtinguisherMaintenanceDto {
  fullName: string;
  phone: string;
  extinguishers: IFireExtinguisherItem[];
}

// إنشاء طلب صيانة وتعبئة طفايات حريق جديد
export const createFireExtinguisherMaintenance = async (data: CreateFireExtinguisherMaintenanceDto): Promise<IFireExtinguisherMaintenance> => {
  try {
    const response = await api.post('/fireExtinguisherMaintenance/create', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// الحصول على جميع طلبات صيانة وتعبئة طفايات الحريق
export const getAllFireExtinguisherMaintenance = async (): Promise<IFireExtinguisherMaintenance[]> => {
  try {
    const response = await api.get('/fire-extinguisher-maintenance');
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'فشل في جلب البيانات.');
  }
};

// الحصول على طلب صيانة وتعبئة طفايات حريق محدد
export const getFireExtinguisherMaintenanceById = async (id: string): Promise<IFireExtinguisherMaintenance> => {
  try {
    const response = await api.get(`/fire-extinguisher-maintenance/${id}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'فشل في جلب البيانات.');
  }
};

// تحديث طلب صيانة وتعبئة طفايات حريق
export const updateFireExtinguisherMaintenance = async (
  id: string, 
  data: Partial<CreateFireExtinguisherMaintenanceDto>
): Promise<IFireExtinguisherMaintenance> => {
  try {
    const response = await api.put(`/fire-extinguisher-maintenance/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "فشل تحديث الطلب.");
  }
};

// حذف طلب صيانة وتعبئة طفايات حريق
export const deleteFireExtinguisherMaintenance = async (id: string): Promise<void> => {
  try {
    await api.delete(`/fire-extinguisher-maintenance/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "فشل حذف الطلب.");
  }
};

// دالة مساعدة لتحضير البيانات
export const prepareFireExtinguisherData = (data: CreateFireExtinguisherMaintenanceDto): CreateFireExtinguisherMaintenanceDto => {
  return {
    fullName: data.fullName,
    phone: data.phone,
    extinguishers: data.extinguishers.map(item => ({
      type: item.type,
      weight: item.weight,
      count: item.count,
      serviceType: item.serviceType
    }))
  };
};