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
				console.log(id);
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
}