import { useState } from "react";
import { MdSave, MdCancel, MdEdit, MdCheck } from "react-icons/md";

const StoreSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [settings, setSettings] = useState({
    // Store Information
    storeName: "Bangladesh Grocery Shop",
    storeDescription: "Premium quality groceries and organic products",
    storeEmail: "info@groceryshop.com",
    storePhone: "01700000000",
    storeAddress: "123 Dhaka Street, Dhanmondi, Dhaka",
    storeCity: "Dhaka",
    storePostalCode: "1209",

    // Business Hours
    openTime: "09:00",
    closeTime: "22:00",
    operatingDays: "Monday to Sunday",

    // Delivery Settings
    deliveryCharge: 50,
    freeDeliveryAbove: 2000,
    maxDeliveryDays: 3,
    minDeliveryDays: 1,

    // Payment Settings
    enableBkash: true,
    enableNagad: true,
    enableCard: true,
    enableCOD: true,

    // General Settings
    currency: "BDT",
    taxPercentage: 5,
    returnsWindow: 7,
    defaultLanguage: "Bengali",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    orderNotifications: true,

    // Policies
    refundPolicy: "Full refund within 7 days of return",
    shippingPolicy: "Free shipping on orders above ৳2000",
    privacyPolicy: "Your privacy is important to us",
  });

  const [tempSettings, setTempSettings] = useState(settings);

  const handleEdit = () => {
    setIsEditing(true);
    setTempSettings(settings);
  };

  const handleSave = () => {
    setSettings(tempSettings);
    setIsEditing(false);
    setSaveMessage("Settings saved successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleCancel = () => {
    setTempSettings(settings);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempSettings({ ...tempSettings, [field]: value });
  };

  const handleToggle = (field) => {
    setTempSettings({ ...tempSettings, [field]: !tempSettings[field] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Store Settings</h1>
            <p className="text-slate-400">Configure your store information and preferences</p>
          </div>
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <MdEdit size={20} /> Edit Settings
            </button>
          )}
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className="bg-green-900 border border-green-700 text-green-200 px-6 py-3 rounded-lg mb-6 flex items-center gap-2">
            <MdCheck size={20} /> {saveMessage}
          </div>
        )}

        {/* Settings Form */}
        <div className="space-y-6">
          {/* Store Information */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Store Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Store Name</label>
                <input
                  type="text"
                  value={isEditing ? tempSettings.storeName : settings.storeName}
                  onChange={(e) => handleInputChange("storeName", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Store Email</label>
                <input
                  type="email"
                  value={isEditing ? tempSettings.storeEmail : settings.storeEmail}
                  onChange={(e) => handleInputChange("storeEmail", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Store Phone</label>
                <input
                  type="tel"
                  value={isEditing ? tempSettings.storePhone : settings.storePhone}
                  onChange={(e) => handleInputChange("storePhone", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">City</label>
                <input
                  type="text"
                  value={isEditing ? tempSettings.storeCity : settings.storeCity}
                  onChange={(e) => handleInputChange("storeCity", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Postal Code</label>
                <input
                  type="text"
                  value={isEditing ? tempSettings.storePostalCode : settings.storePostalCode}
                  onChange={(e) => handleInputChange("storePostalCode", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-white text-sm font-semibold mb-2 block">
                  Store Address
                </label>
                <textarea
                  value={isEditing ? tempSettings.storeAddress : settings.storeAddress}
                  onChange={(e) => handleInputChange("storeAddress", e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 resize-none ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-white text-sm font-semibold mb-2 block">
                  Store Description
                </label>
                <textarea
                  value={isEditing ? tempSettings.storeDescription : settings.storeDescription}
                  onChange={(e) => handleInputChange("storeDescription", e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 resize-none ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Business Hours</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Opening Time</label>
                <input
                  type="time"
                  value={isEditing ? tempSettings.openTime : settings.openTime}
                  onChange={(e) => handleInputChange("openTime", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Closing Time</label>
                <input
                  type="time"
                  value={isEditing ? tempSettings.closeTime : settings.closeTime}
                  onChange={(e) => handleInputChange("closeTime", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  Operating Days
                </label>
                <input
                  type="text"
                  value={isEditing ? tempSettings.operatingDays : settings.operatingDays}
                  onChange={(e) => handleInputChange("operatingDays", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Delivery Settings */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Delivery Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  Delivery Charge (৳)
                </label>
                <input
                  type="number"
                  value={isEditing ? tempSettings.deliveryCharge : settings.deliveryCharge}
                  onChange={(e) => handleInputChange("deliveryCharge", parseInt(e.target.value))}
                  disabled={!isEditing}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  Free Delivery Above (৳)
                </label>
                <input
                  type="number"
                  value={isEditing ? tempSettings.freeDeliveryAbove : settings.freeDeliveryAbove}
                  onChange={(e) => handleInputChange("freeDeliveryAbove", parseInt(e.target.value))}
                  disabled={!isEditing}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  Min Delivery Days
                </label>
                <input
                  type="number"
                  value={isEditing ? tempSettings.minDeliveryDays : settings.minDeliveryDays}
                  onChange={(e) => handleInputChange("minDeliveryDays", parseInt(e.target.value))}
                  disabled={!isEditing}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  Max Delivery Days
                </label>
                <input
                  type="number"
                  value={isEditing ? tempSettings.maxDeliveryDays : settings.maxDeliveryDays}
                  onChange={(e) => handleInputChange("maxDeliveryDays", parseInt(e.target.value))}
                  disabled={!isEditing}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Payment Methods</h2>
            <div className="space-y-4">
              {[
                { key: "enableBkash", label: "Bkash" },
                { key: "enableNagad", label: "Nagad" },
                { key: "enableCard", label: "Card Payment" },
                { key: "enableCOD", label: "Cash on Delivery" },
              ].map((method) => (
                <label key={method.key} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEditing ? tempSettings[method.key] : settings[method.key]}
                    onChange={() => handleToggle(method.key)}
                    disabled={!isEditing}
                    className="w-4 h-4"
                  />
                  <span className="text-white font-semibold">{method.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* General Settings */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">General Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Currency</label>
                <input
                  type="text"
                  value={isEditing ? tempSettings.currency : settings.currency}
                  onChange={(e) => handleInputChange("currency", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Tax %</label>
                <input
                  type="number"
                  step="0.1"
                  value={isEditing ? tempSettings.taxPercentage : settings.taxPercentage}
                  onChange={(e) => handleInputChange("taxPercentage", parseFloat(e.target.value))}
                  disabled={!isEditing}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  Returns Window (Days)
                </label>
                <input
                  type="number"
                  value={isEditing ? tempSettings.returnsWindow : settings.returnsWindow}
                  onChange={(e) => handleInputChange("returnsWindow", parseInt(e.target.value))}
                  disabled={!isEditing}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  Default Language
                </label>
                <input
                  type="text"
                  value={isEditing ? tempSettings.defaultLanguage : settings.defaultLanguage}
                  onChange={(e) => handleInputChange("defaultLanguage", e.target.value)}
                  disabled={!isEditing}
                  className={`w-full border border-slate-600 rounded-lg px-4 py-2 ${
                    isEditing
                      ? "bg-slate-700 text-white focus:outline-none focus:border-amber-500"
                      : "bg-slate-700/50 text-slate-300"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>
            <div className="space-y-4">
              {[
                { key: "emailNotifications", label: "Email Notifications" },
                { key: "smsNotifications", label: "SMS Notifications" },
                { key: "orderNotifications", label: "Order Notifications" },
              ].map((notif) => (
                <label key={notif.key} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEditing ? tempSettings[notif.key] : settings[notif.key]}
                    onChange={() => handleToggle(notif.key)}
                    disabled={!isEditing}
                    className="w-4 h-4"
                  />
                  <span className="text-white font-semibold">{notif.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                <MdSave size={20} /> Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                <MdCancel size={20} /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreSettings;