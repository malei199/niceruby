# Album-Manager 相册管理器

这是用目录来管理照片相册的模型。我们假设，如果给出一个路径，会有一个相册的子目录,每个单独的子目录也都是相册。存于那些字目录中的文件都是照片.

 ## Album Manager 
相册管理器表现出一个简单的作用,那就是相册集指向一系列包含相关照片的相册.
## Album Object
这个相册管理的两个参数和一个路径 
* `name` -- 相册的名字
* `path` -- 相册的路径
* `photos()` -- 请求返回所有的相册图片 