const defaultMessages = {
    amwell_tyto_device_qrCodePageDesc: 'Scan this QR code with your Tyto Device to set it up.',
    amwell_tyto_device_deviceDescription: 'Tyto is a handheld exam kit that lets you perform guided medical exams with a healthcare provider. By selecting "Yes", the following screens will lead you through pairing your Tyto Device with this app.',
    amwell_tyto_device_useTytoInVisitQuestion: 'Will you be using a Tyto Device during this visit?',
    amwell_tyto_device_deviceSetupHeader: 'Tyto Device',
    amwell_tyto_device_pairing_setup_provider: 'If your Tyto Device is already connected to a WiFi network, you may leave these fields blank and select “Continue” to skip this step. If not, please provide your network name and password to proceed with pairing your device to this app. Both fields are case sensitive.',
    amwell_tyto_device_pairing_setup_disclaimer: 'This information is for pairing the Tyto device only and will not be saved.',
    amwell_tyto_device_network: 'Network',
    amwell_tyto_device_password: 'Password',
    amwell_tyto_device_deviceId: 'Tyto Device',
    amwell_tyto_device_devicePaired: 'Your Tyto Device has been successfully paired to use during the visit. Select "Join Visit" on your Tyto Device.',
    amwell_tyto_device_pairDifferentNetwork: 'Change Wifi Network',
    amwell_tyto_device_misc_ok: "OK",
    amwell_tyto_device_misc_cancel: "Cancel",
    amwell_tyto_device_misc_back: "Back",
    amwell_tyto_device_misc_continue: "Continue",
    amwell_tyto_device_misc_show: "SHOW",
    amwell_tyto_device_misc_hide: "HIDE",
    amwell_tyto_device_misc_yes: "Yes",
    amwell_tyto_device_misc_no: "No",
    amwell_tyto_device_able_to_pair: "The user can go to the Tyto tab at any point to pair a device",
    amwell_tyto_device_not_connected: "The Consumer hasn't connected a Tyto Device",
    amwell_tyto_device_trying_to_connect: "We are trying to connect to the Tyto device",
    amwell_tyto_device_trying_to_pairing: "We’re connecting to the Tyto Device.",
    amwell_tyto_device_trouble_to_connect: "The Consumer hasn't connected a Tyto Device.",
    amwell_tyto_device_reload: "Please reload to try again_",
    amwell_tyto_device_pair_anytime: "The user can go to the Tyto tab at any point to pair a device",
    amwell_tyto_device_qr_expired: "QR Code Expired",
    amwell_tyto_device_regenerate: "Please generate a new code and scan using your Tyto Device",
    amwell_tyto_device_generate_new_qrcode: "Generate New Code",
    amwell_tyto_device_pairing_failure: "We're having trouble connecting your device. Please try again and verify that your information is correct. You can also check your Tyto Device for more information or visit",
    amwell_tyto_device_support_link: "TytoCare Support.",
    amwell_tyto_device_please_try_again: "Please Try Again",
    amwell_tyto_device_try_again: "Try Again",
    amwell_tyto_device_first_error_callback: "We’re having trouble connecting to TytoCare.",
    amwell_tyto_device_connection_unavailable: "Tyto Connection Unavailable",
    amwell_tyto_device_second_error_callback: "We’re still having trouble connecting to TytoCare.",
};

var TytoWizardScreenType;
(function (TytoWizardScreenType) {
    TytoWizardScreenType[TytoWizardScreenType["TYTO_DEVICE_INTAKE"] = 0] = "TYTO_DEVICE_INTAKE";
    TytoWizardScreenType[TytoWizardScreenType["SETUP_DEVICE"] = 1] = "SETUP_DEVICE";
    TytoWizardScreenType[TytoWizardScreenType["QRCODE_SCREEN"] = 2] = "QRCODE_SCREEN";
    TytoWizardScreenType[TytoWizardScreenType["DEVICE_PAIRED"] = 3] = "DEVICE_PAIRED";
    TytoWizardScreenType[TytoWizardScreenType["REGENERATE_QRCODE"] = 4] = "REGENERATE_QRCODE";
    TytoWizardScreenType[TytoWizardScreenType["PAIRING_ERROR"] = 5] = "PAIRING_ERROR";
    TytoWizardScreenType[TytoWizardScreenType["SERVICE_UNAVAILABLE"] = 6] = "SERVICE_UNAVAILABLE";
    TytoWizardScreenType[TytoWizardScreenType["TRY_AGAIN"] = 7] = "TRY_AGAIN";
})(TytoWizardScreenType || (TytoWizardScreenType = {}));

export { TytoWizardScreenType as T, defaultMessages as d };
