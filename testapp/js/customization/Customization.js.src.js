Customization = {};

// Unchanged below:
Customization.serverURL = 'http://www.resortsuite.com/';
Customization.serverURLButtonText = 'Return Home';
Customization.supportPhoneNumber = '555-555-5555';
Customization.defaultLanguage = 'en-us';
Customization.availableLanguages = ['en-us', 'fr-ca', 'es-sp'/*, 'zh-cn'*/];
Customization.defaultCountry = '';
Customization.defaultState = '';
Customization.goHomeOnHome = false;
Customization.multiLanguage = true;
Customization.multiLanguageLabel = {}
Customization.multiLanguageLabel['en-us'] = 'English';
Customization.multiLanguageLabel['fr-ca'] = 'Fran\u00e7ais';
Customization.multiLanguageLabel['es-sp'] = 'Espa\u00f1ol';
Customization.multiLanguageLabel['zh-cn'] = 'ä¸­æ–‡';
Customization.submitLanguage = {}
Customization.submitLanguage['en-us'] = 'English';
Customization.submitLanguage['fr-ca'] = 'French';
Customization.submitLanguage['es-sp'] = 'Spanish';
Customization.submitLanguage['zh-cn'] = 'Chinese';
Customization.requirePaymentAddress = false;
Customization.requirePaymentPostalCode = false;
Customization.requireAddress = true;
Customization.showPaymentAllAddressFields = false;
Customization.showGenderInput = false;
Customization.showDateOfBirth = false;
Customization.requireDateOfBirth = false;
Customization.showProvinceCode = false;
Customization.showAddMoreOnlyOnBottomOfBookingSummary = true;
Customization.warnFolioTimeoutMinutes = 5;
Customization.defaultSessionTimeout = 30;
Customization.hideOtherPropertyIfItemsInCart = false;
Customization.showLoginPromptFlyout = false;
Customization.hideInitialGuestItineraryOnBookingSummary = false;
Customization.moveGuestItineraryToBookingSummaryBottom = true;
Customization.googleAnalytics = ""; // e.g. "UA-12345678-1"
Customization.googleAnalyticsDomain = ""; // e.g. "resortsuite.com" **without the "www."**
Customization.disableAccountCreation = false;
Customization.disableProfileScreenCreateGroupMember = false; // add this to disable-quick-add-member
Customization.disablePasswordReset = false;
Customization.defaultMarketingOptIn = false;
Customization.showPhoneMarketing = true;
Customization.showMailMarketing = true;
Customization.showSMSMarketing = true;
Customization.debugYPCancel = true;
Customization.defaultBookingWindow = {
    startOffset: { },
    startSet: { },
    endOffset: { },
    endSet: { },
    timeZone: 'America/Toronto',
    default: true
};
Customization.bookingWindows = Customization.bookingWindows = [
    { module: "Golf", bookingWindow: {
        startOffset: { },
        startSet: { },
        endOffset: { 'days': -1 },
        endSet: { 'hour': 23, 'minutes': 59, 'seconds': 59 },
        timeZone: 'America/Toronto'
    }},
    { module: "Spa", bookingWindow: {
        startOffset: { },
        startSet: { },
        endOffset: { 'days': -1 },
        endSet: { 'hour': 23, 'minutes': 59, 'seconds': 59 },
        timeZone: 'America/Toronto'
    }},
    { module: "Ski", bookingWindow: {
        startOffset: { },
        startSet: { },
        endOffset: { 'days': -1 },
        endSet: { 'hour': 23, 'minutes': 59, 'seconds': 59 },
        timeZone: 'America/Toronto'
    }},

    /*
    { module: , bookingWindow: {
        startOffset: { },
        startSet: { },
        endOffset: { 'days': -1 }, // == allowBookingToday = false
        // endOffset: { }, // == allowBookingToday = true
        endSet: { 'hour': 23, 'minutes': 59, 'seconds': 59 }, // == allowBookingToday = false
        // endSet: { }, // == allowBookingToday = true
        timeZone: 'America/Toronto'
    }}

    ** Module fields
    module: "Spa", Location: "999", ItemCategory: 'Massage Therapy', ItemSubcategory: 'Body Massage', ItemName: 'Swedish Massage (30 Min)',
    module: "Ski", Location: "999", type: "Pass", category: "Rentals"
    module: "Golf", CourseId: "FT9"
    */
]
// Customization.forceSessionId = '1234';

