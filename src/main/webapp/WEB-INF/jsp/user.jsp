<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020/5/12
  Time: 下午 4:03
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>显示区</title>
</head>
<body>
    id:${requestScope.user.id}<br/>
    姓名:${requestScope.user.name}<br/>
    密码:${requestScope.user.password}<br/>
    家:${requestScope.user.home}<br/>
    角色id:${requestScope.user.j_id}<br/>
</body>
</html>
