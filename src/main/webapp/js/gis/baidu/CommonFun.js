/*======================================*/
var blist = [];  
var districtLoading = 0;  
function getBoundary(zoom){       
	addDistrict("河北省",zoom);
}
/**  
 * 添加行政区划  
 * @param {} districtName 行政区划名  
 * @returns  无返回值  
 */  
function addDistrict(districtName,zoom) {  
    //使用计数器来控制加载过程  
    districtLoading++;  
    var bdary = new BMap.Boundary();  
    bdary.get(districtName, function (rs) {       //获取行政区域  
        var count = rs.boundaries.length; //行政区域的点有多少个  
        if (count === 0) {  
            alert('未能获取当前输入行政区域');  
            return;  
        }  
        for (var i = 0; i < count; i++) {  
            blist.push({ points: rs.boundaries[i], name: districtName });  
        };  
        //加载完成区域点后计数器-1  
        districtLoading--;  
        if (districtLoading == 0) {  
            //全加载完成后画端点  
            drawBoundary(zoom);  

        }  
    });  
}  
  
function drawBoundary(zoom) {  
    //包含所有区域的点数组  
    var pointArray = [];  
  
    /*画遮蔽层的相关方法  
    *思路: 首先在中国地图最外画一圈，圈住理论上所有的中国领土，然后再将每个闭合区域合并进来，并全部连到西北角。  
    *      这样就做出了一个经过多次西北角的闭合多边形*/  
    //定义中国东南西北端点，作为第一层  
    var pNW = { lat: 53.0, lng: 73.0 }  
    var pNE = { lat: 53.0, lng: 136.0 }  
    var pSE = { lat: 3.0, lng: 136.0 }  
    var pSW = { lat: 3.0, lng: 73.0 }  
    //向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点  
    var pArray = [];  
    pArray.push(pNW);  
    pArray.push(pSW);  
    pArray.push(pSE);  
    pArray.push(pNE);  
    pArray.push(pNW);  
    //循环添加各闭合区域  
    for (var i = 0; i < blist.length; i++) {  
        //添加显示用标签层  
        var label = new BMap.Label(blist[i].name, { offset: new BMap.Size(20, -10) });  
        label.hide();  
        map.addOverlay(label);  
  
        //添加多边形层并显示  
        var ply = new BMap.Polygon(blist[i].points, { strokeWeight: 5, strokeColor: "#FF0000", fillOpacity: 0.01, fillColor: " #FFFFFF" }); //建立多边形覆盖物  
        ply.name = blist[i].name;  
        ply.label = label;  
        //ply.addEventListener("click", click);  
        //ply.addEventListener("mouseover", mouseover);  
        //ply.addEventListener("mouseout", mouseout);  
        //ply.addEventListener("mousemove", mousemove);  
        map.addOverlay(ply);  
  
  
        //将点增加到视野范围内  
        var path = ply.getPath();  
        pointArray = pointArray.concat(path);  
        //将闭合区域加到遮蔽层上，每次添加完后要再加一次西北角作为下次添加的起点和最后一次的终点  
        pArray = pArray.concat(path);  
        pArray.push(pArray[0]);  
    }  
  
    //限定显示区域，需要引用api库  
/*    var boundply = new BMap.Polygon(pointArray);  
    BMapLib.AreaRestriction.setBounds(map, boundply.getBounds());  
    map.setViewport(pointArray);    //调整视野   
*/  
    //添加遮蔽层  
    var plyall = new BMap.Polygon(pArray, { strokeOpacity: 0.0000001, strokeColor: "#000000", strokeWeight: 0.00001, fillColor: "#000000", fillOpacity: 0.9 }); //建立多边形覆盖物  
    map.addOverlay(plyall); 
    
   
    map.setZoom(zoom||8);
    
}  
/*======================================*/
/**
 * 取得地图上线的坐标点
 * 参数：
 * 	overlays是一个Polyline的数组
 * 返回：
 * 	一个坐标的拼接字符串，格式是：纬度,经度;纬度,经度|纬度,经度;纬度,经度
 *  一个点用,符号链接
 *  多个点用;符号链接
 *  多条线用|符号链接
 */
function getPolylinePoints(overlays){
	var str = "";
	for(var i = 0; i < overlays.length; i++){
        var overlay = overlays[i];
        var path = overlay.getPath();
        var tempStr = "";
        for(var j = 0; j < path.length; j++){
        	var I = path[j];
        	var lat = I.lat;//纬度
        	var lng = I.lng;//经度
        	
        	var temp = lng+","+lat;
        	tempStr+=temp;
        	if(j!=path.length-1){
        		tempStr+=";";
        	}
        	
        }
        
        str+=tempStr;
    	if(i!=overlays.length-1){
    		str+="|";
    	}
        
    }
	return str;
}
/**
 * 取得地图上线数组对象
 * 参数：
 * 	str是一个线点的字符串，格式是：纬度,经度;纬度,经度|纬度,经度;纬度,经度
 * 返回：
 * 	Polyline线数组对象
 */
function getPolylineArray(str,opts){
	var overlays = new Array();
	if(str && str!=""){
		var lines = str.split("|");
		if(lines!=null && lines.length>0){
			
			for(var i=0;i<lines.length;i++){
				var line = lines[i];
				var points = line.split(";");
				var array = new Array();
				if(points!=null && points.length>0){
					for(var j=0;j<points.length;j++){
						var point = points[j];
						var I = point.split(",");
						if(I!=null && I.length==2){
							var lng = I[0];//经度
							var lat = I[1];//纬度
							
							var p = new BMap.Point(lng,lat);
							array.push(p);
						}
						
					}
				}
				var overlay = new BMap.Polyline(array,opts);
				overlays.push(overlay);
			}
		}
		
	}

	return overlays;
}
