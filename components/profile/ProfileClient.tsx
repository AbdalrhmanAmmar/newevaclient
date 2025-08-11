//@ts-nocheck

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, Lock, Edit2, Award, Gift, Trophy, Crown, Star, ChevronRight, MapPin, Briefcase, Building, FileText, Hash, Upload, File, X } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { authAPI } from "@/lib/api/Auth"; 
import EmailVerification from './EmailVerification';


const rankColors = {
  bronze: "from-amber-600 to-amber-800",
  silver: "from-gray-300 to-gray-500",
  gold: "from-yellow-400 to-yellow-600",
};

const rankIcons = {
  bronze: <Award className="w-5 h-5 text-amber-800" />,
  silver: <Award className="w-5 h-5 text-gray-600" />,
  gold: <Crown className="w-5 h-5 text-yellow-600" />,
};

const rankThresholds = {
  bronze: 0,
  silver: 500,
  gold: 1000,
};

const entityTypes = [
  { value: "individual", label: "فرد" },
  { value: "organization", label: "مؤسسة" },
  { value: "company", label: "شركة" },
];

const genderOptions = [
  { value: "male", label: "ذكر" },
  { value: "female", label: "أنثى" },
];

export default function ProfileClient() {
  const { user, setUser, token } = useAuthStore();
  console.log(user)
  const [isEditing, setIsEditing] = useState(!user?.hasLoggedIn);
  const [activeTab, setActiveTab] = useState<"profile" | "points" | "leaderboard">("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploads, setFileUploads] = useState({
    commercialRecordFile: null as File | null,
    taxFile: null as File | null,
    nationalAddressFile: null as File | null,
  });

const [editedProfile, setEditedProfile] = useState<IUser>({
  name: user?.name || "",
  phone: user?.phone || "",
  email: user?.email || "",
  gender: user?.gender || "",
  entityType: user?.entityType || "individual",
  entityName: user?.entityName || "",
  accountRole: user?.accountRole || "",
  jobTitle: user?.jobTitle || "",
  addresses: user?.addresses || [{
    country: "السعودية",
    city: "",
    buildingNumber: "",
    unitNumber: "",
    apartmentNumber: "",
    addressDetails: ""
  }],
  commercialRecordNumber: user?.commercialRecordNumber || "",
  commercialRecordFile: user?.commercialRecordFile || "",
  taxNumber: user?.taxNumber || "",
  taxFile: user?.taxFile || "",
  nationalAddressNumber: user?.nationalAddressNumber || "",
  nationalAddressFile: user?.nationalAddressFile || "",
  verificationStatus: user?.verificationStatus || "approved", // ✅ أضف هذا السطر
});

console.log("TOKEN:", token);


useEffect(() => {
  if (!token || token.length < 10) return;

  const fetchUserProfile = async () => {
    try {
      const res = await authAPI.getMe(token);
      console.log("✅ hello", res.user);
      setUser(res.user);
    } catch (error) {
      console.error("❌ فشل جلب بيانات المستخدم:", error);
      toast.error("فشل في تحميل بيانات المستخدم");
    }
    finally{
        setIsLoading(false)
    }
  };

  fetchUserProfile();
}, [token, setUser]); // أضف setUser هنا
  // eslint-disable-next-line react-hooks/exhaustive-deps


  useEffect(() => {
    if (user) {
      setEditedProfile({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
        gender: user.gender || "",
        entityType: user.entityType || "individual",
        entityName: user.entityName || "",
        accountRole: user.accountRole || "",
        jobTitle: user.jobTitle || "",
        addresses: user.addresses?.length ? user.addresses : [{
          country: "السعودية",
          city: "",
          buildingNumber: "",
          unitNumber: "",
          apartmentNumber: "",
          addressDetails: ""
        }],
        commercialRecordNumber: user.commercialRecordNumber || "",
        commercialRecordFile: user.commercialRecordFile || "",
        taxNumber: user.taxNumber || "",
        taxFile: user.taxFile || "",
        nationalAddressNumber: user.nationalAddressNumber || "",
        nationalAddressFile: user.nationalAddressFile || "",
          verificationStatus: user?.verificationStatus || "approved", // ✅ أضف هذا السطر

        
      });
    }
  }, [user]);



