
# 数据库设计
users表用户登录账户

|    字段    |     类型      |        |
| :------: | :---------: | ------ |
|    id    |   int seq   | 用户id   |
| username | varchar(50) | 用户登录名字 |
| password | varchar(50) | 用户登录密码 |

users_data表用户个人数据

| 字段             | 类型          | 约束       | 描述            |
| -------------- | ----------- | -------- | ------------- |
| user_data_id   | int seq     |          | 用户数据id        |
| user_id        | int         | users.id | users表id，外键约束 |
| user_data_name | varchar(10) |          | 用户数据名字        |
| user_data_pic  | oid         |          | 用户数据图片        |
| created_at     | timestamp   |          | 时间戳           |





# 报错
es.redirect()返回301代码，前端报错corsERROR只允许同源header访问redirect给的网址


### 301，302
后端返回302,301代码给前端，重定向网址为www.baidu.com，因为浏览器的同源策略，导致客户端无法访问百度

如果我能控制服务器需要设置，可以访问我的服务器的源地址，后台管理界面控制只允许/login源的网址访问


# 计划

|     | 进行中                                                                                         | 未完成               |
| --- | ------------------------------------------------------------------------------------------- | ----------------- |
|     | 使用python插入大对象图片                                                                             | ejs引擎制作博客展示界面<br> |
|     | nodejs调用shell传入参数，使用python处理数据库插入逻辑：如果用户插入的数据的名字在users表中，那么取出users.id并插入user_data.user_id表中 | 学习Nodejs线程        |

loginProcess.js的getUserInfo设计错误（正确为插入数据，错误为提取数据）

/api/user/info返回数据错误data字段

