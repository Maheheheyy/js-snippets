var isScrolling = false;
var $scrollBox = $("#scroll-box");
var $scrollGrp = $(".scroll-grp");
var observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var groupIndex = $(entry.target).index();
            var $targetGroup = $scrollGrp.eq(groupIndex);
            var scrollTop;
            if (window.innerWidth >= 1280) {
                scrollTop = $targetGroup.offset().left - $scrollGrp.offset().left + $scrollBox.scrollLeft();
            } else {
                scrollTop = $targetGroup.offset().top - $scrollGrp.offset().top + $scrollBox.scrollTop();
            }
            if (!isScrolling) {
                isScrolling = true;
                $scrollBox.animate({ scrollTop: scrollTop }, 500, function() {
                	isScrolling = false;
                });
            }
        }else if (!entry.isIntersecting && entry.intersectionRatio === 0) {
            observer.observe(entry.target);
        }
    });
}, { threshold: 0 });
$scrollGrp.each(function(index, group) {
    observer.observe(group);
});