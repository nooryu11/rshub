exports.folioItemJMA = {
    Spa_Folio_Item: {
        sqlTable: 'SPA_FOLIO_ITEM',
        uniqueKey: 'SPA_FOLIO_ITEM_ID',
    },
    spafolio:{
        sqlTable: 'SPA_FOLIO',
        uniqueKey: 'SPA_FOLIO_ID',
        fields: {
            Folio_Items: {
                sqlBatch: {
                    thisKey: 'SPA_FOLIO_ID',
                    parentKey: 'SPA_FOLIO_ID'
                }
            }
        },
    }
}

exports.folioItemType = `
    type Spa_Folio_Item {
        SPA_FOLIO_ITEM_ID: String
        SPA_FOLIO_ID: String
        SPA_ITEM_ID: String
        SPA_CLASS_SCHED_ID: String
        ITEM_NAME: String
        ITEM_TYPE: String
        PKG_ITEM_TYPE: String
        PRICE: String
        QTY: String
        DISCOUNT: String
        EXT_PRICE: String
        CUST_NAME: String
        TOTAL_WITH_SURCHARGES: String
        CHARGE_CODE: String
        BOOK_STARTTIME: String
        BOOK_ENDTIME: String
        SERVICE_TIME: String
        BOOK_STATUS: String
        UPC_CODE: String
        SPA_STAFF_ID: String
        SPA_ROOM_ID: String
        TXN_DATE: String
        TXN_CODE: String
        REFERENCE: String
        DEFERRED: String
        REFUND: String
        STAFF_REQ: String
        PACKAGED_IN: String
        PCT_PORTION: String
        PKG_ORDER: String
        ITEM_CLASS: String
        SPA_OPERATING_DAY: String
        ALL_CUSTOMER_ID: String
        CLEAN_TIME: String
        IS_GC: String
        PMS_DATE: String
        LOCATION: String
        LOCK_BOOKING: String
        CREATE_STAFF_ID: String
        CHANGE_STAFF_ID: String
        STAFF_REQ_GENDER: String
        TRN_FOLIO_ITEM_ID: String
        IS_FOOD: String
        NEEDS_PRINTING: String
        COST_AT_PURCHASE: String
        RS_POSTING_ID: String
        ALLOW_OVERBOOK: String
        DISC_REASON: String
        IS_PCT: String
        PROCESS_TIME: String
        BACK_BAR_CHARGE: String
        NO_SHOW: String
        SPA_EQUIPMENT_ID: String
        PRICE_RULE: String
        WEB_BOOKED: String
        SPA_FOLIO_ITEM_MOD_ID: String
        PC_FOLIO_PAYMENT_ID: String
        PC_ELIGIBLE: String
        LOYALTY_PTS: String
        LOYALTY_PTS_TOTAL: String
        SAME_GENDER: String
        SOURCE_IFACE: String
        WEB_FOLIO_TXN_ID: String
        POSTED_CHARGE: String
        BREAKOUT_TOTAL: String
        SOURCE: String
        ADJ_REASON: String
        ADJ_NOTE: String
        PRICE_PRE_TAX: String
        EXT_PRICE_PRE_TAX: String
        RNT_BOOKING_ID: String
        PMS_INTERFACE_ID: String
        SPA_GROUP_BOOKING_ID: String
        TAX_EXEMPT_TYPE: String
        ALL_UNIT_ID: String
        UNIT_PRICE: String
        UNIT_QTY: String
        GUEST_REQUEST: String
        COMM_PRE_DISCOUNT: String
        IGNORE_CONFLICT: String
    }
    type spafolio {
        SPA_FOLIO_ID:String
        FOLIO_SUBTOTAL:String
        FOLIO_SURCHARGES:String
        FOLIO_TOTAL:String
        FOLIO_EXTRA_GRATS:String
        FOLIO_PAYMENTS:String
        FOLIO_BALANCE:String
        FOLIO_COMP_TOTAL:String
        FOLIO_COMP_BALANCE:String
        FOLIO_SETTLED:String
        FOLIO_OPEN_DATE: Date
        FOLIO_CLOSE_DATE: Date
        INVOICE_NOTE:String
        SPA_OPERATING_DAY:String
        CREATED_BY:String
        EST_ARRIVAL_DATE: Date
        ALL_CUSTOMER_ID:String
        CREATE_STAFF_ID:String
        CHANGE_STAFF_ID:String
        PMS_FOLIO_ID:String
        LOCATION:String
        ALL_BOOKING_AGENT_ID:String
        TABLE_NUMBER:String
        TOTAL_PURCHASES:String
        LOYALTY_PURCHASES:String
        FOLIO_LOCK:String
        MARKET_CODE:String
        DEFAULT_DISCOUNT:String
        ALL_BOOKING_AGENT_CONTACT_ID:String
        WEB_FOLIO_ID:String
        CUSTOMER_INSTRUCT:String
        DELIVERY_METHOD:String
        SOURCE_SYS_ID:String
        SOURCE_SYS_NAME:String
        BOOK_MODE:String
        PARENT_FOLIO_ID:String
        SOURCE_SYS_ROOM_NUM:String
        SOURCE_SYS_ARR_DATE: Date
        SOURCE_SYS_DEP_DATE: Date
        SOURCE_SYS_RATE_CODE:String
        SOURCE_SYS_ROOM_TYPE:String
        RSAPP_AUTH_ID:String
        SOURCE_IFACE:String
        WEB_FOLIO_TXN_ID:String
        NO_POSTING:String
        POSTING_CREDIT_LIMIT:String
        POSTING_BALANCE:String
        SOURCE_SYS_PROPERTY_ID:String
        SEC_INVOICE_NUM:String
        SOURCE_SYS_CONF_NUM:String
        TAX_EXEMPT_TYPE:String
        LAST_MODIFIED_DATE: Date
        SPA_FOLIO_TYPE:String
        SHOW_GROUP_ON_APPT:String
        TXPORT_IVUNUM:String
        TXPORT_TERMID:String
        Folio_Items: [Spa_Folio_Item!]!
      
    }
`;