if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg">جاري تحميل البيانات...</p>
      </div>
    </div>
  );
}


  if (!user && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">يجب تسجيل الدخول لعرض الملف الشخصي</p>
        </div>
      </div>
    );
  }
  const points = user.points || 0;
  const currentRank = points >= rankThresholds.gold ? "gold" : 
                     points >= rankThresholds.silver ? "silver" : "bronze";
  const pointsToNextRank = currentRank === "gold" ? 0 : 
                          currentRank === "silver" ? rankThresholds.gold - points : 
                          rankThresholds.silver - points;

  const handleFileChange = (field: keyof typeof fileUploads, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUploads({
        ...fileUploads,
        [field]: e.target.files[0]
      });
    }
  };

  const removeFile = (field: keyof typeof fileUploads) => {
    setFileUploads({
      ...fileUploads,
      [field]: null
    });
  };

const handleSave = async () => {
  setIsLoading(true);
  
  try {
    const formData = new FormData();
    
    // البيانات الأساسية
    formData.append('name', editedProfile.name);
    formData.append('email', editedProfile.email);
    formData.append('phone', editedProfile.phone);
    formData.append('gender', editedProfile.gender);
    formData.append('entityType', editedProfile.entityType);
    
    // بيانات الكيانات غير الفردية
    if (editedProfile.entityType !== 'individual') {
      formData.append('entityName', editedProfile.entityName);
      formData.append('accountRole', editedProfile.accountRole);
      if (editedProfile.accountRole === 'employee') {
        formData.append('jobTitle', editedProfile.jobTitle);
      }
      
      formData.append('commercialRecordNumber', editedProfile.commercialRecordNumber);
      formData.append('taxNumber', editedProfile.taxNumber);
      formData.append('nationalAddressNumber', editedProfile.nationalAddressNumber);
      
      if (fileUploads.commercialRecordFile) {
        formData.append('commercialRecordFile', fileUploads.commercialRecordFile);
      }
      if (fileUploads.taxFile) {
        formData.append('taxFile', fileUploads.taxFile);
      }
      if (fileUploads.nationalAddressFile) {
        formData.append('nationalAddressFile', fileUploads.nationalAddressFile);
      }
    }
    
    // إضافة العناوين
    formData.append('addresses', JSON.stringify(editedProfile.addresses));

    // تحديد إذا كانت هناك تغييرات حساسة تتطلب إعادة التحقق
    const sensitiveFieldsChanged = 
      editedProfile.entityType !== user?.entityType ||
      editedProfile.entityName !== user?.entityName ||
      editedProfile.commercialRecordNumber !== user?.commercialRecordNumber ||
      editedProfile.taxNumber !== user?.taxNumber ||
      editedProfile.nationalAddressNumber !== user?.nationalAddressNumber ||
      fileUploads.commercialRecordFile !== null ||
      fileUploads.taxFile !== null ||
      fileUploads.nationalAddressFile !== null;
    
    const response = await authAPI.updateProfileAfterLogin(formData, token);
    
    setUser({
      ...response.user,
      verificationStatus: sensitiveFieldsChanged ? 'pending' : user?.verificationStatus || 'approved'
    });
    
    setIsEditing(false);
    setFileUploads({
      commercialRecordFile: null,
      taxFile: null,
      nationalAddressFile: null,
    });
    
    toast.success("تم تحديث الملف الشخصي بنجاح");
  } catch (error: any) {
    console.error("Error saving profile:", error);
    toast.error(error.message || "حدث خطأ أثناء حفظ التغييرات");
  } finally {
    setIsLoading(false);
  }
};

  const handleAddressChange = (index: number, field: string, value: string) => {
    const newAddresses = [...editedProfile.addresses];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    setEditedProfile({ ...editedProfile, addresses: newAddresses });
  };

  const addNewAddress = () => {
    setEditedProfile({
      ...editedProfile,
      addresses: [...editedProfile.addresses, { 
        country: "السعودية",
        city: "",
        buildingNumber: "",
        unitNumber: "",
        apartmentNumber: "",
        addressDetails: ""
      }]
    });
  };

  const removeAddress = (index: number) => {
    if (editedProfile.addresses.length > 1) {
      const newAddresses = [...editedProfile.addresses];
      newAddresses.splice(index, 1);
      setEditedProfile({ ...editedProfile, addresses: newAddresses });
    }
  };

  const handleRedeemPoints = async (pointsAmount: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  };


