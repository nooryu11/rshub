
exports.customerJMA = {
    Customer: {
        sqlTable: 'ALL_CUSTOMER',
        uniqueKey: 'ALL_CUSTOMER_ID',
        // fields: {
        //     Folio_Items: {
        //         sqlBatch: {
        //             thisKey: 'ALL_CUSTOMER_ID',
        //             parentKey: 'ALL_CUSTOMER_ID'
        //         }
        //     }
        // },
    },
}

exports.customerType = `
    type Customer {
        ALL_CUSTOMER_ID: ID
        NAME: String
        ALL_CUSTOMER_TYPE: String
        FIRST_NAME: String
        LAST_NAME: String
        SALUTATION: String
        COMPANY_NAME: String
        ADDRESS: String
        CITY: String
        STATE_PROV: String
        POSTAL_CODE: String
        COUNTRY: String
        HOME_PHONE: String
        WORK_PHONE: String
        WORK_EXT: String
        OTHER_PHONE: String
        FAX_NUMBER: String
        CUSTOMER_SINCE: String
        EMAIL_ADDRESS: String
        BIRTH_DATE: String
        TOTAL_PURCHASED: String
        GROUP_ID: String
        OLD_CUSTOMER_ID: String
        OLD_GROUP_ID: String
        APP: String
        SPA_PURCHASED: String
        SKI_PURCHASED: String
        GLF_PURCHASED: String
        POS_PURCHASED: String
        FIT_PURCHASED: String
        CAT_PURCHASED: String
        PMS_PURCHASED: String
        SPA_SERVICES: String
        SPA_PRODUCTS: String
        SPA_LAST_VISIT_DATE: String
        OCCUPATION: String
        FIT_REFERENCE: String
        FIT_PROSPECT: String
        FIT_REASSESS_DATE: String
        FIT_NUM_VISITS: String
        FIT_LAST_VISIT_DATE: String
        FIT_STAFF_ID: String
        IS_GROUP: String
        SOURCE: String
        REFERRED_BY_ID: String
        DIRECT_BILL: String
        APPROVED_BY: String
        ALL_MARKET_SOURCE: String
        DEFAULT_RATE_TYPE: String
        LOCATION: String
        MAIN_PHONE: String
        PHONE_MAIN: String
        NO_CALL: String
        NO_MAIL: String
        NO_EMAIL: String
        SOURCE_CUST_ID: String
        CUSTOMER_CODE: String
        CC_NUMBER: String
        CC_NAME: String
        CC_TYPE: String
        CC_EXPIRY: String
        OLD_SPA_PURCHASED: String
        OLD_SKI_PURCHASED: String
        OLD_GLF_PURCHASED: String
        OLD_POS_PURCHASED: String
        OLD_FIT_PURCHASED: String
        OLD_CAT_PURCHASED: String
        OLD_PMS_PURCHASED: String
        OLD_SPA_SERVICES: String
        OLD_SPA_PRODUCTS: String
        CREATED_DATE: String
        READONLY_NAME: String
        VIP_LEVEL: String
        RS_LU_PROV_ID: String
        UPPER_NAME: String
        UPPER_FIRST_NAME: String
        UPPER_LAST_NAME: String
        GENDER: String
        LAST_VISIT_DATE: String
        TOUR_OPERATOR: String
        DEFAULT_DISCOUNT: String
        CREATE_STAFF_ID: String
        CHANGE_STAFF_ID: String
        RELATIONSHIP: String
        DEFAULT_DISCOUNT_EFF: String
        DEFAULT_DISCOUNT_EXP: String
        DEMOGRAPHIC: String
        HOME_FACILITY_CODE: String
        OTHER_ADDRESS: String
        OTHER_CITY: String
        OTHER_STATE_PROV: String
        OTHER_POSTAL_CODE: String
        OTHER_COUNTRY: String
        SOURCE_GROUP_ID: String
        CSG_MEMBER_OK: String
        CSG_CHARGE_GROUP: String
        RESIGN_DATE: String
        SEND_METHOD: String
        MISC_PHONE: String
        CC_POSTAL_CODE: String
        ADDRESS_LINE_2: String
        SOURCE_IFACE: String
        SOURCE_SYS_ID: String
        SOURCE_SYS_NAME: String
        COUNTY: String
        OTHER_COUNTY: String
        RET_PURCHASED: String
        EXCLUDE_LOYALTY: String
        CC_CHANGE_DATE: String
        PAY_INT_UNIQUE_ID: String
        ALL_CUSTOMER_GUID: String
        LANGUAGE: String
        OTHER_ADDRESS_LINE_2: String
        ALL_BOOKING_AGENT_ID: String
        ACCESS_CARD_NUMBER: String
        SOURCE_EMAIL_ADDRESS: String
        PROCESS_ID: String
        MOBILE_PHONE: String
        SOURCE_SYS_SUBSCRIBED: String
        TAX_EXEMPT_TYPE: String
        HOME_COUNTRY_CODE: String
        WORK_COUNTRY_CODE: String
        MOBILE_COUNTRY_CODE: String
        OTHER_COUNTRY_CODE: String
        MAIN_COUNTRY_CODE: String
        CC_ADDRESS: String
        CC_ADDRESS_2: String
        CC_CITY: String
        CC_STATE_PROV: String
        CC_COUNTRY_CODE: String
        NPR: String
        PAY_AUTH_SHOPPER_ID: String
        NO_SMS: String
        ANONYMIZED_DATE: String
        
    }
`;