function _setupAngular(app){
	app.factory('uuid', function() {
		var svc = {
			new: function() {
				function _p8(s) {
					var p = (Math.random().toString(16)+"000000000").substr(2,8);
					return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
				}
				return _p8() + _p8(true) + _p8(true) + _p8();
			},
			
			empty: function() {
			  return '00000000-0000-0000-0000-000000000000';
			}
		};
		
		return svc;
	});

	app.directive('ngDraggable', ['$rootScope', 'uuid', function ($rootScope, uuid) {
		return {
			restrict: 'A',
			scope:{
				dragData:'='
			},
			link: function (scope, el, attrs, controller) {
				angular.element(el).attr("draggable", "true");

				var id = angular.element(el).attr("id");

				if (!id) {
					id = uuid.new()
					angular.element(el).attr("id", id);
				}
				el.bind("dragstart", function (e) {
					e.originalEvent.dataTransfer.setData('text', id);
					$rootScope.$emit("LVL-DRAG-START");
				});

				el.bind("dragend", function (e) {
					$rootScope.$emit("LVL-DRAG-END");
				});
			}
		};
	}]);

	app.directive('ngDropTarget', ['$rootScope', 'uuid', function ($rootScope, uuid) {
		return {
			restrict: 'A',
			scope: {
				onDrop: '&'
			},
			link: function (scope, el, attrs, controller) {
				var id = angular.element(el).attr("id");
				if (!id) {
					id = uuid.new();
					angular.element(el).attr("id", id);
				}

				el.bind("dragover", function (e) {
					if (e.preventDefault) {
						e.preventDefault(); // Necessary. Allows us to drop.
					}

					e.originalEvent.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
					return false;
				});

				el.bind("dragenter", function (e) {
					// this / e.target is the current hover target.
					angular.element(e.target).addClass('drop-over');
				});

				el.bind("dragleave", function (e) {
					angular.element(e.target).removeClass('drop-over');  // this / e.target is previous target element.
				});

				el.bind("drop", function (e) {
					if (e.preventDefault) {
						e.preventDefault(); // Necessary. Allows us to drop.
					}

					if (e.stopPropagation) {
						e.stopPropagation(); // Necessary. Allows us to drop.
					}
					var data = e.originalEvent.dataTransfer.getData("text");
					var dest = document.getElementById(id);
					var src = document.getElementById(data);

					scope.onDrop({source: data, target: id});
				});

				$rootScope.$on("LVL-DRAG-START", function () {
					var el = document.getElementById(id);
					angular.element(el).addClass("drop-target");
				});

				$rootScope.$on("LVL-DRAG-END", function () {
					var el = document.getElementById(id);
					angular.element(el).removeClass("drop-target");
					angular.element(el).removeClass("drop-over");
				});
			}
		};
	}]);
	
app.directive('rangeSlider', ['$document',function($document) {

	// Move slider handle and range line
	  var moveHandle = function(handle, elem, posX) {
		$(elem).find('.handle.'+handle).css("left",posX +'%');
	  };
	  var moveRange = function(elem,posMin,posMax) {
		$(elem).find('.range').css("left",posMin +'%');
		$(elem).find('.range').css("width",posMax - posMin +'%');
	  };

	return {
		template: '<div class="slider horizontal">'+
					'<div class="range"></div>'+
					'<a class="handle min" ng-mousedown="mouseDownMin($event)"></a>'+
					'<a class="handle max" ng-mousedown="mouseDownMax($event)"></a>'+
				  '</div>',
		replace: true,
		restrict: 'E',
		scope:{
		  valueMin:"=",
		  valueMax:"="
		},
		link: function postLink(scope, element, attrs) {
			// Initilization
			var dragging = false;
			var startPointXMin = 0;
			var startPointXMax = 0;
			var xPosMin = 0;
			var xPosMax = 0;
			var settings = {};
			settings.discrete = (typeof(attrs.discrete) !== 'undefined');
			if (settings.discrete){
				settings.min = (typeof(attrs.min) !== "undefined"  ? parseInt(attrs.min,10) : 0);
				settings.max = (typeof(attrs.max) !== "undefined"  ? parseInt(attrs.max,10) : 100);
				settings.step = (typeof(attrs.step) !== "undefined" ? parseInt(attrs.step,10) : 1);
			} else {
				settings.min = (typeof(attrs.min) !== "undefined"  ? parseFloat(attrs.min) : 0);
				settings.max = (typeof(attrs.max) !== "undefined"  ? parseFloat(attrs.max) : 100);
				settings.step = (typeof(attrs.step) !== "undefined" ? parseFloat(attrs.step) : 1);
			}
			if ( typeof(scope.valueMin) == "undefined" || scope.valueMin === '' ) {
				scope.valueMin = settings.min;
			}	
			if ( typeof(scope.valueMax) == "undefined" || scope.valueMax === '' ) {
				scope.valueMax = settings.max;
			}
			
			// Track changes only from the outside of the directive
			scope.$watch('valueMin', function() {
			  if (dragging) return;
			  xPosMin = ( scope.valueMin - settings.min ) / (settings.max - settings.min ) * 100;
			  if(xPosMin < 0) {
				  xPosMin = 0;
			  } else if(xPosMin > 100)  {
				  xPosMin = 100;
			  }
			  moveHandle("min",element,xPosMin);
			  moveRange(element,xPosMin,xPosMax);
			});

			scope.$watch('valueMax', function() {
			  if (dragging) return;
			  xPosMax = ( scope.valueMax - settings.min ) / (settings.max - settings.min ) * 100;
			  if(xPosMax < 0) {
				  xPosMax = 0;
			  } else if(xPosMax > 100)  {
				  xPosMax = 100;
			  }
			  moveHandle("max",element,xPosMax);
			  moveRange(element,xPosMin,xPosMax);
			});

			// Real action control is here
			scope.mouseDownMin = function($event) {
				dragging = true;
				startPointXMin = $event.pageX;
			
				// Bind to full document, to make move easiery (not to lose focus on y axis)
				$document.on('mousemove', function($event) {
					if(!dragging) return;

					//Calculate handle position
					var moveDelta = $event.pageX - startPointXMin;

					xPosMin = xPosMin + ( (moveDelta / element.outerWidth()) * 100 );
					if(xPosMin < 0) {
						xPosMin = 0;
					} else if(xPosMin > xPosMax) {
					  xPosMin = xPosMax;
					} else {
						// Prevent generating "lag" if moving outside window
						startPointXMin = $event.pageX;
					}
					var percentage = (((settings.max - settings.min ) * (xPosMin / 100))+settings.min)/settings.step;
					if (settings.discrete){
						percentage = Math.round(percentage);
					}
					scope.valueMin = percentage * settings.step;
					scope.$apply();
					
					// Move the Handle
					moveHandle("min", element,xPosMin);
					moveRange(element,xPosMin,xPosMax);
				});
			$document.mouseup(function(){
					dragging = false;
					$document.unbind('mousemove');
					$document.unbind('mousemove');
				});
			};

			scope.mouseDownMax = function($event) {
				dragging = true;
				startPointXMax = $event.pageX;
			
				// Bind to full document, to make move easiery (not to lose focus on y axis)
				$document.on('mousemove', function($event) {
					if(!dragging) return;

					//Calculate handle position
					var moveDelta = $event.pageX - startPointXMax;

					xPosMax = xPosMax + ( (moveDelta / element.outerWidth()) * 100 );
					if(xPosMax > 100)  {
						xPosMax = 100;
					} else if(xPosMax < xPosMin) {
					  xPosMax = xPosMin;
					} else {
						// Prevent generating "lag" if moving outside window
						startPointXMax = $event.pageX;
					}
					var percentage = (((settings.max - settings.min ) * (xPosMax / 100))+settings.min)/settings.step;
					if (settings.discrete){
						percentage = Math.round(percentage);
					}
					scope.valueMax = percentage * settings.step;
					scope.$apply();
					
					// Move the Handle
					moveHandle("max", element,xPosMax);
					moveRange(element,xPosMin,xPosMax);
				});

				$document.mouseup(function(){
					dragging = false;
					$document.unbind('mousemove');
					$document.unbind('mousemove');
				});
			};
		}
	  };
  }]);
}