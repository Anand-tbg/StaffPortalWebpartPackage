

let previousPath = window.location.pathname;
function urlChange(newPath) {
  const currentPath = window.location.pathname;
  if (newPath.toLowerCase().indexOf("mode=edit") === -1 && previousPath.toLocaleLowerCase() != currentPath.toLocaleLowerCase()) {
    window.location.href = newPath; // Reload the page if "mode=edit" is not in the URL
  }
}

function overridePushState() {
  const originalPushState = history.pushState;

  // Override the pushState method
  history.pushState = function (state, key, path) {
    console.log("Navigated to:", path);
    if (originalPushState) {
      originalPushState.apply(history, [state, key, path]);
    }
    // Call urlChange after a pushState event
    setTimeout(() => urlChange(path), 600);
  };
}

function handlePopState() {
  window.onpopstate = function () {
    console.log("Back or forward button clicked:", window.location.href);
    urlChange(window.location.href);
  };
}

overridePushState();
handlePopState();


$(document).ready(function () {
  $.fn.scrollEnd = function (callback, timeout) {
    var $this = $(this);
    $this.on('scroll', function () {
      if ($this.data('scrollTimeout')) {
        clearTimeout($this.data('scrollTimeout'));
      }
      $this.data('scrollTimeout', setTimeout(callback, timeout));
    });
  };
  // Show & hide the BackToTop button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#back-top").removeClass("hide");
    } else {
      $("#back-top").addClass("hide");
    }
  });

  // Hide if scroll position is still the same
  $(window).scrollEnd(function () {
    $("#back-top").addClass("hide");
  }, 3000);

  // Scroll to top on click
  $("#back-top a").click(function () {
    $("html, body").animate({
      scrollTop: 0
    }, 800);
  });

  /* $("#btn-increase").click(function (e) {
       // console.clear();
       e.preventDefault();
       var affectedElements = $("h1, h2, h3, h4, h5, h6, a, p , li, span, b, i, th, td, button, label, div");
       affectedElements.each(function () {
           var currentFontSize = parseInt($(this).css('font-size'));
           if (currentFontSize < 24) {
               $(this).css('font-size', currentFontSize + 2 + 'px')
           }
       });
   });
   $("#btn-decrease").click(function (e) {
       // console.clear();
       e.preventDefault();
       var affectedElements = $("h1, h2, h3, h4, h5, h6, a, p , li, span, b, i, th, td, button, label, div");
       affectedElements.each(function () {
           var currentFontSize = parseInt($(this).css('font-size'));
           if (currentFontSize > 10) {
               $(this).css('font-size', currentFontSize - 2 + 'px')
           }
       });
   });  */

  /*end for font resize*/
  
  var affectedElements;
  var iselements = false;

  function getOriginalFontSize() {
    affectedElements = $("h1, h2, h3, h4, h5, h6, a, p, li, span, b, i, th, td, button, label, div");
    affectedElements.each(function () {
      // Store the original size in a data attribute so size can be reset
      $(this).data("original-size", parseInt($(this).css("font-size")));
      $(this).data("current-size", parseInt($(this).css("font-size"))); // Track current size separately
    });
  }

  $("#btn-increase").click(function () {
    if (iselements == false) {
      iselements = true;
      getOriginalFontSize();
    }
    ChangeFontSize(2);
  });

  // $("#btn-decrease").click(function () {
  //   if (iselements == false) {
  //     iselements = true;
  //     getOriginalFontSize();
  //   }
  //   ChangeFontSize(-2);
  // });

  $("#btn-original").click(function () {
    if (affectedElements && affectedElements.length > 0) {
      affectedElements.each(function () {
        var originalSize = $(this).data("original-size");
        $(this).css("font-size", originalSize + "px");
        $(this).data("current-size", originalSize); // Reset current size also
      });
    }
  });

  function ChangeFontSize(direction) {
    affectedElements.each(function () {
      if ($(this).closest(".skipfontresize").length == 0) {
        var currentSize = $(this).data("current-size") || parseInt($(this).css("font-size"));
        var newSize = currentSize + direction;
        $(this).css("font-size", newSize + "px");
        $(this).data("current-size", newSize);
      }
    });
  }

  /*end for font resize*/

});



