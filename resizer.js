var resize = (function () {
    'use strict';
    var Methods = {
            setInitialCssProperties: function ($image, $holder) {
                $image.css('position', 'absolute');
                $holder.css('position', 'relative');
            },
            createTestImage: function ($image) {
                var test_image = new Image();
                test_image.src = $image.attr('src');
                return test_image;
            },
            getImgNaturalDimensions: function (test_image) {
                var img_natural_dimensions = {};
                img_natural_dimensions.height = test_image.height;
                img_natural_dimensions.width = test_image.width;
                return img_natural_dimensions;
            },
            getImgRatio: function (img_natural_dimensions) {
                return img_natural_dimensions.width /
                       img_natural_dimensions.height;
            },
            getHolderDimensions: function ($holder) {
                var holder_dimensions = {};
                holder_dimensions.height = $holder.height();
                holder_dimensions.width = $holder.width();
                return holder_dimensions;

            },
            getCssForHorizontalResize: function (holder_dimensions, ratio) {
                var height = '100%',
                    width = holder_dimensions.height * ratio,
                    left = holder_dimensions.width / 2 - width / 2,
                    css = {
                        'height': height,
                        'width': width,
                        'left': left
                    };
                return css;
            },
            getCssForVerticalResize: function (holder_dimensions, ratio) {
                var width = '100%',
                    height = holder_dimensions.width / ratio,
                    top = holder_dimensions.height / 2 - height / 2,
                    css = {
                        'height': height,
                        'width': width,
                        'top': top
                    };
                return css;
            }
        },
        resize = function ($image, $holder, image_natural_height, image_natural_width, ratio) {
            var css,
                holder_dimensions = Methods.getHolderDimensions($holder);
            if (image_natural_height <= image_natural_width) {
                css = Methods.getCssForHorizontalResize(holder_dimensions, ratio);
            } else if (image_natural_height > image_natural_width) {
                css = Methods.getCssForVerticalResize(holder_dimensions, ratio);
            }
            $image.css(css);
            return true;
        };
    return function ($image, continuous, holder_selector) {
        var $holder,
            test_image = Methods.createTestImage($image),
            img_natural_dimensions = Methods.getImgNaturalDimensions(test_image),
            image_natural_height = img_natural_dimensions.height,
            image_natural_width = img_natural_dimensions.width,
            ratio = Methods.getImgRatio(img_natural_dimensions);
        if (holder_selector === undefined) {
            $holder = $image.parent();
            $holder = $image.closest(holder_selector);
        } else {
            $holder = $image.closest(holder_selector);
        }
        Methods.setInitialCssProperties($image, $holder, image_natural_height, image_natural_width, ratio);
        if (continuous === undefined || continuous === true) {
            $(window).resize(function () {
                resize($image, $holder, image_natural_height, image_natural_width, ratio);
            });
            resize($image, $holder, image_natural_height, image_natural_width, ratio);
        } else {
            resize($image, $holder, image_natural_height, image_natural_width, ratio);
        }
    };
}());
