
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
 <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Home</title>
       <%--  <link rel="stylesheet" type="text/css" href='${pageContext.request.contextPath}/ext/resources/ext-theme-classic/ext-theme-classic-all.css'/>  --%>
        <link rel="stylesheet" type="text/css" href='${pageContext.request.contextPath}/ext/resources/css/ext-all.css'/>
        
        <style type="text/css">
        
        	.x-panel-header {
        		background-color: #143D55 !important;
			    border:1px;
        	}
        	
			.main-menu .x-menu-body {
			    background-color: #143D55 !important;
			    border:1px;
			    height : 44px;
			    padding: 10px 10px 5px 14px;
			}
			.main-menu .x-menu-item-link {
			    padding: 3px 0px 3px 4px;
			    position: relative;
			}
			.main-menu .x-menu-item-text {
			    color: #FFFFFF;
			}
			.main-menu .x-menu-item-active .x-menu-item-text {
			    color: #000000;
			}
			.main-menu .x-menu-item-text,
			.main-sub-menu .x-menu-item-text {
			    font: 13px/16px Arial,sans-serif;
			}
			.main-menu .x-menu-item-arrow {
			    top:8px;
			    border-color: white transparent transparent;
			    border-style: solid dashed dashed;
			    border-width: 4px 4px 0;
			    background: none;
			    right:5px;
			    width:2px;
			}
			.main-menu .x-menu-item-active .x-menu-item-arrow {
			    border-top-color: #000000;
			}
			
			.main-sub-menu .x-menu-item-link {
			    padding: 3px 0 3px 32px;
			}
			.main-sub-menu .x-menu-item-icon {
			    height: 22px;
			    left: 2px;
			    top: 0;
			    width: 22px;
			}
        
        </style>       
        <script src='${pageContext.request.contextPath}/ext/ext-all.js'></script>
		<%-- <script src='${pageContext.request.contextPath}/resources/js/app.js'></script> --%>
		<script src='${pageContext.request.contextPath}/app.js'></script>		
    </head>
    <body>
        <h1>Hello World!</h1>
        <p>This is the homepage!</p>
        <div id="menu-div"> </div>
        <div id="login-grid"> </div>
      
    </body>
</html>