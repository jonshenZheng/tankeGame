window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || windooCancelRequestAnimationFrame ||   window.msCancelRequestAnimationFrame;

		var canvas_el = document.getElementById('game'),
			canvas_st = canvas_el.getContext('2d'),
			canvas_wid = canvas_el.offsetWidth,
			canvas_hei = canvas_el.offsetHeight,
			equipment_list = [],
			gift_list = [],
			gift_timeOver = needTime(),
			gift_max_len = 10, 
			tanke_list = [],
			buller_list = [], 
			buller_list_index = [], 
			tanke_obj1,
			tanke_obj2;



		function giftBaseClass(options){

			if(Object.prototype.toString.call(options) !== '[object Object]'){
				options = {};
			}

			var opts = {},
				init,
				_self = this;

			opts.width = options.width || 50;
			opts.height = options.height || 50;
			opts.loc_x = options.loc_x || 0;
			opts.loc_y = options.loc_y || 0;
			opts.giftType = options.giftType || 'buller';
			opts.powerType = options.powerType || 2;
			opts.bullerNum = options.bullerNum || 80;
			opts.color = options.color || '#000';
			opts.stroke = options.stroke || true;
			opts.text = options.text || '';


			this.width = opts.width;
			this.height = opts.height;
			this.loc_x = opts.loc_x;
			this.loc_y = opts.loc_y;
			this.giftType = opts.giftType;

			if(opts.giftType === 'buller'){
				this.powerType = opts.powerType;
				this.bullerNum = opts.bullerNum;
			}

			this.appearance = {
				color : opts.color,
				stroke : opts.stroke,
				text : opts.text
			};

			init = (function(){

				gift_list[gift_list.length] = _self;

				getLocation(_self);

			})();


		}

		function gift_buller_power1(){

			giftBaseClass.call(this,{powerType:1,text:'power1'});			

		}


		function gift_buller_power2(){

			giftBaseClass.call(this,{powerType:2,text:'power2',bullerNum:3});			

		}

		function gift_buller_power3(){

			giftBaseClass.call(this,{powerType:3,text:'power3',bullerNum:2});			

		}


		equipment_list[equipment_list.length] = 'gift_buller_power1';
		equipment_list[equipment_list.length] = 'gift_buller_power2';
		equipment_list[equipment_list.length] = 'gift_buller_power3';

		function makeGift(type){

			switch(type){

				case 'gift_buller_power1' : return new gift_buller_power1();
					break;
				case 'gift_buller_power2' : return new gift_buller_power2();
					break;
				case 'gift_buller_power3' : return new gift_buller_power3();
					break;
					

			}

		}


		function buller(options){

			var opts = {};

			var	callerName,
				fnName;

			callerName = arguments.callee.caller;

			if(callerName){
				fnName = getFunctionName(String(callerName));

				if(!equipment_list[fnName]){
					equipment_list[fnName] = fnName;
				}

			}

			if(Object.prototype.toString.call(options) !== '[object Object]'){
				options = {};
			}

			opts.power = options.power || 1;
			opts.speed = options.speed || 20;
			opts.loc_x = options.loc_x || 0;
			opts.loc_y = options.loc_y || 0;
			opts.getShapWid = options.getShapWid || 4;
			opts.getShapHei = options.getShapHei || 4;
			opts.shootShapWid = options.shootShapWid || 4;
			opts.shootShapHei = options.shootShapHei || 4;
			opts.ownerName = options.ownerName || '';
			opts.deration = options.deration || 0;

			this.power = opts.power;
			this.speed = opts.speed;
			this.loc_x = opts.loc_x;
			this.loc_y = opts.loc_y;
			this.ownerName = opts.ownerName;
			this.deration = opts.deration;


			if(opts.shootShapWid < opts.shootShapHei){
				opts.shootShapWid = opts.shootShapHei;
			}

			this.shootShap = {
				wid : opts.shootShapWid,
				hei : opts.shootShapHei
			}

			this.__proto__ = buller.prototype;

			this.addEquipmentType = function(){

			}

			if(!this.buller_init_proto){
				buller.prototype.buller_init_proto = true;
				buller.prototype.say = function(){
					console.log('ok');
				}
			}


		}

		var buller_superClass = new buller();  


		function buller_0(x,y,oName,deration){
			buller.call(this,{loc_x:x,loc_y:y,ownerName: oName,deration:deration});
		}

		function buller_1(x,y,oName,deration){
			buller.call(this,{power: 2,loc_x:x,loc_y:y,ownerName: oName,deration:deration});
		}

		function buller_2(x,y,oName,deration){
			buller.call(this,{power: 3,loc_x:x,loc_y:y,ownerName: oName,deration:deration,speed:24});
		}

		function buller_3(x,y,oName,deration){
			buller.call(this,{power: 4,loc_x:x,loc_y:y,ownerName: oName,deration:deration,speed:24});
		}



		function getBuller(type,x,y,oName,deration){

			switch(type){

				case 0 : return new buller_0(x,y,oName,deration);
					break;

				case 1 : return new buller_1(x,y,oName,deration);
					break;

				case 2 : return new buller_2(x,y,oName,deration);
					break;

				case 3 : return new buller_3(x,y,oName,deration);
					break;
			}

		}

		function getIdNum(id_wid){

			var onlyOne = String(new Date().getTime()),
				len = -id_wid || -5; 

			return onlyOne.slice(len);

		}


		function tanke(){
			this.tankeName = '';
			this.speed = 10;
			this.color = '#000';
			this.width = 40;
			this.height = 40;
			this.blood = 20;
			this.loc_x = 0;
			this.loc_y = 0;
			
			this.emitter = {
				color : '#000',
				wid : 4,
				hei : 10,
				x : 0,  
				y : 0,
				deration : getRandom() % 4
			};

			this.buller = {
				type : 0,
				num : 'unlimited'
			};

			this.setName = function(){
				this.tankeName = 'tanke' + getRandom() +getIdNum();
			};

			this.joinList = function(){
				tanke_list[tanke_list.length] = this;
			}

			if(this.width < this.height){
				this.width = this.height;
			}


			var initialize = (function(tanke){

				tanke.setName();

				tanke.joinList();


			})(this);

		}

		tanke_obj1 = new tanke();
		tanke_obj2 = new tanke();
		tanke_obj2.color = '#f60';
		tanke_obj2.emitter.color = '#f60';
		tanke_obj2.buller.type = 2;


		function drawBG(){
			var gameBg = new Image();

			gameBg.src = 'images/gameBg.jpg';
			canvas_st.drawImage(gameBg,0,0);

			canvas_st.save();

		}


		function getRandom(rule){
			var ru = rule || parseInt(Math.random()*100*Math.random()*100);
			return ru;
		}


		function getLocation(obj){

			obj.loc_x = getRandom()%canvas_wid;
			obj.loc_y = getRandom()%canvas_hei;

			checkArea(obj);
		}


		/*防止重叠*/
		function stopRecover(){
			/*暂时未找到思路*/
		}


		function drawEmitter(tanke){

			var eterDereaction = tanke.emitter.deration,
				temp;

			canvas_st.fillStyle = tanke.emitter.color;


			switch(eterDereaction){
				case 0 :    tanke.emitter.x = tanke.loc_x - tanke.emitter.hei; 
							tanke.emitter.y = tanke.loc_y + Math.floor((tanke.height-tanke.emitter.wid)/2);
							tanke.emitter.deration = 0;
							canvas_st.fillRect(tanke.emitter.x,tanke.emitter.y,tanke.emitter.hei,tanke.emitter.wid);
					break;
				case 1 :    tanke.emitter.x = tanke.loc_x + Math.floor((tanke.width-tanke.emitter.wid)/2); 
							tanke.emitter.y = tanke.loc_y - tanke.emitter.hei;
							tanke.emitter.deration = 1;
							canvas_st.fillRect(tanke.emitter.x,tanke.emitter.y,tanke.emitter.wid,tanke.emitter.hei);
					break;
				case 2 :    temp = tanke.loc_x + tanke.width;
							tanke.emitter.x = temp + tanke.emitter.hei; 
							tanke.emitter.y = tanke.loc_y + Math.floor((tanke.height-tanke.emitter.wid)/2);
							tanke.emitter.deration = 2;
							canvas_st.fillRect(temp,tanke.emitter.y,tanke.emitter.hei,tanke.emitter.wid);
					break;
				case 3 :    tanke.emitter.x = tanke.loc_x + Math.floor((tanke.width-tanke.emitter.wid)/2); 
							temp = tanke.loc_y + tanke.height;
							tanke.emitter.y = temp + tanke.emitter.hei;
							tanke.emitter.deration = 3;
							canvas_st.fillRect(tanke.emitter.x,temp,tanke.emitter.wid,tanke.emitter.hei);
					break;
			}

		}


		function drawBlood(tanke){
			var blood_len = tanke.blood,
				blood_loc_x = tanke.loc_x,
				blood_loc_y = tanke.loc_y+tanke.height+5,
				border_wid = 1,
				border_hei = 1,
				blood_wid = 4,
				blood_hei = 4;


			for(;blood_len--;){
				canvas_st.fillStyle = '#a8e4a7';
				canvas_st.fillRect(blood_loc_x,blood_loc_y,blood_wid,blood_hei);
				if(blood_len > 1){
					canvas_st.fillStyle = '#ddd';
					canvas_st.fillRect(blood_loc_x+blood_wid,blood_loc_y,border_wid,border_hei);
				}
				blood_loc_x = blood_loc_x + blood_wid + border_wid;
			}


		}


		function drawTanke(status){
			var len = tanke_list.length;

			for(;len--;){

				canvas_st.fillStyle = tanke_list[len].color;
				if(status === 'init'){
					getLocation(tanke_list[len]);
				}

				canvas_st.fillRect(tanke_list[len].loc_x,tanke_list[len].loc_y,tanke_list[len].width,tanke_list[len].height);

				drawBlood(tanke_list[len]);		

				drawEmitter(tanke_list[len]);
					
			}

		}


		function drawGift(){

			var gl = gift_list,
				len = gl.length,
				that,
				text,
				stroke;

			if(len > 0){

				for(;len--;){

					that = gl[len];

					canvas_st.fillStyle = that.appearance.color;

					stroke = that.appearance.stroke;

					if(stroke){
						canvas_st.strokeRect(that.loc_x,that.loc_y,that.width,that.height);
					}

					text = that.appearance.text;

					if(text){
						canvas_st.font = '14px serif';
						canvas_st.textAlign = 'center';
						canvas_st.fillText(that.appearance.text,that.loc_x+(that.width/2),that.loc_y+(that.height/3*2));
					}


				}

			}


		}



		function tankeFire(tanke){


			if(tanke.buller.num !== 'unlimited'){

				if(tanke.buller.num <= 1){
					tanke.buller.type = 0;
					tanke.buller.num = 'unlimited';
				}
				else{
					tanke.buller.num -= 1;
				}

			}

			var buller_ind_len = buller_list_index.length;

			if( buller_ind_len === 0){
				buller_list[buller_list.length] = getBuller(tanke.buller.type,tanke.emitter.x,tanke.emitter.y,tanke.tankeName,tanke.emitter.deration); 
			}
			else{

				ind = buller_list_index[0];
				buller_list_index.shift();
				buller_list[ind] = getBuller(tanke.buller.type,tanke.emitter.x,tanke.emitter.y,tanke.tankeName,tanke.emitter.deration);

			}

		}


		function DestoryByBuller(buller_ind){
			buller_list[buller_ind] = null;
			buller_list_index[buller_list_index.length] = buller_ind;
		}



		function bullerDestoryByBuller(self_ind,other_ind){

			if( buller_list[self_ind].power >  buller_list[other_ind].power){

				buller_list[self_ind].power -= buller_list[other_ind].power;

				DestoryByBuller(other_ind);

			}
			else if(buller_list[self_ind].power <  buller_list[other_ind].power){
				
				buller_list[other_ind].power -= buller_list[self_ind].power;

				DestoryByBuller(self_ind);

			}
			else{

				DestoryByBuller(self_ind);
				DestoryByBuller(other_ind);

			}

		}


		function isIntersect(x1_min,x1_max,x2_min,x2_max,y1_min,y1_max,y2_min,y2_max){
			if(x1_min > x2_min ){	
				if( x1_min > x2_max ){
					return false;
				}
			}
			else if(x1_min < x2_min){
				if( x1_max < x2_min){
					return false;
				}
			}


			if( y1_min >  y2_min ){
				if( y1_min > y2_max ){
					return false;
				}
			}
			else if( y1_min < y2_min){
				if( y1_max < y2_min ){
					return false;
				}
			}

			return true;

		}


		function o_bulller_val(other_buller,o_x,o_x_hign,o_y,o_y_hign){

			switch(other_buller.deration){
				case 0 : o_y_hign = other_buller.loc_y + other_buller.shootShap.hei;
						 o_x -=  other_buller.shootShap.wid;
						 o_x_hign = other_buller.loc_x;
					break;
				case 1 : o_y -= other_buller.shootShap.wid;
						 o_x_hign = other_buller.loc_x + other_buller.shootShap.hei;
						 o_y_hign = other_buller.loc_y;
					break;
				case 2 : o_x_hign = other_buller.loc_x + other_buller.shootShap.wid;
						 o_y_hign = other_buller.loc_y + other_buller.shootShap.hei;
					break;
				case 3 : o_x_hign = other_buller.loc_x + other_buller.shootShap.hei;
						 o_y_hign = other_buller.loc_y + other_buller.shootShap.wid;
					break;
			}

			return [o_x,o_x_hign,o_y,o_y_hign];

		}

		function checkbullerimpact(buller,self_ind){

			var len = buller_list.length,
				deration = buller.deration,
				wid = buller.shootShap.wid,
				hei = buller.shootShap.hei,
				x = buller.loc_x,
				y = buller.loc_y,
				impactFn;


			if(len < 2){
				return false;
			}


			switch(deration){

				case 0: impactFn = function(other_buller){

					var o_x = other_buller.loc_x,
						o_y = other_buller.loc_y,
						o_x_hign,
						o_y_hign,
						temp;

					x -=  wid;

					temp = o_bulller_val(other_buller,o_x,o_x_hign,o_y,o_y_hign);

					o_x = temp[0];
					o_x_hign = temp[1];
					o_y = temp[2];
					o_y_hign = temp[3];


					if( !isIntersect(x,(x+wid),o_x,o_x_hign,y,(y+hei),o_y,o_y_hign) ){
						return false;
					}

					return buller.ownerName !== other_buller.ownerName;

				};
					break;
				case 1: impactFn = function(other_buller){

					var o_x = other_buller.loc_x,
						o_y = other_buller.loc_y,
						o_x_hign,
						o_y_hign,
						temp;

					y -= wid;

					temp = o_bulller_val(other_buller,o_x,o_x_hign,o_y,o_y_hign);

					o_x = temp[0];
					o_x_hign = temp[1];
					o_y = temp[2];
					o_y_hign = temp[3];

					if( !isIntersect(x,(x+hei),o_x,o_x_hign,y,(y+wid),o_y,o_y_hign) ){
						return false;
					}

					return buller.ownerName !== other_buller.ownerName;

				};
					break;
				case 2: impactFn = function(other_buller){

					var o_x = other_buller.loc_x,
						o_y = other_buller.loc_y,
						o_x_hign,
						o_y_hign,
						temp;

					temp = o_bulller_val(other_buller,o_x,o_x_hign,o_y,o_y_hign);

					o_x = temp[0];
					o_x_hign = temp[1];
					o_y = temp[2];
					o_y_hign = temp[3];

					if( !isIntersect(x,(x+wid),o_x,o_x_hign,y,(y+hei),o_y,o_y_hign) ){
						return false;
					}

					return buller.ownerName !== other_buller.ownerName;

				};
					break;
				case 3: impactFn = function(other_buller){

					var o_x = other_buller.loc_x,
						o_y = other_buller.loc_y,
						o_x_hign,
						o_y_hign,
						temp;

					temp = o_bulller_val(other_buller,o_x,o_x_hign,o_y,o_y_hign);

					o_x = temp[0];
					o_x_hign = temp[1];
					o_y = temp[2];
					o_y_hign = temp[3];

					if( !isIntersect(x,(x+hei),o_x,o_x_hign,y,(y+wid),o_y,o_y_hign) ){
						return false;
					}

					return buller.ownerName !== other_buller.ownerName;

				};
					break;		
			}

			for(;len--;){

				if(len !== self_ind && buller_list[len] != null){

					if( impactFn(buller_list[len]) ){

						bullerDestoryByBuller(self_ind,len);
						return true;
					}

				}

			}

			return false;

		}


		function destoryTanke(tanke_ind){

			cancelAnimationFrame(gameRun);
			document.onkeyup = null;
			alert('游戏结束');

		}



		function HitTanke(buller_ind,tanke_ind){

			if( tanke_list[tanke_ind].blood > buller_list[buller_ind].power ){

				tanke_list[tanke_ind].blood -= buller_list[buller_ind].power;

				DestoryByBuller(buller_ind);

			}
			else if( tanke_list[tanke_ind].blood < buller_list[buller_ind].power ){

				buller_list[buller_ind].power -= tanke_list[tanke_ind].blood;

				destoryTanke();
			}
			else{

				DestoryByBuller(buller_ind);
				destoryTanke();
			}

		}


		function o_tanke_val(tanke,o_x_hign,o_y_hign){

			switch(tanke.emitter.deration){

				case 0 : o_x_hign = tanke.loc_x + tanke.width;
						 o_y_hign = tanke.loc_y + tanke.height;
					break;
				case 1 : o_x_hign = tanke.loc_x + tanke.height;
						 o_y_hign = tanke.loc_y + tanke.width;
					break;
				case 2 : o_x_hign = tanke.loc_x + tanke.width;
						 o_y_hign = tanke.loc_y + tanke.height;
					break;
				case 3 : o_x_hign = tanke.loc_x + tanke.height;
						 o_y_hign = tanke.loc_y + tanke.width;
					break;
			}

			return [o_x_hign,o_y_hign];

		}


		function isHitTanke(buller,self_ind){

			var len = tanke_list.length,
				deration = buller.deration,
				wid = buller.shootShap.wid,
				hei = buller.shootShap.hei,
				x = buller.loc_x,
				y = buller.loc_y,
				temp,
				hitFn;


			switch(buller.deration){

				case 0 : hitFn = function(tanke){

					var o_x = tanke.loc_x,
						o_y = tanke.loc_y,
						o_x_hign,
						o_y_hign,
						temp;

					x -=  wid;

					temp = o_tanke_val(tanke,o_x_hign,o_y_hign);

					o_x_hign = temp[0];
					o_y_hign = temp[1];

					if( !isIntersect(x,(x+wid),o_x,o_x_hign,y,(y+hei),o_y,o_y_hign) ){
						return false;
					}

					return true;

				};
					break;
				case 1: hitFn = function(tanke){

					var o_x = tanke.loc_x,
						o_y = tanke.loc_y,
						o_x_hign,
						o_y_hign,
						temp;

					y -= wid;

					temp = o_tanke_val(tanke,o_x_hign,o_y_hign);

					o_x_hign = temp[0];
					o_y_hign = temp[1];

					if( !isIntersect(x,(x+hei),o_x,o_x_hign,y,(y+wid),o_y,o_y_hign) ){
						return false;
					}

					return true;

				};
					break;
				case 2: hitFn = function(tanke){

					var o_x = tanke.loc_x,
						o_y = tanke.loc_y,
						o_x_hign,
						o_y_hign,
						temp;

					temp = o_tanke_val(tanke,o_x_hign,o_y_hign);

					o_x_hign = temp[0];
					o_y_hign = temp[1];

					if( !isIntersect(x,(x+wid),o_x,o_x_hign,y,(y+hei),o_y,o_y_hign) ){
						return false;
					}

					return true;

				};
					break;
				case 3: hitFn = function(tanke){

					var o_x = tanke.loc_x,
						o_y = tanke.loc_y,
						o_x_hign,
						o_y_hign,
						temp;

					temp = o_tanke_val(tanke,o_x_hign,o_y_hign);

					o_x_hign = temp[0];
					o_y_hign = temp[1];

					if( !isIntersect(x,(x+hei),o_x,o_x_hign,y,(y+wid),o_y,o_y_hign) ){
						return false;
					}

					return true;

				};
					break;	
			}

			for(;len--;){

				if( tanke_list[len].tankeName === buller.ownerName ){
					continue;
				}

				if( hitFn(tanke_list[len]) ){

					HitTanke(self_ind,len);
					return true;
				}

			}

			return false;

		}


		function overGameArea(buller,self_ind){

			var inGameArea = false;

			switch(buller.deration){

				case 0 : if(buller.loc_x-buller.shootShap.wid <= 0){
					inGameArea = true;
				}
					break;
				case 1 : if(buller.loc_y-buller.shootShap.wid <= 0){
					inGameArea = true;
				}
					break;
				case 2 : if(buller.loc_x+buller.shootShap.wid >= canvas_wid){
					inGameArea = true;
				}
					break;
				case 3 : if(buller.loc_y+buller.shootShap.wid >= canvas_hei){
					inGameArea = true;
				}
					break;
			}

			if(inGameArea){
				DestoryByBuller(self_ind);
				return true;
			}

			return false;

		}

		function drawBuller(){

			var len = buller_list.length,
				that_bu;

			canvas_st.fillStyle = '#000';

			for(;len--;){

				that_bu = buller_list[len];

				if(that_bu == null){
					continue;
				}

				switch(that_bu.deration){

					case 0 : canvas_st.fillRect(that_bu.loc_x-that_bu.shootShap.wid,that_bu.loc_y,that_bu.shootShap.wid,that_bu.shootShap.hei);
						break;
					case 1 : canvas_st.fillRect(that_bu.loc_x,that_bu.loc_y-that_bu.shootShap.hei,that_bu.shootShap.wid,that_bu.shootShap.hei);
						break;
					case 2 : canvas_st.fillRect(that_bu.loc_x,that_bu.loc_y,that_bu.shootShap.hei,that_bu.shootShap.wid);
						break;
					case 3 : canvas_st.fillRect(that_bu.loc_x,that_bu.loc_y,that_bu.shootShap.hei,that_bu.shootShap.wid);
						break;
				}


				if( !checkbullerimpact(that_bu,len) && !isHitTanke(that_bu,len) && !overGameArea(that_bu,len) ){


					switch(that_bu.deration){
						case 0 : that_bu.loc_x -= that_bu.speed;
							break;
						case 1 : that_bu.loc_y -= that_bu.speed;
							break;
						case 2 : that_bu.loc_x += that_bu.speed;
							break;
						case 3 : that_bu.loc_y += that_bu.speed;
							break;
					}

				}

			}

		}


		function needTime(){

			var time_now = new Date().getTime(),
				times = 2000 + Math.floor( Math.random() * 5000);

			return time_now + times;

		}


		function giftGenerate(){
			var len = gift_list.length,
				time_now = 0,
				Mgift_len,
				Mgift_ind;

			if(len < gift_max_len){

				time_now = new Date().getTime();

				if(time_now >= gift_timeOver){

					gift_timeOver =  needTime();


					Mgift_len = equipment_list.length;

					if(Mgift_len>1){

						Mgift_ind = getRandom() % Mgift_len;

						makeGift(equipment_list.slice(Mgift_ind,Mgift_ind+1)[0]);

					}
					else{
						makeGift(equipment_list.slice(0,1)[0]);
					}

				}
				
			}

		}

		window.tankeGame = {
			author : '郑雄升',
			buildTime : '2017-9-10'
		};


		function gameinit(){

			drawBG();

			drawTanke('init');	

			document.onkeydown = function(e){

				e.stopPropagation();

				if( e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32){				
					e.preventDefault();
				}

				
			}

			document.onkeyup = function(e){
				e.stopPropagation();
				e.preventDefault();

				console.log(e.keyCode);


				if( e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 ){
					gamePlay(e.keyCode,tanke_obj1);
				}

				else if(e.keyCode === 96){
					tankeFire(tanke_obj1);
				}


				if( e.keyCode === 65 || e.keyCode === 87 || e.keyCode === 68 || e.keyCode === 83){
					gamePlay(e.keyCode,tanke_obj2);
				}

				else if(e.keyCode === 32){
					tankeFire(tanke_obj2);
				} 

			}
		

			requestAnimationFrame(gameRun);

		}

		function destoryGift(ind){
			gift_list.splice(ind,1);
		}

		function getEquipment(tanke){

			var t_x_min = tanke.loc_x,
				t_x_max,
				t_y_min = tanke.loc_y,
				t_y_max,
				gl_len = gift_list.length,
				that,
				takon = false,
				g_x_min,
				g_x_max,
				g_y_min,
				g_y_max;

			if(!gl_len){
				return;
			}

			switch(tanke.emitter.deration){
				case 0 : t_x_min -= tanke.emitter.wid;
						 t_x_max = tanke.loc_x+tanke.width;
						 t_y_max = tanke.loc_y + tanke.height;
					break; 
				case 1 : t_y_min -= tanke.emitter.wid;
						 t_y_max = tanke.loc_y + tanke.width;
						 t_x_max = tanke.loc_x + tanke;
					break; 
				case 2 : 
						 t_x_max = tanke.loc_x + tanke.width + tanke.emitter.wid;
						 t_y_max = tanke.loc_y + tanke.height;
					break; 
				case 3 : t_y_max = tanke.loc_y + tanke.width + tanke.emitter.wid;
						 t_x_max = tanke.loc_x + tanke.height;
					break; 
			}

			for(;gl_len--;){

				that = gift_list[gl_len];

				g_x_min = that.loc_x,
				g_x_max = g_x_min + that.width,
				g_y_min = that.loc_y,
				g_y_max = g_y_min + that.height;

				if( isIntersect(t_x_min,t_x_max,g_x_min,g_x_max,t_y_min,t_y_max,g_y_min,g_y_max) ){
					takon = true;
					break;
				}

			}

			if(!takon){
				return;
			}


			if( that.giftType === 'buller' ){

				tanke.buller.type = that.powerType;
				tanke.buller.num = that.bullerNum;

			}

			destoryGift(gl_len);

		}


		function gameRun(){

			drwaGame();

			requestAnimationFrame(gameRun);

		}



		function gamePlay(key,obj){

			switch(key){
				case 65:
				case 37:  obj.loc_x -= obj.speed;
						  obj.emitter.deration = 0;	
					break;
				case 87:
				case 38:  obj.loc_y -= obj.speed;
						  obj.emitter.deration = 1;
					break;
				case 68:
				case 39:  obj.loc_x += obj.speed;
						  obj.emitter.deration = 2;
					break;
				case 83:
				case 40:  obj.loc_y += obj.speed;
						  obj.emitter.deration = 3;
					break;		

			}


			getEquipment(obj);

			checkArea(obj);

		}


		function checkArea(obj){

			if(obj.loc_x < 0){
				obj.loc_x = 0;
			}
			else if((obj.loc_x+obj.width)>canvas_wid){
				obj.loc_x = canvas_wid - obj.width;
			}
			if(obj.loc_y < 0){
				obj.loc_y = 0;
			}
			else if((obj.loc_y+obj.height)>canvas_hei){
				obj.loc_y = canvas_hei - obj.height;
			}

		}



		function drwaGame(){

			canvas_st.clearRect(0,0,canvas_wid,canvas_hei);

			drawBG();

			drawTanke();

			drawBuller();

			giftGenerate();

			drawGift();


		}


		gameinit();