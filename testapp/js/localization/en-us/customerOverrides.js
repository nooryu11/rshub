define([
    'localization/en-us/Localization',
    'text!localization/en-us/thirdPartyAnalyticsTpl.html',
    'underscore',
    'text!localization/en-us/spaClassListTplMiraval.html',
    'text!localization/en-us/spaServiceListTplMiraval.html',
    'Handlebars',
    'hbs!app/views/templates/navbar',
    'hbs!app/views/templates/breadcrumbs',
    'hbs!app/views/templates/content',
    'moment',
    'app/views/templates/helpers/RSDateToString',
], function(
    Localization,
    thirdPartyAnalyticsTpl,
    _,
    spaClassListTplMiravalhtml,
    spaServiceListTplMiravalhtml,
    Handlebars,
    navbarTpl,
    breadcrumbsTpl,
    contentTpl,
    moment,
    RSDateToString
) {
    Localization.paymentProcessing.analyticsCustomTemplate = thirdPartyAnalyticsTpl;
    // Do not remove the analyticsCustomTemplate line above
    Localization.spaBooking.serviceSelection.availabilityRow = '<div class="spaAvailability clearfix"><i class="fa fa-clock"></i><button class="bookButton btn btn-primary pull-right">Book Now</button><span class="time"></span><span class="availableText">Available</span></div>'
    Localization.siteName = "Miraval Arizona Resort & Spa in Tucson, Arizona";
    Localization.general.features.introTitle = "CONNECT WITH US, CREATE YOUR PLAN";
    Localization.general.features.intro = 'Explore our life-enhancing wellbeing activities, private sessions with world renowned specialists, and spa services - each designed to help you indulge,improve, reflect and renew. Add activities and spa services to your cart as you create your Miraval itinerary. Your journey to you begins now.'
    Localization.spaBooking.serviceSelection.instructions = 'Please pick a date for your service and then select Book on your desired service below:';
    Localization.bookingSummary.welcomeFolio = 'We are delighted that you have chosen to stay with us at Miraval Arizona';
    Localization.roomReservation.datesAndOccupants.arrivalLabel = "Check In";
    Localization.roomReservation.datesAndOccupants.departureLabel = "Check Out";
    Localization.spaBooking.serviceSelection.noFurtherAvailabilities = 'No availabilities found on <span class="date"/>';
    Localization.general.login.folioLoginFail = "Could not find a reservation with those details";
    Localization.bookingSummary.checkoutInfo = 'You have items in your cart.     They will be removed unless you confirm them. Please note that you will be unable to change or remove activities or services online once you click CONFIRM.';
    Localization.general.continueProcessButtonLabel = 'Add to Cart';
    Localization.roomReservation.packageSelection.title = 'Package';
    Localization.roomReservation.roomTypeSelection.title = 'Room Type';
    Localization.bookingSummary.removeSpaReservation = "Remove";
    Localization.paymentProcessing.PPPostError = "Apologies, we were not able to confirm your bookings at this time. Please refresh the page and try again.";
    Localization.general.err.startOver = "Explore More";
    Localization.paymentProcessing.paymentSuccessTitle = 'Thank you for planning your experiences. We look forward to welcoming you to Miraval soon.';
    Localization.bookingSummary.spaServiceFrom = '';

    var activityLocation = '201',
        spaLocation = '101'
    if (!window.original_template) {
        var showPMSBookingWidget = false; // use booking widget if there is only one pms venue
        var bookingWidgetPMSVenueName = 'Lodge'; // put the name of the venue here
        console = _console
        Localization.general.features.title = 'Welcome...';
        Localization.general.features.giftCertificatesName = 'Gift';
        Localization.general.features.golfName = 'Golf';
        Localization.general.features.pmsName = 'Room';
        Localization.general.features.spaName = 'SPA';
        Localization.general.features.skiName = "Ski";
        Localization.general.features.clubName = "Club";

        app.controllers.spaController.actions['groupActivity'] = ['spaClassSelectedMiraval']
        app.controllers.spaController.spaClassSelectedMiraval = function spaClassSelectedMiraval(spaLocationId, startDate, showItem, guestName) {
            app.controllers.spaController.spaClassSelected(spaLocationId, startDate, showItem, guestName)
            // TODO: When date isn't selected, select a Date day after today.
            if (startDate === "") {

            }
        };


        app.controllers.spaController.actions['privateActivity'] = ['spaServiceSelectedMiraval']
        app.controllers.spaController.spaServiceSelectedMiraval = function spaServiceSelectedMiraval(showitem, date, time, staffGenderOrId, guestName, runQuery) {
            app.controllers.spaController.spaServiceSelected(showitem, date, time, staffGenderOrId, guestName, runQuery)
        }
        app.views.spaView.event.listen('requestSpaServiceSelectionMiraval', app.views.spaView, function(e, spaServices, itemId, location, date, time, staffGenderOrId, guestName, dateList, user, group) {});
        app.commonViewHelper.prepSpaFormMiraval = function(location, itemId, date, time, staffGenderOrId, templateData) {}
        
        if (!app.views.spaView.event.events.data('events')['confirmSpaClass'][0]._handler) {
            app.views.spaView.event.events.data('events')['confirmSpaClass'][0]._handler = app.views.spaView.event.events.data('events')['confirmSpaClass'][0].handler
            app.views.spaView.event.events.data('events')['confirmSpaClass'][0].handler = function(e, spaClassComponent,location,item,spaLocationId, classId, itemId, startDate, guestName, bookingtype) {
                // app.views.spaView.event.events.data('events')['confirmSpaClass'][0]._handler.call(this, e, spaClassComponent,location,item,spaLocationId, classId, itemId, startDate, guestName, bookingtype)
                app.dispatcher.redirect('spaBooking','bookClass', [spaLocationId, classId, itemId, startDate, guestName, "1"])
            }
        }
        if (!app.views.roomsView.event.events.data('events')['requestPmsVenueSelection'][0]._handler) {
            app.views.roomsView.event.events.data('events')['requestPmsVenueSelection'][0]._handler = app.views.roomsView.event.events.data('events')['requestPmsVenueSelection'][0].handler
            app.views.roomsView.event.events.data('events')['requestPmsVenueSelection'][0].handler = function(e, pmsVenues) {
                var usePMSVenues = _.sortBy(pmsVenues, function(x) {
                    return x.VenueId
                })
                app.views.roomsView.event.events.data('events')['requestPmsVenueSelection'][0]._handler.call(this, e, usePMSVenues)
            }
        }

        if (!app.commonViewHelper._updateSpaItemAvailability) {
            app.commonViewHelper._updateSpaItemAvailability = app.commonViewHelper.updateSpaItemAvailability;
            app.commonViewHelper.updateSpaItemAvailability = function(params) {
                app.commonViewHelper._updateSpaItemAvailability(params);
                var addOneMinute = function addOneMinute(timestr) {
                    timestr = 1 + +timestr
                    if (timestr % 100 == 60) {
                        timestr += 40
                    }
                    timestr = "" + timestr
                    while (timestr.length < 4) {
                        timestr = "0" + timestr
                    }
                    return timestr
                }
                var spaItemElement = $('#spaItem' + params.itemId),
                    bookingWindow = spaItemElement.data('bookingWindow'),
                    buttonElement = spaItemElement.find('.spaServiceButton'),
                    availabilityElement = $(app.localization.spaBooking.serviceSelection.availabilityRow),
                    availabilityMaxTime = "",
                    lookahead = +buttonElement.data('lookahead'),
                    startDate = params.date // buttonElement.data('startDate')
                    ,
                    startTime = addOneMinute(params.time) // buttonElement.data('startTime')
                    ,
                    openTime = spaItemElement.find('.spaServiceTimeSelect').data('opentime'),
                    closeTime = spaItemElement.find('.spaServiceTimeSelect').data('closetime'),
                    duration = buttonElement.data('duration'),
                    maxtime = '',
                    spaEndTime = moment(startTime, 'HH:mm').add(duration, 'm').toDate(),
                    spaEndTimeFormatted = moment(spaEndTime).format('HH:mm A')
                $('.hasAvailabilities .spaAvailability').data('endtime', spaEndTimeFormatted);



                var spaItemElement = $('#spaItem'+params.itemId)
                    , bookingWindow = spaItemElement.data('bookingWindow')
                    , buttonElement = spaItemElement.find('.spaServiceButton')
                    , availabilityElement = $(app.localization.spaBooking.serviceSelection.availabilityRow)
                    , unavailableElement = $('<div class="spaAvailability unavailable clearfix"><i class="icon-time"></i><button class="disabled btn btn-primary pull-right" disabled>Not Available</button><span class="time"></span><span class="unavailableText"></span></div>')
                    , availabilityMaxTime = ""
                    , lookahead = +buttonElement.data('lookahead')
                    , startDate = params.date // buttonElement.data('startDate')
                    , startTime = addOneMinute( params.time ) // buttonElement.data('startTime')
                    , openTime = spaItemElement.find('.spaServiceTimeSelect').data('opentime')
                    , closeTime = spaItemElement.find('.spaServiceTimeSelect').data('closetime')
                    , duration = buttonElement.data('duration')
                    , maxtime = ''
                spaItemElement.find('#spaServiceStaff'+params.itemId).on("change",function(e){
                 //   $('.itemPrice').find('.alert.notAvailable a.close').trigger('click')
                 e.stopImmediatePropagation();
                 $( document ).ready(function() {
                    setTimeout(function(){ 
                        spaItemElement.find('.spaServiceButton')[0].click() },200)
                    })
                })
                spaItemElement.addClass('hasAvailabilities')
                $(spaItemElement).find('.itemPrice h5').remove()
                $('.hasAvailabilities').find('.itemPrice').prepend("<h5 class=''>Available times</h5>")
                var currentTimeInLocationTZ = false;
                if (moment.tz(startDate, bookingWindow.timeZone).format('YYYY-MM-DD') == moment.tz(bookingWindow.timeZone).format('YYYY-MM-DD')) {
                    currentTimeInLocationTZ = moment.tz(bookingWindow.timeZone).format('HHmm')
                    if (params.spaAvailability&&params.spaAvailability.SpaAvailability) {
                        params.spaAvailability.SpaAvailability = _.filter(params.spaAvailability.SpaAvailability,function(availability){
                            return availability.StartTime.substr(10,4) >= currentTimeInLocationTZ
                        })
                    }
                }

                if (params.spaAvailability&&params.spaAvailability.SpaAvailability) {
                    buttonElement.button('reset')
                    spaItemElement.find('.spaAvailability.unavailable,.loader').remove();
                    _.each(params.spaAvailability.SpaAvailability,function(availability){
                        var conflict = false
                            , endTime = Date.parseExact(availability.StartTime,'yyyy-MM-ddHHmmss').add(duration).minutes().toString('yyyy-MM-ddHHmmss')
                        _.each(app.data.spaBookings,function(spaBooking){
                            if ( spaBooking.SpaFolioItem.BookStartTime <= endTime
                                && availability.StartTime <= spaBooking.SpaFolioItem.BookEndTime ) {
                                conflict = true
                            }
                        })
                        availabilityMaxTime = availabilityMaxTime<availability.StartTime?availability.StartTime:availabilityMaxTime
                        if (conflict) {
                            var unavailElement = unavailableElement.clone()
                            unavailElement.attr('data-time',availability.StartTime)
                            unavailElement.attr('data-reqtime',params.time)
                            unavailElement.find('.time').text(Date.parseExact(availability.StartTime.substr(10,4),"HHmm").toString(app.localization.CultureInfo.formatPatterns.shortTime))
                            spaItemElement.find('.spaServiceButton').after(unavailElement)
                            _.each(app.data.spaBookings, function (spaBooking) {
                                if ( spaBooking.SpaFolioItem.BookStartTime <= endTime
                                    && availability.StartTime <= spaBooking.SpaFolioItem.BookEndTime ) {
                                    unavailElement.find('.unavailableText').text('Booked for ' + spaBooking.SpaFolioItem.ItemName);
                                }
                            })
                            return
                        }
                        console.log("182",availability)
                        spaItemElement.find('.spaAvailability[data-time='+availability.StartTime+']').remove()
                        var newElement = availabilityElement.clone()
                            , staffName = _.find(params.spaStaffList.SpaStaff,function(x){return x.SpaStaffId==availability.SpaStaffId})
                        staffName = staffName && staffName.SpaStaffName || ''
                        newElement.attr('data-time',availability.StartTime)
                        newElement.attr('data-reqtime',params.time)
                        newElement.find('.staff').text(staffName)
                        newElement.find('.time').text(Date.parseExact(availability.StartTime.substr(10,4),"HHmm").toString(app.localization.CultureInfo.formatPatterns.shortTime))
                        newElement.find('.price').text(app.localization.general.currencyPrefix + (+availability.Price).toFixed(2) + app.localization.general.currencyPostfix)
                        newElement.find('.bookButton').on('click',function(e){
                            e.preventDefault()
                            $(this).text(Localization.spaBooking.serviceSelection.loading)
                            app.dispatcher.dispatch('spaBooking', 'book', [params.itemId, availability.StartTime.substr(0,10), availability.StartTime.substr(10,4), availability.SpaStaffId, params.guestName, params.staffGenderOrId, 0, $('#spaGuestRequest'+params.itemId).val()]);
                        })
                        spaItemElement.find('.spaServiceButton').after(newElement)
                    })
                    // if params.spaAvailability.SpaAvailability.length<5 make note that there are no more today
                    maxTime = getMaxTime()
                } else {
                    // we got nothing
                    $('.hasAvailabilities').find('.itemPrice h5').remove()
                 
                    maxTime = getMaxTime()
                    if (startTime > maxTime && getMinReqTime() < openTime) {
                        maxTime = closeTime
                    } else if (lookahead > 0) {
                        if (startTime > openTime) {
                            startTime=openTime
                            // skip query if we have result with reqtime == opentime
                        } else {
                            buttonElement.data('lookahead', lookahead=lookahead-1 )
                            startDate=Date.parseExact(startDate,"yyyy-MM-dd").add(1).day().toString('yyyy-MM-dd')
                        }
                        app.dispatcher.dispatch('spaBooking', 'serviceItem', [params.itemId, startDate, startTime, params.staffGenderOrId, params.guestName]);
                        return
                    } else {
                        buttonElement.button('reset')
                        spaItemElement.find('.spaServiceButton').after(
                            '<div class="alert fade in error notAvailable"><a class="close" data-dismiss="alert" href="#">×</a><p>'
                            +(app.customization.spaBooking.availabilityQueryLookaheadDays?app.localization.spaBooking.serviceSelection.notAvailableDates:app.localization.spaBooking.serviceSelection.notAvailable)
                            +(app.customization.spaBooking.availabilityQueryLookaheadDays
                            ?'</p><a class="btn" href="#">'+app.localization.spaBooking.serviceSelection.checkNextDay+'</a></div>'
                            :'</p></div>')
                        )
                        app.customization.spaBooking.availabilityQueryLookaheadDays && spaItemElement.find('.spaServiceButton').css('display','none')
                        spaItemElement.find('.alert.notAvailable .date').text(Date.parseExact(params.date,"yyyy-MM-dd").toString(app.localization.CultureInfo.formatPatterns.mediumDate))
                        spaItemElement.find('.alert.notAvailable .fromdate').text(Date.parseExact(buttonElement.data('startDate')||params.date,"yyyy-MM-dd").toString(app.localization.CultureInfo.formatPatterns.mediumDate))
                        spaItemElement.find('.alert.notAvailable .time').text(Date.parseExact(addOneMinute(params.time),"HHmm").toString(app.localization.CultureInfo.formatPatterns.shortTime))
                        spaItemElement.find('.alert.notAvailable .staffOrGender').html(
                            params.staffGenderOrId == "M" ? app.localization.spaBooking.serviceSelection.notAvailableGenderMale :
                                params.staffGenderOrId == "F" ? app.localization.spaBooking.serviceSelection.notAvailableGenderFemale :
                                    !!params.staffGenderOrId ? app.localization.spaBooking.serviceSelection.notAvailableStaff : ""
                        )
                        spaItemElement.find('.alert.notAvailable a.btn').on('click', function (obj) {
                            obj.preventDefault()
                            spaItemElement.find('.spaServiceDate').val( Date.parseExact(startDate,"yyyy-MM-dd").add(1).day().toString('yyyy-MM-dd') ).change()
                            setTimeout(function(){ spaItemElement.find('.spaServiceButton').trigger('click') },200)
                        })
                        if (!!params.staffGenderOrId && params.staffGenderOrId != "M" && params.staffGenderOrId != "F") {
                            var staffName = _.find(spaItemElement.find('.spaServiceStaff option'),function(x){return x.value==params.staffGenderOrId})
                            staffName && spaItemElement.find('.alert.notAvailable .staffName').text(staffName.text)
                        }
                        app.customization.spaBooking.availabilityQueryLookaheadDays || setTimeout(function(){
                            spaItemElement.find('.alert.notAvailable').alert('close')
                        },4500)
                    }

                }
                function getMaxTime() {
                    var maxTime = ''
                    spaItemElement.find('.spaAvailability').each(function(i,item){
                        var time = $(item).data('time')
                        maxTime = maxTime<time?time:maxTime
                    })
                    return maxTime.substr(10,4)
                }
                function getMinReqTime() {
                    var minTime = params.time
                    spaItemElement.find('.spaAvailability').each(function(i,item){
                        var time = $(item).data('reqtime')
                        minTime = minTime>time?time:minTime
                    })
                    return minTime
                }
                spaItemElement.find('.spaServiceButton').after(
                    _.sortBy(spaItemElement.find('.spaAvailability'),function(item){
                        var time = $(item).data('time')
                        return time
                    })
                )
                if (true || !!availabilityMaxTime) {
                    if(!!buttonElement.data('startDate') && params.date != buttonElement.data('startDate')) {
                        $('.spaServiceDate').val(params.date).change()
                        spaItemElement.find('.spaServiceButton').after(
                            '<div class="alert fade in alert-info notAvailable"><a class="close" data-dismiss="alert" href="#">×</a><p>'
                            +(app.localization.spaBooking.serviceSelection.foundOnDate)
                            +'</p></div>'
                        )
                        spaItemElement.find('.alert.notAvailable .date').text(Date.parseExact(params.date,"yyyy-MM-dd").toString(app.localization.CultureInfo.formatPatterns.mediumDate))
                        spaItemElement.find('.alert.notAvailable .fromdate').text(Date.parseExact(buttonElement.data('startDate'),"yyyy-MM-dd").toString(app.localization.CultureInfo.formatPatterns.mediumDate))
                        spaItemElement.find('.alert.notAvailable .time').text(Date.parseExact(addOneMinute(params.time),"HHmm").toString(app.localization.CultureInfo.formatPatterns.shortTime))
                        spaItemElement.find('.alert.notAvailable .staffOrGender').html(
                            params.staffGenderOrId == "M" ? app.localization.spaBooking.serviceSelection.notAvailableGenderMale :
                                params.staffGenderOrId == "F" ? app.localization.spaBooking.serviceSelection.notAvailableGenderFemale :
                                    !!params.staffGenderOrId ? app.localization.spaBooking.serviceSelection.notAvailableStaff : ""
                        )
                        if (!!params.staffGenderOrId && params.staffGenderOrId != "M" && params.staffGenderOrId != "F") {
                            var staffName = _.find(spaItemElement.find('.spaServiceStaff option'),function(x){return x.value==params.staffGenderOrId})
                            staffName && spaItemElement.find('.alert.notAvailable .staffName').text(staffName.text)
                        }
                    } else {
                        buttonElement.text(Localization.spaBooking.serviceSelection.showMoreTimes)
                    }
                    var nextTimeOption = spaItemElement.find('.spaServiceTime option:first')
                    if (nextTimeOption && nextTimeOption.length) {
                        nextTimeOption = nextTimeOption[0];
                        setTimeout(function(){ spaItemElement.find('.spaServiceTime').val(nextTimeOption.value).change() },200)
                        spaItemElement.find('.loading--text').empty();
                    } else {
                        spaItemElement.find('.noFurther').remove()
                        spaItemElement.find('.spaServiceButton')
                            .after(
                                '<div class="alert fade in alert-info notAvailable noFurther"><a class="close" data-dismiss="alert" href="#">×</a><p>'
                                +(app.localization.spaBooking.serviceSelection.noFurtherAvailabilities)
                                +'</p></div>'
                            )
                        app.customization.spaBooking.availabilityQueryLookaheadDays && spaItemElement.find('.spaServiceButton').css('display','none')
                        spaItemElement.find('.alert.notAvailable .date').text(Date.parseExact(params.date,"yyyy-MM-dd").toString(app.localization.CultureInfo.formatPatterns.mediumDate))
                        spaItemElement.find('.alert.notAvailable .fromdate').text(Date.parseExact(buttonElement.data('startDate'),"yyyy-MM-dd").toString(app.localization.CultureInfo.formatPatterns.mediumDate))
                        spaItemElement.find('.alert.notAvailable .time').text(Date.parseExact(addOneMinute(params.time),"HHmm").toString(app.localization.CultureInfo.formatPatterns.shortTime))
                        spaItemElement.find('.alert.notAvailable .staffOrGender').html(
                            params.staffGenderOrId == "M" ? app.localization.spaBooking.serviceSelection.notAvailableGenderMale :
                                params.staffGenderOrId == "F" ? app.localization.spaBooking.serviceSelection.notAvailableGenderFemale :
                                    !!params.staffGenderOrId ? app.localization.spaBooking.serviceSelection.notAvailableStaff : ""
                        )
                        spaItemElement.find('.alert.notAvailable a.btn').on('click', function (obj) {
                            obj.preventDefault()
                            spaItemElement.find('.spaServiceDate').val( Date.parseExact(startDate,"yyyy-MM-dd").add(1).day().toString('yyyy-MM-dd') ).change()
                            setTimeout(function(){ spaItemElement.find('.spaServiceButton').trigger('click') },200)
                        })

                        if (!!params.staffGenderOrId && params.staffGenderOrId != "M" && params.staffGenderOrId != "F") {
                            var staffName = _.find(spaItemElement.find('.spaServiceStaff option'),function(x){return x.value==params.staffGenderOrId})
                            staffName && spaItemElement.find('.alert.notAvailable .staffName').text(staffName.text)
                        }
                    }
                }
                availabilityElement.remove()
            }
        }

        if (!app.views.splashView.event.events.data('events')['requestServiceTypeSelection'][0]._handler) {
            app.views.splashView.event.events.data('events')['requestServiceTypeSelection'][0]._handler = app.views.splashView.event.events.data('events')['requestServiceTypeSelection'][0].handler
            app.views.splashView.event.events.data('events')['requestServiceTypeSelection'][0].handler = function(e) {
                app.views.splashView.event.events.data('events')['requestServiceTypeSelection'][0]._handler.call(this, e);
				
				

                $('.sitename').text(app.localization.general.features.introTitle);
                $('#header .row .message .intro .text').text(
                    $('#header .row .message .intro .text').text().replace(/\:$/,'')
                )
                var moduleBtnAndImages = $(heredoc(function() {
                    /*
                    <div class="module-img-left">
                        <img src="img/activitiesimage.jpg" alt="">
                        <a href="#/spaBooking/class/Location201"><button class="activitiesModule">Activities</button></a>
                    </div>
                    <div class="module-img-right">
                        <img src="img/spaimage.jpg" alt="">
                        <a href="#/spaBooking/service/Location101"><button class="spaModule">Spa</button></a>
                    </div>
                    */
                }));
                var reservationLogin = $(heredoc(function() {
                    /*
                        <div class="confirmationlogin">
                        <h2>Access your reservation</h2>

                        <div class="lastNameDiv">
                            <input type="lastName" placeholder="Enter Your Last Name"id="accessLastName" name="lastName" class="span12 required" value="">
                                    </div>
                        <div class="folioNumberDiv">
                            <input type="folioNumber" placeholder="Confirmation Number" id="accessFolioNumber" name="folioNumber" class="span12 required" value="">
                                </div>
                        <div class="controls input-append resoBtnDiv span12">
                            <button class="btn btn-primary span12 resoBtn">Search</button>
                            </div>
                    </div>
                    */
                }));
                $('#serviceList').empty();
                $('#serviceList').prepend(moduleBtnAndImages);
                if (!app.data.datesForRestrictedFolio) {
                    $(reservationLogin).insertBefore('#serviceList')
                    $('.resoBtn').on('click',function(e) {
                        e.preventDefault()
                        $(e.target).button('loading');
                        app.data.RestrictedFolio = $('#accessFolioNumber').val()
                        app.dispatcher.dispatch('profile', 'authenticatefolio', [encodeURIComponent($('#accessFolioNumber').val()), encodeURIComponent($('#accessLastName').val()), 'MiravalFolioEvent','']);
                    })
                }

                if (!app.data.userLoggedIn) {
                    // $('.module-img-left a button').tooltip('hello')
                    $('.module-img-left a').css('display', 'none')
                    $('.module-img-right a').css('display', 'none')
                
				
                  $(".intro .text").append("<br><br><p class='login-below'>LOGIN BELOW WITH YOUR LAST NAME & CONFIRMATION NUMBER <br>(Your confirmation number can be found on your confirmation email you received at time of booking)</p>")
                }
            }
			
			
        }
        app.views.userView.event.listen('MiravalFolioEvent', app.views.userView, function (e, success, result) {
            if (!success) {
				if (!$('#accessLastName').length) { app.views.splashView.event.fire('requestServiceTypeSelection') }
//                 delete app.data.RestrictedFolio
                setTimeout(function(){
                    $('#accessFolioNumber')
                        .popover({content:app.localization.general.login.folioLoginFail,trigger:'manual', placement: 'bottom'})
                        .popover('show')
                        $('.resoBtn').text('Search');
                        $('.resoBtn').removeClass('disabled');
                        $('.resoBtn').removeAttr("disabled");

                }, 100)
        }
            app.commonViewHelper.authenticatefolioresult(success, result);
        })

        if (!app.views.spaView.event.events.data('events')['requestSpaServiceSelection'][0]._handler) {
            app.views.spaView.event.events.data('events')['requestSpaServiceSelection'][0]._handler = app.views.spaView.event.events.data('events')['requestSpaServiceSelection'][0].handler
            app.views.spaView.event.events.data('events')['requestSpaServiceSelection'][0].handler = function(e, spaServices, itemId, location, date, time, staffGenderOrId, guestName, dateList, user, group) {
                app.views.spaView.event.events.data('events')['requestSpaServiceSelection'][0]._handler.call(this, e, spaServices, itemId, location, date, time, staffGenderOrId, guestName, dateList, user, group);
                console.log("spa4",spaServices)
                app.data.spaBookingPerDate = {} //storing spa bookings; grouped by dates
                if (!app.data.userLoggedIn) {
                    app.dispatcher.dispatch('profile','login',[$('#userEmail1').val()])
                } else {
                    if (location.LocationId==spaLocation){
                        var spaImage = $(heredoc(function() {
                            /*
                            <div class="spa-main-img">
                                <img src="img/spa-main-img.jpg" alt="">
                            </div>
                            */
                        }));
                        $('.content-spaServiceListTpl #main .container').prepend(spaImage);
                        $('.content-spaServiceListTpl').removeClass('miravalActivities').addClass('miravalSpa')
                        var spaText1 = '<h2 class=spa-title>We Value eleganceover excess, self-care without clutter.<br /> thrive thoughtfully.</h2>';
                        var spaText2 = '<h2 class=spa-subtitle>Spa Services</h2>';
                    }
                    if (location.LocationId==activityLocation){
                        var spaImage = $(heredoc(function() {
                            /*
                            <div class="activity-main-img">
                                <img src="img/spa-main-img.jpg" alt="">
                            </div>
                            */
                        }));
                        $('.content-spaServiceListTpl #main .container').prepend(spaImage);
                        $('.content-spaServiceListTpl').addClass('miravalActivities').removeClass('miravalSpa')
                        var spaText1 = '<h2 class=activity-title>Explore Experiences</h2>';
                        var spaText2 = '<h2 class=activity-subtitle>Activities & Private Sessions</h2>';
                    }
                    $('.content-spaServiceListTpl .mainContent #spaServiceForm .page-header h2').empty().append(spaText1, spaText2);
                    $('.content-spaServiceListTpl .mainContent #breadcrumbs').remove();
                    $('#spaServiceForm .page-header p a').text('Activities & Private Sessions');
                    $('#spaServiceForm #categories .tab-content').addClass('hide');
                    if (location.LocationId==activityLocation){$('#spaServiceForm #categories #categoryTabs li a').append('<span class=view-treatment>View Activities</div>');}
                    if (location.LocationId==spaLocation){$('#spaServiceForm #categories #categoryTabs li a').append('<span class=view-treatment>View Treatments</div>');}
                    $('#spaServiceForm #categories #categoryTabs li a').click(function(e) {
                        console.log("577","hi")
                        if (!$(e.target).siblings('.tab-content').hasClass('hide')) {
                            e.preventDefault();
                            $('#spaServiceForm #categories .tab-content').removeClass('hide').toggleClass('open');
                        }
                    });
                   
                    $('.form-narrow .itemStaffPref').addClass('in');
                    $('#spaServiceForm #categoryTabs li').each(function() {
                        var link = $(this).find('a');
                        console.log("474",link)
                        var targetId = link.attr('href');
                        link.addClass('collapse');
                        $(targetId).removeClass('tab-pane accordion').addClass('accordion-body collapse');
                        var clone = link.clone();
                        clone.find('')
                        clone.insertBefore(targetId).collapse();
                        $('.tab-content').removeClass('hide');
                        clone.on('click', function() {
                            $(targetId).toggleClass('collapse');
                        })
                        $('#categoryTabs').css('display', 'none');
                        clone.wrap("<div class='category-lists'></div>");
                      console.log("473",targetId)
                    })
                  
                  //  $('#category_Culinary').remove()
                    var priceAndDurationDOM =  $('#spaItemToggle').find('.pull-right ')
                    $('#spaItemToggle').append(priceAndDurationDOM)
                    $('.spaItemToggle').append('<div class=style-line></div>');
                    
                    setTimeout(function() { // TODO: change this so it runs right after the .spaItems are populated
                        $('.spaItem').each(function() {
                            var that = this;
                            var targetId = $(this).attr('id').substring(7)
                            if (location.LocationId==spaLocation){
                             $(this).find('img').appendTo('#spaItemToggle' + targetId);
                            $(this).find('.itemDesc p').appendTo('#spaItemToggle' + targetId);}
                           
                            $(this).removeClass('in');
                            $('#spaItemToggle' + targetId).on('click', function() {
                                $('.hasAvailabilities').removeClass('in');
                                if (!$(that).hasClass('in')) {
                              
                                    $(that).find('.loader').empty();
                                $(that).addClass('in').find('.spaServiceButton').click().after('<div class="loading--text">Loading...</div>');

                                $('#checkAvailabitybtn'+targetId).toggleClass("checkAvailabitybtnExpanded")
                                } else {
                                    $(that).removeClass('in')
                                }
                                
                                // $(that).find('.itemPrice').append('<div class="alert checkingAvail notAvailable fade in">Checking Availability</div>')
                                $(this).find('.fa-chevron-left').toggleClass('classes-accordion-chevron')
                            })
                        });
                        var activeServiceCategory = ""
                        _.each(spaServices,function(service){
                          
                            _.each(service.value,function(s){
                                if (location.LocationId==activityLocation){
                                    console.log("523","hello",s)
                                    if(s.SpaItemId == itemId) activeServiceCategory = s.ItemCategory
                                }
                            var price = s.Price > 0 ? s.Price : 'Included'
                             var priceAndDurationDOM = $('<span class="spaService-servicetimeAndPrice" >'+s.ServiceTime+' Min. | $'+price+'</span>')
                             if (location.LocationId==spaLocation){
                                priceAndDurationDOM.append('<button class="btn btn-primary spaService-checkAvailabitybtn" id="checkAvailabitybtn'+s.SpaItemId+'">Check Availability</button>')
                             }
                            $('#spaItemToggle'+s.SpaItemId).find('.pull-right').remove()
                            $('#spaItemToggle'+s.SpaItemId).find('p:last-child').remove()
                            $('#spaItemToggle'+s.SpaItemId).append(priceAndDurationDOM)
                            if(location.LocationId == activityLocation){
                                $('#spaItemToggle'+s.SpaItemId).find('.style-line').remove()
                                $('#spaItemToggle'+s.SpaItemId).append('<i class="fa fa-chevron-left" aria-hidden="true"></i>')
                                $('#spaItem'+s.SpaItemId).find('.itemDesc  p:nth-child(4)').html('<span >'+s.ServiceTime+' Min. | $'+price+'</span>')
                                $('#spaItem'+s.SpaItemId).find('.spaGuestRequest').addClass("private-session-special-request")
                                $('#spaItem'+s.SpaItemId).find('.itemStaffPref').addClass("private-session-special-request-staff")
                            }
                            if(location.LocationId == spaLocation){
                                $('#spaItemToggle'+s.SpaItemId).prepend('<img width="300" src="'+s.ItemImage+'"></img>')

                                $('#spaItemToggle'+s.SpaItemId+ ' img').on("error", function () {       
                                    $(this).remove()
                                  //  accordion.find('.span2').css('float','left')
                                  $('#spaItemToggle'+s.SpaItemId).addClass('no-img-accordion')
                                })  
                            }
                              //  $('#spaItem'+s.SpaItemId).find('.itemDesc  .duration').remove()}
                             
                            })
                          
                        })
                           //to open correct category and service based on url
                           if (location.LocationId == activityLocation && activeServiceCategory) {
                               activeServiceCategory = activeServiceCategory.replace(' ', '-')

                               $('#category_' + activeServiceCategory).removeClass('collapse')
                               setTimeout(function () {
                                   $('#spaItemToggle' + itemId).trigger('click')
                               }, 200)

                               //
                               $([document.documentElement, document.body]).animate({
                                   scrollTop: $('#spaItemToggle' + itemId).offset().top
                               }, 300);
                           }
                        if (app.data.datesForRestrictedFolio && app.data.datesForRestrictedFolio.length) {
                            $('<div class="actDatebarWrapper clearfix"><div class="datebar clearfix"></div></div>').insertBefore('#spaServiceForm #categories')
                            $('#spaServiceForm .spaItem .spa.itemPrice h4, #spaServiceForm .spaItem .spa.itemPrice .spaServiceDateContainer, #spaServiceForm .spaItem .spa.itemPrice .spaServiceTimeSelect, #spaServiceForm .spaItem .spa.itemPrice .spaServiceButtonxx').hide()
                            _.each(app.data.datesForRestrictedFolio, function(folioDate, i) {
                                var arr = (folioDate.machine).split('-'),
                                year = arr[0]
                                month = arr[1]
                                day = arr[2],
                                dateblock = $('<div class="date"  data-day="'+day+'" data-month="'+month+'"  data-year="'+year+'" > ').appendTo('div.datebar').html(moment(folioDate.machine).format('ddd<br>D')).on('click', function() {
                                    $('div.datebar div.date').removeClass('active');
                                    $(this).addClass('active')
                                    $('.spaServiceDate').val(folioDate.machine);
                                    $('.hasAvailabilities').removeClass('in');
                                    if ($('.itemPrice .notAvailable')) {
                                        $('.spaAvailability').css('display', 'none');
                                    }
                                    // todo: set spa service time to the open time for this day of the week (ie select first item in <select>)
                                })
                                if (!date && i == 0) {
                                    dateblock.click();
                                }
                                if (date==folioDate.machine) {
                                    dateblock.addClass('active');
                                }
                                //Below logic generates the filterted list of spa bookings; grouped by dates which are within the restricted folio dates. 
                                _.each(app.data.spaBookings, function (booking) {
                                    var filteredBooking = app.data.spaBookingPerDate
                                    if (folioDate.machine == booking.SpaFolioItem.BookStartTime.substring(0, 10)) {
                                        var bookingDate = moment(booking.SpaFolioItem.BookStartTime, 'YYYY-MM-DDHHmmss').format('MM/DD/YYYY')
                                        var arrayOfBookings = filteredBooking[bookingDate] || []
                                        arrayOfBookings.push(booking)
                                        filteredBooking[bookingDate] = arrayOfBookings
                                        app.datal('spaBookingPerDate', filteredBooking)
                                    }
                                })
                            })
                            //add current cart booking also
                            var combinedArray = _.extend(app.data.spaBookingPerDate,app.data.bookingsIncart)
                            app.datal('spaBookingPerDate', combinedArray)
                            addBookingsToDatePicker(false) //rendering of booking idicator dots
                            //Below Logic handles
                            var dateDivs = $('.datebar div');
                            var targetWidth = 100 / dateDivs.length;

                            $(window).scroll(function(){
                                console.log("579","h")
                                var sticky = $('.datebar'),
                                    scroll = $(window).scrollTop(),
                                    datewrapper = $('.actDatebarWrapper'),
                                    datewrappertop = datewrapper.length ? datewrapper.offset().top : 80,
                                    wrapperWithHeader = datewrappertop - 80
                                if (scroll >= wrapperWithHeader) {
                                    sticky.addClass('stickyHeader');
                                    $('.actDatebarWrapper').siblings('.tabbable').addClass('stickySpaBody');
                                } else {
                                    sticky.removeClass('stickyHeader');
                                    $('.actDatebarWrapper').siblings('.tabbable').removeClass('stickySpaBody');
                                }
                            });

                            dateDivs.css('width', targetWidth + '%');
                            if (location.LocationId==activityLocation) {
                                $('<div class="togglebar clearfix"><a href=\"#/spaBooking/class/Location201\" class="activity group">Group Activities</a><a href=\"#/spaBooking/service/Location201\" class="activity private active">Private Sessions</a></div>').insertAfter('#spaServiceForm .datebar')
                            }
                        }
                        if (!app.data.datesForRestrictedFolio) {
                            $('<div class="datedivwrapper clearfix"><input class="dateinput clearfix"><div class="datediv clearfix"></div></div>').insertBefore('#spaServiceForm #categories');
                            $('#spaServiceForm .spaItem .spa.itemPrice h4, #spaServiceForm .spaItem .spa.itemPrice .spaServiceDateContainer, #spaServiceForm .spaItem .spa.itemPrice .spaServiceTimeSelect, #spaServiceForm .spaItem .spa.itemPrice .spaServiceButtonxx').hide()

                            $('.datediv').datepicker({
                                minDate: 0,
                                numberOfMonths:2,
                                defaultDate:0,
                                dateFormat:"yy-mm-dd",
                                altField: ".dateinput",
                                onSelect: function (dateText, inst) {
                                    $('.spaServiceDate').val(dateText);
                                    // $('.hasAvailabilities').removeClass('in');
                                    if ($('.itemPrice .notAvailable')) {
                                        $('.spaAvailability').css('display', 'none');
                                    }
                                    // When selecting a date reloads ALREADY OPENED item's time slot
                                    if ($('#categories .tab-content .accordion-body .accordion-group .hasAvailabilities').length ==! 0) {
                                        var openedTabId = $('.hasAvailabilities').parent().find('.accordion-heading a').click();
                                    }
                                }
                            }).find(".ui-state-active").removeClass("ui-state-active");

                            $('.datediv').hide();
                            $('.dateinput').on('click', function() {
                                $('.datediv').toggle();
                            })
                            $('.dateinput').change(function(){
                                $('.datediv').datepicker('setDate', $(this).val());
                            });
                            $('#spaServiceForm #categories').addClass('hide');
                            $('.datediv .ui-state-default').on('click', function () {
                                $('#spaServiceForm #categories').removeClass('hide');
                            })


                            $(window).scroll(function(){
       
                                var sticky = $('.datediv'),
                                    scroll = $(window).scrollTop(),
                                    datewrapper = $('.dateinput ').offset().top + 40,
                                    wrapperWithHeader = datewrapper - 80
                                if (scroll >= wrapperWithHeader) {
                                    sticky.addClass('stickyHeader');
                                    $('.datedivwrapper').siblings('#categories').addClass('datepickerBodyAdjustment');
                                } else {
                                    sticky.removeClass('stickyHeader');
                                    $('.datedivwrapper').siblings('#categories').removeClass('datepickerBodyAdjustment');
                                }
                            });
                        }
                    }, 500)
                }
            }
        }

    if (!app.models.spaModel._getData) {
        app.models.spaModel.spaClassDatesRequested = {}
        app.models.spaModel._getData = app.models.spaModel.getData;

        app.models.spaModel.getData = function (modelName, parameters) {
            switch (modelName) {
                case 'spaClassesRaw' :
                    var selectedLocation = app.models.spaModel.getSelectedItem('spaLocations', {});
                    var promises = []
                    promises.push(app.models.spaModel._getData.call(
                                    app.models.spaModel,
                                    modelName,
                                    parameters
                                ))
                    if (selectedLocation.LocationId==activityLocation) {
                        app.models.spaModel.setSelected('spaLocations', {}, "999");
                        parameters.Location="999"
                        promises.push(app.models.spaModel._getData.call(
                                        app.models.spaModel,
                                        modelName,
                                        parameters
                                    ).then(null,function(x){
										if (x.Result.ErrorId=='402') {
											return $.Deferred().resolve(x)
										}
									}))
                        app.models.spaModel.setSelected('spaLocations', {}, "201");
                    }
                    return $.when.apply($, promises).then(function (r1,r2) {
                        if (r2 && r2.DailySpaClasses) {
                            _.each(r2.DailySpaClasses,function(spaClasses){
                                var r1classes = _.find(r1.DailySpaClasses,function(x){return x.Date==spaClasses.Date})
                                if (r1classes && r1classes.SpaClass && spaClasses.SpaClass) {
                                    _.each($.wrapArray(spaClasses.SpaClass),function(x){
                                        x.isLocation999=true;
                                        r1classes.SpaClass.push(x)
                                    })
                                }
                            })
                        }

                        return r1
                    })
               
                    break;
                default :
                    return app.models.spaModel._getData.call(app.models.spaModel, modelName, parameters);
            }
        }
    }
    

        if (!app.views.spaView.event.events.data('events')['requestSpaClassDateSelection'][0]._handler) {
          
            app.views.spaView.event.events.data('events')['requestSpaClassDateSelection'][0]._handler = app.views.spaView.event.events.data('events')['requestSpaClassDateSelection'][0].handler
            app.views.spaView.event.events.data('events')['requestSpaClassDateSelection'][0].handler = function(e, spaLocationId, startDate, dateList) {
                app.views.spaView.event.events.data('events')['requestSpaClassDateSelection'][0]._handler.call(this, e, spaLocationId, startDate, dateList);
                app.data.spaBookingPerDate = {} //storing spa bookings; grouped by dates
                if (!app.data.userLoggedIn) {
                    app.dispatcher.dispatch('profile','login',[$('#userEmail1').val()])
                } else {
                    var activityImage = $(heredoc(function() {
                        /*
                        <div class="activity-main-img">
                            <img src="img/activity-main-img.jpg" alt="">
                        </div>
                        */
                    }));
                    $('.content-spaClassListTpl #main .container').prepend(activityImage);
                    var activityText1 = '<h2 class=activity-title>Explore Experiences</h2>';
                    var activityText2 = '<h2 class=activity-subtitle>Activities & Private Sessions</h2>';
                    $('.content-spaClassListTpl .mainContent .spaClassListTpl .page-header h2').empty().append(activityText1, activityText2);
                    $('.content-spaClassListTpl .mainContent #breadcrumbs').remove();
                    $('.content-spaClassListTpl .mainContent .spaClassListTpl p a').text('SPA Servicies');

                    $('<div class="actDatebarWrapper clearfix"><div class="datebar clearfix"></div></div>').insertBefore('#spaClassSelection');
                    $('#spaClassDate').attr('type','hidden').insertBefore('#spaClassSelection');
                    $('#spaClassSelection').remove();
                   
                    _.each(app.data.datesForRestrictedFolio, function(folioDate, i) {
                        var arr = (folioDate.machine).split('-'),
                        year = arr[0]
                        month = arr[1]
                        day = arr[2],
                        dateblock = $('<div class="date"  data-day="'+day+'" data-month="'+month+'"  data-year="'+year+'" > ').appendTo('div.datebar').html(moment(folioDate.machine).format('ddd<br>D')).on('click', function() {
                            console.log("691","ho",folioDate.machine)
                            $('div.datebar div.date').removeClass('active');
                            $(this).addClass('active')
                            $('#spaClassDate').val(folioDate.machine);
                            $('div.tab-pane.accordion').addClass('disabled')
                            app.dispatcher.dispatch('spaBooking', 'findclass', [
                            // spaLocationId, startDate , showItem, guestName, spaItemId
                                spaLocationId, $('#spaClassDate').val(), ($('#spaClassSelectForm').data('lastItem') ? '|'+$('#spaClassSelectForm').data('lastItem') : ''), '', ''
                            ])
                            app.dispatcher.updateURL('spaBooking', 'class', [
                            'Location'+spaLocationId + ($('#spaClassSelectForm').data('lastItem') ? '|'+$('#spaClassSelectForm').data('lastItem') : ''),
                            $('#spaClassDate').val()
                        ])
                            // todo: set spa service time to the open time for this day of the week (ie select first item in <select>)
                        })
                        if ((!startDate && i == 0)||startDate==folioDate.machine) {
                            dateblock.click();
                        } 
                        //Below logic generates the filterted list of spa bookings; grouped by dates which are within the restricted folio dates. 
                        console.log("733",folioDate)
                      
                        _.each(app.data.spaBookings,function(booking){
                          //  console.log("733-2",booking)
                          var filteredBooking =  app.data.spaBookingPerDate
                            if(folioDate.machine == booking.SpaFolioItem.BookStartTime.substring(0,10)){
                               var bookingDate = moment(booking.SpaFolioItem.BookStartTime,'YYYY-MM-DDHHmmss').format('MM/DD/YYYY')
                               var arrayOfBookings = filteredBooking[bookingDate]|| []
                               arrayOfBookings.push(booking)
                               filteredBooking[bookingDate] =arrayOfBookings
                               app.datal('spaBookingPerDate',filteredBooking)
                            }
                        })
                       
                    })
                    var combinedArray = _.extend(app.data.spaBookingPerDate,app.data.bookingsIncart)
                        app.datal('spaBookingPerDate', combinedArray)
                    addBookingsToDatePicker(false)
                    var dateDivs = $('.datebar div');
                    var targetWidth = 100 / dateDivs.length;
                    if ($('.actDatebarWrapper').children().hasClass('togglebarWrapper')) {
                        $('.actDatebarWrapper').addClass('togglebarStyle');
                    } else {
                        $('#categories').addClass('noTogglebarStyle');
                    }

                    $(window).scroll(function(){
                        var sticky = $('.datebar'),
                            scroll = $(window).scrollTop(),
                            datewrapper = $('.actDatebarWrapper'),
                            datewrappertop = datewrapper.length ? datewrapper.offset().top : 80,
                            wrapperWithHeader = datewrappertop - 80
                        if (scroll >= wrapperWithHeader) {
                            sticky.addClass('stickyHeader')
                            $('.actDatebarWrapper').children('.togglebarWrapper').addClass('stickySmallerBody');
                        } else {
                            sticky.removeClass('stickyHeader');
                            $('.actDatebarWrapper').children('.togglebarWrapper').removeClass('stickySmallerBody');
                    }

                    });
                    dateDivs.css('width', targetWidth + '%');
                    $('<div class="togglebarWrapper clearfix"><div class="togglebar clearfix"><a href=\"#/spaBooking/class/Location201\" class="activity group active">Activities</a><a href=\"#/spaBooking/service/Location201\" class="activity private">Private Sessions</a></div></div>').insertAfter('.spaClassListTpl .datebar')
    //                 $('body').data('scrollTop',$('.datebar').offset().top)
                }
            }
        }





        var classToServiceItemIds={
            
                1008: "20114382" ,
                1009: "20185016" ,
                1014: "2035" ,
                1015: "20185011" ,
                2011: "2037" ,
                2040: "20184437" ,
                2044: "20114355" ,
                2046: "20184456" ,
                2048: "20184433" ,
                20101090: "20101103" ,
                20102030: "2032" ,
                20102230: "2031" ,
                20102260: "20184452" ,
                20102280: "2028" ,
                20102320: "20114354" ,
                20104210: "20104040" ,
                20104581: "20184429" ,
                20108020: "20114386" ,
                20109000: "20114272" ,
               // 20109060: "20209072" ,
                20109061: "20102111" ,
                20109140: "20114374" ,
                20109150: "20114220" ,
                20109160: "20209074" ,
                20109230: "20109999" ,
                20109250: "20109258" ,
                20109251: "20109252" ,
                20109255: "20109259" ,
                20112150: "20114364" ,
                20113040: "20113010" ,
                20113050: "20101102" ,
                20114090: "2047" ,
                20114331: "20112001" ,
                20114340: "20184460" ,
                20114344: "20185012" ,
                20114350: "20184402" ,
                20114363: "20101097" ,
                20114366: "20209076" ,
                20114367: "20113070" ,
                20114372: "20114375" ,
                20114388: "20101091" ,
                20114389: "20112010" ,
                20114414: "20114310" ,
                20114423: "20101095" ,
                20114424: "20114361" ,
                20184399: "20114291" ,
                20184404: "201114230" ,
                20184405: "20185001" ,
                20184410: "20185004" ,
                20184413: "20184414" ,
                20184422: "1025" ,
                20184425: "20113011" ,
                20184426: "20184442" ,
                20184427: "20184454" ,
                20184428: "2030" ,
                20184441: "20185024" ,
                20184444: "20185025" ,
                20185018: "20185020" ,
                20185019: "20185022" ,
                20185028: "20185029" ,
                201184403: "20114240"
                
        },
            serviceToClassItemIds=_.invert(classToServiceItemIds)

        if (!app.views.spaView.event.events.data('events')['requestClassSelection'][0]._handler) {
            app.views.spaView.event.events.data('events')['requestClassSelection'][0]._handler = app.views.spaView.event.events.data('events')['requestClassSelection'][0].handler
            app.views.spaView.event.events.data('events')['requestClassSelection'][0].handler = function(e, classInfo, startDate, showItem, spaLocationId, guestName, spaItemId) {
                app.views.spaView.event.events.data('events')['requestClassSelection'][0]._handler.call(this, e, classInfo, startDate, showItem, spaLocationId, guestName, spaItemId);
                console.log("776","hello")
                _.each(app.data.spaBookings,function(item){
                    if (!!item.SpaFolioItem && $.isArray(item.SpaFolioItem)) {
                        for (var i=1; i<item.SpaFolioItem.length;i++) { // create new SpaBookings items for each sub-spafolioitem by moving the 2..nth spafolioitem into duplicated spabookings
                            app.data.spaBookings.push(_.extend({}, item, {SpaFolioItem:item.SpaFolioItem[i]}))
                        }
                        item.SpaFolioItem = item.SpaFolioItem[0]
                    }
                    // with this approach we are forcing each item in app.data.spaBookings to have one (non-array) SpaFolioItem. There will possibly be multiple
                    // spaBookings with the same SpaFolioId, but each one should have a distinct SpaFolioItem child
                })

                $('#spaClassSelectForm .tab-content div.alert').remove();
                $('#spaClassSelectForm ul.nav-tabs').remove();
                $('#spaClassSelectForm .tab-content .tab-pane').addClass('active');
                $('#spaClassSelectForm .tab-content .tab-pane .pull-right').remove();

             

                var classByHour = {}
                  , classById = {}
                $.each(classInfo,function(){
                    $.each(this.value,function(){
                        console.log("840",this,classToServiceItemIds)
                        var startDate = moment(this.StartTime,"YYYY-MM-DDHHmmss");
                        this.startDate=startDate;
                        classByHour[startDate.format('HH a')]=classByHour[startDate.format('HH a')]||[];
                        classByHour[startDate.format('HH a')].push(this);
                        classById[this.SpaClassId]=this;
                        if (classToServiceItemIds[this.SpaItemId]) {
                            this.serviceItemId = classToServiceItemIds[this.SpaItemId]
                        }
                        console.log("849",this.serviceItemId)
                    })
                })
                var firstAccordion = $('#spaClassSelectForm .tab-content .tab-pane').first()
                  , hours = _.keys(classByHour).sort()
                $.each(hours,function(){
                    console.log("811",this,classByHour)
                    var hour=this
                      , classes = classByHour[this];
                    firstAccordion.append( $('<div class="hourContainer"><div class="hourLabelDiv"><span class="hourLabel"></span></div></div>').attr('data-hour',this) )
                    firstAccordion.find(".hourContainer[data-hour='"+hour+"'] .hourLabel").text(moment(hour,'HH').format('hh a'))
                    classes=_.sortBy(classes,function(c){return c.StartTime+c.EndTime+c.ItemDescription})
                    $.each(classes,function(c){
                        var that = this;
                        var accordion = $('#spaClassSelectForm .tab-content .tab-pane .accordion-group:has(.spaItem[data-classid='+this.SpaClassId+'])');
                        firstAccordion.find(".hourContainer[data-hour='"+hour+"']").append( accordion );
                        accordion.find('.spaClassDate').attr('class','spaClassCategory').text(this.ItemCategory)
                        
                            
             
                       accordion.find('.accordion-toggle .pull-left small .spaClassTime').html(function(index,html){
                        return html.replace('-','');
                        });
                        if( that.Price > 0 ) {
                            var accordionHeading = accordion.find('.accordion-toggle .pull-left small');
                            additionalFeeText = $('<span class="additional-costs">Additional Fee</span>');
                            additionalFeeText.appendTo( accordionHeading );
                        } else{
                           accordion.find('.priceDuration .price strong').html("Included") 
                        }
                          //show no img if theres an error
                          var activityImg = accordion.find('.pagination-centered img')
                          $(activityImg).on("error", function () {       
                              accordion.find(' .pagination-centered').remove()
                              accordion.find('.span2').css('float','left')
                              accordion.addClass("no-img-activity-accordion")
                          })
                      
                        accordion.find('.availableSlots').remove()
                        accordion.find('.priceDuration .price').html(this.ServiceTime+' Min') 
                        accordion.find('.priceDuration .separator').html('|')
                        accordion.find('.priceDuration .duration').html(this.Price>0?('$'+this.Price):'Included')
                          //append chevron icon for accordion
                        accordion.find('.accordion-toggle .pull-left small').append('<i class="fa fa-chevron-left" aria-hidden="true"></i>')
                        accordion.on('click',function(){
                            accordion.find('.accordion-toggle .pull-left small .fa-chevron-left').toggleClass("classes-accordion-chevron")
                        })
                        if (this.serviceItemId) {
                            var bookbutton = accordion.find('.spaServiceButton')
                              , activityInfo = accordion.find('.accordion-toggle .pull-left small .spaClassCategory')
                              , bookbuttonclone = bookbutton.clone()
                              , bookbuttonclone2 = bookbutton.clone()
                            bookbuttonclone.insertAfter( bookbutton )
                            bookbuttonclone.attr('href',"#/spaBooking/service/Location201|"+this.serviceItemId+"/"+$('#spaClassDate').val()).text('View Private Session').addClass('privateActivity')
                            bookbuttonclone2.appendTo( activityInfo )
                            bookbuttonclone2.attr('href',"#/spaBooking/service/Location201|"+this.serviceItemId+"/"+$('#spaClassDate').val()).text('Available as a Private Session').removeClass().addClass('privateSession');
                        }
                        var conflict = false
                        _.each(app.data.spaBookings,function(spaBooking){
                            if ( spaBooking.SpaFolioItem.BookStartTime <= that.EndTime
                                && that.StartTime <= spaBooking.SpaFolioItem.BookEndTime ) {
                                conflict = true
                            }
                        })
                        if (conflict) {
                            accordion.addClass('conflict')
                            accordion.find('.spaServiceButton').attr('href','').attr('disabled','disabled').text('You have a conflicting booking at this time')
                        }
                        if (this.isLocation999) {
                            var nobookbutton = $('<span class="btn btn-info error-hide"></span>').text(Localization.general.continueProcessButtonLabel)
							switch(this.ItemSubcategory) {
                                case "Guest Call to Book": nobookbutton.popover({content:"Please Call (855) 234-1672 to Make a Reservation"});
                                $(nobookbutton).addClass('nobookavail');
                                $('.nobookavail').parents().eq(4).find('.accordion-toggle').css('background', '#f6f4f1')
								 break;
                                case "No Sign Up Required": nobookbutton.popover({content:"No Sign up Required"});
                                $(nobookbutton).addClass('nobookavail');
                                $('.nobookavail').parents().eq(4).find('.accordion-toggle').css('background', '#f6f4f1')
							}
							accordion.find('.spaServiceButton').replaceWith(nobookbutton)
                            accordion.find('.accordion-heading a').attr('style','background: #fff;')
                        }
                    })
                })
            
                $('div.tab-pane.accordion').removeClass('disabled')
            }
        }

        var originalMethod = $.fn['addClass'];
        $.fn['addClass'] = function() {
            if (this.length && this[0].id == 'content') {
                var body = $('body')
                var bodyClass = "content-" + arguments[0]
                body.removeClass(function(index, css) {
                    return (css.match(/(^|\s)content-\S+/g) || []).join(' ');
                });
                originalMethod.apply(body, [bodyClass]);
                body.animate({
                    scrollTop: 0
                }, 1000);
            }
            return originalMethod.apply(this, arguments);
        };

        app.views.splashView.event.listen('requestServiceTypeSelection', app.views.splashView, function(e) {
            $('body').removeClass(function(index, css) {
                return (css.match(/(^|\s)content-\S+/g) || []).join(' ');
            });
        })

        var elemBody = $('body')
        $(window).on('scroll', function() {
            elemBody[$(this).scrollTop() > (elemBody.data('scrollTop') || 125) ? 'addClass' : 'removeClass']('scrolled')
        })
    }

    Localization.paymentProcessing.analyticsCustomInit = function() {
        if (!app.customization.googleAnalytics) {
            return
        }

        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        var opts = {}
        if (!!app.customization.googleAnalyticsDomain) {
            opts.allowLinker = true;
            opts.cookieDomain = app.customization.googleAnalyticsDomain;
        }
        ga('create', app.customization.googleAnalytics, 'auto', opts);
    }
    Localization.analytics = {}
    Localization.analytics.everyPage = function(url) {
        if (!app.customization.googleAnalytics) {
            return
        }
        ga('send', 'pageview', url);
    }

    function heredoc(f) {
        return f.toString().match(/\/\*\s*([\s\S]*?)\s*\*\//m)[1];
    };

    if (!app.commonViewHelper._updateNavBar) {
        app.commonViewHelper._updateNavBar = app.commonViewHelper.updateNavBar
        app.commonViewHelper.updateNavBar = function(serviceType, language, folioBalance) {
            app.commonViewHelper._updateNavBar(serviceType, language, folioBalance)

            //app.data.pmsPropertyIdsInCart == undefined ? app.data.pmsPropertyIdsInCart = [] : null;

            if ($('.header-navigation--mobile ul').hasClass('bookingSumMobile')) {
                $('.header-navigation--mobile .bookingSumMobile').remove()
            } 
            var bookingSummary = $('.navbar-fixed-top .bookingSummary')
            $(bookingSummary).clone().appendTo('.header-navigation--mobile').addClass('bookingSumMobile');


            $('.nav-collapse').addClass('header--row').css('height', '40px');
           // $('.serviceType').addClass('navigation--list navigation--list__primary');
            if ($('body').hasClass('.js-mobile-nav-open')) {
                return
            } else {
                $('.header-toggle--container').off('click').on('click', function() {
                    $('body').toggleClass('js-hamburger-block js-mobile-nav-open');
                });
            }
            $('.mobile-login-option *[data-target="navbarLoginControl"]').click(function (e) {
                if (!$(e.target).parents('.nav-collapse').hasClass('in')) {
                    e.preventDefault();
                    $('#navbarLoginControl').toggleClass('open').popover('hide');
                }
                $(document).mouseup(function (e) {
                    var container = $('#loginForm');
                    if (!container.is(e.target) && container.has(e.target).length === 0) {
                        $('#navbarLoginControl').removeClass('open');
                    }
                });
            });
            if (app.data.userLoggedIn) {
                $('.bookingSumMobile  #navbarLoginControl').css('display', 'inline-block')
            } else {
                $('#navbarLoginControl').css('display', 'none');
            }
            if ($('#content.spaClassListTpl,#content.spaServiceListTpl').length>0) {
                $('#navbarServiceTypeList').css('display','list-item').css('clear','none')
            }
            
            var footerContent = $(heredoc(function() {
                /*
                <footer class="footer-container">

                    <div class="miraval-line-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 59.84" class="miraval-line">
                              <path d="M1146.83,46.79c19.92-1.52,39.54-3.1,59.14-4.73q35.66.36,70.55.37c113.56,0,221-2.84,323.48-8.51V32.47c-118.86,6.58-244.36,9.35-378.42,8.29l22.11-1.86c102.56-8.62,208.61-17.54,356.31-21V16.43c-147.78,3.48-253.86,12.4-356.46,21-12.61,1.06-25.16,2.12-37.71,3.15q-90.35-.91-186-4.1C1101.59,32.17,1181.26,26,1259.49,20,1381.15,10.6,1496.07,1.73,1600,1.72V.27c-104,0-218.95,8.89-340.64,18.28-83.55,6.45-168.74,13-256.4,17.37q-97.7-3.45-201.47-9.26c-114.26-6.4-251.16-9.08-390.57-8.19C289.81,9.08,154.49,0,0,0V1.45c147.2,0,277,8.25,393.69,17.15-64.25.55-128.85,1.85-191.84,3.9C135.91,19.26,68.28,17.16,0,17.15V18.6c62.12,0,123.72,1.75,184,4.5-63.89,2.23-125.91,5.23-184,9v1.45c63.46-4.11,131.64-7.31,201.81-9.59q47.77,2.35,94.23,5.38C130.82,33.36,6.67,40.62,0,41v1.45c5.36-.32,138-8.12,312.34-12.08C367.3,34,420.56,38.09,471.39,42c120,9.18,233.32,17.86,330.19,17.86,136.32,0,236.67-5.07,328.95-11.84,46.38.7,90.84,1,132.65,1,193.46,0,330-6.19,336.82-6.51V41C1593.22,41.35,1400.77,50.13,1146.83,46.79ZM801.38,28.11q94.87,5.32,184.47,8.65Q944.34,38.68,902,39.81c-33.2-1.5-66.73-3.25-100.4-5.29-91-5.53-190.1-7.68-286.58-7.84q-23.77-1.85-47.86-3.77l-38.92-3.08C561.62,19.25,691.9,22,801.38,28.11Zm79.7,12.18Q846.32,41,811,41h-9.8c-88.29-.27-175.89-5.9-266.65-12.84,90.24.41,182.12,2.62,267,7.78Q841.48,38.39,881.09,40.28ZM219.47,23.39c63-1.9,127.45-3.06,191.37-3.47q28.63,2.22,56.22,4.43l29.4,2.33c-63.84.06-126.24.95-184.06,2.26Q266.67,25.91,219.47,23.39ZM515,28.12c97.76,7.62,191.58,14.06,286.22,14.35H811q46,0,91.06-1.23c73,3.29,144.4,5.33,212,6.48-87.8,6.17-184.2,10.65-312.43,10.65-96.8,0-210.11-8.67-330.06-17.85C425.69,37,377.89,33.38,328.65,30m801.84,16.53c-66.28-1-136.48-2.84-208.48-5.87q40.87-1.28,81-3.31,96.43,3.41,187.3,4.52C1170.56,43.51,1150.72,45.07,1130.49,46.55Z"></path>
                              </svg>
                    </div>

                    <div class="footer-container--inner xsmall-24 medium-22 large-20">

                        <div class="footer--row">
                            <a href="https://www.miravalresorts.com" class="footer-info__logo">
                                      <img src="https://www.miravalresorts.com/wp-content/themes/miraval/assets/images/logo-gold.png" alt="Miraval">
                                  </a>
                        </div>

                        <div class="footer--row footer--info-container">

                            <div class="footer--column">
                                <div class="footer--row footer--info">
                                    <div class="footer--column">
                                        <p>Miraval Austin<br>13500 FM2769<br>Austin, Texas 78726</p>
                                        <a href="tel:8552341672" class="call-button">Call: (855) 234-1672<noscript><span id="navis-footer">(855) 234-1672</span></noscript></a>
                                    </div>
                                    <div class="footer--column">
                                        <ul class="footer--links">
                                            <li>
                                                <a href="https://www.miravalresorts.com/careers/">Careers</a>
                                            </li>
                                            <li>
                                                <a href="https://www.miravalresorts.com/sitemap/">Sitemap</a>
                                            </li>
                                            <li><a href="https://www.hyatt.com/hyatt/privacy-policy.jsp" target="”_blank”">Privacy Policy</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="footer--column">
                                <div class="footer--row">
                                    <form class="footer--email-form" action="https://www.miravalresorts.com/newsletter-signup/" method="GET">
                                        <label class="email-form--field email-form--copy" for="newsletter-name">Subscribe to our newsletter:</label>
                                        <div class="footer--form-row">
                                            <input class="email-form--field email-form--text" id="newsletter-name" maxlength="150" name="email" placeholder="name@email.com" value="" type="text">
                                            <input class="email-form--field email-form--button" name="submit" value="Submit" type="submit">
                                        </div>
                                    </form>
                                </div>
                                <div class="footer--row footer--hyatt">
                                    <div class="world-hyatt--row">
                                        <img src="https://www.miravalresorts.com/wp-content/themes/miraval/assets/images/hyatt-logo.png" alt="Hyatt Logo">
                                        <img src="https://www.miravalresorts.com/wp-content/themes/miraval/assets/images/world-hyatt.png" alt="Hyatt Logo" class="hyatt-logo">
                                    </div>
                                    <div class="world-hyatt--row">
                                        <p class="hyatt-copy">Enjoy a world of rewards. <a href="https://world.hyatt.com/" target="_blank" class="hyatt-cta">Join Now</a></p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="footer--row footer--row__bottom">
                            <div class="footer--column footer-social">
                                <ul class="footer-social__list">
                                    <li class="footer-social__item">
                                        <a href="http://www.facebook.com/MiravalResorts" target="_blank">
                                                  <i class="fab fa-facebook fa-fw"></i>
                                              </a>
                                    </li>
                                    <li class="footer-social__item">
                                        <a href="http://www.tripadvisor.com/Hotel_Review-g60950-d112501-Reviews-Miraval_Arizona_Resort_Spa-Tucson_Arizona.html" target="_blank">
                                                  <i class="fab fa-tripadvisor fa-fw"></i>
                                              </a>
                                    </li>
                                    <li class="footer-social__item">
                                        <a href="https://twitter.com/MiravalResorts" target="_blank">
                                                  <i class="fab fa-twitter fa-fw"></i>
                                              </a>
                                    </li>
                                    <li class="footer-social__item">
                                        <a href="https://www.youtube.com/user/MiravalArizona" target="_blank">
                                                  <i class="fab fa-youtube fa-fw"></i>
                                              </a>
                                    </li>
                                    <li class="footer-social__item">
                                        <a href="https://www.instagram.com/miravalresorts/" target="_blank">
                                                  <i class="fab fa-instagram fa-fw"></i>
                                              </a>
                                    </li>
                                    <li class="footer-social__item">
                                        <a href="http://pinterest.com/miravalresorts/" target="_blank">
                                                  <i class="fab fa-pinterest fa-fw"></i>
                                              </a>
                                    </li>
                                    <li class="footer-social__item">
                                        <a href="https://plus.google.com/+MiravalArizonaResortSpa/posts" target="_blank">
                                                  <i class="fab fa-google-plus-g fa-fw"></i>
                                              </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="footer--column footer-copyright">
                                <p>Miraval and related marks are trademarks of Hyatt Corporation or its affiliates. © 2020 Hyatt Corporation. All rights reserved.</p>
                            </div>
                        </div>

                    </div>

                </footer>
                */
            }));
            $('#footer').empty();
            $('#footer').append(footerContent);
            var navLastName = ' '  +app.data.LastName
           // $('#navbarLoginControl .visible-desktop .name')[0].append(navLastName)
        }
    }
    if (!app.views.cartView.event.events.data('events')['showCartContents'][0]._handler) {
        app.views.cartView.event.events.data('events')['showCartContents'][0]._handler = app.views.cartView.event.events.data('events')['showCartContents'][0].handler
        app.views.cartView.event.events.data('events')['showCartContents'][0].handler = function(e, cartData, specialServices) {
            if (!app.data.userLoggedIn) {
                app.dispatcher.redirect('greeting');
                return;
            }
            app.views.cartView.event.events.data('events')['showCartContents'][0]._handler.call(this, e, cartData, specialServices);
            _.each(app.data.spaBookings,function(item){
                if (!!item.SpaFolioItem && $.isArray(item.SpaFolioItem)) {
                    for (var i=1; i<item.SpaFolioItem.length;i++) { // create new SpaBookings items for each sub-spafolioitem by moving the 2..nth spafolioitem into duplicated spabookings
                        app.data.spaBookings.push(_.extend({}, item, {SpaFolioItem:item.SpaFolioItem[i]}))
                    }
                    item.SpaFolioItem = item.SpaFolioItem[0]
                }
                // with this approach we are forcing each item in app.data.spaBookings to have one (non-array) SpaFolioItem. There will possibly be multiple
                // spaBookings with the same SpaFolioId, but each one should have a distinct SpaFolioItem child
            })

            $('#breadcrumbs li').text("View Summary");
            $('.content-cartSummary .cartSummary').append('<div class="view-summary-page"><div class=webFolioIndividualItems></div></div>');
            $('#content.cartSummary .well.checkout')
            var datepickerOptions = {
                nextText: "",
                prevText: "",
                onSelect: function(selecteddate,inst){
                    console.log(inst)
                  // inst.inline = false;
                    $('.carousel-inner').scrollTop($('.carousel-inner').scrollTop()+($('.carousel-inner .item[data-date='+selecteddate+']').position()||{top:0}).top);
                    inst.input.trigger('change');
                    setTimeout(function(){
                        addBookingsToDatePicker(true)
                    })
                },
                dateFormat: "yy-mm-dd"
            }
         
            var activeFolioDates=[]
            if (app.data.datesForRestrictedFolio && app.data.datesForRestrictedFolio.length) {
                        $('<div class="datebar clearfix"></div>').insertBefore('#spaServiceForm #categories')
                        $('#spaServiceForm .spaItem .spa.itemPrice h4, #spaServiceForm .spaItem .spa.itemPrice .spaServiceDateContainer, #spaServiceForm .spaItem .spa.itemPrice .spaServiceTimeSelect, #spaServiceForm .spaItem .spa.itemPrice .spaServiceButtonxx').hide()
                 datepickerOptions.defaultDate = null;// moment(app.data.datesForRestrictedFolio[0].machine).toDate();
                datepickerOptions.minDate = moment(app.data.datesForRestrictedFolio[0].machine).toDate();
                datepickerOptions.maxDate = moment(app.data.datesForRestrictedFolio[app.data.datesForRestrictedFolio.length-1].machine).toDate();
            } else {
                activeFolioDates = _.chain(cartData.WebFolioItem)
                                    .map(function(x){return (x.StartDate||"").substr(0,10)})
                                    .sortBy(function(x){return x})
                                    .value()
            }
            $('.webFolioIndividualItems').datepicker(datepickerOptions).datepicker('setDate', null);

    
            var cartSummaryImg = $(heredoc(function() {
                /*
                <div class="cartSummary-img">
                </div>
                */
            }));
            $('.content-cartSummary .cartSummary .view-summary-page').append(cartSummaryImg);

            var carouselHTML = $(heredoc(function() {
                /*
                <h2 class="summary-itinerary-title">Cart
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                    </label>
               Itinerary </h2>
                <div id="myCarousel" class="summary-div">
                    <div class="carousel-inner">
                        <div class="active item">
                            <strong></strong>
                        </div>
                    </div>
                </div>
                */
            }));

            var finializeBookingHTML = $(heredoc(function() {
                /*
                <div class="finalize-booking">
                    <h2 class="finalize-booking-title">Finalize your booking </h2>
                    <div class="finalize-booking-content">
                    <div class="finalize-booking-content-text">
                    <p>You have items in your cart.They will be removed unless you confirm them.</p><p> Please note that you will be unable to change or remove activities or service online once clicked CONFIRM</p>
                    </div>
                    <a href="#/summary/checkout" class="btn btn-primary">Confirm Reservation</a>
                    </div>
                <div>
                */
            }));
           // else{$('.finalize-booking').remove()}
        
            $('.content-cartSummary .cartSummary .view-summary-page').prepend(finializeBookingHTML)
            $('.content-cartSummary .cartSummary-img').append(carouselHTML)
            $('.span9.bookingHistory > .bookingHistory.page-header h3').text('');
       
            //For PMS future bookings
            // $('.carousel-inner .active').append($('#bookingHistoryCollapse'));
            _.each(app.data.datesForRestrictedFolio,function(cartDate) {
                $('.carousel-inner').append( $('<div class="item"></div>').attr('data-date', cartDate.machine).append($('<h2></h2>').text(cartDate.human)) )
            })
            _.each(activeFolioDates,function(cartDate) {
              //  console.log("1207",activeFolioDates)
                $('.carousel-inner').append( $('<div class="item"></div>').attr('data-date', cartDate).append(
                    $('<h2></h2>').text(Date.parseExact(cartDate, "yyyy-MM-dd").toString(Localization.CultureInfo.formatPatterns.monthDay))
                ) )
            })
            app.data.pmsBookings = _.sortBy(app.data.pmsBookings,function(item){return item.ArrivalDate})
            app.data.spaBookings = _.sortBy(app.data.spaBookings,function(item){return item.SpaFolioItem.BookStartTime})

            _.each(app.data.pmsBookings, function(pmsBooking) {
                if (pmsBooking.PMSFolioId == app.data.RestrictedFolio) {
                    $('.content-cartSummary #bookingHistoryCollapse > .page-header[data-folioid='+pmsBooking.PMSFolioId+']')
                      .appendTo('.carousel-inner .item.active')

                    $('.page-header[data-folioid='+pmsBooking.PMSFolioId+'] .row .span h4 ').remove() //total amount

                    var locationInfo = $('.page-header[data-folioid='+pmsBooking.PMSFolioId+'] h3 ').detach() //total amount
                    $('.page-header[data-folioid='+pmsBooking.PMSFolioId+'] .row .span5 ').prepend('<p class="content-cartSummary-venue-info">Venue Information:</p>'+""+$(locationInfo).html()) //location name

                    $('.page-header[data-folioid='+pmsBooking.PMSFolioId+'] .row .span strong ').addClass('content-cartSummary-venue-checkInOut')

                   
                }
            })
            app.data.spaBookingPerDate = {} //spa bookings grouped by dates
            app.datal('bookingsIncart', {}) // to use them in spa pages
            _.each(app.data.spaBookings, function(spaBooking) {
               var filteredBooking =  app.data.spaBookingPerDate
                $('.content-cartSummary #bookingHistoryCollapse > .page-header[data-folioid='+spaBooking.SpaFolioId+']')
                  .each(function(){
                      $(this).addClass('summaryPage-futureBooking itinerary-mode')
                    if ( $(this).find('h3').text().trim()==spaBooking.SpaFolioItem.ItemName ) {
                        var strongs = $(this).find('.row .span strong')
                        if (
                            $(strongs[0]).text() == RSDateToString(spaBooking.SpaFolioItem.BookStartTime, "D")
                            && $(strongs[1]).text() == RSDateToString(spaBooking.SpaFolioItem.BookStartTime, "h:mm tt")
                            ) {
                               //dots on calender 
                               var bookingDate = moment(spaBooking.SpaFolioItem.BookStartTime,'YYYY-MM-DDHHmmss').format('MM/DD/YYYY')
                               console.log("1235",bookingDate)
                               var arrayOfBookings = filteredBooking[bookingDate]|| []
                               arrayOfBookings.push(spaBooking)
                               filteredBooking[bookingDate] =arrayOfBookings
                               app.datal('spaBookingPerDate',filteredBooking)
                             
                            $(this).appendTo('.carousel-inner .item[data-date='+spaBooking.SpaFolioItem.BookStartTime.substr(0,10)+']')
                                .find('.spaLocation, .spaCustomer').remove()
                                var startTime = $(strongs[1]).text()
                                var endTime = $(strongs[2]).text()
                                $(this).find('h3').append('<p>Time: '+startTime+ ' - '+endTime+'</p><i class="more-spadetail-info-icon fa fa-chevron-left" id="ii'+spaBooking.SpaFolioItem.SpaFolioItemId+'"></i>')
                                  //accordion related
                                $(this).find('.row .span').css({'visibility':'hidden',"height":"0px","opacity":"0"})
                                var self = this
                                $( document ).ready(function() {  
                                $(this).find('#ii'+spaBooking.SpaFolioItem.SpaFolioItemId).click(function(e){
                                    $(self).toggleClass("noortest")
                                })
                                console.log( "ready!" );
                            });
                            // $(document).on('click', '.more-spadetail-info-icon', function (e) {
                            //     console.log('this is the click');
                            //     e.preventDefault();
                            // });
                        }
                       

                        $(this).find('.row .span5 p:first-child').remove()

                      
                    }
                  })
                
            })
            // On mount, the active mode is the Cart, so remove date grouping if it doesnt contain any current booking. Also when toggling the mode
            setTimeout(function(){ hideDateGrouping() });
         
            $('.summary-itinerary-title .switch input').on('click',function
            (){
                $( '.summaryPage-futureBooking').toggleClass('itinerary-mode')
               var modeSelector = this
               hideDateGrouping(modeSelector)
            })

            function hideDateGrouping(mode) {
                mode = mode || '.summary-itinerary-title .switch input'
                $('#myCarousel .item').each(function () {
                    if ($(mode).not(':checked') && $(this).find('.page-header').not('.itinerary-mode').length == 0) {
                        $(this).css('display', 'none')
                    } else $(this).css('display', 'block')
                })
            }

            // For dates
       
            app.data.spaBookings.reverse()

            $('.content-cartSummary .page-header.webFolioItem').each(function(i,webFolioItem){
                var itemCartData = _.find(cartData.WebFolioItem,function(x){
                    return x.FolioItemId==$(webFolioItem).data('folioitemid')
                        && x.FolioId==$(webFolioItem).data('folioid')
                        && x.Category==$(webFolioItem).data('category')
                    })
                   //a displaying bookings on the calender)
                var bookingDate = moment(itemCartData.StartDate,'YYYY-MM-DDHHmmss').format('MM/DD/YYYY')
               var arrayOfBookings = app.data.spaBookingPerDate[bookingDate]|| []
               arrayOfBookings.push(itemCartData)
               app.data.spaBookingPerDate[bookingDate] =arrayOfBookings
               app.data.bookingsIncart[bookingDate] = arrayOfBookings
                app.datal('spaBookingPerDate',app.data.spaBookingPerDate)
                app.datal('bookingsIncart',app.data.bookingsIncart)
                if (itemCartData) {
                    console.log('itemCartData',itemCartData)
                    $(webFolioItem).find('.spaLocation, .spaCustomer').remove();
                    var thedate = itemCartData.StartDate.substr(0,10),
                        thetime = itemCartData.StartDate.substr(10,4),
                        foundBooking = _.find(app.data.spaBookings,function(x){
                            return x.SpaFolioItem.BookStartTime.substr(0,10)==thedate
                                && x.SpaFolioItem.BookStartTime.substr(10,4)<thetime 
                        })
                    $(webFolioItem).addClass("currentFolioBooking")
                    if (foundBooking) {
                        console.log()
                        $(webFolioItem).appendTo('.carousel-inner .item[data-date='+itemCartData.StartDate.substr(0,10)+'] div[data-folioid='+foundBooking.SpaFolioId+']')
            
                    } else {
                        console.log("1336",itemCartData)
                        $(webFolioItem).insertAfter('.carousel-inner .item[data-date='+itemCartData.StartDate.substr(0,10)+'] h2')
                    }
                    //remove icon and logic
                    $(webFolioItem).find('h3').append('<span><i class="fa fa-trash " aria-hidden="true" id="cancel' + itemCartData.FolioItemId + '"></i></span>')
                    //accordion logic 
                    $(webFolioItem).find('h3').append('<p>Time: ' + moment(itemCartData.StartDate,"YYYY-MM-DDHHmmss").format("hh:mm a") + ' - ' + moment(itemCartData.FinishDate,"YYYY-MM-DDHHmmss").format("hh:mm a") + '</p><i class="more-spadetail-info-icon fa fa-chevron-left" id="ii' + itemCartData.FolioItemId + '"></i>') //
                    //accordion related
                    $(webFolioItem).find('.row .span').css({
                        'visibility': 'hidden',
                        "height": "0px",
                        "opacity": "0"
                    })
                    $(document).ready(function () {
                        $(webFolioItem).find('#ii' + itemCartData.FolioItemId).click(function (e) {
                            $(webFolioItem).toggleClass("noortest")
                        })
                        $(webFolioItem).find('#cancel' + itemCartData.FolioItemId).click(function (e) {
                            window.location = "#/summary/cancel/Spa/" + itemCartData.FolioId + "/" + itemCartData.FolioItemId + ""
                        })
                    }) 
                }
               
            })
         
            _.each(app.data.datesForRestrictedFolio,function(cartDate) {
                if ($('.carousel-inner > .item[data-date='+cartDate.machine+'] .page-header').length==0) {
                    $('.carousel-inner > .item[data-date='+cartDate.machine+']').append('<div class="noevents">No Activities Booked</div>')
                }
            })
            //if cart is empty, then remove finalize booking text and confirmation text
            if(!app.data.bookingsIncart || _.isEmpty(app.data.bookingsIncart)){
                $('.finalize-booking').remove()
            }
            var nameSelector = app.data.FirstName + ' ' + app.data.LastName
            $('#myCarousel .carousel-inner > .item > strong').append(nameSelector)
            var moduleBtn = $(heredoc(function() {
                /*
                <div class="activity-btn">
                <span class="activity-btn-view-summary-title">View Summary</span>
                <div class="activity-btn-content">
                <span class="explore-more">Explore More Experiences</span>
                    <a href="#/spaBooking/class/Location201"><button class="activity-module-btn">Activities</button></a>
                    <a href="#/spaBooking/service/Location101"><button class="spa-module-btn">Spa</button></a><div>
                </div>
                */
            }));

            $('.folio-splash').remove()
          //  $(moduleBtn).clone().insertAfter($('.content-cartSummary #myCarousel .carousel-inner div.item').last())
            $(moduleBtn).clone().insertBefore($('.webFolioIndividualItems ')).addClass('alert-splash')

            addBookingsToDatePicker(true) // to update bookings on date picker;summary
        }
    }
    function addBookingsToDatePicker(isSummaryPage) {
        var datePickerDatesDOM = isSummaryPage ? $('.webFolioIndividualItems .ui-datepicker-calendar tr td ').not('.ui-datepicker-unselectable') : $('.actDatebarWrapper .datebar .date')
        var bookings = app.data.spaBookingPerDate
        _.each(bookings, function (val,key) {
            console.log("1277",val,key)
            var arr = key.split('/'),
            month = arr[0],
            day = arr[1],
            year = arr[2]
            console.log("1277",month,day,year)
            if(isSummaryPage){
                month = Number(arr[0]) - 1
                day = Number(day) < 10 ? day.substring(1):day
            }
            _.each(val,function(booking){
                $(datePickerDatesDOM).each(function () {
                    console.log("1276",$(this).attr('data-day'),day,$(this).attr('data-month'),month,$(this).attr('data-year'),year)
                    if ($(this).attr('data-day') == day && $(this).attr('data-month') == month && $(this).attr('data-year') == year) {
                   
                        if ($(this).find('span').length)
                            $(this).find('span').append('<i class="fa fa-circle"></i>')

                        else $(this).append('<span class="ui-datepicker-bookings"><i class="fa fa-circle"></i></span>')
                        if($(this).find('span i').length >3){
                            $(this).find('span').html('+3')
                        }
                      
                    }
                })
            })
          
        })
    }
    if (!app.controllers.initController._loadServiceTypes) {
        app.controllers.initController._loadServiceTypes = app.controllers.initController.loadServiceTypes
        app.controllers.initController.loadServiceTypes = function() {
            app.controllers.initController._loadServiceTypes.apply(this,arguments)
            app.data.serviceTypes = [
                {id: "activities", href: "spaBooking/class/Location201", icon: "bullhorn", name: "Activities"},
                {id: "spa", href: "/spaBooking/service/Location101", icon: "leaf", name: "Spa"},
                // {id: "daySpaEdenHall", href: "roomsBooking/dayvenue/Eden%20Hall%20-%20Day%20Spa", icon: "heart", name: "Book a Spa Day"}
            ]
        }
    }

    //fixing booking history logic
        app.controllers.initController._initGuestItinerary = app.controllers.initController.initGuestItinerary;
        app.controllers.initController.initGuestItinerary = function () {
            var defer = $.Deferred(),
                deferreds = [],
                itinerarySources = []
            app.customization.features.pmsBooking && itinerarySources.push({name:'pmsBooking', model:'fetchCustomerPMSBookings', data:'PMSBooking', date:'DepartureDate',reserved:'RESERV', completed:'CHKOUT', folioid:'PMSFolioId'});
            app.customization.features.spaBooking && itinerarySources.push({name:'spaBooking', model:'fetchCustomerSpaBookings', data:'SpaFolio', subitem:'SpaFolioItem', date:'BookStartTime', reserved:'BKD', completed:'COM', cancelled: 'CNL', folioid:'SpaFolioId'});
            app.customization.features.diningBooking && itinerarySources.push({name:'diningBooking', model:'fetchCustomerDiningReservations', data:'SpaFolio', subitem:'SpaFolioItem', date:'BookStartTime', reserved:'BKD', completed:'COM', folioid:'SpaFolioId'});
            // {name:'skiBooking', model:'fetchCustomerSkiBookings', data:'SkiFolio', subitem:'SkiFolioItem', date:'BookStartTime', reserved:'BKD', completed:'COM', folioid:'SkiFolioId'}
            app.customization.features.golfBooking && itinerarySources.push({name:'golfBooking', model:'fetchCustomerGolfBookings', data:'GolfBooking', date:'BookingTime', folioid:'GolfBookingId', aggregateGolfPlayers:'GolfPlayer'});
            $.each(itinerarySources, function(i,itinerarySource){
                var semaphore = $.Deferred();
                deferreds.push(semaphore.promise());
                app.data[itinerarySource.name+'Future'] = [];
                app.data[itinerarySource.name+'Past'] = [];
                app.data[itinerarySource.name+'s'] = [];
                if (app.data.CustomerId && app.data.CustomerGUID && app.customization.features[itinerarySource.name]) {
                    $.when(
                        app.models.userModel.getData(itinerarySource.model, {CustomerId:app.data.CustomerId,CustomerGUID:app.data.CustomerGUID}),
                        app.customization.features.pmsBooking && (deferreds.length>1) && deferreds[0]
                    )
                        .done(function(r,r2){
                            if (itinerarySource.name == "pmsBooking") {
                                    app.data.datesForRestrictedFolio = false;
                            }
                            $.each(r[itinerarySource.data] || [], function(i,theBookingItem){
                                var bookingItemArray = itinerarySource.subitem ? theBookingItem[itinerarySource.subitem] : theBookingItem,
                                    theDate=null;
                                app.data.restrictedFolioStartDate = new Date('2000-01-01')
                                app.data.restrictedFolioEndDate = new Date('2000-01-01')
                                $.each($.isArray(bookingItemArray)?bookingItemArray:[bookingItemArray],function(j,bookingItem){
                                    if (!bookingItem || ((!!itinerarySource.reserved||!!itinerarySource.completed) && (bookingItem.BookStatus == itinerarySource.cancelled && bookingItem.BookStatus != itinerarySource.completed)) || !bookingItem[itinerarySource.date] || ((theDate = Date.parseExact(bookingItem[itinerarySource.date].substr(0,10),"yyyy-MM-dd")) === null)) {
                                        return;
                                    }
                                    if (theDate >= Date.today()) {
                                        if (bookingItem.BookStatus !== itinerarySource.cancelled){
                                            app.data[itinerarySource.name+'Future'] = app.data[itinerarySource.name+'Future'] || [];
                                            app.data[itinerarySource.name+'Future'].push(theBookingItem[itinerarySource.folioid]);
                                            theBookingItem.Future = true;
                                        } else {
                                            return;
                                        }
                                    } else {
                                        if (bookingItem.BookStatus !== itinerarySource.cancelled){
                                            app.data[itinerarySource.name+'Past'] = app.data[itinerarySource.name+'Past'] || [];
                                            app.data[itinerarySource.name+'Past'].push(theBookingItem[itinerarySource.folioid]);
                                            theBookingItem.Past = true;
                                        } else {
                                            return;
                                        }
                                    }
                                    bookingItem.date = theDate;
                                    if (theBookingItem.DailyRateDetails) {
                                        var dailyRateDetails = $.firstOrOnly(theBookingItem.DailyRateDetails);
                                        theBookingItem.PMSRateType = dailyRateDetails.PMSRateType;
                                        theBookingItem.PMSRateId = dailyRateDetails.PMSRateId;
                                    }
                                    if (_.any(app.data.pmsDayBookings,function(x){return x==theBookingItem.PMSFolioId})) {
                                        theBookingItem.isDayBooking = true;
                                    }
                                    if (!app.data[itinerarySource.name+'s']) {
                                        app.data[itinerarySource.name+'s'] = []
                                    }
                                    if (itinerarySource.subitem) {
                                        var slicedBookingItem = $.extend( {}, theBookingItem );
                                        slicedBookingItem[itinerarySource.subitem] = $.extend( {}, bookingItem );
                                        app.data[itinerarySource.name+'s'].push( slicedBookingItem );
                                    } else {
                                        app.data[itinerarySource.name+'s'].push( theBookingItem );
                                    }
                                    if (itinerarySource.name == "pmsBooking" && app.data.RestrictedFolio && theBookingItem[itinerarySource.folioid] == app.data.RestrictedFolio) {
                                        app.data.datesForRestrictedFolio = [];
                                        app.data.restrictedFolioStartDate = Date.parseExact(theBookingItem.ArrivalDate, "yyyy-MM-ddHHmmss");
                                        app.data.restrictedFolioEndDate = Date.parseExact(theBookingItem.DepartureDate, "yyyy-MM-ddHHmmss");
                                        for (var theDate = app.data.restrictedFolioStartDate.clone(); theDate <= app.data.restrictedFolioEndDate; theDate.add(1).day()) {
                                            app.data.datesForRestrictedFolio.push({
                                                human:theDate.toString(app.localization.CultureInfo.formatPatterns.longDate),
                                                machine:theDate.toString("yyyy-MM-dd")
                                            });
                                        }
//                                         } else {
//                                             app.data.datesForRestrictedFolio = false;
                                    }
                                });
                                if (app.data.RestrictedFolio) {
                                    app.data[itinerarySource.name + 'Past'] = []
                                    if (itinerarySource.name == "pmsBooking") {
                                        // app.data[itinerarySource.name + 'Future'] = _.filter(app.data[itinerarySource.name + 'Future'], function (bookingItem) {
                                        //     return bookingItem[itinerarySource.folioid] == app.data.RestrictedFolio
                                        // })
                                    } else {
                                        app.data[itinerarySource.name + 'Future'] = _.filter(app.data[itinerarySource.name + 'Future'], function (bookingItemId) {
                                            var bookingItem = _.find(app.data[itinerarySource.name+'s'],function(x){return x[itinerarySource.folioid]==bookingItemId})
                                            return bookingItem[itinerarySource.subitem][itinerarySource.date].substr(0, 10) >= app.data.restrictedFolioStartDate.toString("yyyy-MM-dd") &&
                                                bookingItem[itinerarySource.subitem][itinerarySource.date].substr(0, 10) <= app.data.restrictedFolioEndDate.toString("yyyy-MM-dd")
                                        })
                                    }
                                }
                              if (itinerarySource.aggregateGolfPlayers && theBookingItem[itinerarySource.aggregateGolfPlayers]) {
                                theBookingItem.golfPlayers = _.reduce(
                                                    _.isArray(theBookingItem[itinerarySource.aggregateGolfPlayers])
                                                      ? theBookingItem[itinerarySource.aggregateGolfPlayers]
                                                      : [theBookingItem[itinerarySource.aggregateGolfPlayers]]
                                                  , function( aggregate, player ) {
                                                      if (player.BookStatus!='CNL' && player.BookStatus!='NSH') {
                                                        aggregate.players += 1
                                                        aggregate.price += +player.ItemPrice
                                                        aggregate.itemName = player.ItemName
                                                        aggregate.courseId = player.CourseId
                                                      }
                                                    return aggregate
                                                    }
                                                  , { players: 0, price: 0 }
                                                )
                              }
                            })
                            console.log('done semaphore',semaphore);
                            semaphore.resolve();
                        })
                        .fail(function(r){
                            app.data[itinerarySource.name+'s'] = [];
                            app.data[itinerarySource.name+'s'].noData = true;
                            console.log('fail semaphore',semaphore);
                            semaphore.resolve();
                        });
                } else {
                    app.data[itinerarySource.name+'s'] = [];
                    semaphore.resolve();
                }
            })

            $.when.apply(this,deferreds).done(function(){
                console.log('resolving itinerarySources');
                defer.resolve(deferreds.length);
            }).fail(function(){console.log('itinerarySources failed')});
            return defer.promise();
        }

});
