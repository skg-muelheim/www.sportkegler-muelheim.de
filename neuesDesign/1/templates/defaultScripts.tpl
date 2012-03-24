<!--
<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>
-->
<script src="js/jquery.js"></script>
<script src="js/jquery.lightbox-0.5.min.js"></script>
<script src="js/google-code-prettify/prettify.js"></script>
<script src="js/bootstrap-transition.js"></script>
<script src="js/bootstrap-alert.js"></script>
<script src="js/bootstrap-modal.js"></script>
<script src="js/bootstrap-dropdown.js"></script>
<script src="js/bootstrap-scrollspy.js"></script>
<script src="js/bootstrap-tab.js"></script>
<script src="js/bootstrap-tooltip.js"></script>
<script src="js/bootstrap-popover.js"></script>
<script src="js/bootstrap-button.js"></script>
<script src="js/bootstrap-collapse.js"></script>
<script src="js/bootstrap-carousel.js"></script>
<script src="js/bootstrap-typeahead.js"></script>
<script src="js/skg-mainapp.js"></script>
{literal}
<script type="text/javascript">
var ele = document.getElementById("main")
    if (ele) {
        var attr = ele.getAttribute("mainnav-id");
        var activateEle = document.getElementById("main-nav."+attr);
        if (activateEle) {
            var classValue = activateEle.getAttribute("class");
            if (classValue) {
                activateEle.setAttribute("class", classValue +" active");
            } else {
                activateEle.setAttribute("class", "active");
            }
        }
    }
$(function() {
	$('a.lightbox').lightBox(/*{fixedNavigation:true}*/);
});        
</script>
{/literal}
