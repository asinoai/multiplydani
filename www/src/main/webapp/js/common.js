var game = game || {};

game.CONTACT_ANCHOR_TAG = "contact";
game.ABOUT_US_ANCHOR_TAG = "about_us";

game.i18n.languages = {
    "en": {
        name : "English"
    },
    "hu": {
        name : "Magyar"
    },
    "ro": {
        name : "Română"
    }
};

game.i18n.defaultLanguage = "en";


game.getCurrentLangId = function () {

    if (!game.i18n.currentLanguage) {

        var pathPieces = window.location.pathname.split("/");

        for (var i = 0; i < pathPieces.length; i++) {
            var pathPiece = pathPieces[i];
            if (pathPiece in game.i18n.languages) {
                game.i18n.currentLanguage = pathPiece;
                break;
            }
        }

        if (!game.i18n.currentLanguage) {
            game.i18n.currentLanguage = game.i18n.defaultLanguage;
        }
    }

    return game.i18n.currentLanguage;
};

game.getAdaptedCurrentPath = function(langId) {
    return window.location.pathname.replace("/" + game.getCurrentLangId() + "/", "/" + langId + "/");
};

game.createHeader = function() {

    return $('<div class="row header"></div>')
        .append($('<div class="col-xs-4 col-md-5"></div>'))
        .append($('<div class="col-xs-4 col-md-2 logo"></div>')
            .append($('<div><div></div></div>'))
        )
        .append($('<div class="col-xs-4 col-md-2"></div>')
            .append(game.createLanguageChooser())
        )
        .append($('<div class="col-md-3"></div>'))
        ;

};


game.createLanguageChooser = function() {

    var currentLangId = game.getCurrentLangId();

    var $list = $('<ul class="dropdown-menu"></ul>');
    for(var langId in game.i18n.languages) {
        //noinspection JSUnfilteredForInLoop
        var language = game.i18n.languages[langId];

        if (langId != currentLangId) {
            //noinspection JSUnfilteredForInLoop
            $list.append($('<li></li>')
                .append($('<a></a>')
                    .attr("href", game.getAdaptedCurrentPath(langId))
                    .append(language.name)
                )
            );
        }
    }

    return $('<div class="language-chooser pull-xs-right"></div>')
        .append( $('<span></span>')
            .append(game.i18n.languages[currentLangId].name)
        )
        .append( $('<div></div>')
            .append( $('<button type="button" role="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="chevron"></span></button>'))
            .append( $list )
        );
};

game.formatTitle = function (title, subTitle) {
    var result = title;

    if (subTitle) {
        result = result + ", " + subTitle
    }

    return result;
};

game.createAnchor = function(name) {

    return $('<a></a>')
        .attr("name", name);

};

game.createGeneralDescription = function(content) {

    return $('<div class="row"></div>')
        .append($('<div class="col-md-3"></div>'))
        .append($('<div class="col-md-6"></div>')
            .append(content))
        .append($('<div class="col-md-3"></div>'));

};
