import { useState } from "react";

function SettingSecurity() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  return (
    <div className="text-[#57534F]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold  mb-2">
          Impostazioni di sicurezza
        </h2>
        <p className="text-sm ">
          Gestisci sicurezza e privacy per proteggere il tuo account
        </p>
      </div>

      {/* Account Details Section */}
      <div className="max-w-2/3">
        <div className="py-6 border-b border-gray-200">
          <h3 className="text-base font-semibold ">
            Dettagli dell'account
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {/* Email Verification */}
          <div className="py-6 flex items-center justify-between">
            <div className="flex-1 font-medium ">
              <h4 className="text-sm mb-1">
                Verifica indirizzo email
              </h4>
              <p className="text-xs ">
                Verifica il tuo indirizzo email per confermare le credenziali
              </p>
            </div>
            <div>
              <span className="inline-flex px-4 py-1.5 text-xs font-medium bg-[#E7FFDF] text-[#36D700] rounded">
                Verificato
              </span>
            </div>
          </div>

          {/* Password Update */}
          <div className="py-6 flex items-center justify-between">
            <div className="flex-1 font-medium ">
              <h4 className="text-sm mb-1">
                Aggiorna password
              </h4>
              <p className="text-xs ">
                Cambia la tua password per aggiornare e proteggere il tuo
                account
              </p>
            </div>
            <div>
              <button className="px-4 py-1.5 text-sm font-medium text-[#746F6A] border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                Cambia password
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="py-6 flex items-center justify-between">
            <div className="flex-1 font-medium ">
              <h4 className="text-sm mb-1">
                Autenticazione a due fattori
              </h4>
              <p className="text-xs ">
                Abilita l'autenticazione a due fattori per migliorare la
                sicurezza
              </p>
            </div>
            <div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  twoFactorEnabled ? "bg-[#A89472]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingSecurity;
