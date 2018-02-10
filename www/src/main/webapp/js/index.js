var helloit = game || {};

helloit.createCourseRegistration = function() {

    return $('<div class="row contact"></div>')
        .append($('<div class="col-md-3"></div>'))
        .append($('<div class="col-md-6"></div>')
            .append($('<div class="contentheader2"></div>')
                .append(helloit.i18n.registrationTitle)
            )
            .append($('<form id="register-form" action="../register.php" method="post" enctype="multipart/form-data" target="register-target"></form>')
                .append($('<input type="text" id="name" name="name"/>')
                    .attr("placeholder", helloit.i18n.nameField)
                )
                .append($('<input type="text" id="email" name="email"/>')
                    .attr("placeholder", helloit.i18n.emailField)
                )
                .append($('<input type="text" id="phone" name="phone"/>')
                    .attr("placeholder", helloit.i18n.phoneNumberField)
                )
                .append($('<label></label>')
                    .append($('<input type="file" id="cv" name="cv" style="display: none"/>'))
                    .append(helloit.i18n.uploadCVField)
                )
                .append($('<div id="register-slider"></div>')
                    .append($('<div></div>')
                        .append($('<div></div>')
                            .append($('<span></span>')
                                .append(helloit.i18n.registrationSent))
                        )
                        .append($('<div></div>')
                            .append($('<button type="submit"></button>')
                                .append(helloit.i18n.registrationButton)
                            )
                        )
                    )
                )
            )
            .append($('<iframe id="register-target" name="register-target" src="about:blank" style="width:0;height:0;border:0 solid #fff;visibility: hidden"></iframe>'))
        )
        .append($('<div class="col-md-3"></div>'));

};

$(function () {

    var $registerTarget = $("#register-target");
    $registerTarget.load( function() {

        var $registerSlider = $("#register-slider");

        if ($("#register-target").contents().find("body").contents().size() > 0) {
            var $registerMessage = $registerSlider.find("span");
            $registerMessage.empty();
            $registerMessage.append(helloit.i18n.registrationTryLater)
        }

        $registerSlider.attr("class", $registerSlider.attr("class") + " register-slided");
    });
});