// START: Toggle feature availability
Customization.features = {};
Customization.features.spaBooking = true;				// true = feature enabled | false = feature not enabled
Customization.features.skiBooking = true;				// true = feature enabled | false = feature not enabled
Customization.features.giftCertificates = true;			// true = feature enabled | false = feature not enabled
Customization.features.golfBooking = true;        // true = feature enabled | false = feature not enabled
Customization.features.diningBooking = true;				// true = feature enabled | false = feature not enabled
Customization.features.pmsBooking = true;				// true = feature enabled | false = feature not enabled
Customization.features.membership = true;				// true = feature enabled | false = feature not enabled
// END: Toggle feature availability
// START: Spa Settings
Customization.spaBooking = {};
Customization.spaBooking.appointmentIntervalTime = 30; 			// in minutes
Customization.spaBooking.allowBookingToday = true;			// true = appointments allowed date of booking | false = no appointments date of booking
Customization.spaBooking.allowBookClass = true;             // true = enable book class
Customization.spaBooking.showPropertyName = false;
Customization.spaBooking.defaultGender = '';
Customization.spaBooking.defaultSalutation = '';
Customization.spaBooking.sortByPrice = false;
Customization.spaBooking.sortClassesByDate = false;
Customization.spaBooking.showItemPrice = true;
Customization.spaBooking.autoExpandResults = false;
Customization.spaBooking.showPriceIncludingSurcharges = false;
Customization.spaBooking.preserveClassItemCrossDate = false;
Customization.spaBooking.disallowBookForGroupMember = false;
Customization.spaBooking.disallowQuickAddGroupMember = false;
Customization.spaBooking.useFullPageAddGroupMember = false;
Customization.spaBooking.allowSpaGuestRequest = true;
Customization.spaBooking.alwaysQueryPrice = true;
Customization.spaBooking.availabilityQueryLookaheadDays = 3;
Customization.spaBooking.eventCalendarDefaultView = 'month'; // one of month, agendaWeek, agendaDay, or basicDay
Customization.spaBooking.eventCalendarLocations = ['999']; // Set to e.g.: ['123','555'] for spa locations that should display as Calendar
Customization.spaBooking.eventCalendarTimeMin = ''; // leave blank for auto based on location open times. format is "9:45"
Customization.spaBooking.eventCalendarTimeMax = ''; // leave blank for auto based on location close times. format is "17:30"
Customization.spaBooking.eventCalendarTimeSlot = '00:30:00'; // default 30 minutes minor grid lines on calendar
Customization.spaBooking.eventCalendarViews = 'agendaDay,agendaWeek,month,basicDay'; // available calendar views. First one is default.
Customization.spaBooking.eventCalendarSlotEventOverlap = false; // true allows events to visually overlap each other, while false gives each event its own vertial column

// END: Spa Settings
// START: Ski Settings
Customization.skiBooking = {};
Customization.skiBooking.allowBookingToday = false;			// true = appointments allowed date of booking | false = no appointments date of booking
Customization.skiBooking.showPropertyName = false;
Customization.skiBooking.defaultSalutation = '';
Customization.skiBooking.sortByPrice = false;
Customization.skiBooking.offerInsuranceOnBookingSummary = true;
Customization.skiBooking.showPriceIncludingSurcharges = false;
Customization.skiBooking.groupPromoCategoriesIntoOne = false;
Customization.skiBooking.disallowBookForGroupMember = false;
Customization.skiBooking.disallowQuickAddGroupMember = false;
Customization.skiBooking.useFullPageAddGroupMember = false;
Customization.skiBooking.forceSkiDate = false; // Allow ski bookings only on specified date. Format: "yyyy-mm-dd"
Customization.skiBooking.queryAdvanceDays = 0; // zero to disable. Will show lift tickets from today until x days in the future.
Customization.skiBooking.queryStartDate = '+1'; // Use '+0' for today, or a specific date, like '2019-01-13', or a relative date '+21d'
                                                // NB: if you have allowBookingToday set to false, put '+1' here. Only applicable if queryAdvanceDays is set
Customization.skiBooking.showPackageItems = true;
Customization.skiBooking.itemClassDisplayOrder = [ 'package', 'program', 'pass', 'ticket', 'rental']; // also can use 'rental+insurance' as a combined item class, or add 'insurance' on its own

// END: Ski Settings
// START: Room Settings
Customization.roomsBooking = {};
Customization.roomsBooking.allowBookingToday = false;			// true = appointments allowed date of booking | false = no appointments date of booking
Customization.roomsBooking.dayGuestOnlyOne = false;
Customization.roomsBooking.filterByMaximumLengthOfStay = true;
Customization.roomsBooking.defaultNumAdults = 1; // Number from 1 to 4. Determines Single/Double/etc. rate shown on calendar
Customization.roomsBooking.showpmsNumYouth = true;
Customization.roomsBooking.showpmsNumChildren = true;
Customization.roomsBooking.showpmsNumJrChildren = true;
Customization.roomsBooking.showpmsPromoCode = true;
Customization.roomsBooking.showRateScreenMoreButton = true;
Customization.roomsBooking.showPropertyName = false;
Customization.roomsBooking.showGroupBooking = true;
Customization.roomsBooking.showDailyRates = false; // per day rate breakdown on booking summary
Customization.roomsBooking.sortPackagesByName = false; // false = off / "ASC" or true = sort 0-9A-Z / "DESC" = sort Z-A9-0
Customization.roomsBooking.sortRoomTypesByName = false; // false = off / "ASC" or true = sort 0-9A-Z / "DESC" = sort Z-A9-0
Customization.roomsBooking.sortRoomTypesByPrice = false; // false = off / "ASC" or true = sort smaller # first / "DESC" = larger # first
Customization.roomsBooking.suppressDailyRate = false; // false = show ADR, true = show (pre surcharge) total stay cost
Customization.roomsBooking.suppressCalendarRate = false;
Customization.roomsBooking.suppressCalendarPopover = false;
Customization.roomsBooking.suppressRateDateLoading = false;
Customization.roomsBooking.suppressConfirmScreen = false;
Customization.roomsBooking.showPricesOfRatesWithZeroRoomsLeftOnCalendar = false;
Customization.roomsBooking.ignoreStopArrivalsOnCalendar = false;
Customization.roomsBooking.ignoreMinLengthOfStayOnCalendar = false;
Customization.roomsBooking.ignoreDayOfWeekRestrictionOnCalendar = false;
Customization.roomsBooking.calendarRateDecimals = 0;
Customization.roomsBooking.autoExpandRateRoomResults = false;
Customization.roomsBooking.roomSelection = false;
Customization.roomsBooking.lowAvailabilityThreshold = 50;
Customization.roomsBooking.showSpecialServicePriceIncludingSurcharges = false;
Customization.roomsBooking.guestNoteSpecialServiceMandatory = false;
	// Customization.roomsBooking.dayGuestPromoCode:
	//   Set to false to turn off availability of day guest mode; use string such as "MYPROMOCODE" otherwise
	//   Required to be set even if you are using the /dayguest/ deep linking with alternate promo codes; in such a case
	//   this value will be used as the default promo code to search for.
