$(document).on('click', '#getAddressDetails', function() {
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';
        $.getJSON(GEOCODING).done(function(location) {
            var arrAddress = location.results[0].address_components;
            $.each(arrAddress, function(i, address_component) {
                if (address_component.types[0] == "country") {
                    $('#country').val(address_component.long_name);
                }
                if (address_component.types[0] == "locality") {
                    $('#city').val(address_component.long_name);
                }
                if (address_component.types[0] == "administrative_area_level_1") {
                    $('#state').val(address_component.long_name);
                }
                if (address_component.types[0] == "postal_code") {
                    $('#pincode').val(address_component.long_name);
                }
                if (address_component.types[0] == "street_number") {
                    var street_number = address_component.long_name;
                    $('#address').val(street_number);
                }
                if (address_component.types[0] == "route") {
                    var route = address_component.long_name;
                    if ($('#address').val() == '') {
                        $('#address').val(route);
                    } else {
                        $('#address').val($('#address').val() + ', ' + route);
                    }
                }
                if (address_component.types[0] == "neighborhood") {
                    var neighborhood = address_component.long_name;
                    if ($('#address').val() == '') {
                        $('#address').val(neighborhood);
                    } else {
                        $('#address').val($('#address').val() + ', ' + neighborhood);
                    }
                }
                if (address_component.types[2] == "sublocality_level_1") {
                    var sublocality_level_1 = address_component.long_name;
                    if ($('#address').val() == '') {
                        $('#address').val(sublocality_level_1);
                    } else {
                        $('#address').val($('#address').val() + ', ' + sublocality_level_1);
                    }
                }
                if (address_component.types[2] == "sublocality_level_2") {
                    var sublocality_level_2 = address_component.long_name;
                    if ($('#address').val() == '') {
                        $('#address').val(sublocality_level_2);
                    } else {
                        $('#address').val($('#address').val() + ', ' + sublocality_level_2);
                    }
                }
            });

        })
    }

    function error(err) {
        console.log(err)
    }
});