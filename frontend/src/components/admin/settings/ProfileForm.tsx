import { Camera } from "lucide-react";
import { useState } from "react";
import logo from "../../../assets/images/ui/logo.png";
import PrimaryButton from "../../ui/admin/PrimaryButton";

function ProfileForm() {

const [formData, setFormData] = useState({
    businessName: "MYA ORO",
    email: "myaoro890@gmail.com",
    phone: "+393914028979",
    address: "Marco Esquino Piazza della Repubblica, 550123 Firenze (FI)",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };


  return (
    <div className="bg-white rounded-lg shadow p-6 text-[#57534F]">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Informazioni sul profilo
            </h2>
            <p className="text-sm ">
              Gestisci e aggiorna i tuoi dettagli personali per mantenere il tuo
              account accurato e aggiornato
            </p>
          </div>

          {/* Profile Picture */}
          <div className="mb-8 flex items-center gap-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-[#E8E0D5] flex items-center justify-center overflow-hidden">
                <div className="text-center w-32 h-32">
                  <img src={logo} alt="Profile" className="border-3 border-[#A89472] w-32 h-32 rounded-full object-contain" />
                </div>
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#A89472] rounded-full flex items-center justify-center text-white  transition-colors">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <PrimaryButton text="Modifica profilo" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-[#57534F] mb-2">
                  Nome dell'azienda
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A89472] focus:border-transparent"
                  placeholder="MYA ORO"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#57534F] mb-2">
                  Email aziendale
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A89472] focus:border-transparent"
                  placeholder="myaoro890@gmail.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-[#57534F] mb-2">
                  Numero di telefono aziendale
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A89472] focus:border-transparent"
                  placeholder="+393914028979"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-[#57534F] mb-2">
                  Indirizzo aziendale
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#A89472] focus:border-transparent"
                  placeholder="Marco Esquino Piazza della Repubblica, 550123 Firenze (FI)"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
              >
                <PrimaryButton text="Salva modifiche" />
              </button>
            </div>
          </form>
        </div>
  )
}

export default ProfileForm