/*---- custom.js file code from onprem site-------*/

jQuery(document).ready(function () {
    accordion();
    horizonalTab();
    setFirstTabActive();
    setLinkRightNav();
    responsiveTable();
    responsiveVerticalTab();
    responsiveHorizontalTab();
    responsiveNewsLetter();
    jQuery(".horizontal-tabs ul li").addClass("lii");
    var maxHeight = 0;

    jQuery(".lii").each(function () {
        if (jQuery(this).height() > maxHeight) { maxHeight = $(this).height(); }
    });

    jQuery(".lii").height(maxHeight);
    jQuery(".horizontal-tabs ul li[class*='lii']").on('click', function () {
        jQuery(this).parent().find(".lii").removeClass("active");
        jQuery(this).addClass("active");

        var horTab = jQuery(this).parent().parent();
        var tabContentId = jQuery(jQuery(this).children()).attr('aria-controls');
        jQuery(jQuery(horTab).find('.tab-pane')).removeClass('active');
        jQuery(jQuery(horTab).find('#' + tabContentId)).addClass('active');
        jQuery(".vertical-tabs ul li").removeClass("active");
    });

    jQuery(".vertical-tabs ul li").on('click', function () {
        jQuery('.vertical-tabs ul li').removeClass("active");
        jQuery(this).addClass("active");
        var verticalTab = jQuery(this).parent().parent().parent();
        var tabContentId = jQuery(this).attr('aria-controls');
        jQuery(jQuery(verticalTab).find('.tab-pane')).removeClass('active');
        jQuery(jQuery(verticalTab).find('#' + tabContentId)).addClass('active');
    });

    jQuery(".newsletter-tabs ul li").on('click', function () {
        jQuery('.newsletter-tabs ul li').removeClass("active");
        jQuery(this).addClass("active");
    });
});
function setLinkRightNav() {
    jQuery("#rightNavigation-page a").each(function () {
        var href = jQuery(this).attr("data-title");
        if (href) {
            jQuery(this).attr("href", href);
        }
    });
    if (jQuery(window).width() <= 768) {
        jQuery("#sidebarCollapse").click();
    }
}
function setFirstTabActive() {
    jQuery(".horizontal-tabs ul li").each(function (index) {
        jQuery(this).attr("class", "");
    });

    //Find all horizontal-tabs group
    jQuery(".horizontal-tabs ul").each(function (index) {
        var horizontalFirstTab = jQuery(this).find("li").first();
        if (horizontalFirstTab != null) {
            horizontalFirstTab.attr("class", "active");
        }
    });

    jQuery(".horizontal-tabs .tab-content .tab-pane").each(function (index) {
        jQuery(this).attr("class", "tab-pane");
    });

    //Find all horizontal-tabs group
    jQuery(".horizontal-tabs .tab-content").each(function (index) {
        var horizontalFirstTabContent = jQuery(this).find(".tab-pane").first();
        if (horizontalFirstTabContent != null) {
            horizontalFirstTabContent.attr("class", "tab-pane active");
        }
    });

    jQuery(".vertical-tabs ul li").each(function (index) {
        if (index == 0) {
            jQuery(this).attr("class", "active");
        } else
            jQuery(this).attr("class", "");
    });
    jQuery(".vertical-tabs .tab-content .tab-pane").each(function (index) {
        if (index == 0) {
            jQuery(this).attr("class", "tab-pane active");
        } else
            jQuery(this).attr("class", "tab-pane");

    });

    jQuery(".newsletter-tabs ul li").each(function (index) {
        if (index == 0) {
            jQuery(this).attr("class", "active");
        } else
            jQuery(this).attr("class", "");
    });
    jQuery(".newsletter-tabs .tab-content .tab-pane").each(function (index) {
        if (index == 0) {
            jQuery(this).attr("class", "tab-pane active");
        } else
            jQuery(this).attr("class", "tab-pane");

    });
}

