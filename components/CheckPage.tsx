"use client";
import { Owner } from "@/types/owner";
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  FileText,  
  CheckCircle2, 
  XCircle, 
  Phone, 
  Mail, 
} from "lucide-react";
import { useOwner } from "@/hooks/useOwner";


interface CheckPageProps {
  owner: Owner | null;
  onBack: () => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export default function CheckPage({ owner, onBack, onApprove, onReject }: CheckPageProps) {
  const {ApproveOwner, RejectOwner} = useOwner();
  if (!owner) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> ກັບຄືນ
        </button>
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center">
          <p className="text-sm text-slate-500">ບໍ່ພົບຂໍ້ມູນຮ້ານຄ້າ</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Bar: Back Button & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition shadow-sm w-fit cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> ກັບຄືນລາຍການ
        </button>
        {owner.isActive === false? <div className="flex items-center gap-3">
          <button
            onClick={async() => {
                  onReject && onReject(owner._id);
                  await RejectOwner(owner._id);
                  onBack();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
          >
            <XCircle className="w-4 h-4" /> ປະຕິເສດ
          </button>
          <button
            onClick={async() => {
                 onApprove && onApprove(owner._id);
                 await ApproveOwner(owner._id);
                 onBack();
           }}
            className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" /> ອະນຸມັດເປີດຮ້ານ
          </button>
        </div>: null}
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-gradient-to-r from-sky-900 to-sky-950 p-6 sm:p-8 rounded-2xl shadow-md text-white flex flex-col md:flex-row items-center gap-6 justify-between border border-sky-800">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <img 
            src={owner.logo || "https://via.placeholder.com/150"} 
            alt="Store Logo" 
            className="w-24 h-24 rounded-2xl object-cover border-2 border-yellow-500/60 shadow-lg bg-white"
          />
          <div className="space-y-1">
            <div className="inline-block px-2.5 py-0.5 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-[10px] font-semibold tracking-wide">
              {owner.brandType}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-wide">{owner.brandName}</h1>
            <p className="text-xs text-sky-200">ເລກທະບຽນ: <span className="font-mono text-white">{owner.registrationNumber}</span></p>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur-sm w-full md:w-auto">
          <div className="text-[11px] text-sky-300">ສະຖານະປະຈຸບັນ</div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${owner.isActive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'}`}>
            <span className={`w-2 h-2 rounded-full ${owner.isActive ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`}></span>
            {owner.isActive ? 'ເປີດໃຊ້ງານແລ້ວ' : 'ລໍຖ້າການອະນຸມັດ'}
          </div>
        </div>
      </div>

      {/* Grid Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Owner & Store Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="p-2 bg-sky-50 text-sky-950 rounded-xl">
                <User className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-sky-950">ຂໍ້ມູນສ່ວນຕົວເຈົ້າຂອງຮ້ານ</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400">ຊື່ ແລະ ນາມສະກຸນ (ພາສາລາວ)</span>
                <p className="font-semibold text-sky-950 text-sm">{owner.laoName} {owner.laoLastname || ""}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400">ຊື່ ແລະ ນາມສະກຸນ (ພາສາອັງກິດ)</span>
                <p className="font-semibold text-sky-950 text-sm">{owner.engName} {owner.engLastname || ""}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400">ເພດ</span>
                <p className="font-semibold text-sky-950 capitalize">{owner.gender}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400">ວັນເດືອນປີເກີດ</span>
                <p className="font-semibold text-sky-950 font-mono">{owner.birth}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400">ເບີໂທລະສັບ</span>
                <p className="font-semibold text-sky-950 font-mono flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {owner.tel}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400">ອີເມວ</span>
                <p className="font-semibold text-sky-950 font-mono flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {owner.email}
                </p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="p-2 bg-sky-50 text-sky-950 rounded-xl">
                <MapPin className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-sky-950">ທີ່ຢູ່ (ບ້ານເກີດ ແລະ ບ່ອນຢູ່ປະຈຸບັນ)</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <span className="font-bold text-sky-900 block">ບ້ານເກີດ</span>
                <p className="text-slate-600">ແຂວງ: <strong className="text-slate-900">{owner.bornProvince}</strong></p>
                <p className="text-slate-600">ເມືອງ: <strong className="text-slate-900">{owner.bornDistrict}</strong></p>
                <p className="text-slate-600">ບ້ານ: <strong className="text-slate-900">{owner.bornVillage}</strong></p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <span className="font-bold text-sky-900 block">ທີ່ຢູ່ປະຈຸບັນ</span>
                <p className="text-slate-600">ແຂວງ/ນະຄອນຫຼວງ: <strong className="text-slate-900">{owner.presentProvince}</strong></p>
                <p className="text-slate-600">ເມືອງ: <strong className="text-slate-900">{owner.presentDistrict}</strong></p>
                <p className="text-slate-600">ບ້ານ: <strong className="text-slate-900">{owner.presentVillage}</strong></p>
              </div>
            </div>
          </div>

          {/* Document & Registration Info */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="p-2 bg-sky-50 text-sky-950 rounded-xl">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-sky-950">ຂໍ້ມູນເອກະສານ ແລະ ທະບຽນ</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400">ປະເພດເອກະສານ</span>
                <p className="font-semibold text-sky-950 uppercase">{owner.documentType.replace('_', ' ')}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400">ເລກທີເອກະສານ</span>
                <p className="font-semibold text-sky-950 font-mono">{owner.documentId}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400">ວັນທີອອກ / ໝົດອາຍຸ</span>
                <p className="font-semibold text-sky-950 font-mono">{owner.issueDate} ~ {owner.expiryDate}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400">ວັນທີລົງທະບຽນຮ້ານ</span>
                <p className="font-semibold text-sky-950 font-mono">{owner.registrationDate}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Images (Documents & Signature) */}
        <div className="space-y-6">
          
          {/* Logo & Signature */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold text-sky-950 tracking-wide uppercase border-b border-slate-100 pb-2">ລາຍເຊັນ</h3>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-center items-center h-32">
              {owner.signature ? (
                <img src={owner.signature} alt="Signature" className="max-h-full object-contain filter contrast-125" />
              ) : (
                <span className="text-xs text-slate-400">ບໍ່ມີລາຍເຊັນ</span>
              )}
            </div>
          </div>

          {/* Registration Image */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold text-sky-950 tracking-wide uppercase border-b border-slate-100 pb-2">ໃບທະບຽນຮ້ານຄ້າ</h3>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-center items-center h-48 overflow-hidden group">
              {owner.registrationImage ? (
                <a href={owner.registrationImage} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                  <img src={owner.registrationImage} alt="Registration" className="max-h-full object-contain rounded transition transform group-hover:scale-105" />
                </a>
              ) : (
                <span className="text-xs text-slate-400">ບໍ່ມີຮູບໃບທະບຽນ</span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 text-center">ກົດທີ່ຮູບເພື່ອເບິ່ງຂະໜາດໃຫຍ່</p>
          </div>

          {/* Document Images */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold text-sky-950 tracking-wide uppercase border-b border-slate-100 pb-2">ຮູບເອກະສານຢັ້ງຢືນ (ບັດ/ສໍມະໂນຄົວ)</h3>
            <div className="space-y-3">
              {owner.documentImage && owner.documentImage.length > 0 ? (
                owner.documentImage.map((imgUrl, idx) => (
                  <div key={idx} className="bg-slate-50 p-2 rounded-xl border border-slate-200 h-40 flex justify-center items-center overflow-hidden group">
                    <a href={imgUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                      <img src={imgUrl} alt={`Doc ${idx + 1}`} className="max-h-full object-contain rounded transition transform group-hover:scale-105" />
                    </a>
                  </div>
                ))
              ) : (
                <span className="text-xs text-slate-400">ບໍ່ມີຮູບເອກະສານ</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}