Customization.roomsBooking.dayGuestPromoCode = false;
Customization.roomsBooking.suppressCalendarNonIosTouchTwoStageDateSelection = true;
// END: Room Settings
// START: Gift Cert Settings
Customization.retail = {};
Customization.retail.allowMessageInNonCustomGC  = true;
Customization.retail.showPickup = true;
Customization.retail.showSnailMail = true;
Customization.retail.sortByPrice = false;
// END: Gift Cert Settings
// START: Golf Settings
Customization.golfBooking = {};
Customization.golfBooking.allowBookingToday = false;
Customization.golfBooking.teeTimeIntervalTime = 8;
Customization.golfBooking.onlyShowTeeTimesWithFourAvailableSlots = false;
Customization.golfBooking.showPriceIncludingSurcharges = false;
Customization.golfBooking.showTeeSheet = true;
Customization.golfBooking.showTeeSheetAvailabilitiesAsGridOfButtons = true;
Customization.golfBooking.PMSRoomMandatory = []; // put CourseIds here to enable PMSRoomMandatory mode for them, e.g.: ['FT9','ABC']
// END: Golf Settings
// START: Dining Settings
Customization.dining = {}
Customization.dining.defaultSelectOffset = 60; // minutes after current time to auto-select available timeslot when loading dining screen
Customization.dining.showSpecialRequest = true;
Customization.dining.requireMobileNumber = false;
Customization.dining.allowBookingToday = true;
// END: Dining Settings
//START: View Receipt Button
Customization.exactTarget = {};
Customization.exactTarget.viewReceipt = true;
//END:
Customization.payment = {};
Customization.payment.ccEnabledVisa = true;
Customization.payment.ccEnabledMC = true;
Customization.payment.ccEnabledAmex = true;
Customization.payment.ccEnabledDisc = true;
Customization.payment.requireExplicitTermsAccept = true;
Customization.payment.defaultStoreCard = true;
Customization.payment.skipCCifGuaranteed = false;
// GC Redemption settings.
// If all four redeemGC settings are false, then GC redemption will not be offered.
// The GCNum settings enable submitting the user-entered number as a Gift Certificate Number
// The GCID settings enable submitting the user-entered number as a Gift Card ID
// If only the ...andRefNum setting is true, then Ref Num field will be shown and required
// If only the non-...andRefNum setting is true, then Ref Num field will not be shown
// If both the non- and ...andRefNum settings are true, then Ref Num field will be shown and optional
Customization.payment.redeemGCbyGCID = false;
Customization.payment.redeemGCbyGCIDandRefNum = false;
Customization.payment.redeemGCbyGCNum = false;
Customization.payment.redeemGCbyGCNumandRefNum = false;

Customization.payment.GCNumberLengthMin = 4;
Customization.payment.GCNumberLengthMax = 16;
Customization.payment.skipGuaranteeIfZeroBalanceAndGCUsed = false;

Customization.login = {};
Customization.login.atCheckOut = true;
Customization.login.emailcheck = true; // true = make web service calls to check for the email address in the system
Customization.login.useIntegratedLogin = true; // true = enable single-page login+signup mechanism
Customization.login.alternativeNavbarLogin = true;
Customization.login.alternativeLogin = true;
Customization.login.allowCreatePassword = true;
Customization.login.strictMode = false;
Customization.paypal = {};
Customization.paypal.enabled = false;
Customization.paypal.url = "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&useraction=commit&token=";
Customization.yespay = {};
Customization.yespay.enabled = false;
Customization.paytm = {};
Customization.paytm.enabled = false;
Customization.i4go = {};
Customization.i4go.enabled = false;

Customization.SOAPUrl = null;
define(Customization);