const isPending =  user?.verificationStatus === "pending";
  console.log(user.verificationStatus)
  
  const canChangeEntityType = (newType: string): boolean => {
    if (user.entityType === "individual") return true;
    if (user.entityType === "organization" && newType === "company") return true;
    if (user.entityType === "company") return false;
    return false;
  };



  const saudiCities = [
    "الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", 
    "الخبر", "الطائف", "تبوك", "بريدة", "خميس مشيط", 
    "حائل", "الجبيل", "ضباء", "الأحساء", "نجران", 
    "أبها", "ينبع", "القنفذة", "الباحة", "الظهران",
    "سكاكا", "عرعر", "القريات", "شرورة", "الدوادمي",
    "وادي الدواسر", "بيشة", "النماص", "محايل", "صبيا",
    "جازان", "رفحاء", "طريف", "ضبا", "الليث",
    "العلا", "رابغ", "أملج", "الحوية"
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 my-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border/10 rounded-2xl p-6 mb-8 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${rankColors[currentRank]} flex items-center justify-center shadow-md`}>
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 shadow-sm bg-primary">
                {rankIcons[currentRank]}
              </div>
            </div>
            
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize bg-gradient-to-r ${rankColors[currentRank]} text-white`}>
                  {currentRank === "gold" ? "ذهبي" : currentRank === "silver" ? "فضي" : "برونزي"}
                </span>
                <span className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {points} نقطة
                </span>
              </div>
              
              <div className="mt-4 w-full bg-background rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full bg-gradient-to-r ${rankColors[currentRank]}`}
                  style={{
                    width: `${Math.min(100, (points / rankThresholds.gold) * 100)}%`
                  }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {pointsToNextRank > 0 
                  ? `تبقى ${pointsToNextRank} نقطة للوصول إلى المستوى ${currentRank === "bronze" ? "الفضي" : "الذهبي"}`
                  : "وصلت إلى أعلى مستوى!"}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="flex overflow-x-auto pb-2 mb-8 gap-2">
          {[
            { id: "profile", label: "الملف الشخصي", icon: User },
            { id: "points", label: "النقاط والمكافآت", icon: Gift },
            { id: "leaderboard", label: "المتصدرين", icon: Trophy },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-background shadow-md"
                  : "bg-card text-foreground border border-border/10 hover:bg-accent"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="space-y-6">
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card border border-border/10 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">المعلومات الشخصية</h2>
                {user.hasLoggedIn && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 text-primary hover:text-primary/80"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="text-sm">{isEditing ? "إلغاء" : "تعديل"}</span>
                  </motion.button>
                )}
                {!isPending &&(
                  <span className="text-sm text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                    قيد المراجعة
                  </span>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm text-muted-foreground mb-2">الاسم الكامل</label>
                      <input
                        type="text"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                        className="w-full px-4 py-2 bg-background border border-border/10 rounded-lg focus:outline-none focus:border-primary"
                      />
                    </div>
                    
                  <EmailVerification
  userId={user._id}
  currentEmail={user.email}
  pendingEmail={user.pendingEmail}
  onVerificationSuccess={() => {
    
    fetchUserProfile();
  }}
/>
                    
                    <div className="space-y-2">
                      <label className="block text-sm text-muted-foreground mb-2">رقم الجوال</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                          +966
                        </div>
                        <input
                        disabled
                          type="tel"
                          value={editedProfile.phone ? editedProfile.phone.replace(/^966/, '') : ''}
                          onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                          className="w-full pl-16 pr-4 py-2 bg-background border border-border/10 rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm text-muted-foreground mb-2">الجنس</label>
                      <select
                        value={editedProfile.gender}
                        onChange={(e) => setEditedProfile({ ...editedProfile, gender: e.target.value })}
                        className="w-full px-4 py-2 bg-background border border-border/10 rounded-lg focus:outline-none focus:border-primary"
                      >
                        <option value="">اختر الجنس</option>
                        {genderOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">نوع الحساب</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {entityTypes.map((type) => {
                          const isDisabled = isEditing && !canChangeEntityType(type.value);

                        return (
                          <motion.div
                            key={type.value}
                            whileHover={!isDisabled ? { scale: 1.02 } : {}}
                            onClick={() => !isDisabled && setEditedProfile({ ...editedProfile, entityType: type.value as any })}
                            className={`p-4 border rounded-lg transition-all ${
                              editedProfile.entityType === type.value
                                ? "border-primary bg-primary/10"
                                : isDisabled 
                                  ? "border-border/10 bg-gray-100 cursor-not-allowed opacity-60"
                                  : "border-border/10 hover:bg-accent cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {type.value === "individual" && <User className="w-5 h-5" />}
                              {type.value === "organization" && <Building className="w-5 h-5" />}
                              {type.value === "company" && <Briefcase className="w-5 h-5" />}
                              <span>{type.label}</span>
                            </div>
                            {isDisabled && (
                              <p className="text-xs text-muted-foreground mt-1">
                                لا يمكن الرجوع لنوع أدنى
                              </p>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {editedProfile.entityType !== "individual" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <label className="block text-sm text-muted-foreground mb-2">
                            {editedProfile.entityType === "company" ? "اسم الشركة" : "اسم المؤسسة"}
                          </label>
                          <input
                            type="text"
                            value={editedProfile.entityName}
                            onChange={(e) => setEditedProfile({ ...editedProfile, entityName: e.target.value })}
                            className="w-full px-4 py-2 bg-background border border-border/10 rounded-lg focus:outline-none focus:border-primary"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm text-muted-foreground mb-2">دور الحساب</label>
                          <select
                            value={editedProfile.accountRole}
                            onChange={(e) => setEditedProfile({ ...editedProfile, accountRole: e.target.value })}
                            className="w-full px-4 py-2 bg-background border border-border/10 rounded-lg focus:outline-none focus:border-primary"
                          >
                            <option value="">اختر الدور</option>
                            <option value="owner">مالك</option>
                            <option value="employee">موظف</option>
                          </select>
                        </div>
                        
                        {editedProfile.accountRole === "employee" && (
                          <div className="space-y-2">
                            <label className="block text-sm text-muted-foreground mb-2">وظيفة مستخدم الحساب</label>
                            <input
                              type="text"
                              value={editedProfile.jobTitle}
                              onChange={(e) => setEditedProfile({ ...editedProfile, jobTitle: e.target.value })}
                              className="w-full px-4 py-2 bg-background border border-border/10 rounded-lg focus:outline-none focus:border-primary"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">العناوين</h3>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={addNewAddress}
                        className="text-sm text-primary flex items-center gap-1"
                      >
                        <span>إضافة عنوان جديد</span>
                      </motion.button>
                    </div>
                    
                    {editedProfile.addresses.map((address, index) => (
                      <div key={index} className="border border-border/10 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium">العنوان {index + 1}</h4>
                          {editedProfile.addresses.length > 1 && (
                            <button 
                              onClick={() => removeAddress(index)}
                              className="text-red-500 text-sm"
                            >
                              حذف
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">الدولة</label>
                            <input
                              type="text"
                              value="السعودية"
                              readOnly
                              className="w-full px-3 py-2 bg-background border border-border/10 rounded-md focus:outline-none focus:border-primary text-sm"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">المدينة</label>
                            <select
                              value={address.city}
                              onChange={(e) => handleAddressChange(index, "city", e.target.value)}
                              className="w-full px-3 py-2 bg-background border border-border/10 rounded-md focus:outline-none focus:border-primary text-sm"
                            >
                              <option value="">اختر المدينة</option>
                              {saudiCities.map(city => (
                                <option key={city} value={city}>{city}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">رقم المبنى</label>
                            <input
                            
                              type="text"
                              value={address.buildingNumber}
                              onChange={(e) => handleAddressChange(index, "buildingNumber", e.target.value)}
                              className="w-full px-3 py-2 bg-background border border-border/10 rounded-md focus:outline-none focus:border-primary text-sm"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">رقم الوحدة</label>
                            <input
                              type="text"
                              value={address.unitNumber || ""}
                              onChange={(e) => handleAddressChange(index, "unitNumber", e.target.value)}
                              className="w-full px-3 py-2 bg-background border border-border/10 rounded-md focus:outline-none focus:border-primary text-sm"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">رقم الشقة</label>
                            <input
                              type="text"
                              value={address.apartmentNumber || ""}
                              onChange={(e) => handleAddressChange(index, "apartmentNumber", e.target.value)}
                              className="w-full px-3 py-2 bg-background border border-border/10 rounded-md focus:outline-none focus:border-primary text-sm"
                            />
                          </div>
                          
                          <div className="space-y-1 md:col-span-2">
                            <label className="text-xs text-muted-foreground">تفاصيل العنوان</label>
                            <textarea
                              value={address.addressDetails || ""}
                              onChange={(e) => handleAddressChange(index, "addressDetails", e.target.value)}
                              className="w-full px-3 py-2 bg-background border border-border/10 rounded-md focus:outline-none focus:border-primary text-sm"
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {editedProfile.entityType !== "individual" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">المعلومات التجارية</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm text-muted-foreground mb-2">رقم السجل التجاري</label>
                          <div className="flex items-center gap-2">
                            <Hash className="w-5 h-5 text-muted-foreground" />
                            <input
                            disabled={isPending}
                              type="text"
                              value={editedProfile.commercialRecordNumber}
                              onChange={(e) => setEditedProfile({ ...editedProfile, commercialRecordNumber: e.target.value })}
                              className="w-full px-4 py-2 bg-background border border-border/10 rounded-lg focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm text-muted-foreground mb-2">الرقم الضريبي</label>
                          <div className="flex items-center gap-2">
                            <Hash className="w-5 h-5 text-muted-foreground" />
                            <input
                              type="text"
                              disabled={isPending}
                              value={editedProfile.taxNumber}
                              onChange={(e) => setEditedProfile({ ...editedProfile, taxNumber: e.target.value })}
                              className="w-full px-4 py-2 bg-background border border-border/10 rounded-lg focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="block text-sm text-muted-foreground mb-2">العنوان الوطني المختصر</label>
                          <div className="flex items-center gap-2">
                            <Hash className="w-5 h-5 text-muted-foreground" />
                            <input
                            disabled={isPending}
                              type="text"
                              value={editedProfile.nationalAddressNumber}
                              onChange={(e) => setEditedProfile({ ...editedProfile, nationalAddressNumber: e.target.value })}
                              className="w-full px-4 py-2 bg-background border border-border/10 rounded-lg focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm text-muted-foreground mb-2">السجل التجاري</label>
                          <div className="flex items-center gap-2">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-accent transition-colors">
                              {fileUploads.commercialRecordFile ? (
                                <div className="flex flex-col items-center p-2">
                                  <File className="w-8 h-8 text-primary" />
                                  <span className="text-sm mt-2 text-center truncate w-full px-2">
                                    {fileUploads.commercialRecordFile.name}
                                  </span>
                                  <button 
                                 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeFile('commercialRecordFile');
                                    }}
                                    className="mt-1 text-red-500 hover:text-red-700"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center p-2">
                                  <Upload className="w-8 h-8 text-muted-foreground" />
                                  <span className="text-sm mt-2 text-muted-foreground">رفع الملف</span>
                                </div>
                              )}
                              <input 
                              disabled={isPending}
                              
                                type="file" 
                                className="hidden" 
                                onChange={(e) => handleFileChange('commercialRecordFile', e)}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm text-muted-foreground mb-2">الرقم الضريبي</label>
                          <div className="flex items-center gap-2">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-accent transition-colors">
                              {fileUploads.taxFile ? (
                                <div className="flex flex-col items-center p-2">
                                  <File className="w-8 h-8 text-primary" />
                                  <span className="text-sm mt-2 text-center truncate w-full px-2">
                                    {fileUploads.taxFile.name}
                                  </span>
                                  <button 
                            
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeFile('taxFile');
                                    }}
                                    className="mt-1 text-red-500 hover:text-red-700"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center p-2">
                                  <Upload className="w-8 h-8 text-muted-foreground" />
                                  <span className="text-sm mt-2 text-muted-foreground">رفع الملف</span>
                                </div>
                              )}
                              <input 
                                type="file" 
                                disabled={isPending}
                                className="hidden" 
                                onChange={(e) => handleFileChange('taxFile', e)}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm text-muted-foreground mb-2">العنوان الوطني</label>
                          <div className="flex items-center gap-2">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-accent transition-colors">
                              {fileUploads.nationalAddressFile ? (
                                <div className="flex flex-col items-center p-2">
                                  <File className="w-8 h-8 text-primary" />
                                  <span className="text-sm mt-2 text-center truncate w-full px-2">
                                    {fileUploads.nationalAddressFile.name}
                                  </span>
                                  <button 
                                    onClick={(e) => {
                                      disabled={isPending}
                                      e.stopPropagation();
                                      removeFile('nationalAddressFile');
                                    }}
                                    className="mt-1 text-red-500 hover:text-red-700"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center p-2">
                                  <Upload className="w-8 h-8 text-muted-foreground" />
                                  <span className="text-sm mt-2 text-muted-foreground">رفع الملف</span>
                                </div>
                              )}
                              <input 
                              disabled={isPending }
                                type="file" 
                                className="hidden" 
                                onChange={(e) => handleFileChange('nationalAddressFile', e)}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    disabled={isLoading}
                    className="w-full mt-6 py-3 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">الاسم الكامل</div>
                        <div className="font-medium">{user.name}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">البريد الإلكتروني</div>
                        <div className="font-medium">{user.email}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">رقم الجوال</div>
                        <div className="font-medium">+966 {user.phone}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                  
                  {user.gender && (
                    <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-primary" />
                        <div>
                          <div className="text-sm text-muted-foreground">الجنس</div>
                          <div className="font-medium capitalize">
                            {user.gender === "male" ? "ذكر" : "أنثى"}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center gap-3">
                      {user.entityType === "individual" && <User className="w-5 h-5 text-primary" />}
                      {user.entityType === "organization" && <Building className="w-5 h-5 text-primary" />}
                      {user.entityType === "company" && <Briefcase className="w-5 h-5 text-primary" />}
                      <div>
                        <div className="text-sm text-muted-foreground">نوع الحساب</div>
                        <div className="font-medium">
                          {user.entityType === "individual" ? "فرد" : 
                           user.entityType === "organization" ? "مؤسسة" : "شركة"}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                  
                  {user.entityType !== "individual" && (
                    <>
                      <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-accent transition-colors">
                        <div className="flex items-center gap-3">
                          <Briefcase className="w-5 h-5 text-primary" />
                          <div>
                            <div className="text-sm text-muted-foreground">
                              {user.entityType === "company" ? "اسم الشركة" : "اسم المؤسسة"}
                            </div>
                            <div className="font-medium">{user.entityName}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-accent transition-colors">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-primary" />
                          <div>
                            <div className="text-sm text-muted-foreground">دور الحساب</div>
                            <div className="font-medium">
                              {user.accountRole === "owner" ? "مالك" : "موظف"}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                      
                      {user.accountRole === "employee" && user.jobTitle && (
                        <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-accent transition-colors">
                          <div className="flex items-center gap-3">
                            <Briefcase className="w-5 h-5 text-primary" />
                            <div>
                              <div className="text-sm text-muted-foreground">وظيفة مستخدم الحساب</div>
                              <div className="font-medium">{user.jobTitle}</div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                    </>
                  )}
                  
                  {user.addresses?.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium px-4">العناوين</h3>
                      {user.addresses.map((address, index) => (
                        <div key={index} className="p-4 bg-background/50 rounded-lg border border-border/10 hover:bg-accent transition-colors">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-primary mt-0.5" />
                            <div className="flex-1">
                              <div className="font-medium mb-1">العنوان {index + 1}</div>
                              <div className="text-sm text-muted-foreground">
                                {address.country && `${address.country}, `}
                                {address.city && `${address.city}, `}
                                {address.buildingNumber && `مبنى ${address.buildingNumber}, `}
                                {address.unitNumber && `وحدة ${address.unitNumber}, `}
                                {address.apartmentNumber && `شقة ${address.apartmentNumber}`}
                              </div>
                              {address.addressDetails && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {address.addressDetails}
                                </div>
                              )}
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {user.entityType !== "individual" && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium px-4">المعلومات التجارية</h3>
                      
                      {user.commercialRecordNumber && (
                        <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-accent transition-colors">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-primary" />
                            <div>
                              <div className="text-sm text-muted-foreground">رقم السجل التجاري</div>
                              <div className="font-medium">{user.commercialRecordNumber}</div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                      
                      {user.taxNumber && (
                        <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-accent transition-colors">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-primary" />
                            <div>
                              <div className="text-sm text-muted-foreground">الرقم الضريبي</div>
                              <div className="font-medium">{user.taxNumber}</div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                      
                      {user.nationalAddressNumber && (
                        <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-accent transition-colors">
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-primary" />
                            <div>
                              <div className="text-sm text-muted-foreground">العنوان الوطني المختصر</div>
                              <div className="font-medium">{user.nationalAddressNumber}</div>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                      
                      {user.commercialRecordFile && (
                        <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-accent transition-colors">
                          <div className="flex items-center gap-3">
                            <File className="w-5 h-5 text-primary" />
                            <div>
                              <div className="text-sm text-muted-foreground">ملف السجل التجاري</div>
                              <div className="font-medium text-sm truncate max-w-xs">
                                {user.commercialRecordFile}
                              </div>
                            </div>
                          </div>
                          <a 
                            href={user.commercialRecordFile} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </a>
                        </div>
                      )}
                      
                      {user.taxFile && (
                        <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-accent transition-colors">
                          <div className="flex items-center gap-3">
                            <File className="w-5 h-5 text-primary" />
                            <div>
                              <div className="text-sm text-muted-foreground">ملف الرقم الضريبي</div>
                              <div className="font-medium text-sm truncate max-w-xs">
                                {user.taxFile}
                              </div>
                            </div>
                          </div>
                          <a 
                            href={user.taxFile} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </a>
                        </div>
                      )}
                      
                      {user.nationalAddressFile && (
                        <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-accent transition-colors">
                          <div className="flex items-center gap-3">
                            <File className="w-5 h-5 text-primary" />
                            <div>
                              <div className="text-sm text-muted-foreground">ملف العنوان الوطني</div>
                              <div className="font-medium text-sm truncate max-w-xs">
                                {user.nationalAddressFile}
                              </div>
                            </div>
                          </div>
                          <a 
                            href={user.nationalAddressFile} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Points Section */}
          {activeTab === "points" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Points Card */}
              <div className="bg-card border border-border/10 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">نقاطك ومكافآتك</h2>
                <div className="bg-gradient-to-r from-primary to-primary/90 rounded-xl p-6 text-center text-background shadow-lg">
                  <div className="text-4xl font-bold mb-2">{points}</div>
                  <div className="text-lg">نقطة</div>
                  <div className="mt-4 text-sm opacity-90">
                    {points >= 100 ? `يمكنك استبدال ${Math.floor(points/100)} ريال` : "اجمع 100 نقطة لاستبدالها بريال"}
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-background/50 p-4 rounded-lg border border-border/10">
                    <div className="text-sm text-muted-foreground">المستوى الحالي</div>
                    <div className="font-medium capitalize">
                      {currentRank === "gold" ? "ذهبي" : currentRank === "silver" ? "فضي" : "برونزي"}
                    </div>
                  </div>
                  <div className="bg-background/50 p-4 rounded-lg border border-border/10">
                    <div className="text-sm text-muted-foreground">النقاط المتبقية للترقية</div>
                    <div className="font-medium">{pointsToNextRank}</div>
                  </div>
                </div>
              </div>



              {/* Available Points Packages */}
              <div className="bg-card border border-border/10 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">حزم النقاط المتاحة</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { points: 1000, price: 100 },
                    { points: 5000, price: 450 },
                    { points: 10000, price: 850 }
                  ].map((pkg, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      className="bg-background/50 p-4 rounded-lg border border-border/10 hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-lg">{pkg.points.toLocaleString()} نقطة</span>
                      </div>
                      <div className="text-primary font-bold mb-3">{pkg.price} ريال</div>
                      <div className="text-xs text-muted-foreground">
                        قيمة النقطة: {(pkg.price / pkg.points).toFixed(2)} ريال
                      </div>
                      <button className="w-full mt-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm">
                        شراء الآن
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Rank Progress */}
              <div className="bg-card border border-border/10 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">مستوى العضوية</h2>
                <div className="relative pt-8">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-background/50 rounded-full">
                    <div
                      className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all"
                      style={{
                        width: `${(points / rankThresholds.gold) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-8">
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${rankColors.bronze} flex items-center justify-center mb-2`}>
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-sm">برونزي</div>
                      <div className="text-xs text-muted-foreground">{rankThresholds.bronze} نقطة</div>
                    </div>
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${rankColors.silver} flex items-center justify-center mb-2`}>
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-sm">فضي</div>
                      <div className="text-xs text-muted-foreground">{rankThresholds.silver} نقطة</div>
                    </div>
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${rankColors.gold} flex items-center justify-center mb-2`}>
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-sm">ذهبي</div>
                      <div className="text-xs text-muted-foreground">{rankThresholds.gold} نقطة</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* How to Earn Points */}
              <div className="bg-card border border-border/10 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">كيفية كسب النقاط</h2>
                <div className="space-y-3">
                  {[
                    { action: "إكمال الطلب الأول", points: "+50 نقطة" },
                    { action: "تقييم المنتج", points: "+10 نقاط" },
                    { action: "مشاركة التطبيق", points: "+30 نقطة" },
                    { action: "الشراء في عطلة نهاية الأسبوع", points: "+20 نقطة" },
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex justify-between items-center p-3 bg-background/50 rounded-lg hover:bg-accent transition-colors"
                    >
                      <span className="text-foreground">{item.action}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded text-xs">
                        {item.points}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Leaderboard Section */}
          {activeTab === "leaderboard" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card border border-border/10 rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-6">قائمة المتصدرين</h2>
              <div className="space-y-4">
                {[
                  { name: "أحمد محمد", points: 1500, rank: "gold" },
                  { name: "سارة أحمد", points: 1200, rank: "gold" },
                  { name: "محمد علي", points: 800, rank: "silver" },
                  { name: "فاطمة خالد", points: 600, rank: "silver" },
                  { name: "عمر يوسف", points: 400, rank: "bronze" },
                ].map((user, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-background/50 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${rankColors[user.rank as keyof typeof rankColors]} flex items-center justify-center text-white font-bold`}>
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.points} نقطة</div>
                    </div>
                    <Trophy className={`w-5 h-5 ${index === 0 ? "text-yellow-400" : index === 1 ? "text-gray-400" : index === 2 ? "text-amber-600" : "text-muted-foreground"}`} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}