var myVar = null;
var editmodeVar = null;

var count = 0;
function setFirstTabActiveEditMode() {
    var iframe = jQuery("div[id*='txtBody'] iframe");
    var btn = jQuery(iframe).contents().find(".bt-collapse");
    var horTabsContent = jQuery(iframe).contents().find(".horizontal-tabs .tab-content .tab-pane");
    var verTabsContent = jQuery(iframe).contents().find(".vertical-tabs .tab-content .tab-pane");
    tabTop = jQuery(iframe).contents().find(".tabs-top li");
    tabLeft = jQuery(iframe).contents().find(".tabs-left li");

    if (count > 5) { clearInterval(editmodeVar); }

    if (btn.length > 0) {
        jQuery(iframe).contents().find(".collapse-content").removeClass('in');
        jQuery(iframe).contents().find(".collapse-content").removeClass('show');
        jQuery(iframe).contents().find(".bt-collapse").removeClass("custome-collapse-open");

        jQuery(btn).html("+");
        jQuery(btn).attr("aria-expanded", "false");
    }

    if (tabTop.length > 0) {
        jQuery(tabTop).addClass("lii");
        jQuery(tabTop).each(function (index) {
            if (index == 0) {
                jQuery(this).attr("class", "active");
            } else
                jQuery(this).attr("class", "");
        });

    }

    if (tabLeft.length > 0) {
        jQuery(tabLeft).each(function (index) {
            if (index == 0) {
                jQuery(this).attr("class", "active");
            } else
                jQuery(this).attr("class", "");
        });
    }

    if (horTabsContent.length > 0) {
        jQuery(horTabsContent).each(function (index) {
            if (index == 0) {
                jQuery(this).attr("class", "tab-pane active");
            } else
                jQuery(this).attr("class", "tab-pane");
        });
    }

    if (verTabsContent.length > 0) {
        jQuery(verTabsContent).each(function (index) {
            if (index == 0) {
                jQuery(this).attr("class", "tab-pane active");
            } else
                jQuery(this).attr("class", "tab-pane");
        });
    }

    if (btn.length > 0 && tabTop.length > 0 && tabLeft.length > 0 && horTabsContent.length > 0 && verTabsContent.length > 0) {
        clearInterval(editmodeVar);
    }
    count++;
}

function LoadEditMode() {
    var iframe = jQuery("div[id*='txtBody'] iframe");
    var btn = jQuery(iframe).contents().find(".bt-collapse");
    var tabTop = jQuery(iframe).contents().find(".tabs-top li");
    var tabLeft = jQuery(iframe).contents().find(".tabs-left li");

    if (count > 5) { clearInterval(myVar); }
    if (btn.length > 0) {
        jQuery(btn).click(function (e) {
            var stt = jQuery(this).attr("aria-expanded");
            if (stt == "true") {
                jQuery(this).html("+");
                jQuery(this).removeClass("custome-collapse-open");
                //jQuery(this).next().removeClass('show');
            }
            else {
                jQuery(this).html("-");
                jQuery(this).addClass("custome-collapse-open");
            }
        });
    }
    if (tabTop.length > 0) {
        jQuery(tabTop).on('click', function () {
            jQuery(tabTop).removeClass("active");
            jQuery(this).addClass("active");
            var horTab = jQuery(this).parent().parent();
            var tabContentId = jQuery(jQuery(this).children()).attr('aria-controls');
            jQuery(jQuery(horTab).find('.tab-pane')).removeClass('active');
            jQuery(jQuery(horTab).find('#' + tabContentId)).addClass('active');
            jQuery(tabLeft).removeClass("active");
        });
    }

    if (tabLeft.length > 0) {
        jQuery(tabLeft).on('click', function () {
            jQuery(tabLeft).removeClass("active");
            jQuery(this).addClass("active");
            var verticalTab = jQuery(this).parent().parent().parent();
            var tabContentId = jQuery(this).attr('aria-controls');
            jQuery(jQuery(verticalTab).find('.tab-pane')).removeClass('active');
            jQuery(jQuery(verticalTab).find('#' + tabContentId)).addClass('active');
        });


    }
    if (tabLeft.length > 0 && tabTop.length > 0 && btn.length > 0) {
        clearInterval(myVar);
    }
    count++;
}

