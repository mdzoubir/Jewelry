import { useState } from "react";
import ProfileForm from "../../components/admin/settings/ProfileForm";
import SettingPermissions from "../../components/admin/settings/SettingPermissions";
import SettingSecurity from "../../components/admin/settings/SettingSecurity";
import SettingNotifications from "../../components/admin/settings/SettingNotifications";

function AdminSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Informazioni sul profilo" },
    { id: "permissions", label: "Permessi di ruolo" },
    { id: "security", label: "Impostazioni di sicurezza" },
    { id: "notifications", label: "Notifiche" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 text-[#57534F]">
        <h1 className="text-2xl font-bold  mb-2">Impostazioni</h1>
        <p className="text-sm ">
          Imposta le preferenze di sistema, i ruoli, le impostazioni
          dell'account e le notifiche
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-[#57534F] rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-[#EDE3D2] border border-[#DBC7A5]"
                : "bg-white "
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Information Section */}
      {activeTab === "profile" && (
        <ProfileForm />
      )}
      {/* Permissions Tab */}
      {activeTab === "permissions" && (
        <SettingPermissions />
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <SettingSecurity />
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <SettingNotifications />
      )}
    </div>
  );
}

export default AdminSettings;
