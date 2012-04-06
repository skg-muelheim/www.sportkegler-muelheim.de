<?php
/**
 * Smarty {simplifyURL} plugin
 *
 * Type:       function
 * Name:       simplifyURL
 * Date:       Feb 2012
 * Purpose:    Simplify URLs in for links.
 * Syntax:     {simplifyUrl url="index.php?para1=c1#H1"}: 'url' is a required parameter (URL)
 * Install:    Drop into the plugin directory
 * @link       non-yet 
 * @author     Sebastian Sickelmann <name at domain dot net>
 * @copyright  2012 Sebastian Sickelmann
 * @license    LGPL License
 * @version    1.0.0
 * @param      array
 * @param      Smarty
 */
function smarty_function_simplifyURL($params, &$smarty)
{
    $self = $_SERVER['PHP_SELF'];
    $url =  $params['url'];
    $copyOfGet = $_GET;
    if ($url[0] != '/' && ($url[0] != '.' || $url[1] != '.')) {
        if ($url[0] == '.' && $url[1] == '/') {
            $url = substr($url, 2);
        }
        $pos = strripos($self, '/');
        $self = substr($self, $pos+1);
        if (strpos($url,$self) == 0) {
            $url_parts = parse_url($url);
            $query_parts = explode("&",$url_parts['query']);
            $query = "";
            $anders = false;
            for($i = 0; $i < count($query_parts); $i++) {
                $split = explode("=",$query_parts[$i]);
                $query .= "|".implode("++",$split);
                if (isset($_GET[$split[0]]) && $_GET[$split[0]] == $split[1]) {
                    unset($copyOfGet[$split[0]]);
                }else {
                    $anders = true;
                }
            }
            $anders |= count($copyOfGet) > 0;
            if ($anders) {
                $url = $params['url'];
            }else {
                $url = "#".$url_parts['fragment'];
            }
        }else 
        {
            $url = $params['url'];
        }
    }
    return $url;
//    
//	if(!is_callable('json_decode')) {
//		$smarty->_trigger_fatal_error("{json} requires json_decode() function (PHP 5.2.0+)");
//	}
//	if (empty($params['file'])) {
//		$smarty->_trigger_fatal_error("{json} parameter 'file' must not be empty");
//	}
//	if (isset($params['assign'], $params[$params['assign']])) {
//		$smarty->_trigger_fatal_error("{json} parameter 'assign' conflicts with a variable assign parameter (both refer to the same variable)");
//	}
//	
//	$assoc = ($params['obj2obj']==true) ? false : true;
//	$json = trim(file_get_contents($params['file']));
//	$data = json_decode($json, $assoc);
//	
//	if($params['debug']==true) {
//		echo "<pre>"; 
//		print_r($data);
//		echo "</pre>";
//	}
//	
//	unset($params['file'], $params['obj2obj'], $params['debug']);
//	
//	$assign = array();
//	foreach ($params as $key => $value) {
//		if ($key==='assign') {
//			$assign[$value] = $data;
//		} else {
//			$assign[$key] = $assoc ? $data[$value] : $data->$value;
//		}
//	}
//	
//	if (count($assign)>0) {
//		$smarty->assign($assign);
//	} else {
//		return $data;
//	}
}

?><!--gen-->