function accordion() {
    var isEditmode = jQuery("input[id*='contentInEditMode']").length;
    if (isEditmode > 0) {
        myVar = setInterval(LoadEditMode, 1000);
        editmodeVar = setInterval(setFirstTabActiveEditMode, 1000);


    }
    else {
        jQuery(".collapse-content").removeClass("in");
        jQuery(".collapse-content").removeClass("show");
        jQuery(".bt-collapse").html("+");
        jQuery(".bt-collapse").attr("aria-expanded", "false");
        // Hide all collapses
        jQuery(".collapse-content").removeClass("show");

        // Add custom icons
        jQuery(".collapse-content").on('show.bs.collapse', function () {
            var id = "#" + jQuery(this).attr("id");
            jQuery(".bt-collapse").each(function () {
                if (jQuery(this).attr("data-bs-target") === id) {
                    jQuery(this).addClass("custome-collapse-open").html("-");
                }
            });
        });

        jQuery(".collapse-content").on('hide.bs.collapse', function () {
            var id = "#" + jQuery(this).attr("id");
            jQuery(".bt-collapse").each(function () {
                if (jQuery(this).attr("data-bs-target") === id) {
                    jQuery(this).removeClass("custome-collapse-open").html("+");
                }
            });
        });


        //jQuery(jQuery(".collapse-content")[0]).collapse('show');
        var firstItem = jQuery(".collapse-content")[0];
        var id = "#" + jQuery(firstItem).attr("id");
        jQuery(".bt-collapse").each(function () {
            if (jQuery(this).attr("data-target") == id) {
                jQuery(jQuery(".collapse-content")[0]).addClass("show");
                jQuery(jQuery(".bt-collapse")[0]).addClass("custome-collapse-open");
                jQuery(jQuery(".bt-collapse")[0]).attr("aria-expanded", "true");
                jQuery(jQuery(".collapse-content")[0]).removeAttr("style");
                jQuery(this).html("-");
            }
        });

        //set first tab expane
        jQuery(".bt-collapse").removeClass("custome-collapse-open");
        var tabPane = jQuery(".tab-content").find("div.tab-pane");
        for (var i = 0; i < tabPane.length; i++) {
            var firstItem = jQuery(tabPane[i]).find("div.custom-collapse:first");
            if (typeof (firstItem) != 'undefined' && firstItem != null) {
                jQuery(firstItem).find("div.collapse-content").addClass("show");
                jQuery(firstItem).find("div.bt-collapse").addClass("custome-collapse-open");
                jQuery(firstItem).find("div.bt-collapse").attr("aria-expanded", "true");
                jQuery(firstItem).find("div.collapse-content").removeAttr("style");
                jQuery(firstItem).find("div.bt-collapse").html("-");
            }
        }

        var firstItem = jQuery(".content-ckeditor:first()").children(".custom-collapse:first()");
        if (typeof (firstItem) != 'undefined' && firstItem != null) {
            jQuery(firstItem).find("div.collapse-content").addClass("show");
            jQuery(firstItem).find("div.bt-collapse").addClass("custome-collapse-open");
            jQuery(firstItem).find("div.bt-collapse").attr("aria-expanded", "true");
            jQuery(firstItem).find("div.collapse-content").removeAttr("style");
            jQuery(firstItem).find("div.bt-collapse").html("-");
        }

    }
}
function horizonalTab() {
    jQuery(".horizontal-tabs").each(function () {
        var li = jQuery(this).children("ul").children("li");
        var count = li.length;
        var width = 100 / count + "%";
        li.css("width", width);

    });
}
function responsiveTable() {
    jQuery('.content-ckeditor table').each(function (index) {
        jQuery(this).before('<div id="ck-table-res-' + index + '"></div>');
        jQuery(this).prependTo('#ck-table-res-' + index + '');
    });
    jQuery(window).on('resize', function (e) {
        var widthResp = jQuery(".content-ckeditor").width();
        var widthWindow = jQuery(window).width();
        jQuery("div[id*=ck-table] table").each(function () {
            var widthOutOfTable = jQuery(this).parent("div[id*=ck-table]").width();
            var widthTable = jQuery(this).width();

            if (widthTable > widthOutOfTable || widthTable > widthWindow) {
                if (widthWindow <= 800) {
                    var widthRespOut = widthWindow - 77;
                    jQuery(this).parent("div[id*=ck-table]").css({ "width": widthRespOut, "overflow-x": "auto" });
                }
                if (widthWindow <= 767) {
                    jQuery(this).parent("div[id*=ck-table]").css({ "width": widthWindow - 60, "overflow-x": "auto" });
                }
                else {
                    jQuery(this).parent("div[id*=ck-table]").css({ "width": widthResp, "overflow-x": "auto" });
                }
            }
            else {
                jQuery(this).parent("div[id*=ck-table]").css({ "width": "", "overflow-x": "" });
            }
        })
    });
}
function responsiveHorizontalTab() {
    jQuery(window).on('resize', function () {
        if (jQuery(window).width() <= 768) {
            var flag = 0;
            jQuery(".horizontal-tabs ul").css("display", "none");
            jQuery(".horizontal-tabs").each(function (index) {
                jQuery(this).children(".dropdown-horizontal").remove();
                jQuery(this).children("ul").before('<div class="dropdown-horizontal dropdown-horizontal-' + index + ' form-control"><div class="select-custom clearfix"><span class="item-default">Select</span><i class="fa fa-chevron-left"></i></div><ul class="dropdown-menu dropdown-menu-' + index + '"></ul></div>');
                jQuery(this).children("ul").children("li").each(function () {
                    var silver = "";
                    if (flag % 2 == 0) {
                        silver = "silver";
                    }
                    jQuery('.dropdown-horizontal-' + index + ' .dropdown-menu-' + index + '').append("<li class='select-item " + silver + "' value=" + jQuery(this).children("a").attr("aria-controls") + "><p>" + jQuery(this).children("a").text() + "</p></li>");
                    flag++;
                });
                var tabDefault = jQuery(this).children("ul").children("li.active");
                var tabName = jQuery(tabDefault).children("a").text();
                //jQuery(this).find('.dropdown-menu-' + index + '').val(id);
                var tabContent = jQuery(this).children(".horizontal-tab-content");
                var tabCategory = jQuery(this).find("ul.nav-tabs");
                jQuery(this).find('.dropdown-horizontal').click(function () {
                    jQuery(this).attr('tabindex', 1).focus();
                    jQuery(this).toggleClass('active');
                    jQuery(this).find('.dropdown-menu-' + index + '').slideToggle(100);
                });
                jQuery(this).find('.dropdown-horizontal').focusout(function () {
                    jQuery(this).removeClass('active');
                    jQuery(this).find('.dropdown-menu-' + index + '').slideUp(100);
                });
                jQuery(this).find('.dropdown-menu-' + index + ' li').click(function () {
                    var currentItem = jQuery(this).attr("value");
                    jQuery(tabContent).find(".tab-pane").each(function () {
                        if (jQuery(this).attr("id") == currentItem) {
                            jQuery(this).attr("class", "tab-pane active");
                        } else {
                            jQuery(this).attr("class", "tab-pane");
                        }
                    });
                    jQuery(tabCategory).find("li").each(function () {
                        if (jQuery(this).find("a").attr("aria-controls") == currentItem) {
                            jQuery(this).attr("class", "active");
                            jQuery(this).find("a").attr("aria-expanded", "true");

                        } else {
                            jQuery(this).attr("class", "");
                            jQuery(this).find("a").attr("aria-expanded", "false");
                        }
                    });
                    jQuery(this).parent(".dropdown-menu").parent(".dropdown-horizontal").find(".item-default").text(jQuery(this).text());
                });
                jQuery('.dropdown-menu-' + index + '').parent(".dropdown-horizontal").find(".item-default").text(tabName);
            });
            jQuery(".horizontal-tab-content").css("border-bottom", "1px solid #d8d8d8;");
        } else {
            jQuery(".horizontal-tabs ul").css("display", "block");
            jQuery(".horizontal-tabs .dropdown-horizontal").remove();
        }
    });

}
function responsiveVerticalTab() {
    jQuery(window).on('resize', function () {
        if (jQuery(window).width() <= 768) {
            var flag = 0;
            jQuery(".vertical-tabs>.col-xs-3").css("display", "none");
            jQuery(".vertical-tabs>.col-xs-9").attr("class", "col-xs-12");
            jQuery(".vertical-tabs").each(function (index) {
                jQuery(this).children(".dropdown-vertical").remove();
                jQuery(this).children(".col-xs-3").before('<div class="dropdown-vertical dropdown-vertical-' + index + ' form-control"><div class="select-custom clearfix"><span class="item-default">Select</span><i class="fa fa-chevron-left"></i></div><ul class="dropdown-menu dropdown-menu-' + index + '"></ul></div>');
                jQuery(this).children(".col-xs-3").find("li").each(function () {
                    var silver = "";
                    if (flag % 2 == 0) {
                        silver = "silver";
                    }
                    jQuery('.dropdown-vertical-' + index + ' .dropdown-menu-' + index + '').append("<li class='select-item " + silver + "' value=" + jQuery(this).children("a").attr("aria-controls") + "><p>" + jQuery(this).children("a").text() + "</p></li>");
                    flag++;
                });
                var tabDefault = jQuery(this).find("ul").children("li.active");
                var tabName = jQuery(tabDefault).find("a").text();
                var tabContent = jQuery(this).find(".vertical-tab-content");
                var tabCategory = jQuery(this).find("ul.nav-tabs");

                jQuery(this).find('.dropdown-vertical').click(function () {
                    jQuery(this).attr('tabindex', 1).focus();
                    jQuery(this).toggleClass('active');
                    jQuery(this).find('.dropdown-menu-' + index + '').slideToggle(100);
                });
                jQuery(this).find('.dropdown-vertical').focusout(function () {
                    jQuery(this).removeClass('active');
                    jQuery(this).find('.dropdown-menu-' + index + '').slideUp(100);
                });
                jQuery(this).find('.dropdown-menu-' + index + ' li').click(function () {
                    var currentItem = jQuery(this).attr("value");
                    jQuery(tabContent).find(".tab-pane").each(function () {
                        if (jQuery(this).attr("id") == currentItem) {
                            jQuery(this).attr("class", "tab-pane active");
                        } else {
                            jQuery(this).attr("class", "tab-pane");
                        }
                    });
                    jQuery(tabCategory).find("li").each(function () {
                        if (jQuery(this).find("a").attr("aria-controls") == currentItem) {
                            jQuery(this).attr("class", "active");
                            jQuery(this).find("a").attr("aria-expanded", "true");

                        } else {
                            jQuery(this).attr("class", "");
                            jQuery(this).find("a").attr("aria-expanded", "false");
                        }
                    });
                    jQuery(this).parent(".dropdown-menu").parent(".dropdown-vertical").find(".item-default").text(jQuery(this).text());
                });
                jQuery('.dropdown-menu-' + index + '').parent(".dropdown-vertical").find(".item-default").text(tabName);
            });
        } else {
            jQuery(".vertical-tabs .dropdown-vertical").remove();
            jQuery(".vertical-tabs>.col-xs-3").css("display", "block");
            jQuery(".vertical-tabs>.col-xs-12").attr("class", "col-xs-9");
        }
    });
}
function responsiveNewsLetter() {
    jQuery(window).on('resize', function () {
        if (jQuery(window).width() <= 768) {
            jQuery(".newsletter>.col-xs-3").css("display", "none");
            jQuery(".newsletter-tabs .dropdown-newsletter").remove();
            jQuery(".newsletter-tabs .highlight-mb").remove();
            jQuery(".newsletter-tabs").find("div[class*=issue-no-mb]").remove();
            jQuery(".newsletter").prepend("<h1 class='highlight-mb'>Highlights</h1>");
            jQuery(".newsletter>.col-xs-8").attr("class", "col-xs-12").attr("style", "padding:0");
            jQuery(".newsletter").each(function (index) {
                jQuery(this).prepend("<div class='issue-no-mb-" + index + "'></div>");
                var flag = 0;
                jQuery(this).find(".issue-no").each(function () {
                    jQuery(".issue-no-mb-" + index + "").css("display", "flex").prepend("<p>" + jQuery(this).html() + "</p>");
                });
                jQuery(".issue-no-mb-" + index + "").find("p").css("width", "50%");

                jQuery(this).children(".col-xs-3").before('<div class="dropdown-newsletter dropdown-newsletter-' + index + ' form-control"><div class="select-custom clearfix"><span class="item-default">Select</span><i class="fa fa-chevron-left"></i></div><ul class="dropdown-menu dropdown-menu-' + index + '"></ul></div>');
                jQuery(this).children(".col-xs-3").find("li").each(function () {
                    var silver = "";
                    if (flag % 2 == 0) {
                        silver = "silver";
                    }
                    jQuery('.dropdown-newsletter-' + index + ' .dropdown-menu-' + index + '').append("<li class='select-item " + silver + "' id=" + jQuery(this).children("a").attr("aria-controls") + "><p>" + jQuery(this).children("a").text() + "</p></li>");
                    flag++;
                });
                var tabDefault = jQuery(this).find("ul").children("li.active");
                var tabName = jQuery(tabDefault).children("a").text();
                var tabContent = jQuery(this).find(".newsletter-tabs-content");
                var tabCategory = jQuery(this).find("ul.nav-tabs");
                jQuery(this).find('.dropdown-newsletter').click(function () {
                    jQuery(this).attr('tabindex', 1).focus();
                    jQuery(this).toggleClass('active');
                    jQuery(this).find('.dropdown-menu-' + index + '').slideToggle(100);
                });
                jQuery(this).find('.dropdown-newsletter').focusout(function () {
                    jQuery(this).removeClass('active');
                    jQuery(this).find('.dropdown-menu-' + index + '').slideUp(100);
                });
                jQuery(this).find('.dropdown-menu-' + index + ' li').click(function () {
                    var currentItem = jQuery(this).attr("id");
                    jQuery(tabContent).find(".tab-pane").each(function () {
                        if (jQuery(this).attr("id") == currentItem) {
                            jQuery(this).attr("class", "tab-pane active");
                        } else {
                            jQuery(this).attr("class", "tab-pane");
                        }
                    });
                    jQuery(tabCategory).find("li").each(function () {
                        if (jQuery(this).find("a").attr("aria-controls") == currentItem) {
                            jQuery(this).attr("class", "active");
                            jQuery(this).find("a").attr("aria-expanded", "true");

                        } else {
                            jQuery(this).attr("class", "");
                            jQuery(this).find("a").attr("aria-expanded", "false");
                        }
                    });
                    jQuery(this).parent(".dropdown-menu").parent(".dropdown-newsletter").find(".item-default").text(jQuery(this).text());
                });
                jQuery('.dropdown-menu-' + index + '').parent(".dropdown-newsletter").find(".item-default").text(tabName);
            });
        } else {
            jQuery(".newsletter-tabs .dropdown-newsletter").remove();
            jQuery(".newsletter-tabs .highlight-mb").remove();
            jQuery(".newsletter-tabs").find("div[class*=issue-no-mb]").remove();
            jQuery(".newsletter>.col-xs-3").css("display", "block");
            jQuery(".newsletter>.col-xs-12").attr("class", "col-xs-8").attr("style", "");
        }
    });


}

/*---- end for custom.js file code from onprem site-------*/
