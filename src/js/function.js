import moment from 'moment';

let functionUtil = {
	moment: {
		toGMTFormate: (format) => {
			return moment(format).toDate();
		},
		getUnix: (date) => {
			return moment(date).format('X');
		},
    getTimeName: (date) =>{
      return moment(date).format('YYYYMMDDHHmm');
    },
		getYear: (date) => {
			return moment(date).format('YYYY');
		},
		getMonth: (date) => {
			return moment(date).format('MM');
		},
    getDateFormatepoint: (date) =>{
      return moment(date).format('YYYY.MM.DD');
    },
		getDay: (date) => {
			return moment(date).format('DD');
		},
		getListTime2: (date) => {
			return moment(date).format('YYYY/MM/DD HH:mm');
		},
		getDateFormate: (date) => {
			return moment(date).format('YYYY-MM-DD');
		},
		getListTime: (date) => {
			return moment(date).format('YYYY-MM-DD HH:mm');
		},
		getYMDHMTime: (date) => {
			return moment(date).format('YYYY.MM.DD HH:mm');
		},
		getMDHMTime: (date) => {
			return moment(date).format('MM.DD HH:mm');
		},
		getHMTime: (date) => {
			return moment(date).format('HH:mm');
		},
		getYMDDate: (date) => {
			return moment(date).format('YYYY年MM月DD日');
		},
		getMDDate: (date) => {
			return moment(date).format('MM月DD日');
		}
	},
	subStringNum(str,num){
    var byteLen = 0;
    var newValue = '';
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 255) {　　
        byteLen += 2;　　　
      } else {　
        byteLen++;　
      }
      if (byteLen <= num) {　
        newValue += String.fromCharCode(str.charCodeAt(i));　
      }else{
        newValue += '...';
        return newValue;
      }
    }
    return newValue;
  },
  storeNowPath(){
  	var path = location.pathname;
  	localStorage.setItem('nowPath',path);
  },
  resetNowPath(){
  	if(localStorage.getItem('nowPath')){
  		location.pathname = localStorage.getItem('nowPath');
  		localStorage.removeItem('nowPath');
  	}else{
  		location.pathname = '/activity';
  	}
  	
  },
  upload(e,dir,callback){
  	function uploadJSSDK(config) {
    	var file = config.file,
      dir = config.dir || "",
      token = config.token,
      callback = config.callback || function () {},
      retries = config.retries || 0,
      maxSize = config.maxSize || 0,
      configName = config.name||file.name,
      upload_url = "http://upload.media.aliyun.com/api/proxy/upload",
      blockInit = "http://upload.media.aliyun.com/api/proxy/blockInit",
      blockUpload = "http://upload.media.aliyun.com/api/proxy/blockUpload",
      blockComplete = "http://upload.media.aliyun.com/api/proxy/blockComplete",
      chunkSize = config.chunkSize||4 * 1024 * 1024,
      offset = 0,
      blob = file,
      id,  //上传唯一id，上传初始化请求获得
      uploadId, //分片上传id，上传初始化请求获得
      tags = [],//每次分片上传得到的md5
      curChunkSize = [], chunkBlob = [];  //分块上传的各个块

      function handleError(result, finish, chunk, status) {
          //重试
          if (retries-- > 0 && !finish && status != 599) {
              if (file.size > chunkSize) {
                  //分块上传
                  uploadNextChunk(chunk, curChunkSize[chunk], chunkBlob[chunk]);
              } else {
                  //普通上传
                  uploadSingle();
              }
          } else {
              callback(-1, result);
          }
      }


      //上传分块之前需要提交个start请求，上传结束需要提交个finish请求
      function startChunks() {
          var tmp = 0, size;
          while (tmp < blob.size) {
              size = Math.min(chunkSize, blob.size - tmp);
              curChunkSize.push(size);
              chunkBlob.push(blob.slice(tmp, tmp + size));
              tmp += size;
          }
          uploadNextChunk(0, curChunkSize[0], chunkBlob[0])
      }

      function uploadNextChunk(chunk, curchunksize, chunkblob) {
          var formData = new FormData();
          formData.append('size', curchunksize);
          var url;
          if (chunk == 0) {
              formData.append('dir', dir);
              formData.append('name', configName);
              url = blockInit;
          } else {
              formData.append('id', id);
              formData.append('uploadId', uploadId);
              formData.append('partNumber', chunk + 1); //chunk从0开始,partNumber从1开始
              url = blockUpload;
          }
          formData.append('content', chunkblob, blob.name);

          ajax(url, formData, function (e) {
              var status = e.status,
                  message = e.statusText || "";
              if (status == 200 && message == "OK") {
                  var result = JSON.parse(e.responseText);
                  tags[chunk] = result.eTag;
                  offset += curchunksize;

                  var percent = Math.ceil(offset / file.size * 100);
                  //改变显示的中间状态
                  callback(percent);

                  if (chunk == 0) {
                      id = result.id;
                      uploadId = result.uploadId;
                      for (var i = 1; i < chunkBlob.length; i++) {
                          uploadNextChunk(i, curChunkSize[i], chunkBlob[i])
                      }
                  }

                  // Check if file is uploaded
                  if (offset >= blob.size) {
                      blob = null;
                      chunkblob = formData = null; // Free memory
                      finishChunks();
                  }
              } else {
                  handleError(JSON.parse(e.responseText), 0, chunk, status);
              }

          });
      }

      function finishChunks() {
          var parts = [];
          for (var i = 0; i < tags.length; i++) {
              parts[i] = {
                  "partNumber": i + 1,
                  "eTag": tags[i]
              }
          }
          parts = btoa(JSON.stringify(parts));
          var formData = new FormData();
          formData.append('id', id);
          formData.append('uploadId', uploadId);
          formData.append('parts', parts);

          ajax(blockComplete, formData, function (e) {
              var status = e.status,
                  message = e.statusText || "";
              if (status == 200 && message == "OK") {
                  callback(100, JSON.parse(e.responseText));
              } else {
                  handleError(JSON.parse(e.responseText), 1, "", status);  //分片上传已经完成就不能重试了
              }
          })
      }

      function uploadSingle() {
          var formData = new FormData();
          formData.append('dir', dir);
          formData.append('name', configName);
          formData.append('size', file.size);
          formData.append('content', file);
          var url = upload_url;

          ajax(url, formData, function (e) {
              var status = e.status,
                  message = e.statusText || "";
              if (status == 200 && message == "OK") {
                  callback(100, JSON.parse(e.responseText));
              } else {
                  handleError(JSON.parse(e.responseText), "", "", status);
              }
          });
      }

      function ajax(url,data,complete){
          var request = new XMLHttpRequest();
          var query = 'Authorization=' + token + '&UserAgent=ALIMEDIASDK_WORKSTATION';
          if(url.indexOf('?') > -1){
              url += '&' + query;
          }else{
              url += '?' + query;
          }
          request.open('POST', url);
          
          request.onload = function(e) {
              complete(request);
          };
          request.send(data);
      }

      if (!file || !token) {
          callback(-1, '上传文件参数必须配置file以及token');
          return;
      }

      if (maxSize && file.size > maxSize) {
          callback(-1, "文件大小不能超过"+maxSize);
          return;
      }

      if (file.size > chunkSize) {
          //分块上传
          startChunks();
      } else {
          //普通上传
          uploadSingle();
      }
    }
    var files = e.target.files;
    //上传
    for(var i=0;i<files.length;i++){
      new uploadJSSDK({
        file: files[i],   //文件，必填,html5 file类型，不需要读数据流，
        name: moment(new Date()).format('YYYYMMDDHHmm') + files[i].name,
        token: 'UPLOAD_AK_TOP MjM4ODY4MTI6ZXlKa1pYUmxZM1JOYVcxbElqb2lNU0lzSW1sdWMyVnlkRTl1YkhraU9pSXdJaXdpYm1GdFpYTndZV05sSWpvaWFIVnBZM2xsSWl3aVpYaHdhWEpoZEdsdmJpSTZMVEY5Ojc5NWMzMmM5YzRhOWEwN2JjYTkzMmJkMTYxZDE3NzQ2MTcyZWZlYmY',  //token，必填
        dir: dir,  //目录，选填，默认根目录''
        retries: 0,  //重试次数，选填，默认0不重试
        maxSize: 0,  //上传大小限制，选填，默认0没有限制
        callback:callback
        // callback: function (percent, result) {
        //     //percent（上传百分比）：-1失败；0-100上传的百分比；100即完成上传
        //     //result(服务端返回的responseText，json格式)
        //     console.log(result)
        // }
      });
    }
  }
}

export default  functionUtil