import api from "../api";

export interface IMaintenanceContract {
  _id?: string;
  entityType: string;
  name: string;
  commercialRegisterNumber: string;
  pieceNumber: string;
  maintenanceContract?: string;    // رابط ملف
  rentContract?: string;          // رابط ملف
  commercialRegisterFile?: string; // رابط ملف
  buildingLicense?: string;       // رابط ملف
  phone: string;
  email: string;
  activity: string;
  vatNumber: string;
  extinguisherType: string;
  extinguisherWeight: string;
  extinguisherCount: string;
  address: string;
  planNumber: string;
  area: string;
  systems: {
    system: string;
    status: string;
    _id?: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

// DTO لعملية الإنشاء
export interface CreateMaintenanceContractDto {
  entityType: string;
  name: string;
  commercialRegisterNumber: string;
  pieceNumber: string;
  maintenanceContract?: File;     // ملف
  rentContract?: File;           // ملف
  commercialRegisterFile?: File;  // ملف
  buildingLicense?: File;        // ملف
  phone: string;
  email: string;
  activity: string;
  vatNumber: string;
  extinguisherType: string;
  extinguisherWeight: string;
  extinguisherCount: string;
  address: string;
  planNumber: string;
  area: string;
  systems: {
    system: string;
    status: string;
  }[];
}

// إنشاء عقد صيانة جديد
export const createMaintenanceContract = async (data: FormData): Promise<IMaintenanceContract> => {
  try {
    const response = await api.post('/MaintenanceContract', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

// جلب كل عقود الصيانة
export const getMaintenanceContracts = async (): Promise<IMaintenanceContract[]> => {
  try {
    const response = await api.get("/maintenance-contracts");
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "فشل تحميل البيانات.");
  }
};

// جلب عقد صيانة واحد
export const getMaintenanceContractById = async (id: string): Promise<IMaintenanceContract> => {
  try {
    const response = await api.get(`/maintenance-contracts/${id}`);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "لم يتم العثور على العقد.");
  }
};

// تحديث عقد صيانة
export const updateMaintenanceContract = async (
  id: string, 
  data: Partial<CreateMaintenanceContractDto>
): Promise<IMaintenanceContract> => {
  try {
    const formData = new FormData();
    
    // Append all fields including systems as JSON
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'systems') {
          formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      }
    });

    const response = await api.put(`/maintenance-contracts/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "فشل تحديث العقد.");
  }
};

// حذف عقد صيانة
export const deleteMaintenanceContract = async (id: string): Promise<void> => {
  try {
    await api.delete(`/maintenance-contracts/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "فشل حذف العقد.");
  }
};

// دالة مساعدة لتحضير FormData
export const prepareMaintenanceFormData = (data: CreateMaintenanceContractDto): FormData => {
  const formData = new FormData();
  
  // Append all fields
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === 'systems') {
        formData.append(key, JSON.stringify(value));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  });

  return formData;
};