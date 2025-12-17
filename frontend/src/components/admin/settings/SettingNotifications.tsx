import { useState } from "react";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

function SettingNotifications() {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "email",
      title: "Avvisi via email",
      description:
        "Rimani informato con aggiornamenti automatici via email sulle attività più importanti della tua agenzia",
      enabled: true,
    },
    {
      id: "sms",
      title: "Avvisi SMS",
      description: "Rimani informato con avvisi SMS tempestivi",
      enabled: true,
    },
    {
      id: "inApp",
      title: "Notifiche in-app",
      description:
        "Ricevi aggiornamenti in tempo reale direttamente nella tua dashboard così puoi agire senza lasciare la piattaforma",
      enabled: true,
    },
    {
      id: "stock",
      title: "Notifiche di stock",
      description:
        "Rimani informato sui livelli del tuo inventario in tempo reale. Ricevi avvisi istantanei quando i prodotti sono bassi, esauriti o riassortiti, così non perdi mai un'opportunità di vendita.",
      enabled: false,
    },
  ]);

  const toggleNotification = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, enabled: !notif.enabled } : notif
      )
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 text-[#57534F]">
        <h2 className="text-xl font-semibold  mb-2">Notifica</h2>
        <p className="text-sm ">
          Gestisci tutte le tue notifiche di sistema
        </p>
      </div>

      {/* System Notifications Section */}
      <div className=" flex justify-between gap-6 rounded-lg p-6">
        <div className="mb-6 items-start flex flex-col flex-2 text-start">
          <h3 className="text-base font-semibold text-[#130F26] mb-1">
            System Notifications
          </h3>
          <p className="text-sm text-start text-[#130F26] pr-20">
            Rimani aggiornato su tutte le attività importanti nel tuo negozio
          </p>
        </div>

        {/* Notification Settings */}
        <div className="space-y-6 flex-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start justify-between gap-6"
            >
              <div className="flex-shrink-0">
                <button
                  onClick={() => toggleNotification(notification.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notification.enabled ? "bg-[#A89472]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notification.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-[#57534F] mb-1">
                  {notification.title}
                </h4>
                <p className="text-sm text-[#57534F]">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SettingNotifications;
